import React from "react";
import "./header.css";
import NavBar from "./NavBar";



const Header = ()=>{
    return(
        <header>
            <img src="/public/buslogo.ico" alt="logo"/>
            <h1>Business Finder</h1>
            <div>
            <NavBar/>
            </div>
        </header>
    )
}

export default Header;