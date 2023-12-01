const db = require('../config/database');

// Hàm lấy tất cả chi tiết xuất kho
async function getAllExportDetails() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Export_ID`, `Product_ID`, `Quantity`, `Inventory_ID` FROM `export_details` WHERE 1');
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
async function getExportDetailsByExportID(ExportId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      `
      SELECT imd.Quantity ,imd.Product_ID , p.Image, p.Name AS ProductName , inven.Name as InventoryName
FROM Export_details imd 
JOIN product p on imd.Product_ID = p.Product_ID
JOIN inventory inven on inven.Inventory_ID = imd.Inventory_ID 

WHERE imd.Export_ID = ?
      `,[ExportId]
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
//
// Hàm lấy thông tin chi tiết xuất kho dựa trên Export_ID và Product_ID
async function getExportDetails(exportId, productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Export_ID`, `Product_ID`, `Quantity`, `Inventory_ID` FROM `export_details` WHERE `Export_ID` = ? AND `Product_ID` = ?', [exportId, productId]);
    return rows[0]; // Chỉ lấy một chi tiết xuất kho, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm chi tiết xuất kho mới
async function addExportDetails(exportDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `export_details` (`Export_ID`, `Product_ID`, `Quantity`, `Inventory_ID`) VALUES (?, ?, ?, ?)',
      [exportDetailsData.Export_ID, exportDetailsData.Product_ID, exportDetailsData.Quantity, exportDetailsData.Inventory_ID]);
    return result.affectedRows;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm cập nhật thông tin chi tiết xuất kho dựa trên Export_ID và Product_ID
async function updateExportDetails(exportId, productId, updatedExportDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `export_details` SET `Quantity` = ? WHERE `Inventory_ID` = ? AND `Export_ID` = ? AND `Product_ID` = ?  ',
      [updatedExportDetailsData.Quantity, updatedExportDetailsData.Inventory_ID, exportId, productId]);

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

// Hàm xóa chi tiết xuất kho dựa trên Export_ID và Product_ID
async function deleteExportDetails(exportId, productId,Inventory_ID) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `export_details` WHERE `Inventory_ID` = ? AND `Export_ID` = ? AND `Product_ID` = ? ', [exportId, productId,Inventory_ID]);
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
  getAllExportDetails,
  getExportDetails,
  addExportDetails,
  updateExportDetails,
  deleteExportDetails,
  getExportDetailsByExportID
};



