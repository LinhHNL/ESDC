var ListProductExport =[];
$(document).ready(function() {
    // Sử dụng sự kiện "delegated" trên phần tử cha tồn tại
    $('.list-inve-avai').on('click', '.btn-warehouse-submit', function() {
        $('.btn-warehouse-submit').removeClass('active');
        console.log($(this).attr('id'));
        $(this).addClass('active');
    });
    $('.tableinforwarehouseimport').on('click', '.btn-remove-row-box-list', function() {
      const tr = $(this).closest('tr');
      const idboxToRemove = tr.data('idbox');
     
      tr.remove();
  });
  $('.tableinforwarehouseexport').on('click', '.btn-remove-row-box-list', function() {
    const tr = $(this).closest('tr');
    const idboxToRemove = tr.data('idbox');
    const barcode = tr.find('td:eq(1)').text(); // Lấy giá trị từ cột thứ 2
    const quantity = tr.find('td:eq(2)').text(); // Lấy giá trị từ cột thứ 3
   
    // Lọc ra phần tử cần xóa từ ListProductExport
  const itemToRemoveIndex = ListProductExport.findIndex(item =>
    item.Inventory_ID == parseInt(idboxToRemove, 10) && 
    item.ProductBarcode === barcode && 
    item.Quantity == parseInt(quantity, 10)
  );

    // Kiểm tra nếu phần tử được tìm thấy
    if (itemToRemoveIndex !== -1) {
      // Xóa phần tử khỏi ListProductExport
      ListProductExport.splice(itemToRemoveIndex, 1);
    
      // Xóa phần tử trên giao diện
      tr.remove();
    } else {
      console.log('Không tìm thấy phần tử cần xóa trong danh sách.');
    }
});
});
function formatDateString(inputDate) {
  // Tạo đối tượng Date từ chuỗi đầu vào
  const dateObject = new Date(inputDate);

  // Định dạng lại ngày tháng
  const formattedDate = dateObject.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'
  });

  return formattedDate;
}
$('.btn-close-modal').on('click', function() {
    $('.title-box-request').empty();
    $('.list-inve-avai').empty();
    $('.second-inventory').empty();
});

