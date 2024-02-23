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

    function validateForm() {
      let isValid = true;

      // Validate Blog Category
      if (blogCategoryInput.value.trim() === "") {
        isValid = false;
        showError(blogCategoryInput, "Please enter the blog category");
      } else {
        hideError(blogCategoryInput);
      }

      // Validate Author
      if (authorInput.value.trim() === "") {
        isValid = false;
        showError(authorInput, "Please enter the author name");
      } else {
        hideError(authorInput);
      }

      // Validate Blog Title
      if (blogTitleInput.value.trim() === "") {
        isValid = false;
        showError(blogTitleInput, "Please enter the blog title");
      } else {
        hideError(blogTitleInput);
      }

      // Validate Blog Content length
      if (blogContentInput.value.trim().length < 250) {
        isValid = false;
        showError(
          blogContentInput,
          "Blog content must be at least 250 characters long"
        );
      } else {
        hideError(blogContentInput);
      }

      // Validate Image input
      if (imageInput.files.length === 0) {
        isValid = false;
        showError(imageInput, "Please select a blog cover photo");
      } else {
        hideError(imageInput);
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

      const inputParent = inputElement.parentElement;
      // Remove existing error messages before appending a new one
      const existingError = inputParent.querySelector(".error-message");
      if (existingError) {
        inputParent.removeChild(existingError);
      }
      inputParent.appendChild(errorElement);
    }

    function hideError(inputElement) {
      const inputParent = inputElement.parentElement;
      const errorElement = inputParent.querySelector(".error-message");

      if (errorElement) {
        inputParent.removeChild(errorElement);
      }
    }
  });
});
