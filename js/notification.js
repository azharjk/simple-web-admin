function createNotificationCard(data) {
  const status = data.status;
  const content = data.content
  const date = data.created_at;

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
  const notificationBtn = $('.js-notification-btn');

  function renderNotificationButton(data) {
    notificationBtn.each(function (idx, obj) {
      const elem = $(obj);

      if (elem.hasClass('js-only-length')) {
        elem.text(`${data.length}`);
      } else {
        elem.text(`${data.length} notifications`);
      }
    });

    notificationBtn.click(function () {
      openDrawer(data, createNotificationCard, 'Notifications');
    });
  }

  function renderCheckboxChange(data) {
    const result = [];

    const isDanger = $('#notification-checkbox-danger')[0].checked;
    const isWarning = $('#notification-checkbox-warning')[0].checked;
    const isSafe = $('#notification-checkbox-safe')[0].checked;

    if (isDanger) {
      data.map((v) => {
        if (v.status === 'DANGER') {
          result.push(v);
        }
      });
    }
    if (isWarning) {
      data.map((v) => {
        if (v.status === 'WARNING') {
          result.push(v);
        }
      });
    }
    if (isSafe) {
      data.map((v) => {
        if (v.status === 'SAFE') {
          result.push(v);
        }
      });
    }

    $('#notification-container').empty();
    renderList('#notification-container', result, createNotificationCard);
  }

  function bindFilterNotification(data) {
    $('#notification-search-input').on('input', function () {
      const value = $(this).val();

      // Search is case sensitive
      const result = data.filter((v) => {
        return v.content.toLowerCase().includes(value.toLowerCase());
      });

      setTimeout(() => {
        $('#notification-container').empty();
        renderList('#notification-container', result, createNotificationCard);
      }, 500);
    });

    $('#notification-checkbox-danger').change(function () {
      renderCheckboxChange(data);
    });

    $('#notification-checkbox-warning').change(function () {
      console.log('warning: ', this.checked);
      renderCheckboxChange(data);
    });

    $('#notification-checkbox-safe').change(function () {
      console.log('safe: ', this.checked);
      renderCheckboxChange(data);
    });

    renderCheckboxChange(data);
  }

  $.ajax('/api/notifications5.json', {
    success: function (data, status, xhr) {
      renderNotificationButton(data);
      renderList('#notification-container', data, createNotificationCard);
      bindFilterNotification(data);
    }
  });
});