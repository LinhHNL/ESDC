const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('formatSalary', function(salary) {
  return salary + ' VND';
});

Handlebars.registerHelper('formatStatus', function(status) {
  if (status === 0) {
    return 'Nghỉ làm';
  } else if (status === 1) {
    return 'Đang làm việc';
  } else {
    return 'Trạng thái không xác định';
  }
});

Handlebars.registerHelper('formatDateTime', function(dateTimeString) {
  const formattedDateTime = moment(dateTimeString).format('HH:mm:ss DD/MM/YYYY');
  return formattedDateTime;
})
Handlebars.registerHelper('formatDate', function(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`;
  });
  Handlebars.registerHelper('checktype', function(type) {
      let result = '';
    if (type === 'import') {
      result = ' Đã Nhập Hàng Vào Kho ';
    } else if (type === 'export') {
      result = ' Đã Xuất hàng ra khỏi kho ';
    }
    return  new Handlebars.SafeString(result);
  });
  Handlebars.registerHelper('add', function(value1, value2) {
    return parseInt(value1, 10) + parseInt(value2, 10);
  });
  
  Handlebars.registerHelper('sub', function(value1, value2) {
    return parseInt(value1, 10) - parseInt(value2, 10);
  });
  Handlebars.registerHelper('checkQuantity', function(quantity) {
    if (quantity > 0) {
      return new Handlebars.SafeString('<span class="badges bg-lightgreen">Còn hàng</span>');
    } else {
      return new Handlebars.SafeString('<span class="badges bg-lightred">Hết hàng</span>');
    }
  });
  Handlebars.registerHelper('gt', function(a, b) {
    return a > b;
  });