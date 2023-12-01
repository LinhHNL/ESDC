const db = require('../config/database');
async function getAllProductsMinQuantity() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT p.Product_ID, p.Name,p.Image,p.Barcode,p.SKU,p.Cost_Price,p.Quantity,c.`Name` AS `Category_Name` FROM `product` p JOIN `category` c ON p.`Category_ID` = c.`Category_ID` WHERE p.Quantity <= p.Min_Quantity'
    );
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
async function getAllProductsMaxQuantity() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT p.Product_ID, p.Name,p.Image,p.Barcode,p.SKU,p.Cost_Price,p.Quantity,c.`Name` AS `Category_Name` FROM `product` p JOIN `category` c ON p.`Category_ID` = c.`Category_ID` WHERE p.Quantity >= p.Max_Quantity'
    );
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
// Hàm lấy tất cả các sản phẩm
async function getAllProducts(offset, per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT p.Product_ID, p.Name,p.Image,p.Barcode,p.SKU,p.Cost_Price,p.Quantity,c.`Name` AS `Category_Name` FROM `product` p JOIN `category` c ON p.`Category_ID` = c.`Category_ID` LIMIT ? OFFSET ?',
      [per_page, offset]
    );
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
async function getAllProductSearch() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT p.Product_ID, p.Name ,p.Image,p.Barcode From product p',
      
    );
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
async function getProductByID(productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      'SELECT p.*, c.`Name` AS `Category_Name` FROM `product` p JOIN `category` c ON p.`Category_ID` = c.`Category_ID` where p.Product_ID = ?',
      [productId]
    );
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
async function searchProducts(query, offset, per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(
      `SELECT p.Product_ID, p.Name, p.Image, p.Barcode, p.SKU, p.Cost_Price, p.Quantity, c.Name AS Category_Name FROM product p JOIN category c ON p.Category_ID = c.Category_ID WHERE p.Name LIKE ? LIMIT ? OFFSET ?`,
      [`%${query}%`, per_page, offset]
    );
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

async function getProductByBarcode(barcode) {
  let connection;
  try {
    connection = await db.getConnection();
    const query = 'SELECT p.*, c.`Name` AS `Category_Name` FROM `product` p JOIN `category` c ON p.`Category_ID` = c.`Category_ID` WHERE p.`Barcode` = ?';
    const [rows, fields] = await connection.execute(query, [barcode]);
    // console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
// Hàm thêm một sản phẩm mới
async function addProduct(productData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO product (`Name`, `Image`, `Barcode`, `Weight`, `SKU`, `Max_Quantity`, `Min_Quantity`, `Height`, `Width`, `Selling_Price`, `Cost_Price`, `Category_ID`, `Quantity`, `Length`,`Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [productData.Name, productData.Image, productData.Barcode, productData.Weight, productData.SKU, productData.Max_Quantity, productData.Min_Quantity, productData.Height, productData.Width, productData.Selling_Price, productData.Cost_Price, productData.Category_ID, productData.Quantity, productData.Length,productData.Description]);

    return {
      success: result.insertId !== undefined,
      productId: result.insertId
    };
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return {
      success: false
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}


async function updateProduct(productId, updatedProductData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute(
      'UPDATE product SET `Name`=?, `Image`=?, `Barcode`=?, `Weight`=?, `SKU`=?, `Max_Quantity`=?, `Min_Quantity`=?, `Height`=?, `Width`=?, `Selling_Price`=?, `Cost_Price`=?, `Category_ID`=?, `Quantity`=?, `Length`=?,Description=? WHERE `Product_ID`=?',
      [
        updatedProductData.Name,
        updatedProductData.Image,
        updatedProductData.Barcode,
        updatedProductData.Weight,
        updatedProductData.SKU,
        updatedProductData.Max_Quantity,
        updatedProductData.Min_Quantity,
        updatedProductData.Height,
        updatedProductData.Width,
        updatedProductData.Selling_Price,
        updatedProductData.Cost_Price,
        updatedProductData.Category_ID,
        updatedProductData.Quantity,
        updatedProductData.Length,
        updatedProductData.Description,
        productId
      ]
    );

    return {
      success: result.affectedRows > 0,
      productId: productId
    };
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return {
      success: false
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
 
}

async function deleteProduct (productId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM product WHERE `Product_ID`=?', [productId]);
    return {
      success: result.affectedRows > 0
    };
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return {
      success: false
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
// Các hàm khác không cần thay đổi.

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductByBarcode,
  searchProducts,
  getProductByID,
  getAllProductSearch,
  getAllProductsMaxQuantity,
  getAllProductsMinQuantity,
  deleteProduct
};
