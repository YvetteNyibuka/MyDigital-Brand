document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "#blogContent",
    plugins:
      "autolink lists link image charmap print preview hr anchor pagebreak",
    height: 300,
    branding: false,
  });

  const blogForm = document.getElementById("blogForm");
  const createblogBtn = document.getElementById("createblogBtn");

  blogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate every input is filled
    let isValid = validateForm();

    if (isValid) {
      const title = document.getElementById("blogTitle").value;
      const content = tinymce.get("blogContent").getContent();
    }
  });

  createblogBtn.addEventListener("click", function (event) {
    blogForm.dispatchEvent(new Event("submit"));
  });

  function validateForm() {
    let isValid = true;
    const inputs = blogForm.querySelectorAll(
      "#blogForm input, #blogForm textarea"
    );

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        showError(input, "Field is required");
      } else {
        hideError(input);
      }
    });

    return isValid;
  }

  function showError(inputElement, errorMessage) {
    const errorElement = document.createElement("small");
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
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
