document.addEventListener("DOMContentLoaded", async function () {
  let singlblogData = document.getElementById("blogdetails1");
  const loader = document.querySelector(".loaderOverlay");
  const additions = document.querySelector(".additions")

  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  await readIdFromUrl();
   var currentblog;

  async function readIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

  // Fetch blog from server

  async function fetchBlog() {
    try {
      showLoader() 
      const response = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      const data = await response.json();
      currentblog = data.data;
      hideLoader() 
    } catch (error) {
      console.error("Error fetching blogs:", error);
      hideLoader();
    }
  }
  await fetchBlog()
  
    if (currentblog?.singleBlog) {
      singlblogData.innerHTML = `
  <a href="../index.html" style="color: black;"><h1 style="margin: 2rem;"><i class="fa-solid fa-chevron-left"></i>Back</h1></a>
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
    try {
      const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/blogs", {
        method: "GET"
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


  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  const nondisplayedBlogs = allBlogs.map(
    (blog1) => blog1.filter(blog => blog._id !== blogId)
  );
  if (nondisplayedBlogs.length > 0) {
    const otherBlogs = document.getElementById("otheravailableblogs");

    nondisplayedBlogs.map(blog => {
      blog.map(blog => {
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
  const token = loggedUser?.token;

  commentBtn.addEventListener("click", async () => {
  const Message = document.getElementById("message").value;

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
      const blogComments = await commentResponse.json();
      console.log("comments", blogComments);
      if (!commentResponse.ok) {
        if (!loggedUser|| !loggedUser?.token || commentResponse.status == 403) {
          Toastify({
            text: "You have to log in first",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            backgroundColor: "red",
            onClick: function(){} 
        }).showToast();
        setTimeout(()=>{
          window.location.href = "../pages/login.html";
        }, 3000 )
       } else if (commentResponse.status == 500) {
          Toastify({
            text: `${blogComments?.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            backgroundColor: "red",
            onClick: function(){} 
        }).showToast();
      }
       } else{
        Toastify({
          text: `${blogComments?.message}`,
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", 
          position: "left", 
          stopOnFocus: true, 
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          onClick: function(){} 
      }).showToast();
      setTimeout(()=>{
        window.location.reload();
      },3000)
    }

}catch(e){
  Toastify({
    text: `${e}`,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "left", 
    stopOnFocus: true, 
    backgroundColor: "red",
    onClick: function(){} 
}).showToast();
}

  });
 
let allComments = currentblog?.singleBlogComments;
const commentsNumber = document.getElementById("commentsNumber");
commentsNumber.innerHTML = `${allComments.length} Comments`;
   for(let i = 0; i<allComments?.length; i++){
        const createdComment = document.getElementById("dynamicContent");
        createdComment.innerHTML += `
        <div class="commentcontent">
        <p> <i class="fa-solid fa-user"></i> ${allComments[i].username} </p>
        <p style=" word-break: break-all;" id="commentdesc">
   ${allComments[i].commentMessage}
      </p>
      </div>`
      
   }

   const loggedUser1 = JSON.parse(localStorage.getItem("loggedUser"));
   const token1 = loggedUser?.token;
   let  userId = loggedUser?.user?.id;

   async function addLike(userid, blogid) {
    const newLike = {
       blogId: blogid,
       userId: userid,
       isLiked: true
    };
    try {
      const likeResponse = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}/likes`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token1}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLike)
      });
      
      console.log("like response", likeResponse.status);
      const likes = await likeResponse.json();
      console.log("liked", likes);
    
      if (!likeResponse.ok) {
        if (!loggedUser1 || !loggedUser1?.token || likeResponse.status == 403) {
          Toastify({
            text: `${likes?.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            backgroundImage: "linear-gradient(to right, #00b09b, #96c93d)", // Change backgroundColor to backgroundImage
            onClick: function(){} 
          }).showToast();
          setTimeout(() => {
            window.location.href = "../pages/login.html";
          }, 3000);
        } else if (likeResponse.status == 500) {
          Toastify({
            text: `${likes?.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            backgroundColor: "red",
            onClick: function(){} 
          }).showToast();
        } else {
          Toastify({
            text: `${likeResponse?.message}`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            backgroundImage: "linear-gradient(to right, #00b09b, #96c93d)", // Change backgroundColor to backgroundImage
            onClick: function(){} 
          }).showToast();
        }
      }
      
      // Reload window after liking process
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (e) {
      Toastify({
        text: `${e}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left", 
        stopOnFocus: true, 
        backgroundColor: "red",
        onClick: function(){} 
      }).showToast();
    }
    
   }

   additions.innerHTML =` <p>
   <button style="background-color: white; border: none" class="like-button" data-blog-id="${currentblog?.singleBlog?._id}" data-user-id="${userId}">
   ${currentblog?.singleBloglikes?.some(like => like.userId === userId) ? 
     `<img src="https://www.freeiconspng.com/uploads/valentine-red-heart-png-15.png" style="height: 15px; width: 15px;" alt="" />` :
     `<img src="https://img.freepik.com/premium-vector/like-heart-symbol-icon_165079-3631.jpg" style="height: 15px; width: 15px;" alt="" />`
   }
   </button> 
    ${currentblog?.singleBloglikes?.length}</p>`

    additions.addEventListener('click', function(event) {
      const likeButton = event.target.closest('.like-button');
      if (likeButton) {
         const blogId = likeButton.getAttribute('data-blog-id');
         const userId = likeButton.getAttribute('data-user-id');
         addLike(userId, blogId);
      }
     });
 
});
