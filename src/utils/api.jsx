import axios from 'axios';

export const fetchNearByBusiness = async (latitude, longitude, Google_API) => {
  const radius = 5000;

  try {
    const response = await axios.get(
      'https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${latitude},${longitude}`,
          radius: radius,
        },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY, 
          'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
        },
      }
    );

    const data = response.data;

    if (data.status === 'OK') {
      return data.results.map((business) => ({
        place_id: business.place_id,
        name: business.name,
        types: business.types,
        rating: business.rating,
        latitude: business.geometry.location.lat, 
        longitude: business.geometry.location.lng,
        vicinity: business.vicinity,
        distance: calculateDistance(
          latitude,
          longitude,
          business.geometry.location.lat,
          business.geometry.location.lng
        ),  
      }));
    } else {
      console.error('Error fetching businesses:', data.status);
      return [];
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.error('404 Error: API endpoint not found. Please check your URL.');
    } else if (err.response && err.response.status === 429) {
      console.error('429 Error: Too many requests. You are hitting the rate limit.');
      // Optionally, implement retry logic here if needed
    } else {
      console.error("Error fetching nearby businesses", err);
    }
    return [];
  }
};


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
