document.addEventListener("DOMContentLoaded", function () {
  // if (publishedBlogs.length > 0) {
  //   console.log("all blogs", publishedBlogs);
  //   document.getElementById("author1").innerHTML = publishedBlogs[0].author;
  //   document.getElementById("blogdescc").innerHTML = publishedBlogs[0].blogContent;

  // }

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

  // blogs rendering
  const publishedBlogs =
    JSON.parse(localStorage.getItem("publishedBlogs")) || [];
  console.log("all blogs", publishedBlogs);

  publishedBlogs.forEach((blog, index) => {
    const blogCard = document.getElementById("blogs-wrapper");
    blogCard.innerHTML += ` <div class="blog-card" id="blog-card">
                      <div class="blog-img" id="blog-img">
                  <img src=${blog.image} alt="">
                 </div>
          <div class="blog-descrption">
            <p id="blogdescc">${blog.blogContent.slice(
              0,
              100
            )}... <a id="leanmore" href="./pages/singleblog.html?id=${blog.blogid}">Learn More</a></button>
            </p>
          </div>
          <div class="blog-info">
            <p id="author1">${blog.author}</p>
            <p>on 19 Jan 2024</p>
          </div>
          <div class ="blog-statistics">
            <p>❤️ 120</p>
            <p>💬 50</p>
            <p>👁️ 1050</p>
          </div>
        </div>
        </div>
        `;
  });

  //blog sliderssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  let currentSlideup = 0;

  function showSlide1(n) {
    const blogElement = document.querySelectorAll(".blog-card");
    const totalSlides = blogElement.length;

    blogElement.forEach((element) => {
      element.style.display = "none";
    });

    currentSlideup = (n + totalSlides) % totalSlides;

    for (let i = 0; i < 4; i++) {
      const index = (currentSlideup + i) % totalSlides;
      blogElement[index].style.display = "flex";
    }
  }

  function nextSlide1() {
    showSlide1(currentSlideup + 1);
  }

  function prevSlide1() {
    showSlide1(currentSlideup - 1);
  }

  showSlide1(currentSlideup);

  const nextBtn = document.querySelector(".nextBtn"); 
  const prevBtn = document.querySelector(".prevBtn"); 
  nextBtn.addEventListener("click", nextSlide1); 
  prevBtn.addEventListener("click", prevSlide1); 
});
