package com.microservices.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import com.microservices.StudentRecord;
import com.microservices.dao.RecordDAO;


public class RecordDAOImpl implements RecordDAO
{
	private DataSource dataSource;
 
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
 
	public void insert(StudentRecord record){
 
		String sql = "INSERT INTO employee " +
				"(update_id, uni, cid) VALUES (?, ?, ?)";
		Connection conn = null;
 
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setLong(1, record.getId());
			ps.setString(2, record.getUni());
			ps.setString(3, record.getCid());
			ps.executeUpdate();
			ps.close();
 
		} catch (SQLException e) {
			throw new RuntimeException(e);
 
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}
	}
 
	public StudentRecord findById(String uni){
 
		String sql = "SELECT * FROM records WHERE uni = ?";
 
		Connection conn = null;
 
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, uni);
			StudentRecord record = null;
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				record = new StudentRecord(
					rs.getInt("ID"),
					rs.getString("uni"), 
					rs.getString("cid")
				);
			}
			rs.close();
			ps.close();
			return record;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	}

}