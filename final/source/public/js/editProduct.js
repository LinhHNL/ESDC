document.getElementById('editProduct').addEventListener('submit', function (event) {
    // Hàm kiểm tra cho giá trị số
     event.preventDefault();
    function validateInputEdit(id, errorMessage) {
       const input = document.getElementById(id);
       const value = input.value.trim();
   
       if (!value) {
         alert(errorMessage);
         input.focus();
         return false;
       }
   
       return true;
     }
   function sendFormUpdateData(formData) {
       // Gửi dữ liệu lên server bằng AJAX và jQuery
       $.ajax({
         url: '/product/',
         type: 'PUT',
         contentType: 'application/json',
         data: JSON.stringify(formData),
         success: function (response) {
           // Xử lý phản hồi từ server (nếu cần)
         alert('Cập Nhật sản phẩm thành công');
         window.location.href = '/product/' ;
           console.log(response);
         },
         error: function (error) {
           alert('Cập Nhật sản phẩm thất bại');
           console.error('Error:', error);
         },
       });
     }
     function validateNumericInputEdit(id, errorMessage) {
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
   
       // Lấy giá trị của tất cả các trường nhập
       const Product_ID = document.getElementById('Product_ID').value.trim();
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
       if (!validateInputEdit('ProductName', 'Vui lòng nhập tên sản phẩm.') ||
           !validateInputEdit('Barcode', 'Vui lòng nhập mã vạch.') ||
           !validateInputEdit('SKU', 'Vui lòng nhập SKU.') ||
           !validateInputEdit('DescriptionProduct', 'Vui lòng nhập Mô tả.') ||
           !validateNumericInputEdit('MaxQuantity', 'Vui lòng nhập giá trị max quantity hợp lệ (số).') ||
           !validateNumericInputEdit('MinQuantity', 'Vui lòng nhập giá trị min quantity hợp lệ (số).') ||
           !validateInputEdit('SellingPrice', 'Vui lòng nhập giá bán.') ||
           !validateInputEdit('CostPrice', 'Vui lòng nhập giá vốn.') ||
           !validateInputEdit('category', 'Vui lòng chọn một thể loại.') ||
           !validateNumericInputEdit('Length', 'Vui lòng nhập giá trị chiều dài hợp lệ (số).') ||
           !validateNumericInputEdit('Height', 'Vui lòng nhập giá trị chiều cao hợp lệ (số).') ||
           !validateNumericInputEdit('Width', 'Vui lòng nhập giá trị chiều rộng hợp lệ (số).') ||
           !validateNumericInputEdit('Weight', 'Vui lòng nhập giá trị cân nặng hợp lệ (số).') ) {
         return;
       }
   
       let data = {
           productID: Product_ID,
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
   
           sendFormUpdateData(data);
         };
   
         reader.readAsDataURL(file);
       } else {
        data.Image = $("#filename").val().trim();

       sendFormUpdateData(data);}
     });