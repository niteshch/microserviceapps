package com.microservices;

import java.util.HashMap;

import org.json.simple.JSONObject;

public class StudentRecord {
	
	private Integer id;
	
	private String uni;
	
	private String cid;
	
	private HashMap<String, String> otherInfo;

	public StudentRecord(){
		otherInfo = new HashMap<String, String>();
	}
	
	public StudentRecord(Integer id, String name, String cid) {
		this.id = id;
		this.uni = name;
		this.cid = cid;
		otherInfo = new HashMap<String, String>();
	}

	public void putInfo(String key, String value){
		otherInfo.put(key, value);
	}
	
	public HashMap<?,?> getInfo(){
		return otherInfo;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}



	public String getUni() {
		return uni;
	}

	public void setUni(String uni) {
		this.uni = uni;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	@Override
	public String toString() {
		return "StudentRecord [id=" + id + ", uni=" + uni + ", course=" + cid
				+ "]";
	}
	
	public JSONObject toJson(){
		JSONObject obj = new JSONObject();
		obj.put("uni", uni);
		obj.put("course", cid);
		for(String key : otherInfo.keySet()){
			obj.put(key, otherInfo.get(key));
		}
		return obj;
	}
	
}
