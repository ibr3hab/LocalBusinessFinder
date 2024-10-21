

export const fetchNearByBusiness = async (latitude, longitude , GoogleAPI) => {
    

    const GoogleAPI = '54891a3f4085d2a2b173a86caa8d74e32a21c382';
    const radius = 5000;
    const location = `${latitude},${longitude}`;

   const response = await fetch(`http://localhost:3001/nearbysearch?location=${location}&radius=${radius}&GoogleAPI=${GoogleAPI}`);

    const data = await response.json();

    if (data.status === 'OK') {
        return data.results.map((business) => ({
          place_id: business.place_id,
          name: business.name,
          rating: business.rating,
          vicinity: business.vicinity,
          distance: calculateDistance(latitude, longitude, business.geometry.location.lat, business.geometry.location.lng),
        }));
      } else {
        console.error('Error fetching businesses:', data.status);
        return [];
      }
    };
  

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};
