import constants from "../../strings/constants"
import { useRef, useState, useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
import Swal from "sweetalert2"
import OffersItem from "./offersItem"

export default function Offers() {
    const [offers,setOffers] = useState([]);
    const [user, setUser] = useState({});
    let db = firebase.firestore();
    var offersRef = db.collection("offers");
    const history = useHistory();

    const emptyOffersAndUser = useCallback(()=>{
        setOffers([]);
        setUser({});
    },[]);

    useEffect(() => {
        if(!user.uid)
            return;
        offersRef.where("company", "==", user.uid).get()
        .then(function(result) {
            let offers = [];
            result.forEach((doc) => {
                let offer = doc.data();
                offer.id = doc.id;
                offers.push(offer);
            });
            setOffers(offers);
        });
        return emptyOffersAndUser;
    }, [user]);

    function signOut(){
        firebase.auth().signOut();
    }

    const onClick = () =>{
        //window.location.href = "/offers"
    }

    const getOffers = () => { 
        return(offers.map(value => 
            <OffersItem
                offer = {value}
            ></OffersItem>
        ));
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUser(user);
        }
        else {
            window.location.href = "/"
        }
      });
    

    return <div style={constants.STYLES.body}>
        <div onClick={signOut} style={STYLES.signOut}>Sign Out</div>
        <p style={STYLES.offersTitle}>Offers</p>
        <p style={STYLES.createOffer}>Create offer</p>
        <div style = {STYLES.offersBox}>
            {getOffers()}
        </div>
    </div>
}

const STYLES = {
    signOut: {
        position: "absolute",
        top: "5px",
        right: "5px",
        cursor: "pointer"
    },
    offersTitle: {
        fontSize:"35px",
        fontWeight: "bold",
        textAlign: "center"
    },
    createOffer: {
        textAlign: "right",
        marginRight: "20vw",
        cursor: "pointer"
    },
    offersBox:{
        padding: "50px 5vw",
    }
}