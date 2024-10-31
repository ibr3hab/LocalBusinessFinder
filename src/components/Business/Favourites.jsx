const Favorites = ({favouriteBusiness})=>{
    return(
        <div style={{marginTop : '150px'}} >
        <h2>Favourite Business</h2>
        {favouriteBusiness.length > 0 ?
        (favouriteBusiness.map((bus , index)=>(
            <div key={bus.id || index}>
            {bus.name}
            </div>
        ))) :
        <p>No Favourites added</p>
        }
        </div>
    )
}

export default Favorites;