// $('.btn-add-import').on('click', function() {
//   console.log('hehe');
// });
$(document).ready(function() {
    $('.btn-warehouse').on('click', function() {
        // Xóa class 'active' khỏi tất cả các nút
        $('.btn-warehouse').removeClass('active');
        // Thêm class 'active' vào nút được nhấn
        $(this).addClass('active');
    });
$('.btn-warehouse').on('click', function() {
        var id = $(this).attr('id');
        var name = $(this).text().trim();
    
        console.log('ID:', id);
        console.log('Name:', name);
        sendDataWareHouse(id);
      });
      function sendDataWareHouse(id) {
        $.ajax({
            url: '/inventory/details/'+id,
            method: 'GET',
            success: function(response) {
                updateTable(response.data);
            },
            error: function(error) {
                console.error('Error:', error);
            }});
    }
    function updateTable(data) {
        var tbody = $('#box');
      
        // Xóa tất cả các hàng hiện tại
        tbody.empty();
      
        // Thêm các hàng mới từ dữ liệu
        data.forEach(function(item) {
          var row = '<tr>' +
            '<td><strong>' + item.Name + '</strong></td>' +
            '<td class="me-2">' + formatDateString(item.Date) + '</td>' +
            '<td class="me-2">' + item.EmployeeName + '</td>' +
            '<td class="pe-4">' +
              '<div class="progress progress-sm">' +
                '<div class="progress-bar bg-warning" role="progressbar" style="width: '+Math.round((item.Quantity / item.OldQuantity) * 100)+'%" aria-valuenow="' + Math.round((item.Quantity / item.OldQuantity) * 100) + '" aria-valuemin="0" aria-valuemax="100">' + Math.round((item.Quantity / item.OldQuantity) * 100) + '%</div>' +
              '</div>' +
            '</td>' +
            '<td class="me-2">' + item.Quantity + '</td>' +
    
          '</tr>';
      
          tbody.append(row);
        });
      }
    var dataListInventoryProducts ;
      function sendDataGetProduct() {
        $.ajax({
            url: '/product/getsearch',
            method: 'GET',
            success: function(response) {

                dataListInventoryProducts = response.data;
                // console.log(dataListInventoryProducts);
            },
            error: function(error) {
                console.error('Error:', error);
            }});
    }

     sendDataGetProduct();
    $('#barcode').on('input', function () {
      const searchTerm = $(this).val().toLowerCase();
      console.log(searchTerm);
      const searchResults = $('#productResultsImport');
      displayResults(searchTerm,searchResults);
      
    });
    $('#barcodeExport').on('input', function () {
      const searchTerm = $(this).val().toLowerCase();
      console.log(searchTerm);
      const searchResults = $('#productResultsExport');
      displayResults(searchTerm,searchResults);
      
    });

    function displayResults(searchTerm,searchResults) {
      
      searchResults.empty();

      const filteredList = dataListInventoryProducts.filter(item =>
        item.Name.toLowerCase().includes(searchTerm) ||
        item.Barcode.includes(searchTerm)
      );
      filteredList.forEach(item => {
        const listItem = $('<li class="list-group-item resultItem"></li>');

        // Thêm thẻ img và span
        const barcodeElement = $('<span class="barcode  " style=" margin-left:5px;">' + item.Barcode  +  '</span>');

        const imageElement = $('<img src="' + item.Image + '" style="width:30px; height:30px ;margin-left:5px;" alt="Item Image" class="barcode-image  " /> ');
        const nameElement = $('<span class="item-name " style="margin-left:5px;" >' + item.Name + '</span>');

        // Thêm sự kiện click
        listItem.on('click', function () {
            $('#barcodeExport').val(item.Barcode);
            $('#barcode').val(item.Barcode);
            searchResults.empty().hide();

          // Thêm thông tin vào danh sách
          const selectedInfo = $('<li></li>');
          selectedInfo.append(imageElement);
          selectedInfo.append(nameElement);
          selectedInfo.append(barcodeElement);
          $('#productResults').append(selectedInfo);
        });

        // Thêm img và spa  n vào listItem
        listItem.append(imageElement);
        listItem.append(nameElement);
        listItem.append(barcodeElement);

        searchResults.append(listItem);
      });

      if (filteredList.length > 0) {
        searchResults.show();
      } else {
        searchResults.hide();
      }
    }

    $(('.resultItem')).on('click', function (event) {

      if (!$(event.target).closest(searchResults).length && !$(event.target).is('#barcode')) {
        searchResults.empty().hide();
      }
    });
    var dataListResult ;
    function isBarcodeInList(barcode, dataListInventoryProducts) {
        return dataListInventoryProducts.some(item => item.Barcode === barcode);
    }
    $('.btn-request-import').on('click', function() {
      console.log($('#barcode').val());
        const  Barcodes = $('#barcode').val();
        const Quantitys = $('#Quantity').val();
        if(!isBarcodeInList(Barcodes, dataListInventoryProducts)){
            alert("Sản phẩm không tồn tại");
            return ;
        }
        if(!Quantitys || !Barcodes){
            alert("Vui lòng Nhập đầy đủ thông tin");
            return ;
        }
        let datasssss = {
            Barcode : Barcodes,
            Quantity : Quantitys,
        }
        sendDataRequestImport(datasssss);
        console.log(dataListResult.success);
        $(".second-inventory").html(` 
        <div class="form-group col-3">
          <label for="nameInventory">Vị trí</label>
          <input type="text" id="nameInventory" placeholder="Nhập vị trí bạn muốn đặt hàng">
        </div>
    `);
    $('.btn-add-import').attr('type', 'button');
        if(dataListResult.success){
            
            if(dataListResult.type===3){
                


                return;
            }
            renderBoxAvai(dataListResult.result);
          
        }else {
            alert("Kho đã đầy");
            return ;
        }

    });
    function sendDataRequestImport(datasssss) {
        console.log(datasssss);
        $.ajax({
            url: '/import/request',
            type: 'POST',
            contentType: 'application/json',
            data :JSON.stringify(datasssss),

            success: function(response) {
                dataListResult = response;
                console.log(dataListResult);
            },
            error: function(error) {
                console.error('Error:', error);
            }});
    }
    function renderBoxAvai(dataListResultType1){
        const listContainer = $(".list-inve-avai");
        listContainer.empty();
        $(".title-box-request").html(` 
        <h4>Những Vị trí trong kho có thể để hàng</h4>
        <h6>Vui lòng chọn vị trí bên dưới hoặc nhập ví trị bạn muốn đặt hàng bên dưới</h6>
`);
        dataListResultType1.forEach(item => {
            const div = $("<div>").addClass("col-1");
            const a = $("<a>").addClass("btn btn-outline-primary btn-warehouse-submit")
                              .attr("id", item.Inventory_ID)
                              .text(item.Name);
    
            div.append(a);
            listContainer.append(div);
        });
    }
    function findInventoryByName(name) {
      return fetch('/inventory/find/' + name, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
              // Bạn có thể thêm các headers khác nếu cần
          },
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          return data;
      })
      .catch(error => {
        alert("Kiểm tra kết nối của bạn")
          console.error('Error:', error);
          return null;
      });
  }
  
  // Sử dụng hàm findInventoryByName bằng cách sử dụng then:

  
  $('.btn-add-import').on('click', async function() {
    let warehousename = $('.btn-warehouse-submit.active').text().trim();
    let idbox;
    console.log(warehousename);
    if (!warehousename) {
        warehousename = $('#nameInventory').val().trim();
        try {
            const result = await findInventoryByName(warehousename);
            if (!result.success) {
                alert("Kho không tồn tại");
                return;
            }
            idbox = result.data.Inventory_ID;
        } catch (error) {
            console.error('Error:', error);
            return;
        }
    } else {
        idbox = $('.btn-warehouse-submit.active').attr('id');
    }
    console.log(idbox);

    let QuantityItems = $('#Quantity').val();
    let items = dataListInventoryProducts.find(item => item.Barcode === $('#barcode').val());

    if (!items) {
        alert("Sản phẩm không tồn tại trong kho");
        return;
    }

    let tablewarehouseimport = $('.tableinforwarehouseimport');
    tablewarehouseimport.append(
        `
        <tr data-idbox="${idbox}">
        <td>${items.Name}</td>
        <td>${QuantityItems}</td>
        <td>${items.Barcode}</td>
        <td>${warehousename}</td>
        <td><button class="btn btn-outline-danger btn-remove-row-box-list">Remove</button></td>
    </tr>
        `
    );

    $('.title-box-request').empty();
    $('.list-inve-avai').empty();
    $('.second-inventory').empty();
    $('.btn-add-import').attr('type', 'hidden');});
