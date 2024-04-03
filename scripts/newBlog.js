async function addBlog() {
  const blogcategory = document.getElementById("blogcategory").value;
  const author = document.getElementById("author").value;
  const blogTitle = document.getElementById("blogTitle").value;
  const coverPhoto = document.getElementById("coverPhoto");
  const image = coverPhoto.files[0];
  const loader = document.querySelector(".loaderOverlay");

  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  if (!image) {
      console.error("No cover image selected");
      return; 
  }

  const blogContentHTML = tinymce.get("blogContent").getContent();

  const tempElement = document.createElement("div");
  tempElement.innerHTML = blogContentHTML;
  const blogContentText = tempElement.textContent || tempElement.innerText;

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser || !loggedUser.token) {
      console.error("Invalid or missing token");
      return; 
  }
  const token = loggedUser.token;

  const formData = new FormData();
  formData.append("category", blogcategory);
  formData.append("author", author);
  formData.append("title", blogTitle);
  formData.append("description", blogContentText);
  formData.append("coverImage", image);

  try {
    showLoader();
      const newBlog = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/blogs", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
          body: formData,
      });
      const returnedBlog = await newBlog.json();
      console.log("Created new blog", returnedBlog);

      if(!newBlog.ok){
        if (newBlog.status == 400) {
          Toastify({
            text: `${returnedBlog.message}`,
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
          
        } else if (newBlog.status == 500) {
          Toastify({
            text: `${returnedBlog.message}`,
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
        }
      } else{
      hideLoader();
      Toastify({
          text: "Blog created successfully",
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
      document.getElementById("blogcategory").value = "";
      document.getElementById("author").value = "";
      document.getElementById("blogTitle").value = "";
      tinymce.get("blogContent").setContent("");
      coverPhoto.value = ""; 

    }
  } catch (error) {
      console.error("Error creating blog:", error);
      hideLoader();
      Toastify({
          text: "Error creating blog",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", 
          position: "left", 
          stopOnFocus: true, 
          backgroundColor: "linear-gradient(to right, #ff6a00, #ee0979)",
          onClick: function(){} 
      }).showToast();
  }
}

