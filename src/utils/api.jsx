
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchNearByBusiness = async (latitude, longitude) => {
    const businesses = [];
    const snapshot = await getDocs(collection(db, 'businesses'));

    snapshot.forEach((doc) => {
        const business = doc.data();
        const distance = calculateDistance(latitude, longitude, business.latitude, business.longitude);
        businesses.push({ id: doc.id, ...business, distance });
    });
    
    return businesses.sort((a, b) => a.distance - b.distance);
};

export const fetchBusinessDetails = async (id) => {
    if (!id) {
        throw new Error("Invalid Business ID is passed");
    }
  
    try {
        const documentRef = doc(db, 'businesses', id); 
        const documentSnapshot = await getDoc(documentRef);
    
        if (documentSnapshot.exists()) {
            return documentSnapshot.data(); 
        } else {
            throw new Error('Business not found');
        }
    } catch (error) {
        console.error('Error fetching business details:', error); 
        throw error; 
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
