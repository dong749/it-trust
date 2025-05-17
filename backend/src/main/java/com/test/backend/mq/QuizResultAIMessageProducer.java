package com.test.backend.mq;

import com.test.backend.model.dto.AiAnalysisResultDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
@Slf4j
public class QuizResultAIMessageProducer
{
    @Resource
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(String message, String conversationId, String questionCategory)
    {
        AiAnalysisResultDTO aiAnalysisResultDTO = new AiAnalysisResultDTO();
        aiAnalysisResultDTO.setMessage(message);
        aiAnalysisResultDTO.setConversationId(conversationId);
        aiAnalysisResultDTO.setQuestionCategory(questionCategory);
        rabbitTemplate.convertAndSend(MQConstant.EXCHANGE_NAME, MQConstant.ROUTING_KEY, aiAnalysisResultDTO);
    }
}
