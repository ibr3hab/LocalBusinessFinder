    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    

    const BusinessDetails = () => {
        const { place_id } = useParams();

        const [business, setBusiness] = useState(null);
        const [loading, setLoading] = useState(true);
        const GoogleAPI = '54891a3f4085d2a2b173a86caa8d74e32a21c382';


        useEffect(() => {
           const fetchBusinessDetails = async ()=>{
          
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GoogleAPI}`
            );
            
            
           const data = await response.json();

           if(data.status === 'OK'){
            setBusiness(data.result)
           }else{
            console.error("Error fetching business",data.status)
           }
           setLoading(false)
           }
           fetchBusinessDetails();
            
         },[place_id])

        if (loading) {
            return <p>...Loading</p>;
        }

        return (
            business ? (
                <div>
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
                                    <h3>{review.user} : {review.comment}</h3>
                                    <p>Rating : {review.rating}</p>
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
