    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, CardContent, Typography } from '@mui/material';

    const BusinessCard = ({ business }) => {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">{business.name}</Typography>    
                    <Typography variant="h5">{business.types}</Typography>    
                    <Typography variant="h5">{business.rating || 'N/A'}</Typography>    
                    <Typography variant="h5">{business.distance.toFixed(2)}</Typography>    
                    <Typography variant="h5">{business.vicinity}</Typography>    
                    <Link to={`/business/${business.place_id}`}>View Details</Link>
                </CardContent>
            </Card>
        );
    };

    export default BusinessCard;
