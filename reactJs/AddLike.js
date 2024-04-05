const AddLike = () => {
    const { useState, useEffect } = React;

    const [currentBlog, setCurrentBlog] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const loggedUser1 = JSON.parse(localStorage.getItem("loggedUser"));
    const token1 = loggedUser1?.token;
    let userId = loggedUser1?.user?.id;
    const additions = document.querySelector(".additions");

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
                console.error("Error fetching blogs:", error);
            }
        }
        fetchBlog();
    }, [blogId]);

    useEffect(() => {
        const addLike = async (userid, blogid) => {
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
                            onClick: function () {}
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
                            onClick: function () {}
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
                            onClick: function () {}
                        }).showToast();
                    }
                }

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
                    onClick: function () {}
                }).showToast();
            }
        };

        const handleClick = (event) => {
            const likeButton = event.target.closest('.like-button');
            if (likeButton) {
                const blogId = likeButton.getAttribute('data-blog-id');
                const userId = likeButton.getAttribute('data-user-id');
                addLike(userId, blogId);
            }
        };

        additions.addEventListener('click', handleClick);

        return () => {
            additions.removeEventListener('click', handleClick);
        };
    }, [blogId]);

    console.log("current blog", currentBlog);
    return (
        <>
            {currentBlog && (
                <p>
                    <button style={{ backgroundColor: "white", border: "none" }} className="like-button" data-blog-id={currentBlog?.singleBlog?._id} data-user-id={userId}>
                        {currentBlog?.singleBloglikes?.some(like => like.userId === userId) ?
                            <img src="https://www.freeiconspng.com/uploads/valentine-red-heart-png-15.png" style={{ height: "15px", width: "15px" }} alt="" /> :
                            <img src="https://img.freepik.com/premium-vector/like-heart-symbol-icon_165079-3631.jpg" style={{ height: "15px", width: "15px" }} alt="" />
                        }
                    </button>
                    {currentBlog?.singleBloglikes?.length}
                </p>
            )}
        </>
    );
}

ReactDOM.render(<AddLike />, document.getElementById('additions'));
