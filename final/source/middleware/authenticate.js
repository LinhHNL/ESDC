const jwt = require('jsonwebtoken');

// Middleware để kiểm tra tính đúng đắn của token
function authenticateToken(req, res, next) {
  // Lấy giá trị của trường "Authorization" từ Header
  const accessToken = req.session.accessToken;
  // if (authorizationHeader) {
  //   // Tách giá trị token từ Header (ví dụ: "Bearer your-access-token")
  //   const token = authorizationHeader.split(' ')[1];
  // console.log("hihi"+accessToken);
    // console.log(accessToken);
    if (accessToken) {
      // Xác thực accessToken
      jwt.verify(accessToken, 'ling', (err, decoded) => {
        if (err) {
          // accessToken không hợp lệ
          res.redirect('/user/login');
        }
    // console.log(accessToken);

        // accessToken hợp lệ, lưu thông tin giải mã được vào đối tượng request để sử dụng ở các tuyến đường sau này (nếu cần)
        req.user = decoded;
        next();
      });
    // console.log(accessToken);

    } else {
      res.redirect('/user/login');
      }
  // } else {
  //   // Không có trường "Authorization" trong Header
  //   res.sendStatus(401); // Unauthorized
  // }
}

module.exports = authenticateToken;
