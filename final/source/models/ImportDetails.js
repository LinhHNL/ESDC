const db = require('../config/database');

// Hàm lấy tất cả chi tiết nhập kho
async function getAllImportDetails() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Import_ID`, `Product_ID`, `Inventory_ID`, `Quantity` FROM `import_details` WHERE 1');
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

// Hàm lấy thông tin chi tiết nhập kho dựa trên Import_ID và Product_ID
async function getImportDetails(importId, productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Import_ID`, `Product_ID`, `Inventory_ID`, `Quantity` FROM `import_details` WHERE `Import_ID` = ? AND `Product_ID` = ?', [importId, productId]);
    return rows[0]; // Chỉ lấy một chi tiết nhập kho, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
// Hàm lấy thông tin chi tiết nhập kho dựa trên Import_ID và Product_ID
async function getImportDetailsByImportID(importId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      `
      SELECT imd.Quantity ,imd.Product_ID , p.Image, p.Name AS ProductName , inven.Name as InventoryName
FROM import_details imd 
JOIN product p on imd.Product_ID = p.Product_ID
JOIN inventory inven on inven.Inventory_ID = imd.Inventory_ID 

WHERE imd.Import_ID = ?
      `,[importId]
    );
    return rows; // Chỉ lấy một chi tiết nhập kho, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
// Hàm thêm chi tiết nhập kho mới
async function addImportDetails(importDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `import_details` (`Import_ID`, `Product_ID`, `Inventory_ID`, `Quantity`) VALUES (?, ?, ?, ?)',
      [importDetailsData.Import_ID, importDetailsData.Product_ID, importDetailsData.Inventory_ID, importDetailsData.Quantity]);

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

// Hàm cập nhật thông tin chi tiết nhập kho dựa trên Import_ID và Product_ID
async function updateImportDetails(importId, productId, updatedImportDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `import_details` SET `Quantity` = ? WHERE `Inventory_ID` = ? AND `Import_ID` = ? AND `Product_ID` = ?',
      [updatedImportDetailsData.Quantity, updatedImportDetailsData.Inventory_ID, importId, productId]);

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

// Hàm xóa chi tiết nhập kho dựa trên Import_ID và Product_ID
async function deleteImportDetails(importId, productId,Inventory_ID) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `import_details` WHERE `Inventory_ID` = ? AND `Import_ID` = ? AND `Product_ID` = ?', [Inventory_ID, importId, productId]);
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
  getAllImportDetails,
  getImportDetails,
  addImportDetails,
  updateImportDetails,
  deleteImportDetails,
  getImportDetailsByImportID
};
