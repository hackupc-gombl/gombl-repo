import {useState, useEffect} from 'react'
import { Card, Accordion } from 'react-bootstrap';
import constants from "../../../strings/constants"

const AnswerItem = function({ answer, form }) {
    let answers = [...answer.answers];
    const [displayAll, setDisplayAll] = useState(false);
    const email = answers.pop().email;
    const score = answer.calculated.score;
    const submitDate = new Date(answer.submitted_at);
    let id = answer.response_id;
    const [qa, setQA] = useState([]);
    
    function getAnswer(answer) {
        if(answer.type === "text") {
            return answer.text;
        }
        else if(answer.type === "email") {
            return answer.email;
        } 
        else if(answer.type === "choice") {
                return answer.choice.label;                
        }
        else{
            if(answer.type == "choices")
                return answer.choices.labels.toString()
        }
        
    }
    const answers2 = []
    Object.keys(answer.answers).forEach(key => answers2.push(getAnswer(answer.answers[key])))
    function getResponses() {
        let res = [];
        answers2.reverse()
        for(let index in form.fields) {
            let question = form.fields[index].title;
            let answerText = answers2.pop();
            
            res.push(
                <div>
                    <div style={{fontSize:'18px'}}><b>{question}</b></div>
                    <div>{answerText}</div>
                </div>);
            
        }
        return(res)
    }

    return (
        <Card style = {STYLES.background}>
            <Accordion.Toggle as={Card.Header} eventKey={id} style={STYLES.header}>
                <a href={"mailto:" + email} style={{textDecoration: "none", color: "white"}}>{email}</a>
                
                <div style={{display:'inline-block'}}><div style={{display:'inline-block', marginRight: "10px"}}>Score: {score}</div> {submitDate.toLocaleString()}</div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={id}>
                <Card.Body style={STYLES.body}>
                    {getResponses()}
                </Card.Body>
            </Accordion.Collapse>
  
        </Card>
    )
}

const STYLES ={
    background: {
        backgroundColor : constants.COLORS.BACKGROUNDITEM,
        cursor: 'pointer',
        marginTop: '10px',
        borderRadius:'10px',
        color: "white",
    },
    header: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        border:"none"
    },
    body: {
        cursor: 'default'
    }
}

export default AnswerItem