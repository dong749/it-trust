package com.test.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.test.backend.common.BaseResponse;
import com.test.backend.common.ErrorCode;
import com.test.backend.common.ResultUtils;
import com.test.backend.exception.BusinessException;
import com.test.backend.model.dto.DataLeakedByStateDTO;
import com.test.backend.model.entity.DataLeakTypeReport;
import com.test.backend.model.entity.DataLeakedByState;
import com.test.backend.model.vo.DataLeakByTypeReportVO;
import com.test.backend.model.vo.DataLeakedByStateResponseVO;
import com.test.backend.model.vo.DataLeakedByStateStatisticsVO;
import com.test.backend.model.vo.DataLeakedByStateVO;
import com.test.backend.service.DataLeakTypeReportService;
import com.test.backend.service.DataLeakedByStateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("statistics")
@Slf4j
public class DataVisualizationController
{
    @Resource
    private DataLeakedByStateService dataLeakedByStateService;

    @Resource
    private DataLeakTypeReportService dataLeakTypeReportService;


    @PostMapping("leaked")
    public BaseResponse<DataLeakedByStateResponseVO> searchDataWithDataLeaked(@RequestBody DataLeakedByStateDTO
                                                                                        dataLeakedByStateDTO)
    {
        if (dataLeakedByStateDTO == null)
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Request Error");
        }
        String state = dataLeakedByStateDTO.getState();
        String leakType = dataLeakedByStateDTO.getLeakType();
        if (state.isEmpty() || leakType.isEmpty())
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Request Error");
        }
        QueryWrapper<DataLeakedByState> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("state", state);
        queryWrapper.eq("leakType", leakType);
        List<DataLeakedByState> dataLeakedByStateList = dataLeakedByStateService.list(queryWrapper);
        if (dataLeakedByStateList == null || dataLeakedByStateList.isEmpty())
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Data Leaked By State Not Found");
        }
        List<DataLeakedByStateVO> dataLeakedByStateVOList = new ArrayList<>();
        for (DataLeakedByState dataLeakedByState : dataLeakedByStateList)
        {
            DataLeakedByStateVO vo = new DataLeakedByStateVO();
            vo.setState(dataLeakedByState.getState());
            vo.setLeaktype(dataLeakedByState.getLeaktype());
            vo.setReports(dataLeakedByState.getReports());
            vo.setYear(dataLeakedByState.getYear());
            dataLeakedByStateVOList.add(vo);
        }
        DataLeakedByStateStatisticsVO dataLeakedByStateStatisticsVO = new DataLeakedByStateStatisticsVO();
        List<Integer> reports = dataLeakedByStateVOList.stream()
                .map(DataLeakedByStateVO::getReports)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        int max = reports.stream().max(Integer::compareTo).orElse(0);
        int min = reports.stream().min(Integer::compareTo).orElse(0);
        int sum = reports.stream().mapToInt(Integer::intValue).sum();
        double avg = reports.isEmpty() ? 0.0 : (double) sum / reports.size();
        dataLeakedByStateStatisticsVO.setMax(max);
        dataLeakedByStateStatisticsVO.setMin(min);
        dataLeakedByStateStatisticsVO.setSum(sum);
        dataLeakedByStateStatisticsVO.setAverage(avg);
        DataLeakedByStateResponseVO dataLeakedByStateResponseVO = new DataLeakedByStateResponseVO();
        dataLeakedByStateResponseVO.setDataLeakedByStates(dataLeakedByStateVOList);
        dataLeakedByStateResponseVO.setDataLeakedByStateStatistics(dataLeakedByStateStatisticsVO);
        return ResultUtils.success(dataLeakedByStateResponseVO);
    }

    @GetMapping("byType")
    public BaseResponse<List<DataLeakByTypeReportVO>> getPrivacyBreachDistribution(@RequestParam int year)
    {
        if (year < 0)
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Request Error");
        }

        // 查询指定年份的数据
        LambdaQueryWrapper<DataLeakTypeReport> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(DataLeakTypeReport::getYear, year);
        List<DataLeakTypeReport> reportList = dataLeakTypeReportService.list(queryWrapper);

        // 总报告数
        int sum = reportList.stream().mapToInt(DataLeakTypeReport::getReportscount).sum();
        if (sum == 0)
        {
            return ResultUtils.success(new ArrayList<>());
        }

        // 封装结果
        List<DataLeakByTypeReportVO> resultList = new ArrayList<>();
        for (DataLeakTypeReport item : reportList)
        {
            DataLeakByTypeReportVO vo = new DataLeakByTypeReportVO();
            vo.setType(item.getType());
            vo.setCount(item.getReportscount());

            // 计算百分比并保留两位小数
            double percent = (item.getReportscount() * 100.0) / sum;
            vo.setPercentage(Math.round(percent * 100.0) / 100.0); // 保留两位小数

            resultList.add(vo);
        }

        return ResultUtils.success(resultList);
    }


}
