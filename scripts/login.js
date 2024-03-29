document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form1");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("loginBtn");
  const loader = document.querySelector(".loaderOverlay");
  const successMessage = document.getElementById("successMessage");

  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

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
        "https://cyan-powerful-chick.cyclic.app/api/v1/users/login",
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
        if (response.status == 400) {
          successMessage.textContent = returnData.message || "Bad Request";
        } else if (response.status == 500) {
          successMessage.textContent =
            returnData.message || "Something went wrong";
        }
        successMessage.style.display = "block"; 
      } else {
        const returnData = await response.json();
        successMessage.textContent = "Successfully logged in"; 
        successMessage.style.display = "block";

        localStorage.setItem("loggedUser", JSON.stringify(returnData));

        setTimeout(() => {
          if (returnData.user.role == "admin") {
            window.location.href = "../pages/adminPannel.html";
          } else {
            window.location.href = "../index.html";
          }
        }, 2000); 
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
