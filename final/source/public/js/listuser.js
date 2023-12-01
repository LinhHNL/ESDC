$(document).ready(function() {
  $('.reset-password').click(function(event) {
    event.preventDefault();
    const row = $(this).closest('tr');
    const email = row.find('td:eq(5)').text();
    resetPassword(email);
    console.log(email);
  });
});

function resetPassword(email) {
  var yourData =  {
    email: email
  }
  // Gọi API để reset password
  $.ajax({
    url: '/user/forgotPassword',  
    method: 'PUT',
    data : JSON.stringify(yourData),
    contentType: 'application/json', // Set kiểu dữ liệu gửi lên là JSON

    success: function(response) {
      // Xử lý kết quả trả về
      console.log(response);
      if (response.success) {
        alert('Reset password successfully'); 

      } else {
        alert('Email not exist'); 
      }
    }
  });
}