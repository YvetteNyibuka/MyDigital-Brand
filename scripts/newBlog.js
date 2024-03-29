async function addBlog() {
  const blogcategory = document.getElementById("blogcategory").value;
  const author = document.getElementById("author").value;
  const blogTitle = document.getElementById("blogTitle").value;
  const coverPhoto = document.getElementById("coverPhoto");
  const image = coverPhoto.files[0];

  if (!image) {
    console.error("No cover image selected");
    return; // Exit function if no cover image is selected
  }

  console.log("title: ", blogTitle);
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
    const newBlog = await fetch("https://cyan-powerful-chick.cyclic.app/api/v1/blogs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    const returnedBlog = await newBlog.json();
    console.log("Created new blog", returnedBlog);
  document.getElementById("blogcategory").value = "";
  document.getElementById("author").value = "";
  document.getElementById("blogTitle").value = "";
  tinymce.get("blogContent").setContent("");
  coverPhoto.value = ""; 
   
  } catch (error) {
    console.error("Error creating blog:", error);
  }
}
