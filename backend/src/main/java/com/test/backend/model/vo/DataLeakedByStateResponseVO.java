package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLeakedByStateResponseVO
{
    private List<DataLeakedByStateVO> dataLeakedByStates;
    private DataLeakedByStateStatisticsVO dataLeakedByStateStatistics;
}
