package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AiAnalysisResultVO
{
    private String aiResponse;
    private String questionCategory;
    private Date finishedTime;
}
