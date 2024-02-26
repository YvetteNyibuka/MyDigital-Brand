document.addEventListener("DOMContentLoaded", function () {
  let menuicn = document.querySelector(".icn-menuicn");
  let nav = document.querySelector(".navcontainer");
  let dashboardLink = document.getElementById("dashboard-link");
  let usersLink = document.getElementById("users-link");
  let blogsLink = document.getElementById("blogs-link");
  let profileLink = document.getElementById("profile-link");
  let logoutLink = document.getElementById("logout-link");
  let queriesLink = document.getElementById("query-link");

  let dashboardSection = document.getElementById("dashboard-section");
  let usersSection = document.getElementById("users-section");
  let blogsSection = document.getElementById("blogs-section");
  let messagesSection = document.getElementById("messages-section");
  let profileSection = document.getElementById("profile-section");
  let logoutSection = document.getElementById("logout-section");

  dashboardLink.addEventListener("click", () => {
    showSection(dashboardSection);
  });

  usersLink.addEventListener("click", () => {
    showSection(usersSection);
  });

  blogsLink.addEventListener("click", () => {
    showSection(blogsSection);
  });

  queriesLink.addEventListener("click", () => {
    showSection(messagesSection);
  });

  profileLink.addEventListener("click", () => {
    showSection(profileSection);
  });

  logoutLink.addEventListener("click", () => {
    showSection(logoutSection);
  });

  // Function to hide all sections and show the selected section
  function showSection(section) {
    // Hide all sections
    dashboardSection.style.display = "none";
    usersSection.style.display = "none";
    blogsSection.style.display = "none";
    messagesSection.style.display = "none";
    profileSection.style.display = "none";
    logoutSection.style.display = "none";

    // Show the selected section
    section.style.display = "block";

    // Close the navigation menu (if needed)
    nav.classList.remove("navclose");
  }

  // Toggle navigation menu on menu icon click
  menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
  });

  // Initially, show only the dashboard section after a small delay
  setTimeout(() => {
    showSection(dashboardSection);
  }, 100);

  let modal = document.getElementById("newBlogModal"); // Assuming you have a modal element with this ID
  let btn = document.getElementById("newBlogBtn");
  let closeBtn = document.getElementById("closeBtn1");

  btn.onclick = function () {
    modal.style.display = "block";

    // Fetch and load newBlog.html content into the modal
    fetch("../pages/newBlog.html") // Corrected the path
      .then((response) => response.text())
      .then((html) => {
        document.querySelector(".modal-content").innerHTML = html;

        // Initialize TinyMCE in the modal
        tinymce.init({
          selector: "#blogContent",
          plugins:
            "autolink lists link image charmap print preview hr anchor pagebreak",
          height: 300,
          branding: false,
        });

        document
          .getElementById("blogForm")
          .addEventListener("submit", function (event) {
            event.preventDefault();

            // Handle the form submission here
            const title = document.getElementById("blogTitle").value;
            const content = tinymce.get("blogContent").getContent();

            // Log the data to the console (you can send it to the server)
            console.log("Title:", title);
            console.log("Content:", content);

            // Close the modal after submission
            modal.style.display = "none";
          });
      })
      .catch((error) => console.error("Error fetching newBlog.html:", error));
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // admin profile js
  const userDetailsForm = document.getElementById("userDetails");
  const updateBtn = document.getElementById("updateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  updateBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // Switch to edit mode
    userDetailsForm.classList.remove("read-only-mode");
    updateBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  cancelBtn.addEventListener("click", function (event) {
    event.preventDefault();
    userDetailsForm.classList.add("read-only-mode");
    updateBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });
});
