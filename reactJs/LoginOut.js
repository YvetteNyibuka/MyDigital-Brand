
const LoginOut = () => {
    function handleRedirection() {
        if (loggedUser && loggedUser.user.role == 'admin') {
          window.location.href = "./pages/adminPannel.html";
        } else {
          window.location.href = "/";
        }
      }
    
      function homeLogout() {
        localStorage.removeItem("loggedUser");
        window.location.href = "/";
      }
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      const userId = loggedUser?.user?.id;
  return (
    <>
        {loggedUser || loggedUser?.token ? (
          <>
            <button style={{ border: 'none', backgroundColor: 'white', width: 'fit-content' }} className="redirect" onClick = {handleRedirection} >
              <img src="https://static-00.iconduck.com/assets.00/user-online-icon-256x256-yulcevhu.png" width="35%" height="35%" style={{ marginLeft: '.5rem' }} alt="" />
            </button>
            <button style={{ border: 'none', backgroundColor: 'white' }} className="logouthome" onClick = {homeLogout} >
              <i className="fa-solid fa-right-from-bracket" style={{ marginLeft: '.5rem', marginBottom: '1rem' }}></i>
            </button>
          </>
        ) : (
          <a href="../pages/login.html" style={{ textDecoration: 'none', color: 'black' }}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </a>
        )}

    </>
  )
}

ReactDOM.render(<LoginOut />, document.getElementById('log-in-out'));
