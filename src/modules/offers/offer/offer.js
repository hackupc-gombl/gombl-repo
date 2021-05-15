import firebase from 'firebase'
import {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import constants from "../../../strings/constants"
import  AnswerItem  from './answerItem'
import {Accordion} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Offer = () =>{
    const { id } = useParams();
    let db = firebase.firestore();
    var offersRef = db.collection("offers");
    const [offer, setOffer] = useState({});
    const [company, setCompany] = useState({});
    const [answers, setAnswers] = useState([]);
    const [form, setForm] = useState(false);
    const history = useHistory();

    useEffect(() => {
        offersRef.doc(id).get().then(function(res) {
            if (res.exists) {
                let offer = res.data();
                offer.id = res.id;
                setOffer(offer);
            } 
        });
    },[]);

    useEffect(function() {
        if(!offer.url)
            return;

        db.collection("empresas").doc(offer.company).get()
        .then(function(res) {
            if(res.exists) 
                setCompany(res.data())
        });
        let url = offer.url;
        let parts = url.split("/");
        let id = parts[parts.length-1];

        fetch('https://api.typeform.com/forms/' + id + '/responses',
        {
            headers: {
                Authorization: "Bearer 8YHjqMLzHzp1kPBYpMLuDP4fssDQqMKzbGa5V5vYojSL"
            }
        })
        .then(response => response.json())
        .then(data => { setAnswers(data.items) });


        fetch('https://api.typeform.com/forms/' + id,
        {
            headers: {
                Authorization: "Bearer 8YHjqMLzHzp1kPBYpMLuDP4fssDQqMKzbGa5V5vYojSL"
            }
        })
        .then(response => response.json())
        .then(data => { setForm(data) });

    }, [offer])

    function getAnswers() {
        let res = [];
        let index = 0;
        for(let answer of answers) {
            res.push(<AnswerItem answer={answer} form={form}/>);
            index++;
        }
        return res;
    }

    let answerItems = getAnswers();

    return (
        <div style = {STYLES.background}>
            <FontAwesomeIcon icon={faArrowLeft} style={STYLES.backArrow} onClick={() => history.push("/offers")}/>
            <p style={STYLES.title}>{offer.title}</p>
            <p style={STYLES.subtitle}>{company.Name} - <a href={offer.url} target={"_blank"}>Offer's Website</a></p>

            <Accordion defaultActiveKey="0">
                {answerItems.length == 0 && form !== false ? 
                <div style={{color:'white'}}>No answers yet</div>
                : answerItems}
            </Accordion>
        </div>
    )
}

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
    },
    backArrow: {
        position: "absolute",
        top: "30px",
        left: "30px",
        cursor: "pointer",
        color: "white",
        transition:'0.5s',
        width:'50px',
        height:'50px'
    },
}

export default Offer;