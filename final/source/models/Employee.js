// models/Employee.js
const db = require('../config/database');
const account = require('./Account');
async function getAllEmployees() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
      SELECT e.*, p.Name AS PositionName
      FROM employee e
      JOIN position p ON e.Position_ID = p.Position_ID
    `);
    return rows;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm lấy thông tin một nhân viên dựa trên ID
async function getEmployeeByEmail(email) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
      SELECT e.*, p.Name AS PositionName
      FROM employee e
      JOIN position p ON e.Position_ID = p.Position_ID
      WHERE e.Email = ?
    `, [email]);
    
    return rows[0]; // Chỉ lấy một nhân viên, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}


// Hàm lấy thông tin một nhân viên dựa trên ID
async function getEmployeeById(employeeId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
      SELECT e.*, p.Name AS PositionName
      FROM employee e
      JOIN position p ON e.Position_ID = p.Position_ID
      WHERE e.Employee_ID = ?
    `, [employeeId]);
    
    return rows[0]; // Chỉ lấy một nhân viên, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm một nhân viên mới
async function addEmployee(employeeData) {
  let connection;
  try {
    connection = await db.getConnection();

  
    const [result] = await connection.execute(
      'INSERT INTO employee (Name, BirthDay, Salary, Status, Position_ID, Email, Image) VALUES (?, ?, ?, ?, ?,  ?,?)',
      [employeeData.Name, employeeData.BirthDay, employeeData.Salary, employeeData.Status, employeeData.Position_ID, employeeData.Email,employeeData.Image]
    );
    console.log(result.insertId);

    return {
      success: result.insertId !== undefined,
      id: result.insertId 
    };
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return false;

  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm cập nhật thông tin một nhân viên dựa trên ID
async function updateEmployee(employeeId, updatedEmployeeData) {
  let connection;
  console.log(updatedEmployeeData);
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE employee SET Name = ?, BirthDay = ?, Salary = ?, Status = ?, Position_ID = ?, Email = ? , Image = ? WHERE Employee_ID = ?',
      [updatedEmployeeData.Name, updatedEmployeeData.BirthDay, updatedEmployeeData.Salary, updatedEmployeeData.Status, updatedEmployeeData.Position_ID, updatedEmployeeData.Email, updatedEmployeeData.Image,employeeId]);
      console.log(result);
      return result.affectedRows > 0; // Trả về true nếu có ít nhất một hàng bị ảnh hưởng
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return false; //
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm xóa một nhân viên dựa trên ID
async function deleteEmployee(employeeId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM employee WHERE Employee_ID = ?', [employeeId]);
    return result.affectedRows > 0; // Trả về true nếu có ít nhất một hàng bị ảnh hưởng
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function updateEmployeeImage(updatedEmployeeImageData,employeeId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `employee` SET `Image` = ? WHERE `Employee_ID` = ?',
      [updatedEmployeeImageData, employeeId]);

    return result.affectedRows > 0; // Trả về true nếu có ít nhất một hàng bị ảnh hưởng
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return false; //
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm cập nhật Status nhân viên dựa trên Employee_ID
async function updateEmployeeStatus(employeeId, updatedEmployeeStatusData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `employee` SET `Status` = ? WHERE `Employee_ID` = ?',
      [updatedEmployeeStatusData.Status, employeeId]);

    return result.affectedRows > 0; // Trả về true nếu có ít nhất một hàng bị ảnh hưởng
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return false; // Tr
  } finally {
    if (connection) {
      connection.release();
    }
  }
  async function searchEmployees(criteria) {
    let connection;
    try {
      connection = await db.getConnection();
  
      // Build the SQL query dynamically based on the provided criteria
      let query = `
        SELECT e.*, p.Name AS PositionName
        FROM employee e
        LEFT JOIN position p ON e.Position_ID = p.Position_ID
        WHERE 1
      `;
  
      if (criteria.name) {
        query += ' AND e.Name LIKE ?';
      }
  
      if (criteria.positionID) {
        query += ' AND e.Position_ID = ?';
      }
  
      // Add additional criteria as needed
  
      const [rows, fields] = await connection.execute(query, [
        criteria.name ? `%${criteria.name}%` : null,
        criteria.positionID ? criteria.positionID : null,
        // Add additional criteria values as needed
      ]);
  
      return rows;
    } catch (error) {
      console.error('Error querying employees:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  updateEmployeeImage,
  updateEmployeeStatus,
  getEmployeeByEmail,

};