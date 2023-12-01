const Account =  require('../models/Account');
const Employee =  require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMailResetPassword = require('../middleware/sendemail');

class UserController{
    static async signOut(req,res){
        if (req.session) {
            // Sử dụng phương thức destroy() để xóa session
            req.session.destroy(err => {
              if (err) {
                console.error('Error destroying session:', err);
              } else {
                // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất thành công
                res.redirect('/user/login');
              }
            });
          } else {
            // Nếu không có session, chuyển hướng đến trang đăng nhập
            res.redirect('/user/login');
          }
    }
    static loginPage(req,res){
        if(req.session.accessToken){
         return   res.redirect('/index');
        }
        return  res.render('signin', {layout: false});
    }
    static async profilePage(req,res){
        const employee = await Employee.getEmployeeById(req.user.userId);
        console.log(employee);
        return  res.render('profile',{
            employee:employee
        });
    }
    static firstLoginsPage(req,res){
        if(req.session.accessToken){
            return   res.redirect('/index');
           }
        res.render('first-login', {layout: false});
    }
    static forgotPasswordPage(req,res){
        if(req.session.accessToken){
            return   res.redirect('/index');
           }
        res.render('forgotPassword', {layout: false});
    }
    static createUserPage(req,res){

        res.render('newuser');
    }
    static async editUserPage(req,res){
        console.log(req.params.id);
        const employee = await Employee.getEmployeeById(req.params.id);
        console.log(employee);
        res.render('newuseredit',{
            employee: employee
        });
    }
    // static firstLogin(req,res){
    //     res.render('signin', {layout: false});
    // }
    static #createToken(user){
        const secretKey = 'ling';
        const token = jwt.sign(user, secretKey, { expiresIn: '30d' }); 
        return token;
    }
    static async searchEmployees(req,res){
        const criteria = req.body.criteria;
        try {
            const employees = await Employee.searchEmployees(criteria);

            res.status(200).json(employees);
        } catch (error) {
             console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async login(req, res) {
        const password = req.body.password;
        const email = req.body.email;
        try {
            const accountData = await Account.getAccountByEmail(email);
            if (accountData) {
                const match = await bcrypt.compare(password, accountData.Password);
                if (match && accountData.Status === 1) {
                    const user = {
                        userId: accountData.Employee_ID,
                        role: accountData.Role_ID,
                        email: accountData.Email,
                    };
                    const accessToken = UserController.#createToken(user);
                // console.log(accessToken)
                    
                    req.session.accessToken = accessToken;
                    const employee = await Employee.getEmployeeById(accountData.Employee_ID);
                    req.session.Name = employee.Name;
                    req.session.Image = employee.Image;
                    req.session.Role_ID = accountData.Role_ID;
                  return  res.status(200).json({ 
                    success: true
                   });
                } else {
                 return   res.status(401).json({ 
                    success: false,
                    message: 'Invalid credentials' });
                }
            } else {
                console.log('Account not found');
               return res.status(404).json({
                success: false,

                message: 'Account not found' });
            }
        } catch (message) {
            console.error('Error:', error);
           return res.status(500).send('Internal Server Error');
        }
    }
    static async updateEmployee(req,res){
     
        try {
            const employeeData = req.body;
            const employeeID = req.body.employeeID;
            // employeeData.Image = (await uploadFile.saveBase64Image(employeeData.ImageName,employeeData.Image,"avatar")).ImagePath;

            let result = await Employee.updateEmployee(employeeID,employeeData);
            if(result){
            return    res.status(200).json({ success: true, message:"Employee updated successfully"});

            }else {
                return    res.status(401).json({ success:false,message:"Employee updated failed", error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error:', error);
            return   res.status(500).send('Internal Server Error');
        }
    }
    static async createUser(req, res) {
        let employeeData = req.body;
        try {
            // Assuming addEmployee is an asynchronous function that returns a Promise
              // Prepare account data
              const employee= await Employee.addEmployee(employeeData);
            if(!employee.success) {
                console.error('Employee creation failed');
                res.status(400).json({
                    success: false,
                    message: 'Employee creation failed',
                });
                return;
            }
              let accountData = {
                Email: employeeData.Email,
                Password: 'default-password',
                Status: 0, 
                Role_ID: employeeData.Position_ID,
                EmployeeID : employee.id
            };
            let account = await Account.addAccount(accountData);
            
            let accountId = account.id;
            let token = account.token;
            
                if(!account.success) {
                    res.status(400).json({
                        success: false,
                        message: 'Employee creation failed',
                    });
                    return;
                }
            employeeData.AccountID = accountId;
            // employeeData.Image = (await uploadFile.saveBase64Image(employeeData.ImageName,employeeData.Image,"avatar")).ImagePath;

            
            if (employee.success) {
                sendMailResetPassword(employeeData.Email,token);
                res.status(200).json({
                    success: true,
                    message: 'Employee created successfully',
                    employeeID:employee.employeeID, // Include the employee ID in the response if needed
                });
              
            } else {
                // Handle the case where addEmployee returns a falsy value (e.g., employeeID is undefined or null)
                console.error('Employee creation failed');
                res.status(400).json({
                    success: false,
                    message: 'Employee creation failed',
                });
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
    static async forgotPassword(req, res) {
        const employeeData = req.body;
        try {
            const result = await Account.forgotPassword(employeeData.email);
            if(result.success) {
                sendMailResetPassword(employeeData.email,result.token);

              return  res.status(200).json({
                    success: true,
                    message: 'Send to email successfully',
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Send to email failed',
            });
        } catch (error) {
            console.log(error);
            return  res.status(500).json({
                success: false,
                message: 'Send to email failed',
            });
        }
    }
    static async confirmLoginFirstOrForgotPassword(req, res) {
        const firstLogins = req.body;
        
        try {
            const timestamp = firstLogins.token.split('_')[1];
    
            // Create a Date object with the provided timestamp
            const date = new Date(timestamp);
    
            // Add 1 week (7 days) to the date
            date.setDate(date.getDate() + 7);
    
            // Get the current date and time
            const currentDate = new Date();
    
            // Compare the two dates
            if (date < currentDate) {
                console.log(`date time out`);
                return res.status(200).json({
                    success: false,
                    message: 'Token has expired',
                });
            }
    
            const hashedPassword = await bcrypt.hash(firstLogins.password, 10);
    
            const result = await Account.loginFirstOrForgotPassword( hashedPassword,firstLogins.token);
            
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: 'Change password successfully',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Change password failed',
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    
    static async changePassword(req, res) {
        const account_id = req.user.Account_ID;
        const oldpassword = req.body.oldpassword;
        const newPassword = req.body.newpassword;
    
        try {
          // Lấy thông tin tài khoản từ cơ sở dữ liệu
          const accountData = await Account.getAccountById(account_id);
    
          // Kiểm tra xem tài khoản có tồn tại hay không
          if (!accountData) {
             res.status(404).json({ success: false, message: 'Account not found' });
          }
          const match = await bcrypt.compare(oldpassword, accountData.password);
          if(!match)  {
             res.status(500).json({ success: false, message: 'Password not dung' });

          }        // Mã hóa mật khẩu mới
          const hashedPassword = await bcrypt.hash(newPassword, 10);
    
          // Cập nhật mật khẩu mới trong cơ sở dữ liệu
          const updateResult = await Account.updatePassword(account_id, hashedPassword);
    
          if (updateResult) {
             res.status(200).json({ success: true, message: 'Password updated successfully' });
          } else {
             res.status(500).json({ success: false, message: 'Failed to update password' });
          }
        } catch (error) {
          console.error('Error:', error);
           res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
        static async changeAvatar(req,res) {
            const Image = req.body.Image;
        try {
            console.log(Image);
            // console.log(req.body.Image);
            // console.log(req.body);
            if(Employee.updateEmployeeImage(Image,req.user.userId)) {

                return  res.status(200).json({
                        success: true,
                        message: 'Save Image successfully',
                    });
            }
            return  res.status(400).json({
                success: false,
                message: 'Save Image failed',
            });
        } catch (error) {
            console.log(error);
            return   res.status(500).json({
                success: false,
                message: 'Save Image failed',
            });
        }
        }
        static async updateStatus(req,res) {
            const employeeId = req.body.employeeID;
            const status = req.body.status;
        try {
            if(Employee.updateEmployeeStatus(employeeId,status)) {

                res.status(200).json({
                    success: true,
                    message: 'Change successfully',
                });
            }
            res.status(400).json({
                success: false,
                message: 'Change failed',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Change failed',
            });
        }
        }
        static async getAllEmployees(req,res){
            try {
                const employees = await Employee.getAllEmployees();
                res.render('userlists', {employees:employees});
            } catch (error) {
            console.log(error);
            res.status(500);
            }
        
        }
        static async getEmployee(req,res){
            const email = req.user.email;
            try {
                const employees = await Employee.getEmployeeByEmail(email);
                if(employees.length!==0){
                    res.status(400).json({
                        message: "user not found"
                    });

                }
                res.status(200).json(employees);

            } catch (error) {
            console.log(error);
                res.status(500);
            }
        }
}
module.exports = UserController;