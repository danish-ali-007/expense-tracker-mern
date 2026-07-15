import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="content-area">
        <Navbar />
         <button
        className="menu-btn"
        onClick={() => setOpen(true)}
      >
        <FaBars />
      </button>
        {children}
      </div>

    </div>
  );
}

export default MainLayout;