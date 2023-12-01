$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
  
      // Lấy dữ liệu từ form
      var email = $('#email').val();
      var password = $('#password').val();
  
      // Kiểm tra dữ liệu đầu vào
      if (!email || !password) {
        alert('email and password are required');
        return;
      }
  var data = {
        email: email,
        password: password
      };
      // Gửi yêu cầu đăng nhập
      $.ajax({
        url: '/user/login',
        method: 'POST',
        data : JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
          // Xử lý kết quả trả về
          if (response.success) {
            window.location.href = '/'; // Chuyển hướng người dùng đến trang chủ
          } else {
            alert('Login failed: ' + response.message);
          }
        }
      });
    });
  });