package com.test.backend.controller;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.backend.common.BaseResponse;
import com.test.backend.common.ErrorCode;
import com.test.backend.common.ResultUtils;
import com.test.backend.constant.CommonConstant;
import com.test.backend.constant.RedisKeysConstant;
import com.test.backend.exception.BusinessException;
import com.test.backend.model.dto.UserQuizBatchSubmitDTO;
import com.test.backend.model.dto.UserQuizSubmitDTO;
import com.test.backend.model.entity.QuestionAnswer;
import com.test.backend.model.entity.QuestionBody;
import com.test.backend.model.vo.QuestionVO;
import com.test.backend.model.vo.UserQuizSubmitVO;
import com.test.backend.service.QuestionAnswerService;
import com.test.backend.service.QuestionBodyService;
import com.test.backend.utils.RedisUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/quiz")
public class QuizController
{
    @Resource
    private QuestionBodyService questionBodyService;

    @Resource
    private QuestionAnswerService questionAnswerService;

    @Resource
    private RedisUtils redisUtils;

    @Resource
    private OpenAIClient openAIClient;


    @GetMapping("quizByType")
    public BaseResponse<List<QuestionVO>> getQuestionByType(@RequestParam String category)
    {
        if (category == null)
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Request Error");
        }
        // build redis key for search data from redis
        String quizCategory = RedisKeysConstant.QUIZ_CATEGORY + category;
        // search data from redis
        List<QuestionVO> questionVOList = (List<QuestionVO>) redisUtils.get(quizCategory);
        // if data are exited in redis, return date to frontend directly
        if (questionVOList != null && !questionVOList.isEmpty())
        {
            return ResultUtils.success(questionVOList);
        }
        // if data are not in redis, build LambdaQueryWrapper for search data from database
        LambdaQueryWrapper<QuestionBody> questionBodyLambdaQueryWrapper = new LambdaQueryWrapper<>();
        questionBodyLambdaQueryWrapper.eq(QuestionBody::getQuestionCategory, category)
                .eq(QuestionBody::getIsDelete, 0);
        // search data from database
        List<QuestionBody> questionBodyList = questionBodyService.list(questionBodyLambdaQueryWrapper);
        if (questionBodyList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Quiz is not found");
        }
        // get questionId list
        List<Long> questionIdList = questionBodyList.stream()
                .map(QuestionBody::getId)
                .collect(Collectors.toList());
        LambdaQueryWrapper<QuestionAnswer> questionAnswerLambdaQueryWrapper = new LambdaQueryWrapper<>();
        // according questionId list search question answers
        questionAnswerLambdaQueryWrapper.in(QuestionAnswer::getQuestionId, questionIdList)
                .eq(QuestionAnswer::getIsDelete, 0);
        List<QuestionAnswer> questionAnswerList = questionAnswerService.list(questionAnswerLambdaQueryWrapper);
        if (questionAnswerList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Quiz answer is not Found");
        }
        // build VO object for return to the frontend
        Map<Long, QuestionAnswer> questionAnswerMap = questionAnswerList.stream()
                .collect(Collectors.toMap(QuestionAnswer::getQuestionId, a -> a));
        questionVOList = new ArrayList<>();
        for (QuestionBody questionBody : questionBodyList)
        {
            Long questionId = questionBody.getId();
            QuestionAnswer questionAnswer = questionAnswerMap.get(questionId);
            if (questionAnswer != null)
            {
                QuestionVO questionVO = new QuestionVO();
                questionVO.setQuestionId(questionId);
                questionVO.setQuestionDetails(questionBody.getQuestionDetails());
                questionVO.setQuestionType(questionBody.getQuestionType());
                questionVO.setOptionA(questionAnswer.getOptionA());
                questionVO.setOptionB(questionAnswer.getOptionB());
                questionVO.setOptionC(questionAnswer.getOptionC());
                questionVO.setOptionD(questionAnswer.getOptionD());
                questionVOList.add(questionVO);
            }
        }
        // save data into redis, next time will get data from redis
        redisUtils.set(quizCategory, questionVOList, 36000);
        return ResultUtils.success(questionVOList);
    }

    /**
     * Judge the quiz answer the user submitted
     * @param userQuizSubmitDTO
     * @return
     */
    @PostMapping("/judge")
    public BaseResponse<UserQuizSubmitVO> judgeQuiz(@RequestBody UserQuizSubmitDTO userQuizSubmitDTO)
    {
        if (userQuizSubmitDTO == null || userQuizSubmitDTO.getQuestionId() == null
                || userQuizSubmitDTO.getUserSelectedOption() == null)
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Invalid submission data");
        }

        Long questionId = userQuizSubmitDTO.getQuestionId();
        String userSelectedOption = userQuizSubmitDTO.getUserSelectedOption().trim();

        QueryWrapper<QuestionAnswer> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("questionId", questionId).eq("isDelete", 0);
        QuestionAnswer questionAnswer = questionAnswerService.getOne(queryWrapper);

        if (questionAnswer == null)
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Question answer not found");
        }

        String correctAnswer = questionAnswer.getCorrectAnswer().trim();

        UserQuizSubmitVO userQuizSubmitVO = new UserQuizSubmitVO();
        userQuizSubmitVO.setIsCorrect(userSelectedOption.equalsIgnoreCase(correctAnswer)); // 忽略大小写
        userQuizSubmitVO.setExplanation(questionAnswer.getExplanation());
        userQuizSubmitVO.setRightAnswer(correctAnswer);

        return ResultUtils.success(userQuizSubmitVO);
    }

    @PostMapping("/feedback")
    public BaseResponse<String> getAiResponse(@RequestBody UserQuizBatchSubmitDTO userQuizBatchSubmitDTO)
    {
        if (ObjectUtils.isEmpty(userQuizBatchSubmitDTO) || CollectionUtils.isEmpty(userQuizBatchSubmitDTO.getQuizList()))
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Invalid quiz data");
        }
        StringBuilder aiAnalysis = new StringBuilder();
        for (UserQuizSubmitDTO userQuizSubmitDTO : userQuizBatchSubmitDTO.getQuizList())
        {
            Long questionId = userQuizSubmitDTO.getQuestionId();
            String userSelectedOption = userQuizSubmitDTO.getUserSelectedOption();

            QuestionBody questionBody = questionBodyService.getById(questionId);
            if (ObjectUtils.isEmpty(questionBody))
            {
                throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Question body not found");
            }
            QuestionAnswer questionAnswer = questionAnswerService.getOne(new QueryWrapper<QuestionAnswer>()
                    .eq("questionId", questionId));
            String optionA = questionAnswer.getOptionA();
            String optionB = questionAnswer.getOptionB();
            String optionC = questionAnswer.getOptionC();
            String optionD = questionAnswer.getOptionD();

            aiAnalysis.append("Question: ").append(questionBody.getQuestionDetails()).append("\n")
                    .append("Options: ").append("\n")
                    .append("A.").append(optionA).append("\n")
                    .append("B.").append(optionB).append("\n")
                    .append("C.").append(optionC).append("\n")
                    .append("D.").append(optionD).append("\n")
                    .append("User selectedOption: ").append(userSelectedOption)
                    .append("Right Answer: ").append(questionAnswer.getCorrectAnswer())
                    .append("\n\n");
        }

        List<ChatRequestMessage> chatRequestMessageList = new ArrayList<>();
        ChatRequestMessage chatRequestSystemMessage = new ChatRequestSystemMessage(CommonConstant.QUIZ_FEED_BACK_PROMPT);
        ChatRequestMessage chatRequestUserMessage = new ChatRequestUserMessage(aiAnalysis.toString());
        chatRequestMessageList.add(chatRequestSystemMessage);
        chatRequestMessageList.add(chatRequestUserMessage);
        ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions(chatRequestMessageList);
        chatCompletionsOptions.setMaxTokens(4096);
        chatCompletionsOptions.setTemperature(1d);
        chatCompletionsOptions.setTopP(1d);

        ChatCompletions chatCompletions = openAIClient.getChatCompletions("gpt-4o-mini-2"
                , chatCompletionsOptions);
        List<ChatChoice> choices = chatCompletions.getChoices();
        String reply = choices.get(0).getMessage().getContent();
        return ResultUtils.success(reply);
    }
}
