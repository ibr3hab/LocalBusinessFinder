    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import { fetchBusinessDetails } from "../../utils/api";

    const BusinessDetails = () => {
        const { id } = useParams();
        console.log("Extracted ID from URL:", id);  

        const [business, setBusiness] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetching = async () => {
                if (!id) {
                    console.error("No valid ID provided");
                    return;
                }
                try {
                    const fetchingBusiness = await fetchBusinessDetails(id);
                    setBusiness(fetchingBusiness);
                } catch (error) {
                    console.error("Error fetching business details:", error);
                }
                setLoading(false);
            };
            fetching();
        }, [id]);

        if (loading) {
            return <p>...Loading</p>;
        }

        return (
            business ? (
                <div>
                    <h3>{business.name}</h3>
                    <p>{business.description}</p>
                    <p>Category: {business.category}</p>
                    <p>Contact: {business.contact}</p>
                    <p>Hours: {business.hours}</p>

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
