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

function openDrawer(data, renderFn, title) {
  $('#drawer').css('width', '450px');

  $('#drawer-title').text(title);

  data.map(v => {
    $('#drawer-data').append(renderFn(v));
  });

  $('#drawer-close-btn').click(closeDrawer);
}

function closeDrawer() {
  $('#drawer').css('width', '0px');
  $('#drawer-data').empty();
}

function renderList(selector, data, renderFn) {
  data.map(v => {
    $(selector).append(renderFn(v));
  });
}
