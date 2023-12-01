const db = require('../config/database');

async function getStatusCapacityInventory(){
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.
    execute('SELECT 100 - (SUM(i.Blank)/SUM(i.Max_Weight))*100 AS StatusCapacity From inventory i ;');
    return rows[0];
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function findInventoryByName(name){
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.
    execute('SELECT * FROM inventory WHERE Name LIKE ? ;', ['%'+name+'%']);
    return rows[0];
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function getQuantityProductInventory(){
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.
    execute('SELECT COUNT(id.Quantity) as QuantityProduct FROM inventory_details id ;');
    return rows[0];
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function getSuitableInventories(barcode) {
  let connection;
  try {
    connection = await db.getConnection();
    const query = `
      SELECT i.Inventory_ID as ID, i.Name as Name, i.Blank, i.capacity
      FROM inventory i
      WHERE i.Blank > (SELECT p.Weight FROM product p WHERE p.barcode = ?)
      AND i.capacity > (SELECT p.Height * p.Width * p.Length FROM product p WHERE p.barcode = ?)
    `;
    const [rows, fields] = await connection.execute(query, [barcode, barcode]);
    return (rows);
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
// Hàm lấy tất cả các kho hàng
async function getAllInventories() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM `inventory` WHERE 1');
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
// Hàm lấy thông tin một kho hàng dựa trên ID
async function getInventoryById(inventoryId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM `inventory` WHERE `Inventory_ID` = ?', [inventoryId]);
    return rows[0]; // Chỉ lấy một kho hàng, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm một kho hàng mới
async function addInventory(inventoryData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `inventory` (`Inventory_ID`, `Name`, `Max_Weight`, `Height`, `Width`, `is_Full`, `Blank`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        inventoryData.Inventory_ID, inventoryData.Name, inventoryData.Max_Weight, inventoryData.Height,
        inventoryData.Width, inventoryData.is_Full, inventoryData.Blank
      ]);

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

// Hàm cập nhật thông tin một kho hàng dựa trên ID
async function updateInventory(inventoryId, updatedInventoryData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `inventory` SET `Name` = ?, `Max_Weight` = ?, `Height` = ?, `Width` = ?, `is_Full` = ?, `Blank` = ? WHERE `Inventory_ID` = ?',
      [
        updatedInventoryData.Name, updatedInventoryData.Max_Weight, updatedInventoryData.Height,
        updatedInventoryData.Width, updatedInventoryData.is_Full, updatedInventoryData.Blank, inventoryId
      ]);

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

// Hàm xóa một kho hàng dựa trên ID
async function deleteInventory(inventoryId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `inventory` WHERE `Inventory_ID` = ?', [inventoryId]);
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
  getAllInventories,
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
  getSuitableInventories,
  findInventoryByName,
  getStatusCapacityInventory,
  getQuantityProductInventory
};
