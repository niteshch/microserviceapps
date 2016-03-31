package com.microservices.messaging;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.microservices.dao.JDBCRecordDAO;

public class HandleMessages {

	private final ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
	JDBCRecordDAO jdbcRecordDAO = (JDBCRecordDAO) context.getBean("jdbcRecordDAO");

	public void printAppend(String message){
		JSONParser parser = new JSONParser();
		JSONObject json;
		String operation = null;
		JSONArray information = null;
		try {
			// System.out.println(jsonStr);
			json = (JSONObject) parser.parse(message);
			operation = (String) json.get("operation");
			information = (JSONArray) json.get("result");

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (operation.equals("delete") && information != null) {
			System.out.println(operation);
			for(int i=0;i<information.size();i++){
				JSONObject obj = (JSONObject) information.get(i);
				String uni = (String) obj.get("uni");
				String course = (String) obj.get("course");
				if (uni!=null && course==null){
					jdbcRecordDAO.deleteRecordsByUni(uni);
				} else if (uni == null && course!=null){
					jdbcRecordDAO.deleteRecordsByCid(course);
				} else{
					System.out.println("No action taken for the message -> "+message);
				}
			}
		}
	}
}
