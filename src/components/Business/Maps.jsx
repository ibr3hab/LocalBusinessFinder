import React from "react";


const mapContainerStyle = {
    width:"100%",
    height : "400px"
}

const defaultLocation = {
    lat : 40.736,
    lng : -75.692222
}

const Map = ({business})=>{
    
    const center = business && business.latitude && business.longitude > 0 ?
    {
        lat :parseFloat(business.latitude),
        lng :parseFloat(business.longitude)
    } : defaultLocation
  

    const zoom =12;

    const mapUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`;

    return (
        <div style={mapContainerStyle}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
            title="Map"
          />
        </div>
      );
};

export default Map;