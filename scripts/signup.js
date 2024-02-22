document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupform");
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signupBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    // Validate full name
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(fullnameInput.value)) {
      isValid = false;
      showError(fullnameInput, "Name cannot contain numbers");
    } else {
      hideError(fullnameInput);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Invalid email address");
    } else {
      hideError(emailInput);
    }

    // Validate password (you can reuse the existing password validation code)
    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
      isValid = false;
      showError(
        passwordInput,
        "Password should be 8 characters with uppercase, lowercase, numbers, and special characters."
      );
    } else {
      hideError(passwordInput);
    }
    // Enable or disable the submit button based on validation
    signupBtn.disabled = !isValid;

    // Prevent form submission if not valid
    if (!isValid) {
      event.preventDefault();
    }
  });

  function showError(inputElement, errorMessage) {
    const errorElement = document.createElement("small");
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    errorElement.style.fontSize = "10px";
    errorElement.style.textAlign = "left";
    errorElement.classList.add("error-message");

    const formGroup = inputElement.closest(".form-group");
    formGroup.appendChild(errorElement);
  }

  function hideError(inputElement) {
    const formGroup = inputElement.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
  }
});
