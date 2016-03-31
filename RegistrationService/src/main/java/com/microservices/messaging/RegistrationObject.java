package com.microservices.messaging;

public class RegistrationObject {

	private static final String type= "registration";
	private String operation;
	private String cid;
	private String uni;
	
	public RegistrationObject(String operation, String cid, String uni) {
		super();
		this.operation = operation;
		this.cid = cid;
		this.uni = uni;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getUni() {
		return uni;
	}

	public void setUni(String uni) {
		this.uni = uni;
	}

	public static String getType() {
		return type;
	}
	
	
	
}
