package com.microservices.service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.StudentRecord;
import com.microservices.dao.JDBCRecordDAO;
import com.microservices.messaging.PublishChannel;

@RequestMapping("/registration")
@RestController
public class RegistrationController {

	private static final String template = "Hello, %s!";
	private static final String template1 = "Hello, Mr. %s!";
	private final AtomicLong counter = new AtomicLong();
	private final ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
	JDBCRecordDAO jdbcRecordDAO = (JDBCRecordDAO) context.getBean("jdbcRecordDAO");

	@RequestMapping("/student/test")
	public String test(@RequestParam(value = "name", defaultValue = "World") String name) {
		return name;
	}

	@RequestMapping("/all")
	public String getAll() {
		return convertListToString(jdbcRecordDAO.findAll());
	}
	
	@RequestMapping("/allTest")
	public String getAll1() {
		return convertListToString(jdbcRecordDAO.findAll());
	}

	// @RequestMapping(value = "/registration/", method = RequestMethod.POST,
	// produces = MediaType.APPLICATION_JSON_VALUE, consumes =
	// MediaType.APPLICATION_JSON_VALUE)

	@RequestMapping(value = "/", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String newRecord(@RequestBody String jsonStr) {
		JSONParser parser = new JSONParser();
		JSONObject json;
		String uni = null;
		String cid = null;
		try {
			json = (JSONObject) parser.parse(jsonStr);
			uni = (String) json.get("uni");
			cid = (String) json.get("cid");

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (uni != null && cid != null) {

			StudentRecord record = new StudentRecord(1, uni, cid);
			record = jdbcRecordDAO.insert(record);
			if (record != null) {
				JSONArray array = new JSONArray();
				array.add(record.toJson());
				PublishChannel.writeToQueue("add", array);
				return record.toJson().toJSONString();
			} else {
				return "Record Exists!";
			}

		}
		return "Insufficent data";
	}

	@RequestMapping(value = "/student/{uni}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String getRecordsByUni(@PathVariable(value = "uni") String uni) {
		List<StudentRecord> toReturn = jdbcRecordDAO.getAllRecordsByUni(uni);
		if (toReturn.size() > 0) {
			JSONArray array = new JSONArray();
			for (StudentRecord r : toReturn) {
				array.add(r.toJson());
			}
			return array.toJSONString();
		}
		return "No records exist";
	}

	// @RequestMapping(value = "/registration/course/{cid}", method =
	// RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)

	@RequestMapping(value = "/course/{cid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String getStudentsByCid(@PathVariable(value = "cid") String cid) {
		List<StudentRecord> toReturn = jdbcRecordDAO.getAllStudentsByCid(cid);
		if (toReturn.size() > 0) {
			JSONArray array = new JSONArray();
			for (StudentRecord r : toReturn) {
				array.add(r.toJson());
			}
			return array.toJSONString();
		}
		return "No records exist";
	}

	@RequestMapping(value = "/column/{colName}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public String addColumn(@PathVariable(value = "colName") String colName) {
		return jdbcRecordDAO.addColumn(colName);
	}
	
	@RequestMapping(value = "/columns", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String getColumns() {
		return jdbcRecordDAO.getColumnNames().toString();
	}
	
	@RequestMapping(value = "/column/{colName}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteColumn(@PathVariable(value = "colName") String colName) {
		return jdbcRecordDAO.deleteColumn(colName);
	}

	
	@RequestMapping("/GetLatestUpdates")
	public String getLatestRecords(@RequestParam(value = "number", defaultValue = "10") int num) {
		return convertListToString(jdbcRecordDAO.getLatestUpdates(num));
	}
	// @RequestMapping(value = "/registration/delete/", method =
	// RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes
	// = MediaType.APPLICATION_JSON_VALUE)

	@RequestMapping(value = "/", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteRecord(@RequestBody String jsonStr) {
		JSONParser parser = new JSONParser();
		JSONObject json;
		String uni = null;
		String cid = null;
		try {
			// System.out.println(jsonStr);
			json = (JSONObject) parser.parse(jsonStr);
			uni = (String) json.get("uni");
			cid = (String) json.get("cid");

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (uni != null && cid != null) {

			StudentRecord record = new StudentRecord(1, uni, cid);
			jdbcRecordDAO.delete(record);
			JSONArray array = new JSONArray();
			array.add(record.toJson());
			PublishChannel.writeToQueue("delete", array);
			return "Deleted -> " + array.toJSONString();
		}
		return "Insufficient Data";
	}
	
	@RequestMapping(value = "/{uni}/{cid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String getRecord(@PathVariable(value = "uni") String uni, @PathVariable(value = "cid") String cid) {
		if (uni != null && cid != null) {
			List<StudentRecord> records = jdbcRecordDAO.getAllRecordByUniAndCid(uni, cid);
			if (records.size()==0){
				return "No records exist";
			}
			JSONArray array = new JSONArray();
			for(StudentRecord record : records){
				array.add(record.toJson());
			}
			return array.toJSONString();
		}
		return "Insufficient Data";
	}

	@RequestMapping(value = "/{uni}/{cid}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteRecord2(@PathVariable(value = "uni") String uni, @PathVariable(value = "cid") String cid) {
		if (uni != null && cid != null) {
			List<StudentRecord> records = jdbcRecordDAO.getAllRecordByUniAndCid(uni, cid);
			if (records.size()==0){
				return "No records exist";
			}
			StudentRecord record = new StudentRecord(1, uni, cid);
			jdbcRecordDAO.delete(record);
			JSONArray array = new JSONArray();
			array.add(record.toJson());
			PublishChannel.writeToQueue("delete", array);
			return "Deleted -> " + array.toJSONString();
		}
		return "Insufficient Data";
	}

	// @RequestMapping(value = "/registration/student/{uni}/delete", method =
	// RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)

	@RequestMapping(value = "/student/{uni}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteRecordByUni(@PathVariable(value = "uni") String uni) {
		List<StudentRecord> records = jdbcRecordDAO.getAllRecordsByUni(uni);
		if (records.size() > 0) {
			jdbcRecordDAO.deleteRecordsByUni(uni);
			JSONArray array = new JSONArray();
			for (StudentRecord sr : records) {
				array.add(sr.toJson());
			}
			PublishChannel.writeToQueue("delete", array);
			return "Deleted-> " + array.toJSONString();
		}
		return "No records exist";
	}
	// @RequestMapping(value = "/registration/course/{cid}/delete", method =
	// RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)

	@RequestMapping(value = "/course/{cid}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteRecordByCid(@PathVariable(value = "cid") String cid) {
		List<StudentRecord> records = jdbcRecordDAO.getAllStudentsByCid(cid);
		if (records.size() > 0) {
			jdbcRecordDAO.deleteRecordsByCid(cid);
			JSONArray array = new JSONArray();
			for (StudentRecord sr : records) {
				array.add(sr.toJson());
			}
			PublishChannel.writeToQueue("delete", array);
			return "Deleted-> " + array.toJSONString();
		}
		return "No records exist";
	}
	
	private String convertListToString(List<StudentRecord> records){
		if (records.size() > 0) {
			JSONArray array = new JSONArray();
			for (StudentRecord sr : records) {
				array.add(sr.toJson());
			}
			return array.toJSONString();
		}
		return "No records exist";
	}
}