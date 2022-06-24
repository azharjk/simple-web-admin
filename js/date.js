function renderClock(selector) {
  const date = new Date();

  let hh = date.getHours();
  let mm = date.getMinutes();
  let session = "AM";

  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
    
   let time = hh + ":" + mm + " " + session;
   $(selector).text(time);

   // Recursively render the clock every second
   setTimeout(() => { renderClock(selector) }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();

  $('#date').text(formatDate(today));

  renderClock('#time');
});