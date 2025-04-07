package com.test.backend.controller;

import com.test.backend.common.BaseResponse;
import com.test.backend.common.ResultUtils;
import com.test.backend.model.dto.HIBPBreachDTO;
import com.test.backend.service.DetectDataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/detect")
@Slf4j
public class DetectDataBreachController
{
    @Resource
    private DetectDataService detectDataService;

    @GetMapping("/hello")
    public String hello()
    {
        return "Hello World";
    }

    @GetMapping
    public BaseResponse<List<HIBPBreachDTO>> detectBreach(@RequestParam String email)
    {
        List<HIBPBreachDTO> result = detectDataService.detect(email);
        return ResultUtils.success(result);
    }
}
