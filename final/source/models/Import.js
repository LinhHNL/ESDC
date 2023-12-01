const db = require('../config/database');



// Hàm lấy tất cả các thông tin nhập kho
async function getAllImports(page,per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Import_ID`, i.`Employee_ID`,e.Name As EmployeeName, i.`Date` FROM `import` i JOIN employee e On e.Employee_ID = i.Employee_ID LIMIT ? OFFSET ?',[per_page,page*(per_page-1)]);
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
async function getTotalImport(day, month, year) {
  let connection;
  try {
    connection = await db.getConnection();

    let query = 'SELECT COUNT(*) as TotalImport FROM `import` WHERE 1';

    // Kiểm tra và thêm điều kiện ngày, tháng, năm nếu chúng không rỗng
    if (day) {
      query += ` AND DAY(Date) = ${day}`;
    }
    if (month) {
      query += ` AND MONTH(Date) = ${month}`;
    }
    if (year) {
      query += ` AND YEAR(Date) = ${year}`;
    }
    // console.log(query);
    const [rows, fields] = await connection.execute(query);

    return rows[0].TotalImport;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function getTopProductImport(day, month, year,page ,per_page) {
  let connection;
  try {
    connection = await db.getConnection();

    let query = `
    SELECT p.Product_ID, p.Name,p.Barcode ,p.Image, SUM(imd.Quantity) AS TotalQuantity
    FROM import_details imd
    JOIN import im on im.Import_ID  = imd.Import_ID
    JOIN product p ON p.Product_ID = imd.Product_ID
    WHERE 1
    `;

    // Kiểm tra và thêm điều kiện ngày, tháng, năm nếu chúng không rỗng
    if (day) {
      query += ` AND DAY(im.Date) = ${day}`;
    }
    if (month) {
      query += ` AND MONTH(im.Date) = ${month}`;
    }
    if (year) {
      query += ` AND YEAR(im.Date) =  ${year}`;
    }

    query += ` GROUP BY p.Product_ID ORDER BY TotalQuantity DESC LIMIT ? OFFSET ?`;

    const [rows, fields] = await connection.execute(query, [per_page, (page-1)*per_page]);

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
// Hàm lấy thông tin nhập kho dựa trên Import_ID
async function getImportById(importId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Import_ID`, i.`Employee_ID` ,e.Name As EmployeeName, i.`Date` FROM `import` i JOIN employee e On e.Employee_ID = i.Employee_ID where i.Import_ID = ?', [importId]);
    return rows[0]; // Chỉ lấy một thông tin nhập kho, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function searchImport(query,page,per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
    SELECT i.Import_ID, i.Employee_ID, i.Date, e.Name as EmployeeName
     FROM import i JOIN employee e ON i.Employee_ID = e.Employee_ID 
     WHERE e.Name LIKE '%${query}%' OR i.Date LIKE '%${query}%'
     LIMIT ${per_page} OFFSET ${page*(per_page-1)}
    `);
    return rows; // Chỉ lấy một thông tin nhập kho, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm thêm thông tin nhập kho mới
async function addImport(Employee_ID) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `import` (`Employee_ID`) VALUES (?)',
      [Employee_ID]);

    return {
      success: true,
      ImportId : result.insertId
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

// Hàm cập nhật thông tin nhập kho dựa trên Import_ID
async function updateImport(importId, updatedImportData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `import` SET `Employee_ID` = ?, WHERE `Import_ID` = ?',
      [updatedImportData.Employee_ID, importId]);

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

// Hàm xóa thông tin nhập kho dựa trên Import_ID
async function deleteImport(importId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `import` WHERE `Import_ID` = ?', [importId]);
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
async function getImportStatusNearly() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
    SELECT e.Name  as EmployeeName, iven.Name as InventoryName, p.Name , imd.Quantity ,im.Date FROM import_details imd
    JOIN import im  ON im.Import_ID = imd.Import_ID
    JOIN inventory iven ON imd.Inventory_ID = iven.Inventory_ID
    JOIN employee e On e.Employee_ID = im.Employee_ID
    JOIN product p On p.Product_ID = imd.Product_ID
    LIMIT 3
    
    `);
    // console.log(rows); 
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

module.exports = {
  getAllImports,
  getImportById,
  addImport,
  updateImport,
  deleteImport,
  getImportStatusNearly,
  searchImport,
  getTotalImport,
  getTopProductImport
};
