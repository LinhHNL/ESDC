const db = require('../config/database');

async function getExportStatus() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
    SELECT e.Name as EmployeeName , iven.Name as InventoryName, p.Name,  exd.Quantity ,ex.Date FROM export_details exd
    JOIN export ex  ON ex.Export_ID = exd.Export_ID
    JOIN inventory iven ON exd.Inventory_ID = iven.Inventory_ID
    JOIN employee e On e.Employee_ID = ex.Employee_ID
    JOIN product p On p.Product_ID = exd.Product_ID
    ORDER By ex.date
    LIMIT 3
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
async function getTotalExport(day,month,year) {
  let connection;
  try {
    connection = await db.getConnection();

    let query = 'SELECT COUNT(*) as TotalExport FROM `export` WHERE 1';

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

    const [rows, fields] = await connection.execute(query);

    return rows[0].TotalExport;
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function getTopProductExport(day, month, year,page ,per_page) {
  let connection;
  try {
    connection = await db.getConnection();

    let query = `
    SELECT p.Product_ID, p.Name,p.Barcode ,p.Image, SUM(exd.Quantity) AS TotalQuantity
    FROM export_details exd
    JOIN export ex on ex.Export_ID  = exd.Export_ID
    JOIN product p ON p.Product_ID = exd.Product_ID
    WHERE 1
    `;

    // Kiểm tra và thêm điều kiện ngày, tháng, năm nếu chúng không rỗng
    if (day) {
      query += ` AND DAY(ex.Date) = ${day}`;
    }
    if (month) {
      query += ` AND MONTH(ex.Date) = ${month}`;
    }
    if (year) {
      query += ` AND YEAR(ex.Date) = ${year}`;
    }
    query += `
    GROUP BY p.Product_ID
    ORDER BY TotalQuantity DESC
    LIMIT ?  OFFSET ?
    `;
    console.log(per_page);
    console.log(page);
    console.log(query);

    const [rows, fields] = await connection.execute(query,[per_page, (page-1)*per_page]);

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
// Hàm lấy tất cả các thông tin xuất kho
async function getAllExports(page,per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Export_ID`, i.`Employee_ID`,e.Name As EmployeeName, i.`Date` FROM `Export` i JOIN employee e On e.Employee_ID = i.Employee_ID LIMIT ? OFFSET ?',[per_page,page*(per_page-1)]);
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
async function searchExport(query,page,per_page) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute(`
    SELECT i.Export_ID, i.Employee_ID, i.Date, e.Name as EmployeeName
     FROM Export i JOIN employee e ON i.Employee_ID = e.Employee_ID 
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

async function getExportById(ExportId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT i.`Export_ID`, i.`Employee_ID` ,e.Name As EmployeeName, i.`Date` FROM `Export` i JOIN employee e On e.Employee_ID = i.Employee_ID where i.Export_ID = ?', [ExportId]);
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

// Hàm thêm thông tin xuất kho mới
async function addExport(Employee_ID) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('INSERT INTO `export` ( `Employee_ID`) VALUES ( ?)',
      [Employee_ID]);

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

// Hàm cập nhật thông tin xuất kho dựa trên Export_ID
async function updateExport(exportId, updatedExportData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE `export` SET  `Employee_ID` = ? WHERE `Export_ID` = ?',
      [ updatedExportData.Employee_ID, exportId]);

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

// Hàm xóa thông tin xuất kho dựa trên Export_ID
async function deleteExport(exportId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM `export` WHERE `Export_ID` = ?', [exportId]);
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
  getAllExports,
  getExportById,
  addExport,
  updateExport,
  deleteExport,
  getExportStatus,
  searchExport,
  getTotalExport,
  getTopProductExport
};
