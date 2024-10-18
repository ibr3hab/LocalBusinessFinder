import React , {useState , useEffect} from "react";
import { OutlinedInput , Button } from '@mui/material';
import {db} from '../../utils/firebaseConfig';
import { addDoc , collection } from "firebase/firestore";
import './addBusinessForm.css';



const AddBusinessForm = ()=>{

    const [name , setName] = useState('');
    const [category , setCategory] = useState('')
    const [longitude , setLongitude] = useState('');
    const [latitude , setLatitude] = useState('');



    const handleGetLocation = ()=>{
        try{
        navigator.geolocation.getCurrentPosition(
            (position)=>{

                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                
                setLatitude(latitude);
                setLongitude(longitude)
            },
            (error)=>{
                console.error("Error getting the location",error)
            }
        )
        }catch(err){
            console.error('Error Fetching the data',err)
        }
    }

    const handleSubmit = async(e)=>{
       e.preventDefault();

    const businessData = {
        name , 
        category ,
        longitude: parseFloat(longitude) ,
        latitude:  parseFloat(latitude)
     }

     try{
        await addDoc(collection(db,'businesses'),businessData)
        setName(''),
        setCategory(''),
        setLongitude(''),
        setLatitude('')
     }
     catch(err){
      console.error("Error fetching data",err)
     }
    }

    return(
        <form onSubmit={handleSubmit} className="container">
            <OutlinedInput
            type="text"
            value={name}
            placeholder="name"
            onChange={(e)=>setName(e.target.value)}
            required/>
            <OutlinedInput
            type="text"
            value={category}
            placeholder="category"
            onChange={(e)=>setCategory(e.target.value)}
            required/>
            <OutlinedInput
            type="number"
            value={longitude}
            placeholder="longitude"
            readOnly/>
            <OutlinedInput
            type="number"
            value={longitude}
            placeholder="longitude"
            readOnly/>
            <Button onClick={handleGetLocation}>Get my Location</Button>
            <Button type="submit">Add Business</Button>
        </form>
    )

}

export default AddBusinessForm;