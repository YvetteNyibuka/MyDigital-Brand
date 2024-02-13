  document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".fa-solid.fa-bars");
    const skillsSummary = document.querySelector(".skills-summary");

    menuIcon.addEventListener("click", function () {
      skillsSummary.classList.toggle("show-skills-summary");
    });
  });
