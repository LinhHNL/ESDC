const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'warehouse',
  waitForConnections: true

});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    // console.error('Kết nối thành công');

    return connection;
  } catch (error) {
    console.error('Lỗi lấy kết nối:', error);
    throw error; 
  }
}

module.exports = {
  pool,
  getConnection
};