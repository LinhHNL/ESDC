const db = require('../config/database');


function generateRandomToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    let length = 30;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    return token;
  }
  
  
  
// Hàm lấy thông tin một tài khoản dựa trên ID
async function getAccountById(accountId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.execute('SELECT `Account_ID`, `Email`, `Password`, `Status`, `Role_ID` FROM `account` WHERE `Account_ID` = ?', [accountId]);
    return rows[0]; // Chỉ lấy một tài khoản, nếu có
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function getAccountByEmail(Email) {
    let connection;
    try {
      connection = await db.getConnection();
      const [rows, fields] = await connection.execute('SELECT `Account_ID`, `Email`, `Password`, `Status`, `Role_ID` ,`Employee_ID` FROM `account` WHERE `Email` = ?', [Email]);
      return rows[0]; // Chỉ lấy một tài khoản, nếu có
    } catch (error) {
      console.error('Lỗi truy vấn:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  
// Hàm thêm một tài khoản mới
async function addAccount(accountData) {
    let connection;
    try {
      connection = await db.getConnection();
      const randomToken = generateRandomToken();
      // Lấy thời gian hiện tại và thêm vào thông tin token
      const currentTime = new Date();
      const token = `${randomToken}_${currentTime.getTime()}`;
      
      const [result] = await connection.execute(
        'INSERT INTO account (Email, Password, Status, Role_ID, Token_Login,Employee_ID) VALUES (?, ?, ?, ?, ?,?)',
        [accountData.Email, accountData.Password, accountData.Status, accountData.Role_ID, token,accountData.EmployeeID]
      );
  
      return {
        success: result.insertId !== undefined,
        id: result.insertId,
        token: token
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
  
async function forgotPassword(email){
    let connection;
  try {
    connection = await db.getConnection();
    const randomToken = generateRandomToken();
    // Lấy thời gian hiện tại và thêm vào thông tin token
    const currentTime = new Date();
    const token = `${randomToken}_${currentTime.getTime()}`;
    const [result] = await connection.execute(
        'UPDATE account SET  Token_Login = ?,status=0 WHERE Email = ?',
      [token,email]
    );
  
    return {
        success: result.affectedRows > 0,
        token: token
      };
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return {
        success: false,
      };
} finally {
    if (connection) {
      connection.release();
    }
  }

}
async function loginFirstOrForgotPassword(password,token) {
    let connection;
    try {
      connection = await db.getConnection();

      const [result] = await connection.execute(
          'UPDATE `account` SET  `Password` = ? ,`Status`=1 WHERE `Token_Login`  = ?',
        [password,token]
      );
    
      return {
          success: result.affectedRows > 0
        };
    } catch (error) {
      console.error('Lỗi truy vấn:', error);
      return {
          success: false,
        };
  } finally {
      if (connection) {
        connection.release();
      }
    }
}
// Hàm cập nhật thông tin một tài khoản dựa trên ID
async function updateAccount(accountId, updatedAccountData) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute(
      'UPDATE account SET  Status = ?, Role_ID = ?  WHERE Account_ID = ?',
      [updatedAccountData.Status, updatedAccountData.Role_ID, accountId]
    );
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

// Hàm cập nhật mật khẩu của một tài khoản dựa trên ID
async function updatePassword(accountId, newPassword) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('UPDATE account SET Password = ? WHERE Account_ID = ?', [newPassword, accountId]);
    return result.affectedRows > 0; z// Trả về true nếu có ít nhất một hàng bị ảnh hưởng
  } catch (error) {
    console.error('Lỗi truy vấn:', error);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Hàm xóa một tài khoản dựa trên ID
async function deleteAccount(accountId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.execute('DELETE FROM account WHERE Account_ID = ?', [accountId]);
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
  getAccountById,
  addAccount,
  updateAccount,
  updatePassword,
  deleteAccount,
  getAccountByEmail,
  forgotPassword,
  loginFirstOrForgotPassword
};
