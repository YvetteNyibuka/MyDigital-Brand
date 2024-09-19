document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form1");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("loginBtn");
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      showError(emailInput, "Invalid email address");
    } else {
      hideError(emailInput);
    }

    submitBtn.disabled = !isValid;
    if (!isValid) {
      return;
    }
    const loginData = {
      email: emailInput.value,
      password: passwordInput.value
    };

    try {
      showLoader();
      const response = await fetch(
        "https://mybrand-be-rs6b.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        const returnData = await response.json();
        if (response.status == 400 || response.status == 500) {
          Toastify({
            text: `${returnData.message}`,
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
        const returnData = await response.json();
         Toastify({
          text: `${returnData.message}`,
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

        localStorage.setItem("loggedUser", JSON.stringify(returnData));
        setTimeout(() => {
          if (returnData.user.role == "admin") {
            window.location.href = "../pages/adminPannel.html";
          } else {
            window.location.href = "../index.html";
          }
        }, 3000); 
      }

      hideLoader();
    } catch (err) {
      console.log("Error: ", err);
      hideLoader();
    }
  });

  function showError(inputElement, errorMessage) {
    const errorElement = document.createElement("small");
    errorElement.textContent = errorMessage;
    errorElement.style.color = "red";
    errorElement.classList.add("error-message");
    errorElement.style.fontSize = "10px";
    errorElement.style.textAlign = "left";

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
