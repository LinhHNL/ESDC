$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
  
      // Lấy dữ liệu từ form
      var password = $('#password').val();

  
      // Kiểm tra dữ liệu đầu vào
      if ( !password) {
        alert('Password are required');
        return;
      }
      var urlParams = new URLSearchParams(window.location.search);
      var token = urlParams.get('token');      
      var timestamp = urlParams.get('token').split('_')[1];     
      // Tạo một đối tượng Date từ timestamp
    var dateFromTimestamp = new Date(timestamp * 1000); // Nhân với 1000 vì JavaScript sử dụng milliseconds

    // Thêm 7 ngày
    dateFromTimestamp.setDate(dateFromTimestamp.getDate() + 7);

    // Lấy ngày hiện tại
    var currentDate = new Date();
     var yourData =  {
        password: password,
        token: token
      }
    // So sánh
    if (currentDate > dateFromTimestamp) {
    alert('Time Out');
    } 
      $.ajax({
        url: '/user/login/auth',
        method: 'PUT',
        data : JSON.stringify(yourData),
        contentType: 'application/json', // Set kiểu dữ liệu gửi lên là JSON

        success: function(response) {
          // Xử lý kết quả trả về
          if (response.success) {
            window.location.href = '/user/login'; // Chuyển hướng người dùng đến trang chủ
          } else {
            alert('Login failed: ' + response.message);
          }
        }
      });
    });
  });