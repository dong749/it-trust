package com.test.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.backend.common.BaseResponse;
import com.test.backend.common.ErrorCode;
import com.test.backend.common.ResultUtils;
import com.test.backend.exception.BusinessException;
import com.test.backend.model.dto.UserQuizSubmitDTO;
import com.test.backend.model.entity.QuestionAnswer;
import com.test.backend.model.entity.QuestionBody;
import com.test.backend.model.vo.QuestionVO;
import com.test.backend.model.vo.UserQuizSubmitVO;
import com.test.backend.service.QuestionAnswerService;
import com.test.backend.service.QuestionBodyService;
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

    @GetMapping
    public BaseResponse<List<QuestionBody>> testMethod()
    {
        List<QuestionBody> list = questionBodyService.list();
        QuestionBody questionBody = list.get(0);
        String[] split = questionBody.getQuestionDetails().split("\\\\");
        for (int i = 0; i < split.length; i++)
        {
            System.out.println(split[i]);
        }
        return ResultUtils.success(list);
    }

    @GetMapping("quizByType")
    public BaseResponse<List<QuestionVO>> getQuestionByType(@RequestParam String category)
    {
        LambdaQueryWrapper<QuestionBody> questionBodyWrapper = new LambdaQueryWrapper<>();
        questionBodyWrapper.eq(QuestionBody::getQuestionCategory, category)
                .eq(QuestionBody::getIsDelete, 0);
        List<QuestionBody> questionBodyList = questionBodyService.list(questionBodyWrapper);
        if (questionBodyList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Quiz is Not Found");
        }
        List<Long> questionIds = questionBodyList.stream()
                .map(QuestionBody::getId)
                .collect(Collectors.toList());
        LambdaQueryWrapper<QuestionAnswer> questionAnswerWrapper = new LambdaQueryWrapper<>();
        questionAnswerWrapper.in(QuestionAnswer::getQuestionId, questionIds)
                .eq(QuestionAnswer::getIsDelete, 0);
        List<QuestionAnswer> questionAnswerList = questionAnswerService.list(questionAnswerWrapper);
        if (questionAnswerList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Answer is Not Found");
        }
        Map<Long, QuestionAnswer> questionAnswerMap = questionAnswerList.stream()
                .collect(Collectors.toMap(QuestionAnswer::getQuestionId, a -> a));
        List<QuestionVO> questionVOList = new ArrayList<>();
        for (QuestionBody questionBody : questionBodyList)
        {
            Long questionId = questionBody.getId();
            QuestionAnswer questionAnswer = questionAnswerMap.get(questionId);
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
        return ResultUtils.success(questionVOList);
    }

    @PostMapping("/judge")
    public BaseResponse<UserQuizSubmitVO> judgeQuiz(@RequestBody UserQuizSubmitDTO userQuizSubmitDTO)
    {
        if (userQuizSubmitDTO == null)
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "User submission is null");
        }
        Long questionId = userQuizSubmitDTO.getQuestionId();
        String userSelectedOption = userQuizSubmitDTO.getUserSelectedOption();
        QuestionAnswer questionAnswer = questionAnswerService.getById(questionId);
        String correctAnswer = questionAnswer.getCorrectAnswer();
        UserQuizSubmitVO userQuizSubmitVO = new UserQuizSubmitVO();
        userQuizSubmitVO.setIsCorrect(userSelectedOption.equalsIgnoreCase(correctAnswer));
        userQuizSubmitVO.setExplanation(questionAnswer.getExplanation());
        userQuizSubmitVO.setRightAnswer(correctAnswer);
        return ResultUtils.success(userQuizSubmitVO);
    }
}
