package com.test.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "hibp")
public class HIBPConfig
{
    private String apiKey;
    private String userAgent;
    private String apiUrl;
}
