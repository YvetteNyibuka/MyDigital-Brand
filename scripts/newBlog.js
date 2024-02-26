document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "#blogContent",
    plugins:
      "autolink lists link image charmap print preview hr anchor pagebreak",
    height: 300,
    branding: false,
  });


  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#blogForm");
    const blogCategoryInput = document.getElementById("blogcategory");
    const authorInput = document.getElementById("author");
    const blogTitleInput = document.getElementById("blogTitle");
    const blogContentInput = document.getElementById("blogContent");
    const imageInput = document.getElementById("blogImage"); // Add this line
    const submitBtn = document.getElementById("createblogBtn");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      validateForm();
    });

    // Add input event listeners for dynamic validation
    blogCategoryInput.addEventListener("input", validateForm);
    authorInput.addEventListener("input", validateForm);
    blogTitleInput.addEventListener("input", validateForm);
    blogContentInput.addEventListener("input", validateForm);
    imageInput.addEventListener("input", validateForm); // Add this line


    // Validate every input is filled
    let isValid = validateForm();

    if (isValid) {
      // Form submission logic goes here
      const title = document.getElementById("blogTitle").value;
      const content = tinymce.get("blogContent").getContent();

      // Example: Log the data to the console
      console.log("Title:", title);
      console.log("Content:", content);
    }
  });

  createblogBtn.addEventListener("click", function (event) {
    // Trigger form submission when the button is clicked
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
