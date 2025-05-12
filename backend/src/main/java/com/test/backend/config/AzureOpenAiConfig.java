package com.test.backend.config;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.core.credential.AzureKeyCredential;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "azure.openai")
@Data
public class AzureOpenAiConfig
{
    private String endPoint;
    private String apiKey;
    private String deploymentName;

    @Bean
    public OpenAIClient getOpenAiClient()
    {
        OpenAIClient openAIClient = new OpenAIClientBuilder()
                .credential(new AzureKeyCredential(apiKey))
                .endpoint(endPoint)
                .buildClient();
        return openAIClient;
    }
}
