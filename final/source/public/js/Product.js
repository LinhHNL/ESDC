
$(document).ready(function() {
    $('.next').click(function() {
      var urlParams = new URLSearchParams(window.location.search);
    var currentEndpoint = window.location.pathname;      
    var page = Number(urlParams.get('page')) || 1;
    var search = urlParams.get('search') || '';
          page += 1;
      url = currentEndpoint+'?page=' + page;
      if(search!==''){
        url +='&search='+search;
      }
      window.location.href = url;
    });
  
    $('.previous').click(function() {
      var urlParams = new URLSearchParams(window.location.search);
      var currentEndpoint = window.location.pathname;
      var page = Number(urlParams.get('page')) || 1;
      var search = urlParams.get('search') || '';
      if (page > 1) {
        page -= 1;
        url = currentEndpoint+'?page=' + page;
        if(search!==''){
            url +='&search='+search;
        }
      window.location.href = url;
    }
    });
    $('.delete-product').click(function () {
      const productId = $(this).closest('tr').data('idproduct');
      console.log(productId);
      if (productId) {
        const isConfirmed = confirm('Bạn có chắc muốn xóa sản phẩm này?');
        if (isConfirmed) {
          // Gửi request xóa, bạn cần thay đổi đường dẫn và phương thức HTTP tùy thuộc vào cấu trúc backend của bạn
          $.ajax({
            url: '/product/' + productId, // Đường dẫn của API hoặc endpoint xóa sản phẩm
            type: 'DELETE',
            success: function (response) {
              // Xử lý kết quả sau khi xóa thành công (nếu cần)
              console.log('Sản phẩm đã được xóa thành công.');
              // Sau khi xóa, có thể làm mới trang hoặc cập nhật dữ liệu mà không cần tải lại trang
            },
            error: function (error) {
              console.error('Lỗi:', error);
              alert('Không thể xóa sản phẩm');
            }
          });
        }
      } else {
        console.error('Không thể xác định ID sản phẩm.');
        alert('Đã xảy ra lỗi khi xóa sản phẩm.');
      }
    });
  });
//   $(document).ready(function() {
//     $('#SearchProduct').on('input', function() {
//       var searchValue = $(this).val();
  
//       $.ajax({
//         url: '/product/search?search='+searchValue, // Thay '/search' bằng endpoint thực sự của bạn
//         type: 'GET', // Thay 'GET' bằng phương thức HTTP thích hợp

//         success: function(data) {
//             // Xóa dữ liệu hiện tại trong bảng
//             $('#myTableProduct').empty();
          
//             // Thêm dữ liệu mới vào bảng
//             data.forEach(function(product, index) {
//               var status = product.Quantity === 0 ? `<span class="badges bg-lightred">Hết hàng</span>` : `<span class="badges bg-lightgreen">Còn hàng</span>`;
//               var row = '<tr>' +
//                 '<td>' + (index + 1) + '</td>' + // STT
//             `<td class="productimgname">
//             <a href="javascript:void(0);" class="product-img">
//                 <img src="${product.Image}" alt="product">
//             </a>
//             <a href="javascript:void(0);">${product.Name}</a>
//             </td>`

//             +   
//             '<td>' + product.Barcode + '</td>' + // Tên sản phẩm
//                 '<td>' + product.SKU + '</td>' + // Tên sản phẩm
//                 '<td>' + product.Cost_Price + '</td>' + // Tên sản phẩm
//                 '<td>' + product.Quantity + '</td>' + // Tên sản phẩm
//                 '<td>' + status + '</td>' + 
                
