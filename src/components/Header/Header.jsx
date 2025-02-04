import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import NavBar from "./NavBar"; // Adjust path to your NavBar component
import "./Header.css"; // Add this for custom styles if needed

const Header = () => {
  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor:  'rgb(83, 83, 148)'}}> {/* Darker header color */}
        <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          {/* Left side: logo and heading */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img  src="/buslogo.jpg" alt="logo" style={{ height: "40px", marginRight: "10px" }} />
            <h1 style={{ fontSize: "24px", margin: 0 }}> Business Finder</h1>
          </div>

         <div className="nav"> {/* Right side: NavBar */}
          <NavBar />
          </div>
        </Toolbar>
      </AppBar>

      {/* Spacer to offset fixed AppBar */}
      <Toolbar />
    </div>
  );
};

export default Header;
