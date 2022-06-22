document.addEventListener('DOMContentLoaded', function () {
  const modal = $('#modal');

  function openModal() {
    modal.removeClass('d-none');
    modal.addClass('d-block');
  }

  function exitModal() {
    modal.removeClass('d-block');
    modal.addClass('d-none');
  }

  $('#modal-btn').click(openModal);

  $('#modal-exit-btn').click(exitModal);

  $(window).click(function (event) {
    if (modal[0] === event.target) {
      exitModal();
    }
  });
});