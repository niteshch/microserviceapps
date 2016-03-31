package com.microservices.dao;

import java.util.List;

import com.microservices.StudentRecord;

public interface JDBCRecordDAO {

	public StudentRecord insert(StudentRecord record);
	public List<StudentRecord> getAllRecordsByUni(String uni);
	public List<StudentRecord> getAllStudentsByCid(String cid);
	public List<StudentRecord> getAllRecordByUniAndCid(String uni, String cid);
	public String addColumn(String colName);
	public String deleteColumn(String colName);
	public List<String> getColumnNames();
	public List<StudentRecord> getLatestUpdates(int num);
	public void delete(StudentRecord record);
	public void deleteRecordsByUni(String uni);
	public void deleteRecordsByCid(String cid);
	
	public StudentRecord findByUNI(String uni);
	public List<StudentRecord> findAll();
	public String findCourseByUNI(String uni);
	public void insertBatch1(final List<StudentRecord> records);
	public void insertBatch2(final String sql);
	
}
