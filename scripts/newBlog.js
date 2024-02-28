const publishedBlogs = JSON.parse(localStorage.getItem("publishedBlogs")) || [];

let nextBlogId = 1;

function savePublishedBlogsToLocalStorage() {
  localStorage.setItem("publishedBlogs", JSON.stringify(publishedBlogs));
}

function addBlog() {
  const blogcategory = document.getElementById("blogcategory").value;
  const author = document.getElementById("author").value;
  const blogTitle = document.getElementById("blogTitle").value;
  const coverPhoto = document.getElementById("coverPhoto");
  const image = coverPhoto.files[0];

  const blogContentHTML = tinymce.get("blogContent").getContent();

  const tempElement = document.createElement("div");
  tempElement.innerHTML = blogContentHTML;

  const blogContentText = tempElement.textContent || tempElement.innerText;

  const reader = new FileReader();

  reader.readAsDataURL(image);
  const blogid = nextBlogId++;
  console.log("Generated blogid:", blogid);

  reader.addEventListener("load", () => {
    const imageUrl = reader.result;
    publishedBlogs.push({
      blogid,
      blogcategory,
      author,
      blogTitle,
      blogContent: blogContentText, 
      image: imageUrl,
    });
    savePublishedBlogsToLocalStorage();
    clearForm();
  });
}

function clearForm() {
  document.getElementById("blogcategory").value = "";
  document.getElementById("author").value = "";
  document.getElementById("blogTitle").value = "";
  document.getElementById("coverPhoto").value = "";
  tinymce.get("blogContent").setContent("");
}
