function formatDate(date) {
  const dateObj = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1;
  let yyyy = dateObj.getFullYear();

  if (dd < 10) dd = '0' + dd;

  return `${days[dateObj.getDay()]}, ${dd} ${months[mm]} ${yyyy}`;
}

function createNotificationCard(date, content, status) {
  let color = '';

  switch (status) {
    case 'DANGER': color = 'danger'; break;
    case 'WARNING': color = 'warning'; break;
    case 'SAFE': color = 'success'; break;
  }

  return `<div class="d-flex border border-${color} p-2 align-items-center">
          <div class="me-4">
            <span class="d-block bg-${color} rounded-circle" style="width: 50px; height: 50px;"></span>
          </div>
          <div>
            <span class="text-uppercase text-${color}">${formatDate(date)}</span>
            <p class="p-0 m-0">${content}</p>
          </div>
        </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const notificationBtn = $('#notification-btn');

  function openNotificationDrawer(data) {
    $('#drawer').css('width', '450px');

    $('#drawer-title').text('Notifications');

    data.map(v => {
      $('#drawer-data').append(createNotificationCard(v.created_at, v.content, v.status));
    });
  }

  function closeNotificationDrawer() {
    $('#drawer').css('width', '0px');
    $('#drawer-data').empty();
  }

  function renderNotificationButton(data) {
    notificationBtn.text(`${data.length} notifications`);

    notificationBtn.click(function () {
      openNotificationDrawer(data);
    });

    $('#drawer-close-btn').click(closeNotificationDrawer);
  }

  $.ajax('/api/notifications5.json', {
    success: function (data, status, xhr) {
      renderNotificationButton(data);
    }
  });
});