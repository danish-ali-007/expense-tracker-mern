import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };

  return (

    <div className="navbar">

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

     <div 
  className="profile-section"
  onClick={() => navigate("/profile")}
>

  <img
    src="https://ui-avatars.com/api/?name=Ali"
    alt="Profile"
  />

  <button
    className="logout-btn"
    onClick={(e) => {
      e.stopPropagation();
      logout();
    }}
  >
    Logout
  </button>

</div>

    </div>

  );

}

export default Navbar;