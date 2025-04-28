package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserQuizSubmitVO
{
    private Long id;
    private Boolean isCorrect;
    private String rightAnswer;
    private String explanation;
}
