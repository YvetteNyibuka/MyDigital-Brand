document.addEventListener("DOMContentLoaded", async function () {
  let singlblogData = document.getElementById("blogdetails1");
  const blogInfo = JSON.parse(localStorage.getItem("publishedBlogs")) || [];

  await readIdFromUrl();
var currentblog;

  async function readIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

  // Fetch blogs from server
  async function fetchBlog() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.token) {
      console.error("Invalid or missing token");
      return;
    }
    const token = loggedUser.token;

    try {
      const response = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      const data = await response.json();
      currentblog = data.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  await fetchBlog()
console.log("================================================", currentblog);
  
    if (currentblog.singleBlog) {
      singlblogData.innerHTML = `
            <p style="text-align: start">${currentblog.singleBlog?.category}</p>
      <h1 id="blogtitlee">
        ${currentblog.singleBlog?.title}
      </h1>
      <div class="writer">
        <img
          src="../images/me-removebg-preview.png"
          alt=""
          height="4%"
          width="4%"
        />
        <p>${currentblog.singleBlog?.author}|February 20 2024|3 mins read</p>
      </div>
      <img src="${currentblog.singleBlog?.coverImage}" alt="" id="blogcoverimg" />
      <div class="fullblogdescription">
        <div class="currentdesc">
          <h1 id="blogtitlee">
           ${currentblog.singleBlog?.title}
          </h1>

          <p id="blgdesc">
          ${currentblog.singleBlog?.description}
          </p>
      </div>


      `;
    }
  }

  // fetching all blog posts
  var allBlogs = [];
  async function fetchBlogs() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.token) {
      console.error("Invalid or missing token");
      return;
    }
    const token = loggedUser.token;

    try {
      const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/blogs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const blogs = await response.json();
      allBlogs.push(blogs?.data)
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  
  await fetchBlogs();

  // console.log("+++++++++++++++++++++++++++++++++++++++++++++++", allBlogs);
  // Display other blogs
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  const nondisplayedBlogs = allBlogs.map(
    (blog1) => blog1.filter(blog => blog._id !== blogId)
  );
  // console.log("////////////////////////////////////////", nondisplayedBlogs);
  if (nondisplayedBlogs.length > 0) {
    const otherBlogs = document.getElementById("otheravailableblogs");

    nondisplayedBlogs.map(blog => {
      blog.map(blog => {
      console.log("dfshdgygntrfbewsagsxhctvhynjjuk", blog);
      otherBlogs.innerHTML += `
          <div class="available1">
            <div class="picture1">
              <img src="${blog?.coverImage}" alt="" width = "75%" height = "45%" />
            </div>
            <div class="description1">
              <p style="color: #767676">${blog?.category}</p>
              <p id="avadesc">
                ${blog?.description.slice(0, 100)}...
              </p>
            </div>
          </div>
    `;
    })
  })
  }



  const commentBtn = document.getElementById("commentBtn");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const token = loggedUser.token;

  console.log("single blogId", currentblog);
  commentBtn.addEventListener("click", async () => {
  const Message = document.getElementById("message").value;
  
  if (!loggedUser || !loggedUser.token) {
      console.error("Invalid or missing token");
      return; 
  }

  const newComment = 
    {
      commentMessage: Message
    }

try{
  const commentResponse = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}/comments`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json" 
          },
          body: JSON.stringify(newComment),
      });
      if(commentResponse.ok){
        console.log("comentscreated successfully", commentResponse.data);
        window.location.reload();
      }

}catch(e){
console.log(e);
}

  });
 
  console.log("comments", currentblog);
let allComments = currentblog?.singleBlogComments;
   for(let i = 0; i<allComments?.length; i++){
        const commentsNumber = document.getElementById("commentsNumber");
        const createdComment = document.getElementById("dynamicContent");
        createdComment.innerHTML += `
        <div class="commentcontent">
        <p> <i class="fa-solid fa-user"></i> ${allComments[i].username} </p>
        <p id="commentdesc">
       ${allComments[i].commentMessage}
        </p>
      </div>`
      
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
