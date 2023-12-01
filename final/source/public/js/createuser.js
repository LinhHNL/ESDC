document.getElementById('file').addEventListener('change', function() {
    const fileName = this.files[0].name;
    document.getElementById('thongbaoanh').innerHTML = fileName;
  });
document.getElementById('createuser').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file');

    const salary = document.getElementById('Salary').value;
    const birthday = document.getElementById('BirthDay').value;
    const email = document.getElementById('Email').value;
    const name = document.getElementById('Name').value;
    const position = document.getElementById('position').value;
    if (!isValidEmail(email)) {
        alert('Vui lòng nhập đúng định dạng email');
        return;
      }
    if (!isNumber(salary)) {
      alert('Vui lòng chỉ điền số trong Lương');
      return;
    }
  
    if (!isValidDate(birthday)) {
      alert('Vui Lòng Nhập ngày sinh theo đúng định dạng dd/mm/yyyy');
      return;
    }
    const file = fileInput.files[0];
  if (!file.type.startsWith('image/') || !['image/jpeg', 'image/png'].includes(file.type)) {
    alert('Vui lòng chọn một hình ảnh có định dạng .jpg, .jpeg hoặc .png');
    return;
  }
  
  const reader = new FileReader();
  reader.onloadend = function() {
    const base64Image = reader.result;
    const data = {
        Name : name,
        Salary: salary,
        BirthDay: convertDateFormat(birthday),
        Email: email,
        Status: 1,
        Image: base64Image,
        Position_ID: position
    };
    // Gửi dữ liệu lên server
    fetch('/user/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        if (data.success) {
          alert('User created successfully');
          document.getElementById('createuser').reset(); // Clear the form
          document.getElementById('file').value = '';
        } else {
            alert('User created failed');
        }
      }).catch(error => {
        alert('Check your connect');

        console.error('Error:', error);
      });
    };
  reader.readAsDataURL(file);
});  
function convertDateFormat(inputDate) {
    const [day, month, year] = inputDate.split('/');
    return `${year}/${month}/${day}`;
  }
  function isNumber(value) {
    return !isNaN(value);
  }
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function isValidDate(date) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    return regex.test(date);
  }