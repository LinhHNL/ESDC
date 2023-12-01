document.getElementById('file').addEventListener('change', function() {
    const fileName = this.files[0].name;
    document.getElementById('thongbaoanh').innerHTML = fileName;
  });
document.getElementById('edituser').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file');

    const employeeID = document.getElementById('user_id').value;
    const salary = document.getElementById('Salary').value;
    const birthday = document.getElementById('BirthDay').value;
    const email = document.getElementById('Email').value;
    const name = document.getElementById('Name').value;
    const position = document.getElementById('position').value;
    const status = document.getElementById('status').value;
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
   
  const data = {
    employeeID : employeeID,
    Name : name,
    Salary: salary,
    BirthDay: convertDateFormat(birthday),
    Email: email,
    Status: status,
    Position_ID: position
};
if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    if (!file.type.startsWith('image/') || !['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Vui lòng chọn một hình ảnh có định dạng .jpg, .jpeg hoặc .png');
        return;
    }
    const reader = new FileReader();
    reader.onloadend = function () {
        const base64Image = reader.result;
        data.Image = base64Image;

        sendData(data);
    };
    reader.readAsDataURL(file);
} else {
    const thongbaoanh = document.getElementById('thongbaoanhcu').value;

    // Assuming thongbaoanh is a text representation of the image name
    data.Image = thongbaoanh.trim();
    console.log(data.Image);
    sendData(data);
}
});
function sendData(data) {
    fetch('/user/updateEmployee', {
      method: 'PUT',
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
        alert('User updated successfully');
        window.location.href = '/user/getEmployees';
        document.getElementById('edituser').reset(); // Clear the form
        document.getElementById('file').value = ''; // Clear the file input
      } else {
        alert('User updated failed');
      }
    }).catch(error => {
        alert('User updated failed');

      console.error('Error:', error);
    });
  }