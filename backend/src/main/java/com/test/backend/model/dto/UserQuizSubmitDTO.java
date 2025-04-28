package com.test.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserQuizSubmitDTO
{
    private Long id;
    private Long questionId;
    private String userSelectedOption;
}
