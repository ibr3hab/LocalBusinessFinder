import React , {useState , useEffect} from "react";
import {db} from "../../utils/firebaseConfig";
import {collection , getDocs} from "firebase/firestore";

const BusinessList = ()=>{
    const [businessList , setBusinessList] = useState([]);
    const [loading , setLoading] = useState(true)
    useEffect(()=>{
        const fetchbus = async ()=>{
            const querySnapshot = await getDocs(collection(db , 'businesses'));
            setBusinessList(querySnapshot.docs.map(doc=>doc.data()));  
            console.log('The added business List from',querySnapshot.docs.map(doc=>doc.data()))
            setLoading(false)
        }
        fetchbus();
    },[])

    if(loading){
       return <p>...Loading</p>
    }

    return(
        <div style={{marginTop : "200px"}}>
            <h1>Business List</h1>
            <ul>
            {businessList.map(bus=>(
                <li key={bus.id}>
                    <h3>{bus.category}</h3>
                    <p>{bus.latitude}</p>
                    <p>{bus.longitude}</p>
                    <p>{bus.name}</p>
                </li>
            )
            )}
         </ul>
        </div>
    )
}

export default BusinessList;