async function sendDataSaveImport(data) {
    $.ajax({
        url: '/import',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
           
            alert("Đã lưu thành công");
            $('.tableinforwarehouseimport').empty();
            $('#Import').modal('hide');
        },
        error: function(error) {
            console.error('Error:', error);
            alert("Kiểm tra kết nối của bạn");
        }
    });
    }
$('.btn-submit-save-import').on('click', function() {
    const rows = $('.tableinforwarehouseimport tr');
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const row = $(rows[i]);
        const idbox = row.data('idbox');
        const quantity = row.children()[1].innerText;
        const barcode = row.children()[2].innerText;
        const warehousename = row.children()[3].innerText;
        data.push({
          Inventory_ID: idbox,
            Quantity: quantity,
            barcode: barcode,
        });
    }
    if(data.length === 0){
      alert("Vui lòng chọn sản phẩm cần nhập");
      return; 
    }
    sendDataSaveImport(data);
});
async function sendDataRequestExport(barcode, quantity) {
  try {
    const response = await $.ajax({
      url: '/export/request',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ Barcode: barcode, Quantity: quantity }),
    });

    console.log(response);
    console.log(response.Product);
    if (response.success) {
      renderBoxAvaiExport(response.data,response.Product);
      return true;
    } else {
      console.log(response.message);
      alert(response.message);

      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Kiểm tra kết nối của bạn");
  }
}
  var requestExportProduct =[];

  function renderBoxAvaiExport(data,productData){
    console.log(data);
    let listContainer = $(".list-inve-avai-export");
    listContainer.empty();
    listContainer.html(`
    <table class="table ">
    <thead>
        <tr>
            <th>Tên</th>
            <th>BarCode</th>
            <th>Số Lượng</th>
            <th>Vi Trị</th>
            <th>Ngày Nhập Kho</th>
        </tr>
    </thead>
    <tbody class="request-export-table">
        
    </tbody>
  </table>`)
    $(".title-box-request-export").html(` 
    <h4>Những Vị trí trong kho có thể Xuất hàng</h4>
    <h6>Vui lòng chọn vị trí được đề xuất hoặc nhập ví trị bạn muốn Xuất hàng bên dưới</h6>
  `);
  let listExportavailable = $('.request-export-table');
  listExportavailable.empty();
  requestExportProduct = [];
  data.forEach(item => {
    requestExportProduct.push(
      {
        Inventory_ID : item.Inventory_ID,
        ProductName : productData.Name,
        ProductBarcode : productData.Barcode,
        Quantity : item.Quantity,
        InventoryName : item.InventoryName,
        Date : formatDateString(item.Date),
      }
      );
    listExportavailable.append(
      `
      <tr data-idbox="${item.Inventory_ID}">
          <td>${productData.Name}</td>
          <td>${productData.Barcode}</td>
          <td>${item.Quantity}</td>
          <td>${item.InventoryName}</td>
          <td>${formatDateString(item.Date)}</td>
      </tr>
      `);
    });
    $(".second-inventory-export").html(` 
    <div class="form-group col-3">
      <label for="nameInventoryExport">Vị trí</label>
      <input type="text" id="nameInventoryExport" placeholder="Nhập vị trí bạn muốn xuất hàng">
    </div>
`);
$('.btn-add-export').attr('type', 'button');

  }
