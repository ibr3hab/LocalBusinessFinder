import React, { useState, useEffect } from "react";
import { fetchNearByBusiness } from "../../utils/api";
import BusinessCard from "./BusinessCard";
import SearchandFilterBar from "./SearchandFilterBar";
import Map from "./Maps";
import { Button } from "@mui/material";
import "./nearbyBusiness.css";



const NearByBusiness = ({addToFavorites}) => {
    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBusiness , setFilteredBusiness] = useState([])
    const Google_API = import.meta.env.VITE_API_KEY;
 
    
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(           
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    

                    try {
                        const fetchedBusiness = await fetchNearByBusiness(latitude, longitude ,Google_API)
                        setBusiness(fetchedBusiness);
                        setFilteredBusiness(fetchedBusiness);
                        console.log('FIltered business',fetchedBusiness)
                    } catch (error) {
                        console.error("Error fetching nearby businesses:", error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLoading(false); 
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false); 
        }
    }, []);
    
    if (loading) {
        return <p>...Loading</p>;
    }

    const handleSearch = (searchTerm) => {
        const filtered = business.filter(bus =>            
            typeof bus.name === 'string' && bus.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
        setFilteredBusiness(filtered);
    };
    const handleFilter = (category) => {
        const filtered = business.filter(bus => {
          if (!Array.isArray(bus.types)) {
            console.warn('Business types is not an array:', bus);
            return false;
          }
          
          const normalizedCategory = category.toLowerCase();
          return bus.types.some(type => type.toLowerCase() === normalizedCategory);
        });
      
        console.log('Filtering by category:', category);
        console.log('Filtered businesses:', filtered);
        
        setFilteredBusiness(filtered);
      };
    

    const clearSearch = ()=>{
        setFilteredBusiness(business);
    }

    const clearFilter  =()=>{
        setFilteredBusiness(business);
    }

  

    return (
        <div className="main">
            <h2>Nearby Businesses</h2>
            
            <div className="search-filter-bar">
                <SearchandFilterBar 
                    onFilter={handleFilter} 
                    onSearch={handleSearch} 
                    clearFilter={clearFilter} 
                    clearSearch={clearSearch} 
                    className="search"
                />
            </div>
            
            
            <div className="business-cards-container">
                {filteredBusiness && filteredBusiness.length > 0 ? (
                    filteredBusiness.map((bus, index) => (
                        <div key={index} className="card">
                            <BusinessCard business={bus} />
                            <div className="map-container">
                            <Map business={bus} />
                            </div>
                            <Button onClick={() => addToFavorites(bus)}>Add To Favorites</Button>
                        </div>
                    ))
                ) : (
                    <p>No nearby businesses found.</p>
                )}
            </div>
        </div>
    );
}
    

export default NearByBusiness;

