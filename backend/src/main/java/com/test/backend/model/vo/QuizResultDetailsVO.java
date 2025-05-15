package com.test.backend.model.vo;

import lombok.Data;

@Data
public class QuizResultDetailsVO
{
    private String questionContent;
    private String correctAnswer;
    private String userAnswer;
    private Boolean isCorrect;
    private String explanation;
}
