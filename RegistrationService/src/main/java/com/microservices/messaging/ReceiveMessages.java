package com.microservices.messaging;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

public class ReceiveMessages {
	private static Connection connection;
	private static HandleMessages hm;

	private static void init() throws IOException, TimeoutException {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		connection = factory.newConnection();
		hm = new HandleMessages();
	}

	public static Channel getChannel(String exchangeName, String queueName) throws IOException, TimeoutException {
		if (connection == null) {
			init();
		}
		Channel channel = connection.createChannel();
		channel.exchangeDeclare(exchangeName, "fanout");
		channel.queueDeclare(queueName,false,false,false,null);
		channel.queueBind(queueName, exchangeName, "");
		return channel;
	}

	public static Consumer getConsumer(Channel channel) {
		Consumer consumer = new DefaultConsumer(channel) {
			@Override
			public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
					byte[] body) throws IOException {
				String message = new String(body, "UTF-8");
				hm.printAppend(message);
				System.out.println(" [x] Received '" + message + "'");
			}
		};
		return consumer;
	}
}
