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
  let newBlogBtn = document.getElementById("newBlogBtn");
  let newBlogSection = document.getElementById("new-blog-section");
  let updateBlogSection = document.getElementById("update-blog-section");

  newBlogBtn.addEventListener("click", () => {
      newBlogSection.innerHTML = "";
      fetch("../pages/newBlog.html")
          .then((response) => response.text())
          .then((html) => {
              newBlogSection.innerHTML = html;
              tinymce.init({
                  selector: "#blogContent",
                  plugins:
                      "autolink lists link image charmap print preview hr anchor pagebreak",
                  height: 300,
                  branding: false,
              });
              showSection(newBlogSection);
          })
          .catch((error) =>
              console.error("Error fetching newBlog.html:", error)
          );
  });

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
      localStorage.removeItem("loggedUser");
      window.location.href = "../index.html";
  });

  function showSection(section) {
      dashboardSection.style.display = "none";
      usersSection.style.display = "none";
      blogsSection.style.display = "none";
      messagesSection.style.display = "none";
      profileSection.style.display = "none";
      newBlogSection.style.display = "block";
      section.style.display = "block";
      nav.classList.remove("navclose");
  }

  menuicn.addEventListener("click", () => {
      nav.classList.toggle("navclose");
  });

  setTimeout(() => {
      showSection(dashboardSection);
  }, 100);

  const userDetailsForm = document.getElementById("userDetails");
  const updateBtn = document.getElementById("updateBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  updateBtn.addEventListener("click", function (event) {
      event.preventDefault();
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

  async function fetchBlogs() {
      try {
          const response = await fetch(
              "https://mybrand-be-rs6b.onrender.com/api/v1/blogs",
              {
                  method: "GET",
              }
          );

          if (!response.ok) {
              throw new Error("Failed to fetch blogs");
          }

          const data = await response.json();
          renderBlogs(data);
      } catch (error) {
          console.error("Error fetching blogs:", error);
      }
  }
  fetchBlogs();

  function renderBlogs(blogs) {
      const blogRow = document.getElementById("blogRow");
      blogRow.innerHTML = "";
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

      let index = 0;
      blogs?.data?.forEach((blog) => {
          blogRow.innerHTML += `
              <tr>
                  <td>${index += 1}</td>
                  <td>${blog?.author}</td>
                  <td style="display: flex; flex-wrap: wrap;">${blog?.title}</td>
                  <td>${blog?.likes?.length}</td>
                  <td>${blog?.comments?.length}</td>
                  <td>
                      <button style="border: none; background-color: none;">
                          <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button style="border: none; background-color: none;" class="updateBtnn">
                          <i class="fa-regular fa-pen-to-square"></i>
                      </button>
                  </td>
              </tr>
          `;
      });

      queryAndUpdateButtons(); 
  }

  function queryAndUpdateButtons() {
      const updateBlogBtns = document.querySelectorAll(".updateBtnn");
      // console.log("updateBlogBtns:", updateBlogBtns);
      updateBlogBtns.forEach((updateBlogBtn) => {
          // console.log("Adding event listener to button:", updateBlogBtn);
          updateBlogBtn.addEventListener("click", () => {
              // console.log("editBlogBtnClickeddddddddddddddddddddddddd");
              updateBlogSection.innerHTML = "";
              fetch("../pages/updateBlog.html")
                  .then((response) => response.text())
                  .then((html) => {
                      updateBlogSection.innerHTML = html;
                      tinymce.init({
                          selector: "#blogContent",
                          plugins:
                              "autolink lists link image charmap print preview hr anchor pagebreak",
                          height: 300,
                          branding: false,
                      });
                      showSection(updateBlogSection);
                  })
                  .catch((error) =>
                      console.error("Error fetching updateBlog.html:", error)
                  );
          });
      });
  }
});
