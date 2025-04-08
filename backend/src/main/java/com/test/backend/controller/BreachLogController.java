package com.test.backend.controller;


import com.test.backend.common.BaseResponse;
import com.test.backend.common.ResultUtils;
import com.test.backend.model.vo.BreachLogVO;
import com.test.backend.service.BreachLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("breachlog")
@Slf4j
public class BreachLogController
{
    @Resource
    private BreachLogService breachLogService;

    @GetMapping("group")
    public BaseResponse<List<BreachLogVO>> getBreachCountByGroup()
    {
        List<BreachLogVO> breachLogVOS = breachLogService.calculateByIsBreached();
        return ResultUtils.success(breachLogVOS);
    }
}
