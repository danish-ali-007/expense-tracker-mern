import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

function Sidebar({ open, setOpen }) {

  const navigate = useNavigate();

  return (

    <>

      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className={`sidebar ${open ? "active" : ""}`}>

        <button
          className="close-btn"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        <h2>Expense Tracker</h2>

        <ul>

          <li onClick={() => {navigate("/dashboard");setOpen(false);}}>
            <FaHome /> Dashboard
          </li>

          <li onClick={() => {navigate("/transactions");setOpen(false);}}>
            <FaWallet /> Transactions
          </li>

          <li onClick={() => {navigate("/analytics");setOpen(false);}}>
            <FaChartPie /> Analytics
          </li>

          <li onClick={() => {navigate("/profile");setOpen(false);}}>
  <FaUser /> Profile
</li>


<li onClick={() => {navigate("/settings");setOpen(false);}}>
  <FaCog /> Settings
</li>


<li
onClick={() => {

localStorage.removeItem("token");
localStorage.removeItem("user");

setOpen(false);

window.location.href="/login";

}}
>
  <FaSignOutAlt /> Logout
</li>
        </ul>

      </div>

    </>

  );
}
export default Sidebar;