// Fetch blogs from server
let allQuerries = [];
async function fetchQuerries() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || !loggedUser.token) {
        console.error("Invalid or missing token");
        return; 
    }
    const token = loggedUser.token;
  try {
    const response = await fetch("https://mybrand-be-rs6b.onrender.com/api/v1/querries", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
    },

    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await response.json();
    allQuerries.push(data);
    // console.log("Got querries data", allQuerries);
    renderQueries(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
fetchQuerries();
  // Render blogs
  function renderQueries(querries) {
    const messagesRow = document.getElementById("message-wrapper");
    messagesRow.innerHTML = ""; 
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    let index= 0;
    // In your renderQueries function
    querries?.data?.forEach(querry => {
      messagesRow.innerHTML += `
      <tr>
      <td>${index+=1}</td>

      <td>${querry?.email}</td>

      <td>${querry?.fullNames}</td>
      <td>${querry?.message}</td>

   <td id="actions2">
      <i class="fa-solid fa-reply"></i>
        <i class="fa-solid fa-trash-can"></i>
      </td>
    </tr>
      `;
    });
  }
// Fetch users from server
let allUsers = [];
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
    allUsers.push(data);
    // console.log("Got querries data", allUsers);
    renderQueries(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
fetchUsers();
  // Render blogs
  function renderQueries(querries) {
    const messagesRow = document.getElementById("message-wrapper");
    messagesRow.innerHTML = ""; 
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  
    let index= 0;
    // In your renderQueries function
    querries?.data?.forEach(querry => {
      messagesRow.innerHTML += `
      <tr>
      <td>${index+=1}</td>
      <td>${querry?.fullNames}</td>
      <td>${querry?.message}</td>
      <td id="actions2">
      <i class="fa-solid fa-reply"></i>
        <i class="fa-solid fa-trash-can"></i>
      </td>
    </tr>
      `;
    });
  }