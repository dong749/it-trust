package com.test.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserQuizBatchSubmitDTO
{
    private List<UserQuizSubmitDTO> quizList;
}
