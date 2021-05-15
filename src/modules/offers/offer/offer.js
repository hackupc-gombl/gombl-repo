import firebase from 'firebase'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import constants from "../../../strings/constants"
import  AnswerItem  from './answerItem'

const Offer = () =>{
    const { id } = useParams();
    let db = firebase.firestore();
    var offersRef = db.collection("offers");
    const [offer, setOffer] = useState({});
    const [company, setCompany] = useState({});

    const [answers, setAnswers] = useState([])
    
    useEffect(() => {
        offersRef.doc(id).get().then(function(res) {
            if (res.exists) {
                let offer = res.data();
                offer.id = res.id;
                setOffer(offer);
                console.log(offer.company)
                db.collection("empresas").doc(offer.company).get()
                .then(function(res) {
                    if(res.exists) 
                        setCompany(res.data())
                });
            } 
        });
    },[]);

    const STYLES = {
        background:{
            height:'100vh',
            padding: "50px 10vw 100px 10vw",
            backgroundColor: constants. COLORS.BACKGROUND,
            alignItems:'center'
        },
        title:{
            fontSize:'30px',
            color:'white',
            textAlign:'center'
            
        },
        subtitle:{
            fontSize:'20px',
            color:'white',
            textAlign:'center'
        }
    }

    return (
        <div style = {STYLES.background}>
            <p style={STYLES.title}>{id} - {offer.title}</p>
            <p style={STYLES.subtitle}>{company.Name} - <a href={company.Website}>Company's Website</a> - <a href={offer.url}>Offer's Website</a></p>

            <div>
                <AnswerItem
                    answers = {{}}
                >

                </AnswerItem>
            </div>
        </div>
    )
}

export default Offer;