document.addEventListener("DOMContentLoaded", async function () {

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

  // Fetch blogs from server

  async function fetchBlogs() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.token) {
      console.error("Invalid or missing token");
      return;
    }
    const token = loggedUser.token;

    try {
      const response = await fetch("https://cyan-powerful-chick.cyclic.app/api/v1/blogs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      // console.log("Got blog data", data);
      renderBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }


  await fetchBlogs()

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Render blogs
  function renderBlogs(blogs) {
    const blogCardContainer = document.getElementById("blogs-wrapper");
    blogCardContainer.innerHTML = ""; 
    console.log("================================", blogs?.data);
    blogs?.data?.forEach(blog => {
      blogCardContainer.innerHTML+= `
        <div class="blog-card">
          <div class="blog-img">
            <img src="${blog?.coverImage}" alt="">
          </div>
          <div class="blog-description">
            <p>${blog?.description?.slice(0, 100)}... <a href="./pages/singleblog.html?id=${blog?._id}">Learn More</a></p>
          </div>
          <div class="blog-info">
            <p>${blog?.author ? blog?.author :'Yvette'}</p>
            <p>on ${(formatDate(blog?.createdAt))}</p>
          </div>
          <div class="blog-statistics">
            <p>❤️ ${blog?.likes}</p>
            <p>💬 ${blog?.comments?.length}</p>
          </div>
        </div>
      `;
      // blogCardContainer.insertAdjacentHTML("beforeend", blogCard);
      // console.log(blogCard);

    });
  }



  // Blog slider
  let currentSlide = 0;

  function showSlide(n) {
    const blogCards = document.querySelectorAll(".blog-card");
    const totalSlides = blogCards.length;

    blogCards.forEach(card => {
      card.style.display = "none";
    });

    currentSlide = (n + totalSlides) % totalSlides;

    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % totalSlides;
      blogCards[index].style.display = "flex";
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  showSlide(currentSlide);

  const nextBtn = document.querySelector(".nextBtn");
  const prevBtn = document.querySelector(".prevBtn");
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

});
