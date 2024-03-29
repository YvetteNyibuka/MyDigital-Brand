document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupform");
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signupBtn");
  const loader = document.querySelector(".loaderOverlay");

  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let isValid = true;

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(fullnameInput.value)) {
      isValid = false;
      showError(fullnameInput, "Name cannot contain numbers");
    } else {
      hideError(fullnameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Invalid email address");
    } else {
      hideError(emailInput);
    }

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

    if (!isValid) {
      return;
    }

    const formData = {
      names: fullnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      showLoader();
      const response = await fetch(
        "https://cyan-powerful-chick.cyclic.app/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        if (response.status == 409 || response.status == 500) {
          Toastify({
            text: `${responseData.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            backgroundColor: "red",
            onClick: function () { }
          }).showToast();
        }
      } else {
        if (responseData && responseData.message) {
          Toastify({
            text: `${responseData.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            backgroundColor: "green",
            onClick: function () { }
          }).showToast();          
          console.log('response: ', responseData);
        }

        fullnameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

        setTimeout(() => {
          window.location.href = "./login.html";
        }, 3000); 
      }

      hideLoader();
    } catch (error) {
      console.error("Error:", error);
      hideLoader();
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
