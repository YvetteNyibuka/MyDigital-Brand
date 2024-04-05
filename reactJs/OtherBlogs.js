const OtherBlogs = () => {
    const { useState, useEffect } = React;

    const [currentBlog, setCurrentBlog] = useState(null);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await fetch(`https://mybrand-be-rs6b.onrender.com/api/v1/blogs/${blogId}`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }

                const data = await response.json();
                setCurrentBlog(data?.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        fetchBlog();
    }, [blogId]);

    useEffect(async () => {
        async function fetchBlogs() {
            try {
                const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/blogs", {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                const data = await response.json();
                setFilteredBlogs(data?.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        await fetchBlogs();
    }, []);

    console.log("Filtered Blogs:", filteredBlogs);
    const truncateDescription = (html, maxLength) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        let text = tmp.textContent || tmp.innerText || '';
        if (text.length > maxLength) {
            text = text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <>
            {filteredBlogs.map((blog, index) => (
                <div class="available1" key={index}>
                    <div class="picture1">
                        <img src={blog?.coverImage} alt="" width="75%" height="45%" />
                    </div>
                    <div class="description1">
                        <p style={{ color: '#767676' }}>{blog?.category}</p>
                        <div id="avadesc" dangerouslySetInnerHTML={{ __html: truncateDescription(blog?.description, 100) }}></div>
                    </div>
                </div>
            ))}
        </>
    );
}

ReactDOM.render(<OtherBlogs />, document.getElementById('otheravailableblogs'));
