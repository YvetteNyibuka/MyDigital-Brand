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

   // create a new comment
  //  const publishedComments = JSON.parse(localStorage.getItem("Comments")) || [];
  //  let nextCommentId = 1;
  //  addComment()
  //  function saveCommentsToLocalStorage() {
  //   localStorage.setItem("Comments", JSON.stringify(publishedComments));
  // }
  //  function addComment(){

  // const commentingUsername = document.getElementById("userName").value;
  // const commentMessage = document.getElementById("commentMessage").value;
  // console.log("Comment", commentMessage);
  // const commentBtn = document.getElementById("commentBtn");

  // const commentId = nextCommentId++;
  // publishedComments.push(
  //  commentId,
  //  blogId,
  //  commentMessage,
  //  commentingUsername,
  //  )
  //  saveCommentsToLocalStorage();
  //  clearForm1();
  //  }

  //  function clearForm1() {
  //  document.getElementById("userName").value = "";
  //  document.getElementById("commentMessage").value = "";
  //  }

  const commentBtn = document.getElementById("commentBtn");
  let nextCommentId = 1
  const publishedComments = JSON.parse(localStorage.getItem("Comments")) || [];
  console.log("single blogId", blogId);
  commentBtn.addEventListener("click", () => {
  const commentingUsername = document.getElementById("userName").value;
  const commentMessage = document.getElementById("commentMessage").value;
  const commentId  = nextCommentId++;

  const newComment = 
    {
      username: commentingUsername,
      message: commentMessage,
      commentId: commentId,
      currentblogId: blogId
    }


    publishedComments.push(newComment);
    localStorage.setItem("Comments", JSON.stringify(publishedComments));
  });
 
  console.log("comments", publishedComments);

   for(let i = 0; i<publishedComments.length-1; i++){
      if(blogId === publishedComments[i].currentblogId){
        const commentsNumber = document.getElementById("commentsNumber");
        const createdComment = document.getElementById("dynamicContent");
        createdComment.innerHTML += `
        <div class="commentcontent">
        <p id="commentdesc">
       ${publishedComments[i].message}
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
