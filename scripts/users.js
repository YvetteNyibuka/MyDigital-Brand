// Fetch users from server
let allUsers1 = [];
async function fetchUsers() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.token) {
        console.error("Invalid or missing token");
        return; 
    }
    const token = loggedUser.token;
  try {
    const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
    },

    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await response.json();
    allUsers1.push(data);
    console.log("Got users data", allUsers1);
    renderUsers(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
fetchUsers();
  // Render blogs
  function renderUsers(users) {
    const userRow = document.getElementById("userRow");
    userRow.innerHTML = ""; 
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    let index= 0;
    // In your renderQueries function
    users?.data?.forEach(user => {
      userRow.innerHTML += `
      <tr>
      <td>${index+=1}</td>

      <td>${user?.names}</td>

      <td>${user?.email}</td>
      <td>${user?.role}</td>

   <td>
   <i class="fa-solid fa-trash-can"></i>
    </td>
    </tr>
      `;
    });
  }
