$(document).ready(function() {
    $('#SubmitCateogry').click(function(event) {
      event.preventDefault();
      const nameCategory = $('#nameCategory').val();
      const desCategory = $('#desCategory').val();
      if (!nameCategory.trim()) {
        alert('Tên loại sản phẩm không được để trống');
        return;
      }
  
      if (!desCategory.trim()) {
        alert('Mô tả không được để trống');
        return;
      }
      sendCategoryToServer(nameCategory, desCategory);
    });
  });
  
  function sendCategoryToServer(nameCategory, desCategory) {
    // Gọi API để gửi dữ liệu lên server
    $.ajax({
      url: '/categories/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ Name: nameCategory, description: desCategory }),
      success: function(response) {
        if (response.success) {
          alert(response.message);
          window.location.href = '/categories/' ;
        } else {
          alert('Failed to add category');
        }
      },
      error: function(error) {
        console.log(error);
        alert('Failed to add category');
    }
    });
  }
  $(document).ready(function() {
    $('#editCategory').click(function(event) {
      event.preventDefault();
      const CateogoryID = $('#CateogoryID').val();
      const nameCategory = $('#CateogoryName').val();
      const desCategory = $('#desCategory').val();
      if (!nameCategory.trim()) {
        alert('Tên loại sản phẩm không được để trống');
        return;
      }
  
      if (!desCategory.trim()) {
        alert('Mô tả không được để trống');
        return;
      }
      sendCategoryUpdateToServer(nameCategory, desCategory,CateogoryID);
    });
  });
  
  function sendCategoryUpdateToServer(nameCategory, desCategory,id) {
    // Gọi API để gửi dữ liệu lên server
    $.ajax({
      url: '/categories/',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ Name: nameCategory, description: desCategory,categoryId:id }),
      success: function(response) {
        if (response.success) {
          alert(response.message);
          window.location.href = '/categories/' ;
        } else {
          alert('Failed to add category');
        }
      },
      error: function(error) {
        console.log(error);
        alert('Failed to add category');
    }
    });
  }