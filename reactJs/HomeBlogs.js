const HomeBlogs = () => {
  const { useState, useEffect } = React;
  const loader = document.querySelector(".loaderOverlay");


 
  const [blogs, setBlogs] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const userId = loggedUser?.user?.id;
  function showLoader() {
    loader.style.display = "flex";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(async () => {
    async function fetchBlogs() {
      try {
        showLoader();
        const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/blogs", {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        console.log("Got blog data", data?.data);
        setBlogs(data?.data);
        hideLoader();
      } catch (error) {
        console.error("Error fetching blogs:", error);
        hideLoader();
      } finally {
        setLoading(false);
      }
    }
    await fetchBlogs();
  }, []);

 

  return (
    <>
      {blogs?.reverse().map((blog) => (
        <div className="blog-card" key={blog._id}>
          <div className="blog-img">
            <img src={blog?.coverImage} alt="" />
          </div>
          <div className="blog-description">
            <div className="title-div">{blog?.title}</div>
            <a href={`./pages/singleblog.html?id=${blog?._id}`}>Learn More</a>
          </div>
          <div className="blog-info">
            <p>{blog?.author ? blog?.author : 'Yvette'}</p>
            <p>on {formatDate(blog?.createdAt)}</p>
          </div>
          <div className="blog-statistics">
            <p>
              <button style={{ backgroundColor: 'white', border: 'none' }} className="like-button">
                {blog?.likes?.some(like => like.userId === userId) ?
                  <img src="https://www.freeiconspng.com/uploads/valentine-red-heart-png-15.png" style={{ height: '15px', width: '15px' }} alt="" /> :
                  <img src="https://img.freepik.com/premium-vector/like-heart-symbol-icon_165079-3631.jpg" style={{ height: '15px', width: '15px' }} alt="" />
                }
              </button>
              {blog?.likes?.length}
            </p>
            <p>💬 {blog?.comments?.length}</p>
          </div>
        </div>
      ))}
    </>
  );
}

ReactDOM.render(<HomeBlogs />, document.getElementById('blogs-wrapper'));
