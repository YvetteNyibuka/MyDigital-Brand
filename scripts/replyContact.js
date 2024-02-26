const replyModal = document.getElementById("replyModal");
const closeBtnn = document.getElementById("close");
const replyBtn = document.getElementById("replyBtne");

function openModal() {
  replyModal.style.display = "block";
}

function closeModal() {
  replyModal.style.display = "none";
}

replyBtn.addEventListener("click", openModal);
closeBtnn.addEventListener("click", closeModal);

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("modalreply")) {
    closeModal();
  }
});
