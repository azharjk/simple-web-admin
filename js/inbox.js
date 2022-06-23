function createInboxCard(data) {
  const date = data.created_at;
  const content = data.content;

  return `<div class="d-flex border p-2 align-items-center border-primary">
            <div class="me-4">
              <span class="d-block border border-primary" style="width: 50px; height: 50px;"></span>
            </div>
            <div>
              <span class="text-uppercase" style="font-weight: bold;">${formatDate(date)}</span>
              <p class="p-0 m-0">${content}</p>
            </div>
          </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const inboxBtn = $('#inbox-btn');

  function renderInboxButton(data) {
    inboxBtn.text(`${data.length} inbox`);

    inboxBtn.click(function () {
      openDrawer(data, createInboxCard, 'Inbox');
    });
  }

  function bindFilterInbox(data) {
    $('#inbox-search-input').on('input', function () {
      const value = $(this).val();

      // Search is case sensitive
      const result = data.filter((v) => {
        return v.content.includes(value);
      });

      setTimeout(() => {
        $('#inbox-container').empty();
        renderList('#inbox-container', result, createInboxCard);
      }, 500);
    });
  }

  $.ajax('/api/inbox5.json', {
    success: function (data, status, xhr) {
      renderInboxButton(data);
      renderList('#inbox-container', data, createInboxCard);
      bindFilterInbox(data);
    }
  });
});