//                 `<td>
//                 <a class="me-3" href="product-details.html">
//                     <img src="/img/icons/eye.svg" alt="img">
//                 </a>
//                 <a class="me-3" href="editproduct.html">
//                     <img src="/img/icons/edit.svg" alt="img">
//                 </a>
//                 <a class="confirm-text" href="javascript:void(0);">
//                     <img src="/img/icons/delete.svg" alt="img">
//                 </a>
//             </td>`
//             +
//                 '</tr>';
//               $('#myTableProduct').append(row);
//             });
//           },
//         error: function(error) {
//           // Xử lý lỗi ở đây
//           console.log(error);
//         }
//       });
//     });
//   });
document.getElementById('fileImageProduct').addEventListener('change', function () {
    const filenameDiv = document.getElementById('filename');
  
    if (this.files.length > 0) {
      const file = this.files[0];
      const allowedFormats = ['jpg', 'jpeg', 'png'];
  
      const fileExtension = file.name.split('.').pop().toLowerCase();
  
      if (!allowedFormats.includes(fileExtension)) {
        alert('Vui lòng chọn một tệp có định dạng .jpg, .jpeg hoặc .png');
        this.value = ''; // Clear the file input
        filenameDiv.innerText = ''; // Clear the filename display
        return false;
      }
  
      filenameDiv.innerText = file.name; // Hiển thị tên của tệp ảnh
    }
  });

  document.getElementById('addProduct').addEventListener('submit', function (event) {
    event.preventDefault();
 // Hàm kiểm tra cho giá trị số
  
 function validateInput(id, errorMessage) {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (!value) {
      alert(errorMessage);
      input.focus();
      return false;
    }

    return true;
  }
function sendFormData(formData) {
    // Gửi dữ liệu lên server bằng AJAX và jQuery
    $.ajax({
      url: '/product',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function (response) {
        // Xử lý phản hồi từ server (nếu cần)
      alert('Thêm sản phẩm thành công');
      document.getElementById('addProduct').reset();
      document.getElementById('filename').innerText = '';
        console.log(response);
      },
      error: function (error) {
        alert('Thêm sản phẩm thất bại');
        console.error('Error:', error);
      },
    });
  }
  function validateNumericInput(id, errorMessage) {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (!value || isNaN(value)) {
    alert(errorMessage);
    input.focus();
    return false;
    }

    return true;
}
// Hàm kiểm tra định dạng ảnh
function validateImageFormat() {
  const fileInput = document.getElementById('fileImageProduct');
  const filenameDiv = document.getElementById('filename');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const allowedFormats = ['jpg', 'jpeg', 'png'];

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedFormats.includes(fileExtension)) {
      alert('Vui lòng chọn một tệp có định dạng .jpg, .jpeg hoặc .png');
      fileInput.value = ''; // Clear the file input
      filenameDiv.innerText = ''; // Clear the filename display
      return false;
    }

    filenameDiv.innerText = file.name; // Hiển thị tên của tệp ảnh
  }

  return true;
}
  
    // Lấy giá trị của tất cả các trường nhập
    const productName = document.getElementById('ProductName').value.trim();
    const barcode = document.getElementById('Barcode').value.trim();
    const sku = document.getElementById('SKU').value.trim();
    const maxQuantity = document.getElementById('MaxQuantity').value.trim();
    const minQuantity = document.getElementById('MinQuantity').value.trim();
    const sellingPrice = document.getElementById('SellingPrice').value.trim();
    const costPrice = document.getElementById('CostPrice').value.trim();
    const category = document.getElementById('category').value.trim();
    const length = document.getElementById('Length').value.trim();
    const height = document.getElementById('Height').value.trim();
    const width = document.getElementById('Width').value.trim();
    const weight = document.getElementById('Weight').value.trim();
    const DescriptionProduct = document.getElementById('DescriptionProduct').value.trim();
    // Thêm các trường nhập bổ sung nếu cần

    // Tiến hành kiểm tra cho từng trường nhập
    if (!validateInput('ProductName', 'Vui lòng nhập tên sản phẩm.') ||
        !validateInput('Barcode', 'Vui lòng nhập mã vạch.') ||
        !validateInput('SKU', 'Vui lòng nhập SKU.') ||
        !validateInput('DescriptionProduct', 'Vui lòng nhập Mô tả.') ||
        !validateNumericInput('MaxQuantity', 'Vui lòng nhập giá trị max quantity hợp lệ (số).') ||
        !validateNumericInput('MinQuantity', 'Vui lòng nhập giá trị min quantity hợp lệ (số).') ||
        !validateInput('SellingPrice', 'Vui lòng nhập giá bán.') ||
        !validateInput('CostPrice', 'Vui lòng nhập giá vốn.') ||
        !validateInput('category', 'Vui lòng chọn một thể loại.') ||
        !validateNumericInput('Length', 'Vui lòng nhập giá trị chiều dài hợp lệ (số).') ||
        !validateNumericInput('Height', 'Vui lòng nhập giá trị chiều cao hợp lệ (số).') ||
        !validateNumericInput('Width', 'Vui lòng nhập giá trị chiều rộng hợp lệ (số).') ||
        !validateNumericInput('Weight', 'Vui lòng nhập giá trị cân nặng hợp lệ (số).') ||
        !validateImageFormat()) {
      return;
    }

    let data = {
        Name: productName,
        Barcode: barcode,
        Weight: weight,
        SKU: sku,
        Max_Quantity: maxQuantity,
        Min_Quantity: minQuantity,
        Height: height,
        Width: width,
        Selling_Price: sellingPrice,
        Cost_Price: costPrice,
        Category_ID: category,
        Quantity: 0,
        Length: length,
        Description: DescriptionProduct
      };
      const fileInput = $('#fileImageProduct')[0];
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        data.Image = reader.result;

        sendFormData(data);
      };

      reader.readAsDataURL(file);
    } else {
      alert('Vui lòng chọn một tệp ảnh.');
    }
  });
// Hàm kiểm tra cho giá trị số

