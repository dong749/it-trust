package com.test.backend.mq;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.rabbitmq.client.Channel;
import com.test.backend.common.ErrorCode;
import com.test.backend.constant.CommonConstant;
import com.test.backend.exception.BusinessException;
import com.test.backend.model.dto.AiAnalysisResultDTO;
import com.test.backend.model.entity.AiAnalysisResult;
import com.test.backend.service.AiAnalysisResultService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class QuizResultAIMessageConsumer
{
    @Resource
    private OpenAIClient openAIClient;

    @Resource
    private AiAnalysisResultService aiAnalysisResultService;

    @SneakyThrows
    @RabbitListener(queues = MQConstant.MQ_QUEUE, ackMode = "MANUAL")
    public void receiveMessage(AiAnalysisResultDTO aiAnalysisResultDTO
            , Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag)
    {
        if (ObjectUtils.isEmpty(aiAnalysisResultDTO))
        {
            channel.basicNack(tag, false, false);
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Parameter is empty");
        }

        String conversationId = aiAnalysisResultDTO.getConversationId();
        String message = aiAnalysisResultDTO.getMessage();
        String questionCategory = aiAnalysisResultDTO.getQuestionCategory();

        if (StringUtils.isEmpty(questionCategory) || StringUtils.isEmpty(conversationId)
                || StringUtils.isEmpty(message) || StringUtils.isEmpty(questionCategory))
        {
            channel.basicNack(tag, false, false);
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Parameter is empty");
        }

        List<ChatRequestMessage> chatRequestMessageList = new ArrayList<>();
        ChatRequestMessage chatRequestSystemMessage = new ChatRequestSystemMessage(CommonConstant.QUIZ_FEED_BACK_PROMPT);
        ChatRequestMessage chatRequestUserMessage = new ChatRequestUserMessage(message);
        chatRequestMessageList.add(chatRequestSystemMessage);
        chatRequestMessageList.add(chatRequestUserMessage);
        ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions(chatRequestMessageList);
        chatCompletionsOptions.setMaxTokens(4096);
        chatCompletionsOptions.setTemperature(1d);
        chatCompletionsOptions.setTopP(1d);

        ChatCompletions chatCompletions = openAIClient.getChatCompletions("gpt-4o-mini-2"
                , chatCompletionsOptions);
        List<ChatChoice> choices = chatCompletions.getChoices();
        String reply = choices.get(0).getMessage().getContent();

        if (StringUtils.isEmpty(reply))
        {
            channel.basicNack(tag, false, false);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "AI Response Failed");
        }

        AiAnalysisResult aiAnalysisResult = new AiAnalysisResult();
        aiAnalysisResult.setCookieId(conversationId);
        aiAnalysisResult.setQuestionCategory(questionCategory);
        aiAnalysisResult.setAiAnalysisResult(reply);
        aiAnalysisResult.setIsDelete(0);
        boolean isSaved = aiAnalysisResultService.save(aiAnalysisResult);

        if (!isSaved)
        {
            channel.basicNack(tag, false, false);
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "AI Response Save Error");
        }

        channel.basicAck(tag, false);
    }
}
