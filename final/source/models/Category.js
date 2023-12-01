const db = require('../config/database');

// Hàm lấy tất cả các danh mục
async function getAllCategories() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT c.`Category_ID`, c.`Name` AS CategoryName,c.Description  ,COUNT(p.`Product_ID`) AS ProductCount FROM `category` c LEFT JOIN `product` p ON c.`Category_ID` = p.`Category_ID` GROUP BY c.`Category_ID`, c.`Name`;');
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

// Hàm lấy thông tin một danh mục dựa trên ID
async function getCategoryById(categoryId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Category_ID`, `Name` FROM `category` WHERE `Category_ID` = ?', [categoryId]);
    return rows[0]; // Chỉ lấy một danh mục, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm một danh mục mới
async function addCategory(categoryData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO category (`Name`,`Description`) VALUES (?,?)', [categoryData.Name,categoryData.description]);
    return result.insertId;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function searchEmployees(criteria) {
  let connection;
  try {
    connection = await db.getConnection();

    // Build the SQL query dynamically based on the provided criteria
    let query = 'SELECT * FROM `employee` WHERE 1';

    if (criteria.name) {
      query += ' AND `Name` LIKE ?';
    }

    if (criteria.positionID) {
      query += ' AND `Position_ID` = ?';
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
// Hàm cập nhật thông tin một danh mục dựa trên ID
async function updateCategory(categoryId, updatedCategoryData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE category SET `Name` = ?,`description` = ? WHERE `Category_ID` = ?', [updatedCategoryData.Name, updatedCategoryData.description,categoryId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function deleteCategory(categoryId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM category WHERE `Category_ID` = ?', [categoryId]);
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

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  searchEmployees,

};
