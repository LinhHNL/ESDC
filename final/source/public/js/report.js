$(document).ready(function () {
    $('#formdate').submit(function (event) {
      event.preventDefault();

      const day = $('#dayInput').val();
      const month = $('#monthInput').val();
      const year = $('#yearInput').val();
        
      if (day && !month && !year) {
        // Người dùng chỉ nhập ngày
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const currentYear = currentDate.getFullYear();
        // Fill tháng và năm theo hiện tại
        $('#monthInput').val(currentMonth);
        $('#yearInput').val(currentYear);
      } else if (day && month && !year) {
        const currentYear = new Date().getFullYear();
        $('#yearInput').val(currentYear);
      } else if (!day && month && !year) {
        const currentYear = new Date().getFullYear();

        $('#yearInput').val(currentYear);

      }
      $('#formdate').off('submit').submit();

    });
  });