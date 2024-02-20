document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("newBlogModal");
  var btn = document.getElementById("newBlogBtn");
  var closeBtn = document.getElementById("closeBtn1"); // Added close button

  btn.onclick = function () {
    console.log("User button clicked");
    modal.style.display = "block";
  };

  closeBtn.onclick = function () {
    console.log("Close button clicked");
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    console.log("Window clicked");
    if (event.target == modal) {
      console.log("Modal closed");
      modal.style.display = "none";
    }
  };
});
