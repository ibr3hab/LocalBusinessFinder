import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const BusinessCard = ({ business }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{business.name}</Typography>       
                <Link to={`/business/${business.id}`}>View Details</Link>
            </CardContent>
        </Card>
    );
};

export default BusinessCard;
