const SingleBlogPage = () => {
    const { useState, useEffect } = React;

    const [currentBlog, setCurrentBlog] = useState(null);

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const loader = document.querySelector(".loaderOverlay");
  
    function showLoader() {
      loader.style.display = "flex";
    }
  
    function hideLoader() {
      loader.style.display = "none";
    }

    useEffect(() => {
        async function fetchBlog() {
            try {
                showLoader();
                const response = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }

                const data = await response.json();
                setCurrentBlog(data?.data);
                hideLoader();
            } catch (error) {
                console.error("Error fetching blogs:", error);
                hideLoader();
            }
        }
        fetchBlog();
    }, [blogId]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    return (
        <>
            <a href="../index.html" style={{ color: "black" }}><h1 style={{ margin: "2rem" }}><i className="fa-solid fa-chevron-left"></i>Back</h1></a>
            {currentBlog && (
                <>
                    <p style={{ textAlign: "start" }}>{currentBlog.singleBlog?.category}</p>
                    <h1 id="blogtitlee">{currentBlog.singleBlog?.title}</h1>
                    <div className="writer">
                        <img src="../images/me-removebg-preview.png" alt="" height="4%" width="4%" />
                        <p>{currentBlog.singleBlog?.author}|{formatDate(currentBlog?.singleBlog?.createdAt)}</p>
                    </div>
                    <img src={currentBlog.singleBlog?.coverImage} alt="" id="blogcoverimg" />
                    <div className="fullblogdescription">
                        <div className="currentdesc">
                            <h1 id="blogtitlee">{currentBlog.singleBlog?.title}</h1>
                            <div id="blgdesc" dangerouslySetInnerHTML={{ __html: currentBlog.singleBlog?.description }}></div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}

ReactDOM.render(<SingleBlogPage />, document.getElementById('blogdetails1'));
