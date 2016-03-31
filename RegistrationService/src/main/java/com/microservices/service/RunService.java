package com.microservices.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.microservices.messaging.ReceiveMessages;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Consumer;

@SpringBootApplication
public class RunService {

	public static void main(String[] args) {

		Channel studentChannel = null;
		Channel courseChannel = null;
		Consumer studentConsumer = null;
		Consumer courseConsumer = null;
		try {
			studentChannel = ReceiveMessages.getChannel("student", "");
			System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			studentConsumer = ReceiveMessages.getConsumer(studentChannel);
			studentChannel.basicConsume("", true, studentConsumer);
			
			
			courseChannel = ReceiveMessages.getChannel("course", "");
			System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			courseConsumer = ReceiveMessages.getConsumer(courseChannel);
			courseChannel.basicConsume("", true, courseConsumer);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		SpringApplication.run(RunService.class, args);
	}
}
