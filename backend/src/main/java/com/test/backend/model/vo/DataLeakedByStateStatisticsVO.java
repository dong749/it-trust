package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLeakedByStateStatisticsVO
{
    private Integer max;
    private Integer min;
    private Integer sum;
    private Double average;
}
