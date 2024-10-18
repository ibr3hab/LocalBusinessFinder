import React from "react";
import {Link} from "react-router-dom"

const NavBar = ()=>{
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/addbusiness">Add Business</Link>
            <Link to="/business">NearbyBusiness</Link>
            <Link to="/favourite">Favourite</Link>
        </nav>
    )
}

export default NavBar;