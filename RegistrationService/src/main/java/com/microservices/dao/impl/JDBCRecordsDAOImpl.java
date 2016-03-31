package com.microservices.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.microservices.StudentRecord;
import com.microservices.dao.JDBCRecordDAO;

public class JDBCRecordsDAOImpl implements JDBCRecordDAO {
	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public StudentRecord insert(StudentRecord record) {

		List<StudentRecord> records = getAllRecordByUniAndCid(record.getUni(), record.getCid());
		if (records.size() == 0) {
			String sql = "INSERT INTO records " + "(uni, cid) VALUES (?, ?)";

			jdbcTemplate = new JdbcTemplate(dataSource);

			jdbcTemplate.update(sql, new Object[] { record.getUni(), record.getCid() });
			return record;
		} else {
			return null;
		}
	}

	public List<StudentRecord> getAllRecordByUniAndCid(String uni, String cid) {
		// TODO Auto-generated method stub

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT * FROM records where uni=? and cid=?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { uni, cid });
		return getRecords(rows);
	}

	public List<StudentRecord> getAllRecordsByUni(String uni) {
		// TODO Auto-generated method stub

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT * FROM records where uni=?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { uni });
		return getRecords(rows);
	}

	public List<StudentRecord> getAllStudentsByCid(String cid) {

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT * FROM records where cid=?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { cid });
		return getRecords(rows);
	}

	public String addColumn(String colName) {
		List<String> columns = getColumnNames();
		if (!columns.contains(colName)) {
			String sql = "alter table records add " + colName + " varchar( 10 );";
			jdbcTemplate = new JdbcTemplate(dataSource);
			jdbcTemplate.execute(sql);
			return getColumnNames().toString();
		}
		return "Column exists";
	}

	public String deleteColumn(String colName) {
		List<String> columns = getColumnNames();
		if (columns.contains(colName)) {
			String sql = "alter table records drop column " + colName+";";
			jdbcTemplate = new JdbcTemplate(dataSource);
			jdbcTemplate.execute(sql);
			return getColumnNames().toString();
		}
		return "Column doesn't exist";
	}

	public List<StudentRecord> getLatestUpdates(int num) {
		// TODO Auto-generated method stub
		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT * FROM records order by update_id desc limit ?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { num });
		return getRecords(rows);
	}

	public void delete(StudentRecord record) {
		// TODO Auto-generated method stub
		String sql = "DELETE from records WHERE uni = \"" + record.getUni() + "\" and cid = \"" + record.getCid()
				+ "\"";
		jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.execute(sql);
		return;
	}

	public void deleteRecordsByUni(String uni) {
		// TODO Auto-generated method stub
		String sql = "DELETE from records WHERE uni = \"" + uni + "\"";
		jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.execute(sql);
		return;
	}

	public void deleteRecordsByCid(String cid) {
		// TODO Auto-generated method stub
		String sql = "DELETE from records WHERE cid = \"" + cid + "\"";
		jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.execute(sql);
		return;
	}

	public String findCourseByUNI(String uni) {

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT cid FROM records WHERE uni = ?";
		String name = (String) jdbcTemplate.queryForObject(sql, new Object[] { uni }, String.class);
		return name;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public StudentRecord findByUNI(String uni) {

		String sql = "SELECT * FROM records WHERE uni = ?";

		jdbcTemplate = new JdbcTemplate(dataSource);
		StudentRecord record = (StudentRecord) jdbcTemplate.queryForObject(sql, new Object[] { uni },
				new BeanPropertyRowMapper(StudentRecord.class));
		return record;
	}

	public List<StudentRecord> findAll() {

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "SELECT * FROM records";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		return getRecords(rows);
	}

	public void insertBatchSQL(final String sql) {
		jdbcTemplate.batchUpdate(new String[] { sql });
	}

	public List<String> getColumnNames() {
		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "select column_name from information_schema.columns where table_name='records'";
		List<String> rows = jdbcTemplate.queryForList(sql, String.class);
		return rows;
	}

	public void insertBatch1(final List<StudentRecord> records) {

		jdbcTemplate = new JdbcTemplate(dataSource);
		String sql = "INSERT INTO records " + "(uni, cid) VALUES (?, ?)";

		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			public void setValues(PreparedStatement ps, int i) throws SQLException {
				StudentRecord record = records.get(i);
				ps.setString(1, record.getUni());
				ps.setString(2, record.getCid());
			}

			public int getBatchSize() {
				return records.size();
			}
		});
	}

	public void insertBatch2(final String sql) {
		jdbcTemplate = new JdbcTemplate(dataSource);
		jdbcTemplate.batchUpdate(new String[] { sql });
	}

	private List<StudentRecord> getRecords(List<Map<String, Object>> rows) {

		List<StudentRecord> records = new ArrayList<StudentRecord>();
		for (Map<String, Object> row : rows) {
			StudentRecord record = new StudentRecord();
			record.setId(Integer.parseInt(String.valueOf(row.get("update_id"))));
			record.setUni((String) row.get("uni"));
			record.setCid(String.valueOf(row.get("cid")));
			if (row.keySet().size() > 3) {
				for (String key : row.keySet()) {
					if (!key.equals("uni") && !key.equals("cid") && !key.equals("update_id")) {
						record.putInfo(key, String.valueOf(row.get(key)));
					}
				}
			}
			records.add(record);
		}
		return records;
	}

}
