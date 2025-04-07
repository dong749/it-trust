package com.test.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HIBPBreachDTO
{
    private String title;         // 展示用名称
    private String domain;        // 来源网站
    private String breachDate;    // 泄露发生时间
    private String description;   // 简介
    private List<String> dataTypes; // 被泄露的数据类型（如 Email、Password）
    private String logoUrl;       // logo 地址
}
