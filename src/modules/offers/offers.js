import constants from "../../strings/constants"
import { useRef, useState, useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
import Swal from "sweetalert2"
import OffersItem from "./offersItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlus, faBuilding } from '@fortawesome/free-solid-svg-icons'

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
    const companyDetails = () =>{
        history.push("/companyDetails");
    }

    function createOffer() {
        history.push("/createOffer");
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
            history.push( "/");
        }
      });
    

    return <div style={constants.STYLES.body}>
        <div style={STYLES.topRightButtons}>
            <div onClick={companyDetails}><FontAwesomeIcon icon={faBuilding} style={STYLES.settings} /></div>
            <div onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} style={STYLES.settings} /></div>
        </div>
        <p style={STYLES.offersTitle}>Offers</p>
        <p style={STYLES.createOffer} onClick={createOffer}><FontAwesomeIcon  icon={faPlus}/> Create offer</p>
        <div style = {STYLES.offersBox}>
            {getOffers()}
        </div>
    </div>
}

const STYLES = {
    topRightButtons: {
        textDecorationLine: "underline",
        position: "absolute",
        top: "25px",
        right: "6vw",
        marginTop:"10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row"
    },
    offersTitle: {
        fontSize:"4em",
        fontWeight: "bold",
        textAlign: "center"
    },
    settings: {
        fontSize:"2em",
        marginLeft: "20px"
    },
    createOffer: {
        marginTop: "5vh",
        textAlign: "right",
        marginRight: "6vw",
        cursor: "pointer"
    },
    offersBox:{
        paddingLeft: "5vw",
        paddingRight: "5vw"
    }
}