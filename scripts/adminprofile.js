document.addEventListener("DOMContentLoaded", function () {
  const userDetailsForm = document.getElementById("userDetails");
  const updateBtn = document.getElementById("updateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  updateBtn.addEventListener("click", function () {
    // Switch to edit mode
    userDetailsForm.classList.remove("read-only-mode");
    updateBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  cancelBtn.addEventListener("click", function () {
    userDetailsForm.classList.add("read-only-mode");
    updateBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });

  // Additional logic for the Save button can be added here
});
