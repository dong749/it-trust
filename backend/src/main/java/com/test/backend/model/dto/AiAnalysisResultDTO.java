package com.test.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AiAnalysisResultDTO implements Serializable
{
    private String conversationId;
    private String message;
    private String questionCategory;
    private static final long serialVersionUID = 1L;
}
