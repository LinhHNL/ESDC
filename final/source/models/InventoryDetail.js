const db = require('../config/database');

// Hàm lấy tất cả chi tiết kho hàng
async function getAllInventoryDetails() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Inventory_ID`, p.`Name` AS `Product_Name`, i.`Quantity`, i.`date` FROM `inventory_details` i JOIN `product` p ON i.`Product_ID` = p.`Product_ID` WHERE 1');
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

async function findProductInInventoryDetails(inventoryName,barcode,Quantity) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
    SELECT i.*,im.Date FROM inventory_details i 
    JOIN product p ON i.Product_ID = p.Product_ID
    JOIN inventory inven On i.Inventory_ID = inven.Inventory_ID
    JOIN import im On im.Import_ID = i.Import_ID
    WHERE p.Barcode = ? and inven.Name = ? and i.Quantity >= ?`,
    [barcode,inventoryName,Quantity]);
  
    return rows[0] ;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if  (connection) {
      connection.release();
    }
  }
}
async function getAllProductInInventoryByID(inventoryId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      `SELECT  id.Quantity  , p.Name ,im.Date , e.Name AS EmployeeName , imd.Quantity as OldQuantity  FROM inventory_details id
      JOIN product p ON p.Product_ID = id.Product_ID
      JOIN import im ON im.Import_ID = id.Import_ID
      JOIN import_details imd ON imd.Import_ID = im.Import_ID
      JOIN employee e on e.Employee_ID = im.Employee_ID
      WHERE id.Quantity !=0 and id.Inventory_ID= ?`, [inventoryId]);
    return rows; // Chỉ lấy một chi tiết kho hàng, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if  (connection) {
      connection.release();
    }
  }
}
/**
 * Retrieves all inventories for a given product based on its barcode.
 * @param {string} barcode - The barcode of the product.
 * @returns {Promise<Array>} - A promise that resolves to an array of inventories.
 */
async function getAllInventoriesByProduct(barcode){
  let connection;
  try {
    connection = await db.getConnection();
    const query = `SELECT id.* , i.Date ,inv.Name AS InventoryName FROM inventory_details id 
    JOIN product p On p.Product_ID = id.Product_ID
    JOIN import i on i.Import_ID = id.Import_ID
    JOIN inventory inv on inv.Inventory_ID = id.Product_ID
    WHERE p.Barcode = ? and id.Quantity!=0
    ORDER BY Date DESC`;
    const [rows, fields] = await connection.execute(query, [barcode]);
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
async function getInventoryDetails(inventoryId, productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Inventory_ID`, p.`Name` AS `Product_Name`, i.`Quantity`, i.`date` FROM `inventory_details` i JOIN `product` p ON i.`Product_ID` = p.`Product_ID` WHERE i.`Inventory_ID` = ? AND i.`Product_ID` = ?', [inventoryId, productId]);
    return rows[0]; // Chỉ lấy một chi tiết kho hàng, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm chi tiết kho hàng mới
async function addInventoryDetails(inventoryDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `inventory_details` (`Inventory_ID`, `Product_ID`, `Quantity`, `date`) VALUES (?, ?, ?, ?)',
      [inventoryDetailsData.Inventory_ID, inventoryDetailsData.Product_ID, inventoryDetailsData.Quantity, inventoryDetailsData.date]);

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

// Hàm cập nhật thông tin chi tiết kho hàng dựa trên Inventory_ID và Product_ID
async function updateInventoryDetails(inventoryId, productId, updatedInventoryDetailsData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `inventory_details` SET `Quantity` = ?, `date` = ? WHERE `Inventory_ID` = ? AND `Product_ID` = ?',
      [updatedInventoryDetailsData.Quantity, updatedInventoryDetailsData.date, inventoryId, productId]);

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

// Hàm xóa chi tiết kho hàng dựa trên Inventory_ID và Product_ID
async function deleteInventoryDetails(inventoryId, productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `inventory_details` WHERE `Inventory_ID` = ? AND `Product_ID` = ?', [inventoryId, productId]);
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

module.exports = {
  getAllInventoryDetails,
  getInventoryDetails,
  addInventoryDetails,
  updateInventoryDetails,
  deleteInventoryDetails,
  getAllProductInInventoryByID,
  getAllInventoriesByProduct,
  findProductInInventoryDetails
};
