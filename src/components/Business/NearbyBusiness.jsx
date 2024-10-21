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
    const GoogleAPI = '54891a3f4085d2a2b173a86caa8d74e32a21c382';

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(           
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    

                    try {
                        const fetchedBusiness = await fetchNearByBusiness(latitude, longitude ,GoogleAPI);
                        console.log("Fetched businesses:", fetchedBusiness);
                        setBusiness(fetchedBusiness);
                        setFilteredBusiness(fetchedBusiness);
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
        console.log("Business",filtered);
    };
    
    const handleFilter = (category) => {
        const filtered = business.filter(bus =>
            typeof bus.category === 'string' && bus.category.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredBusiness(filtered);
    };
    

     console.log('Business : ',business)
     return (
        <div style={{ marginTop: '10%' }}>
            <h2>Nearby Businesses</h2>
            <SearchandFilterBar onFilter={handleFilter} onSearch={handleSearch} />
            {filteredBusiness.length > 0 ? (
                filteredBusiness.map((bus) => (
                    <div key={bus.id}>
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
