package com.test.backend.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class MQInitialization
{
    public static void main(String[] args)
    {
        try{
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost("170.64.224.240");
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            String EXCHANGE_NAME = MQConstant.EXCHANGE_NAME;
            channel.exchangeDeclare(EXCHANGE_NAME, "direct");

            String queueName = MQConstant.MQ_QUEUE;
            channel.queueDeclare(queueName, true, false, false, null);
            channel.queueBind(queueName, EXCHANGE_NAME, MQConstant.ROUTING_KEY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
