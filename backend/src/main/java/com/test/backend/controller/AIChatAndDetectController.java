package com.test.backend.controller;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.backend.common.BaseResponse;
import com.test.backend.common.ErrorCode;
import com.test.backend.common.ResultUtils;
import com.test.backend.constant.CommonConstant;
import com.test.backend.constant.RedisKeysConstant;
import com.test.backend.exception.BusinessException;
import com.test.backend.manager.RedissonLimiterManager;
import com.test.backend.utils.RedisUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/ai")
public class AIChatAndDetectController
{
    @Resource
    private OpenAIClient openAIClient;

    @Resource
    private RedisUtils redisUtils;

    @Resource
    private RedissonLimiterManager redissonLimiterManager;


    @GetMapping("/chatbot")
    public BaseResponse<String> chatBotResponse(@RequestParam String userInput,
                                                @CookieValue(value = "conversationId", required = false) String conversationId,
                                                HttpServletRequest request,
                                                HttpServletResponse response)
    {
        if (StringUtils.isEmpty(userInput))
        {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "Required parameter 'userInput' is empty");
        }

        // 如果没有 Cookie，则设置；否则跳过设置
        if (StringUtils.isEmpty(conversationId))
        {
            conversationId = UUID.randomUUID().toString();
            boolean alreadyExists = false;

            if (request.getCookies() != null)
            {
                for (Cookie c : request.getCookies())
                {
                    if ("conversationId".equals(c.getName()))
                    {
                        alreadyExists = true;
                        break;
                    }
                }
            }

            if (!alreadyExists)
            {
                Cookie cookie = new Cookie("conversationId", conversationId);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setMaxAge(3600); // 1小时
                response.addCookie(cookie);
            }
        }

        // Limit user access
        redissonLimiterManager.limitation("chatRate_" + conversationId);

        // Get chat history with certain conversation id from redis
        String chatConversationId = RedisKeysConstant.CHAT_CONVERSATION + conversationId;
        List<Object> chatHistory = redisUtils.lrange(chatConversationId, 0, -1);
        ObjectMapper objectMapper = new ObjectMapper();
        List<ChatRequestMessage> chatMessages = new ArrayList<>();

        try {
            // if chat history is empty, which means the user do not have any chat with chatbot
            // in this situation we should set system presetting.
            if (CollectionUtils.isEmpty(chatHistory))
            {
                String systemPresetting = CommonConstant.CHATBOT_AI_PROMPT;
                chatMessages.add(new ChatRequestSystemMessage(systemPresetting));
                Map<String, String> systemSetting = new HashMap<>();
                systemSetting.put("role", "system");
                systemSetting.put("content", systemPresetting);
                redisUtils.rightPush(chatConversationId, objectMapper.writeValueAsString(systemSetting));
            }
            // if chat history is not empty, we should add content into redis,according chat conversation id
            // and chat role.
            else {
                // Deserialize the data in Redis and build the history of ChatMessages
                for (Object object : chatHistory)
                {
                    Map<String, String> historyToString = objectMapper.readValue(object.toString(), Map.class);
                    String role = historyToString.get("role");
                    String content = historyToString.get("content");

                    // Empty validation
                    if (StringUtils.isEmpty(role) || StringUtils.isEmpty(content))
                    {
                        continue;
                    }

                    switch (role) {
                        case "user":
                            chatMessages.add(new ChatRequestUserMessage(content));
                            break;
                        case "assistant":
                            chatMessages.add(new ChatRequestAssistantMessage(content));
                            break;
                        case "system":
                            chatMessages.add(new ChatRequestSystemMessage(content));
                            break;
                        default:
                            break;
                    }
                }
            }

            // build user chat message
            chatMessages.add(new ChatRequestUserMessage(userInput));
            // Serialize the user's input and store it in the corresponding session history
            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", userInput);
            redisUtils.rightPush(chatConversationId, objectMapper.writeValueAsString(userMessage));

            // AI model invoke
            ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
            chatCompletionsOptions.setMaxTokens(4096);
            chatCompletionsOptions.setTemperature(1d);
            chatCompletionsOptions.setTopP(1d);
            chatCompletionsOptions.setN(1);
            ChatCompletions chatCompletions = openAIClient.getChatCompletions("gpt-4o-mini-2"
                    , chatCompletionsOptions);
            // Get AI response
            List<ChatChoice> choices = chatCompletions.getChoices();
            if (CollectionUtils.isEmpty(choices))
            {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "System error");
            }
            String reply = choices.get(0).getMessage().getContent();
            if (StringUtils.isEmpty(reply))
            {
                throw new BusinessException(ErrorCode.OPERATION_ERROR, "AI Response Failed");
            }
            // Serialize the AI response and store it in the corresponding session history
            Map<String, String> aiResponse = new HashMap<>();
            aiResponse.put("role", "assistant");
            aiResponse.put("content", reply);
            redisUtils.rightPush(chatConversationId, objectMapper.writeValueAsString(aiResponse));

            redisUtils.expire(chatConversationId, 3600);
            return ResultUtils.success(reply);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "Request failed: " + e.getMessage());
        }
    }
}
