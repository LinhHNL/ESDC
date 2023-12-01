$(document).ready(function() {
    $('.change-avatar').click(function(event) {
      event.preventDefault();
      const fileInput = document.getElementById('imgInp');
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
          
          const base64Image = reader.result;
          sendImageToServer(base64Image);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image');
      }
    });
  });
  
  function sendImageToServer(base64Image) {
    console.log(base64Image);
    // return;
    // Gọi API để gửi ảnh lên server
    $.ajax({
      url: '/user/changeAvatar',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ Image: base64Image }),
      success: function(response) {
        if (response.success) {
            alert('Change avatar Successfully');
            window.location.reload();
          } else {
            alert('Failed to save image');
          }
        },
    
      error: function(error) {
            alert('Failed to save image');

      }
    });
  }