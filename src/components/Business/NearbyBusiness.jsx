import React, { useState, useEffect } from "react";
import { fetchNearByBusiness } from "../../utils/api";
import BusinessCard from "./BusinessCard";
import SearchandFilterBar from "./SearchandFilterBar";
import Map from "./Maps";
import { Button } from "@mui/material";



const NearByBusiness = ({addToFavorites}) => {
    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBusiness , setFilteredBusiness] = useState([])
    const GoogleAPI = 'a702c7c0c9mshbacdbdfe6384f93p11c06ajsne4b5f8cdd2fb';
    
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(           
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    

                    try {
                        const fetchedBusiness = await fetchNearByBusiness(latitude, longitude ,GoogleAPI)
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
        <div style={{ marginTop: '10%' }}>
            <h2>Nearby Businesses</h2>
            <SearchandFilterBar onFilter={handleFilter} onSearch={handleSearch} clearFilter={clearFilter} clearSearch={clearSearch}/>
            {filteredBusiness && filteredBusiness.length > 0 ? (
                filteredBusiness.map((bus , index) => (
                    <div key={index}>
                        <BusinessCard business={bus} />
                        <Map business={bus} />
                        <Button onClick={() => addToFavorites(bus)}>Add To Favourites</Button>
                    </div>
                ))
            ) : (
                <p>No nearby businesses found.</p>
            )}
        </div>
    );
};

export default NearByBusiness;

