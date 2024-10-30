import React from "react";
import {Link} from "react-router-dom"

const NavBar = ()=>{
    return(
        <nav>
            <Link to="/addbusiness">Add Business</Link>
            <Link to="/">NearbyBusiness</Link>
            <Link to="/favourite">Favourite</Link>
            <Link to="/businesslist">BusinessList</Link>
        </nav>
    )
}

export default NavBar;