package com.microservices;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

@SuppressWarnings("rawtypes")
public class RecordRowMapper implements RowMapper	{
		public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
			StudentRecord record = new StudentRecord();
			record.setId(rs.getInt("update_id"));
			record.setUni(rs.getString("uni"));
			record.setCid(rs.getString("cid"));
			return record;
		}
}
