document.addEventListener("DOMContentLoaded", function () {
  // Displaying relevant single blog
  let singlblogData = document.getElementById("blogdetails1");
  const blogInfo = JSON.parse(localStorage.getItem("publishedBlogs")) || [];

  readIdFromUrl();
  function readIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const blog = blogInfo.find((blog) => blog.blogid === Number(blogId));
    const nondisplayedBlogs = blogInfo.filter(
      (blog1) => blog1.blogid !== Number(blogId)
    );

    if (blog) {
      singlblogData.innerHTML = `
            <p style="text-align: start">${blog.blogcategory}</p>
      <h1 id="blogtitlee">
        ${blog.blogTitle}
      </h1>
      <div class="writer">
        <img
          src="../images/me-removebg-preview.png"
          alt=""
          height="5%"
          width="5%"
        />
        <p>${blog.author}|February 20 2024|3 mins read</p>
      </div>
      <img src="${blog.image}" alt="" id="blogcoverimg" />
      <div class="fullblogdescription">
        <div class="currentdesc">
          <h1 id="blogtitlee">
           ${blog.blogTitle}
          </h1>

          <p id="blgdesc">
          ${blog.blogContent}
          </p>
          <h1 id="blogtitlee">
            ${blog.blogTitle}
          </h1>
          <p id="blgdesc">
          ${blog.blogContent}  
      </div>


      `;
    }
  }
  // Display other blogs
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  const nondisplayedBlogs = blogInfo.filter(
    (blog1) => blog1.blogid !== Number(blogId)
  );
  if (nondisplayedBlogs.length > 0) {
    const otherBlogs = document.getElementById("otheravailableblogs");

    nondisplayedBlogs.forEach((blog1, index) => {
      otherBlogs.innerHTML += `
          <div class="available1">
            <div class="picture1">
              <img src="${blog1.image}" alt="" width = "75%" height = "45%" />
            </div>
            <div class="description1">
              <p style="color: #767676">${blog1.blogcategory}</p>
              <p id="avadesc">
                ${blog1.blogContent.slice(0, 100)}...
              </p>
            </div>
          </div>
    `;
    });
  }

  const replyButtons = document.querySelectorAll(".reply-btn");
  replyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const commentContainer = this.closest(".createdcomment");
      const replySection = commentContainer.querySelector(".reply-section");
      replySection.classList.toggle("show-reply-section");
    });
  });

  const cancelReplyButtons = document.querySelectorAll(".cancel-reply");

  cancelReplyButtons.forEach(function (cancelButton) {
    cancelButton.addEventListener("click", function () {
      const commentContainer = this.closest(".createdcomment");

      const replySection = commentContainer.querySelector(".reply-section");
      replySection.classList.remove("show-reply-section");
    });
  });
});
