import firebase from 'firebase'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Offer = () =>{
    const { id } = useParams();
    let db = firebase.firestore();
    var offersRef = db.collection("offers");
    const [offer, setOffer] = useState({});

    useEffect(() => {
        offersRef.doc(id).get().then(function(res) {
            if (res.exists) {
                let offer = res.data();
                offer.id = res.id;
                setOffer(offer);
            } 
        });
    },[]);

    return (
        <div>
            {offer.title}
        </div>
    )
}

export default Offer;