$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
      e.preventDefault();
  
      // Lấy dữ liệu từ form
      var email = $('#email').val();

  
      // Kiểm tra dữ liệu đầu vào
      if ( !email) {
        alert('email are required');
        return;
      }
   
     var yourData =  {
        email: email
      }
    // So sánh
    
      $.ajax({
        url: '/user/forgotPassword',
        method: 'PUT',
        data : JSON.stringify(yourData),
        contentType: 'application/json', // Set kiểu dữ liệu gửi lên là JSON

        success: function(response) {
          // Xử lý kết quả trả về
          console.log(response);
          if (response.success) {
            $('#login-form').hide();
            $('#thongbao').text(' We sent a email for your ');
          } else {
            alert('Email not exist'); 
          }
        }
      });
    });
  });