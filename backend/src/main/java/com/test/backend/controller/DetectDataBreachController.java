package com.test.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/detect")
@Slf4j
public class DetectDataBreachController
{
    @GetMapping("/hello")
    public String hello()
    {
        return "Hello World";
    }
}
