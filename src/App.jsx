  import React , {useState , useEffect} from "react";
  import Footer from "../src/components/Footer/Footer";
  import Header from "../src/components/Header/Header";
  import AddBusinessForm from "./components/AddBusinessForm/AddBusinessForm";
  import NearByBusiness from "./components/Business/NearbyBusiness";
  import { Routes, Route } from "react-router-dom";
  import Favorites from "./components/Business/Favourites";

  const App = () => {

    const [favourites , setFavourites] = useState(()=>{
      const savedFavourites = localStorage.getItem('favourites');
      return savedFavourites ? JSON.parse(savedFavourites) : [];
    })
    
    const addToFavourites = (business)=>{
      setFavourites(prevValue=>{
        const updatedFavourites = [...prevValue,business];
        localStorage.setItem('favourites',JSON.stringify(updatedFavourites));
        return updatedFavourites;
     });
    };

    return (
      <div>
         <Header /> 
          <Routes>
            <Route path="/addbusiness" element={<AddBusinessForm />} />
            <Route path="/business" element={<NearByBusiness addToFavorites={addToFavourites}/>} />
            <Route path="/favourite" element={<Favorites favouriteBusiness={favourites}/>}/>
          </Routes>  
          <Footer />    
      </div>
    );
  };

  export default App;
