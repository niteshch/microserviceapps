package com.microservices.messaging;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import org.json.simple.JSONObject;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class PublishChannel {

	private static final String EXCHANGE_NAME = "logs";
	private static final String QUEUE_NAME = "registration";
	
	private static Channel channel;
	private static Connection connection;

	private static void init() throws IOException, TimeoutException {
		if (channel == null) {
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			connection = factory.newConnection();
			channel = connection.createChannel();
			channel.queueDeclare(QUEUE_NAME, false, false, false, null);
			channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
		}
	//	return channel;
	}

	public static void writeToQueue(String operation, Object result){
		JSONObject obj = new JSONObject();
		obj.put("operation", operation);
		obj.put("result", result);
		try {
			writeMessage(obj.toJSONString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (TimeoutException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void writeMessage(String msg) throws IOException, TimeoutException{
		if (channel == null){
			init();
		}
		System.out.println("Writing to the queue -> " + msg.getBytes());
		channel.basicPublish(QUEUE_NAME, "", null, msg.getBytes());
	}
	
	public static void closeChannel() throws IOException, TimeoutException {
		channel.close();
		connection.close();
	}
}
