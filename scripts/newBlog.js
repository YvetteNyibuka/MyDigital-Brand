// 1. creating new blog

const publishedBlogs = JSON.parse(localStorage.getItem("publishedBlogs")) || [];

let editingIndex = null;

function savePublishedBlogsToLocalStorage() {
  localStorage.setItem("publishedBlogs", JSON.stringify(publishedBlogs));
}
let nextBlogId = 1;
function addBlog() {
  const blogcategory = document.getElementById("blogcategory").value;
  const author = document.getElementById("author").value;
  const blogTitle = document.getElementById("blogTitle").value;
  const coverPhoto = document.getElementById("coverPhoto");
  const image = coverPhoto.files[0]; // Get the uploaded image
  const blogContent = tinymce.get("blogContent").getContent().value;

  const reader = new FileReader();

  reader.readAsDataURL(image);
  const blogid = nextBlogId++;
  console.log("Generated blogid:", blogid); // Debug: Log the generated blogid

  reader.addEventListener("load", () => {
    const imageUrl = reader.result;
    publishedBlogs.push({
      blogid,
      blogcategory,
      author,
      blogTitle,
      blogContent,
      image: imageUrl,
    });
    savePublishedBlogsToLocalStorage();
    //   renderPublishedBlogs();
    clearForm();
  });
}
