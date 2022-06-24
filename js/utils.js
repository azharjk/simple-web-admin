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

// FIXME: Need some way to make the drawer close when its get open again. 
function openDrawer(data, renderFn, title) {
  $('#drawer').css('width', '450px');

  $('#drawer-title').text(title);

  $('#drawer-data').empty();
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

// FIXME: Can it be one single function??
const onSeriesDataClick = (id, instanceTable, renderFns) => {
  let chosenData;
  let table = instanceTable;
  console.log(table);

  table.data().map((data) => {
    if (data.id === id) chosenData = data;
  });

  table.clear();
  table.rows.add([chosenData]);
  table.draw();

  renderFns.map((renderFn) => {
    renderFn([chosenData]);
  });
}
