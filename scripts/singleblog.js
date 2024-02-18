
  document.addEventListener('DOMContentLoaded', function () {
    // Get all reply buttons
    const replyButtons = document.querySelectorAll('.reply-btn');

    // Add click event listeners to each reply button
    replyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the parent comment container
        const commentContainer = this.closest('.createdcomment');

        // Toggle the visibility of the reply section
        const replySection = commentContainer.querySelector('.reply-section');
        replySection.classList.toggle('show-reply-section');
      });
    });

    // Get all cancel reply buttons
    const cancelReplyButtons = document.querySelectorAll('.cancel-reply');

    // Add click event listeners to each cancel reply button
    cancelReplyButtons.forEach(function (cancelButton) {
      cancelButton.addEventListener('click', function () {
        // Get the parent comment container
        const commentContainer = this.closest('.createdcomment');

        // Hide the reply section
        const replySection = commentContainer.querySelector('.reply-section');
        replySection.classList.remove('show-reply-section');
      });
    });
  });
