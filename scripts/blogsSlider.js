// let currentSlideup = 0;

// function showSlide1(n) {
//   const blogElement = document.querySelectorAll(".blog-card");
//   const totalSlides = blogElement.length;

//   blogElement.forEach((element) => {
//     element.style.display = "none";
//   });

//   currentSlideup = (n + totalSlides) % totalSlides;

//   for (let i = 0; i < 4; i++) {
//     const index = (currentSlideup + i) % totalSlides;
//     blogElement[index].style.display = "flex";
//   }
// }

// function nextSlide1() {
//   showSlide1(currentSlideup + 1);
// }

// function prevSlide1() {
//   showSlide1(currentSlideup - 1);
// }

// showSlide1(currentSlideup);
