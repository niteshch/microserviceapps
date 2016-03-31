package com.microservices.dao;

import com.microservices.StudentRecord;


public interface RecordDAO {
		public void insert(StudentRecord record);
		public StudentRecord findById(String uni);
}
