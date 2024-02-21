let currentSlide = 0;

function showSlide(n) {
  const testimonial1Elements = document.querySelectorAll(".testimonial1");
  const totalSlides = testimonial1Elements.length;

  // Hide all testimonial1 elements
  testimonial1Elements.forEach((element) => {
    element.style.display = "none";
  });

  // Calculate the new slide index
  currentSlide = (n + totalSlides) % totalSlides;

  // Show only 4 testimonial1 elements starting from the current slide
  for (let i = 0; i < 4; i++) {
    const index = (currentSlide + i) % totalSlides;
    testimonial1Elements[index].style.display = "flex";
  }
}

function nextSlide() {
  showSlide(currentSlide + 4);
}

function prevSlide() {
  showSlide(currentSlide - 4);
}

// Initial display
showSlide(currentSlide);
