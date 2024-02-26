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

  fullNameInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  subjectInput.addEventListener("input", validateForm);
  messageInput.addEventListener("input", validateForm);

  function validateForm() {
    let isValid = true;

    if (fullNameInput.value.trim() === "") {
      isValid = false;
      showError(fullNameInput, "Please enter your full name");
    } else {
      hideError(fullNameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Invalid email address");
    } else {
      hideError(emailInput);
    }

    if (subjectInput.value.trim() === "") {
      isValid = false;
      showError(subjectInput, "Please enter a subject");
    } else {
      hideError(subjectInput);
    }

    if (messageInput.value.trim() === "") {
      isValid = false;
      showError(messageInput, "Please enter your message");
    } else {
      hideError(messageInput);
    }

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
