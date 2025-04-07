package com.test.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "mailboxlayer")
public class MailBoxConfig
{
    private String accessKey;
    private String apiUrl;
}
