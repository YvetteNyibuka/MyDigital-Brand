const AddComments = () => {
    const { useState, useEffect } = React;

    const [currentBlog, setCurrentBlog] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const commentBtn = document.getElementById("commentBtn");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const token = loggedUser?.token;
  

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

    useEffect(()=>{
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
    }, [])

    useEffect(() => {
        if (currentBlog) {
            console.log("currentBlog:", currentBlog); 
            setAllComments(currentBlog?.singleBlogComments || []);
        }
    }, [currentBlog]);

    console.log("all comments", allComments);

    return (
        <>
            {allComments.map(comment => (
                <div className="commentcontent" key={comment._id}>
                    <p><i className="fa-solid fa-user"></i> {comment.username}</p>
                    <p style={{ wordBreak: "break-all" }} id="commentdesc">{comment.commentMessage}</p>
                </div>
            ))}
        </>
    );
}

ReactDOM.render(<AddComments />, document.getElementById('dynamicContent'));
