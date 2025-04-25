package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionVO
{
    private Long questionId;
    private String questionDetails;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
}
