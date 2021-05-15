import { useState, useEffect } from "react"
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Select from 'react-select';
import constants from "../../strings/constants"
import MultipleChoice from "./multipleChoice";
import OpenAnswer from "./openAnswer";

function Question({form, index}) {
    const [type, setType] = useState(0);
    const [title, setTitle] = useState(form.fields[index].title)
    
    useEffect(function(){
        form.fields[index].properties = {};
    },[type]);

    form.fields[index].title = title;

    function getQuestionParams() {
        switch(type.value) {
            case(1):
                return <MultipleChoice form={form} index={index}/>
            case(3):
                return <OpenAnswer form={form} index={index} />
        }
    }
    
    return (
        <div style={STYLES.container}>
            <EditText name="title" value={title} inline style={STYLES.questionTitle} onChange={function(value) {
                setTitle(value);
            }} />
            <div style={STYLES.selector}>
                <Select 
                    options={constants.QUESTION_TYPES}
                    onChange={setType}
                />
                {getQuestionParams()}
            </div>
        </div>
    )
}

const STYLES = {
    container: {
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
        margin: "50px"
    },
    questionTitle: {
        fontSize: "2em"
    },
    selector: {
        color: "black",
        width: "20vw",
        maringTop: "20px",
        margin: "auto",
    }
}

export default Question;