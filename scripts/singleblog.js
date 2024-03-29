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
      const response = await fetch(`https://cyan-powerful-chick.cyclic.app/api/v1/blogs/${blogId}`, {
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
          height="5%"
          width="5%"
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
  const commentResponse = await fetch(`https://cyan-powerful-chick.cyclic.app/api/v1/blogs/${blogId}/comments`, {
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
   for(let i = 0; i<allComments?.length-1; i++){
        const commentsNumber = document.getElementById("commentsNumber");
        const createdComment = document.getElementById("dynamicContent");
        createdComment.innerHTML += `
        <div class="commentcontent">
        <p id="commentdesc">
       ${allComments[i].commentMessage}
        </p>
        <div class="additions1">
          <p><i class="fa-solid fa-thumbs-up"></i></p>
          <p><i class="fa-solid fa-thumbs-down"></i></p>
          <p class="reply-btn">Reply</p>
        </div>
        
        <div class="reply-section">
        <form action="">
<input type="text" placeholder="Reply to this comment..." id="replyy"/>
<div class="additions">
<div class="emogi">
<i class="fa-solid fa-face-smile"></i>
</div>
<div class="decisions">
<p class="cancel-reply">Cancel</p>
<p class="post-reply">Reply</p>
</div>
</div>
        </form>
         </div>


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
