document.addEventListener("DOMContentLoaded", function () {
  const replyButtons = document.querySelectorAll(".reply-btn");

  replyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const commentContainer = this.closest(".createdcomment");
      const replySection = commentContainer.querySelector(".reply-section");
      replySection.classList.toggle("show-reply-section");
    });
  });

  const cancelReplyButtons = document.querySelectorAll(".cancel-reply");

  cancelReplyButtons.forEach(function (cancelButton) {
    cancelButton.addEventListener("click", function () {
      const commentContainer = this.closest(".createdcomment");

      const replySection = commentContainer.querySelector(".reply-section");
      replySection.classList.remove("show-reply-section");
    });
  });
});
