const Favorites = ({favouriteBusiness})=>{
    return(
        <div>
        <h2>Favourite Business</h2>
        {favouriteBusiness.length > 0 ?
        (favouriteBusiness.map(bus=>(
            <div key={bus.id}>
            {bus.name}
            </div>
        ))) :
        <p>No Favourites added</p>
        }
        </div>
    )
}

export default Favorites;