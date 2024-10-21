import React from "react";
import "./header.css";
import NavBar from "./NavBar";



const Header = ()=>{
    return(
        <header className="header1">
            <div className="logo-heading">
            <img className="img1" src="/public/buslogo.ico" alt="logo"/>
            <h1>Business Finder</h1>
            </div>
            <NavBar/>
        </header>
    )
}

export default Header;