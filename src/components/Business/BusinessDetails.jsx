import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BusinessDetails = () => {
    const { place_id } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('Place id : ',place_id);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            const options = {
                method: 'GET',
                url: 'https://google-map-places.p.rapidapi.com/maps/api/place/details/json',
                params: {
                  place_id: `${place_id}`,
                  region: 'en',
                  fields: 'all',
                  language: 'en',
                  reviews_no_translations: 'true'
                },
                headers: {
                  'x-rapidapi-key': import.meta.env.VITE_API_KEY,
                  'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
                }
              };
              
              try {
                  const response = await axios.request(options);
                  console.log(response.data);
                  setBusiness(response.data.result);
              } catch (error) {
                  console.error(error);
              }
        }
        setLoading(false);
        fetchBusinessDetails();
    }, [place_id]);

    if (loading) {
        return <p>...Loading</p>;
    }

    return (
        business ? (
            <div style={{marginTop : '110px'}}>
                <h2>{business.name}</h2>
                <p>{business.formatted_address}</p>
                <p>Rating: {business.rating}</p>
                <p>Contact: {business.formatted_phone_number}</p>
                <p>Website: <a href={business.website} target="_blank" rel="noopener noreferrer">{business.website}</a></p>
                <div>
                    <h3>Reviews</h3>    
                    {business.reviews && business.reviews.length > 0 ? (
                        business.reviews.map((review, index) => (
                            <div key={index}>
                                <h4>{review.author_name}: {review.text}</h4>
                                <p>Rating: {review.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet</p>
                    )}
                </div>
            </div>
        ) : (
            <p>Business not found</p>
        )
    );
};

export default BusinessDetails;
