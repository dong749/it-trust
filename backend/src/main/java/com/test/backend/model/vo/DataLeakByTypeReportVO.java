package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLeakByTypeReportVO
{
    private String type;
    private Integer count;
    private Double percentage;
}