$('.btn-request-export').on('click', async function() {
    let barcode = $('#barcodeExport').val().trim();
    let quantity =  $('#QuantityExport').val().trim();
    
    let result =  sendDataRequestExport(barcode,quantity);
    if(!result){
      return;
    }
  

});
function addItemsToExportList(data){
  ListProductExport.push(data);
  let tablelistExport = $('.tableinforwarehouseexport');
  tablelistExport.append(
      `
      <tr data-idbox="${data.Inventory_ID}">
      <td>${data.ProductName}</td>
      <td>${data.ProductBarcode}</td>

      <td>${data.Quantity}</td>
      <td>${data.InventoryName}</td>
      <td>${data.Date}</td>
      <td><button class="btn btn-outline-danger btn-remove-row-box-list">Remove</button></td>
}`);
}
async function findProductInInventory(data) {
  try {
    const response = await fetch(`/inventory/find/${data.InventoryName}/${data.ProductBarcode}/${data.Quantity}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData.success) {
      return {
        success: true,
        data: responseData.data,
      };
    } else {
      alert(responseData.message);
    
      return {
        success: false,
        data: responseData.data,
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}


$('.btn-add-export').on('click', async function() {
  let barcode = $('#barcodeExport').val().trim();
  let quantity = $('#QuantityExport').val().trim();
  let ProductName = dataListInventoryProducts.filter(item => item.Barcode === barcode)[0].Name;
  let secondInventoryExport = $('#nameInventoryExport').val().trim();
  let dataExport;
  if(secondInventoryExport){
    let date ;
    let idbox;
        try {
          const dataFind = {
            InventoryName : secondInventoryExport,
            ProductBarcode : barcode,
            Quantity : quantity,
          }
          const result = await findProductInInventory(dataFind);
          console.log(result);
          
          if (!result.success) {
              return;
          }
          date = result.data.Date;
          idbox = result.data.Inventory_ID;
      } catch (error) {
          console.error('Error:', error);
          return;
      }
      dataExport = {
        Inventory_ID: idbox,
        ProductName: ProductName,
        ProductBarcode: barcode,
        Quantity: quantity,
        InventoryName: secondInventoryExport,
        Date : formatDateString(date),
      };
      addItemsToExportList(dataExport); 
  }else{
    requestExportProduct.forEach(item => {
      addItemsToExportList(item);
    })
  }
  $('.title-box-request-export').empty();
  $('.list-inve-avai-export').empty();
  $('.second-inventory-export').empty();
  $('.btn-add-export').attr('type', 'hidden');

});
async function saveDataExportProduct(dataExport){
  try {
    const response = await $.ajax({
      url: '/export',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataExport),
    });

    console.log(response);

    if (response.success) {
      if(response.data.length === 0){
        alert("Đã lưu thành công");

      }
      
      $('.tableinforwarehouseexport').empty();
      $('#Export').modal('hide');
    } else {
      alert(response.message);
    }
    response.data.forEach(item => {
      alert(item.message);
    })
  } catch (error) {
    console.error('Error:', error);
    alert("Kiểm tra kết nối của bạn");
  }
}
$('.btn-submit-save-export').on('click', async function(){
  if(ListProductExport.length === 0){
    alert("Vui lòng chọn sản phẩm cần xuất");
    return;
  }
  // console.log(dataListInventoryProducts);
  ListProductExport.forEach(item => {
    item.Product_ID = dataListInventoryProducts.filter(product => product.Barcode === item.ProductBarcode)[0].Product_ID;
  })
  // console.log(ListProductExport);
  // return false;
  saveDataExportProduct(ListProductExport);
  
  ListProductExport = [];
})
});
    
