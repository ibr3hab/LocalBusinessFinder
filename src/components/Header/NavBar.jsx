import React from "react";
import {Link} from "react-router-dom"
import "./navbar.css"

const NavBar = ()=>{
    
    return (
        <nav className="navbar">
            <Link to="/addbusiness">Add Business</Link>
           
            <Link to="/">Home</Link>
    
            <Link to="/favourite">Favourite</Link>
          
            <Link to="/businesslist">BusinessList</Link>
        </nav>
      );
    };


export default NavBar;



