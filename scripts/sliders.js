document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");
  const fullNameInput = document.getElementById("full-names");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("contactbtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  // Add input event listeners for dynamic validation
  fullNameInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  subjectInput.addEventListener("input", validateForm);
  messageInput.addEventListener("input", validateForm);

  function validateForm() {
    let isValid = true;

    // Validate Full Name
    if (fullNameInput.value.trim() === "") {
      isValid = false;
      showError(fullNameInput, "Please enter your full name");
    } else {
      hideError(fullNameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Invalid email address");
    } else {
      hideError(emailInput);
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
      isValid = false;
      showError(subjectInput, "Please enter a subject");
    } else {
      hideError(subjectInput);
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      isValid = false;
      showError(messageInput, "Please enter your message");
    } else {
      hideError(messageInput);
    }

    // Enable or disable the submit button based on validation
    submitBtn.disabled = !isValid;
  }

  function showError(inputElement, errorMessage) {
    const errorElement = document.createElement("small");
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    errorElement.classList.add("error-message");
    errorElement.style.fontSize = "10px";
    errorElement.style.textAlign = "left";

    const inputGroup = inputElement.closest(".inputgroup");
    // Remove existing error messages before appending a new one
    const existingError = inputGroup.querySelector(".error-message");
    if (existingError) {
      inputGroup.removeChild(existingError);
    }
    inputGroup.appendChild(errorElement);
  }

  function hideError(inputElement) {
    const inputGroup = inputElement.closest(".inputgroup");
    const errorElement = inputGroup.querySelector(".error-message");

    if (errorElement) {
      inputGroup.removeChild(errorElement);
    }
  }
});
