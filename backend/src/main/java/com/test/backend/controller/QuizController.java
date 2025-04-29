package com.test.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.backend.common.BaseResponse;
import com.test.backend.common.ErrorCode;
import com.test.backend.common.ResultUtils;
import com.test.backend.constant.RedisKeysConstant;
import com.test.backend.exception.BusinessException;
import com.test.backend.model.dto.UserQuizSubmitDTO;
import com.test.backend.model.entity.QuestionAnswer;
import com.test.backend.model.entity.QuestionBody;
import com.test.backend.model.vo.QuestionVO;
import com.test.backend.model.vo.UserQuizSubmitVO;
import com.test.backend.service.QuestionAnswerService;
import com.test.backend.service.QuestionBodyService;
import com.test.backend.utils.RedisUtils;
import lombok.extern.slf4j.Slf4j;
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


    @GetMapping("quizByType")
    public BaseResponse<List<QuestionVO>> getQuestionByType(@RequestParam String category)
    {
        String quizCategory = RedisKeysConstant.QUIZ_CATEGORY + category;
        List<QuestionVO> questionVOList = (List<QuestionVO>) redisUtils.get(quizCategory);
        if (questionVOList != null && !questionVOList.isEmpty())
        {
            return ResultUtils.success(questionVOList);
        }
        LambdaQueryWrapper<QuestionBody> questionBodyLambdaQueryWrapper = new LambdaQueryWrapper<>();
        questionBodyLambdaQueryWrapper.eq(QuestionBody::getQuestionCategory, category)
                .eq(QuestionBody::getIsDelete, 0);
        List<QuestionBody> questionBodyList = questionBodyService.list(questionBodyLambdaQueryWrapper);
        if (questionBodyList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Quiz is not found");
        }
        List<Long> questionIdList = questionBodyList.stream()
                .map(QuestionBody::getId)
                .collect(Collectors.toList());
        LambdaQueryWrapper<QuestionAnswer> questionAnswerLambdaQueryWrapper = new LambdaQueryWrapper<>();
        questionAnswerLambdaQueryWrapper.in(QuestionAnswer::getQuestionId, questionIdList)
                .eq(QuestionAnswer::getIsDelete, 0);
        List<QuestionAnswer> questionAnswerList = questionAnswerService.list(questionAnswerLambdaQueryWrapper);
        if (questionAnswerList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Quiz answer is not Found");
        }
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
        redisUtils.set(quizCategory, questionVOList, 36000);
        return ResultUtils.success(questionVOList);
    }

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
}
