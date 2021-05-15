import { useRef, useState, useCallback, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { EditText } from 'react-edit-text';

function MultipleChoice({form, index}) {
    form.fields[index].type = "multiple_choice";
    const [choices, setChoices] = useState([
        {
            ref: "option-0",
            label: "Option 1"
        },
        {
            ref: "option-1",
            label: "Option 2"
        },
    ]);

    const [checkers, setCheckers] = useState([false, false]);
    form.fields[index].properties.choices = choices;
    form.logic[index].actions[0].condition.vars = [
        { 
            type: "field",
            value: "ref-" + index
        }
    ];
    for(let checker in checkers){
        if(checkers[checker]) {
            form.logic[index].actions[0].condition.vars.push({
                type: "choice",
                value: "option-" + checker
            });
        }
    }
    console.log(checkers);
    console.log(form);

    function getOptions() {
        let elements = [];
        let choice = 0;

        for(let field of choices) {
            let currentChoice = choice;
            let element = (
                <div style={STYLES.choice}>
                    <input type='checkbox' onChange={function(e) {
                        let copy = [...checkers];
                        copy[currentChoice] = e.target.checked;
                        setCheckers(copy);
                    }}></input>

                    <EditText name="title" value={choices[currentChoice].label} inline onSave={function(data){
                        let copy = [...choices];
                        copy[currentChoice].label = data.value;
                        setChoices(copy);
                    }} onChange={function(value) {
                        let copy = [...choices];
                        copy[currentChoice].label = value;
                        setChoices(copy);
                    }} style={{overflow: "visible"}}/>

                    {currentChoice > 1?
                        <FontAwesomeIcon icon={faTimes} onClick={function() {
                            console.log(currentChoice);
                            let array = [...choices];
                            array.splice(currentChoice, 1);
                            console.log(array);
                            setChoices(array);
                        }} style={STYLES.removeOption}/>
                    : null}
                </div>
            );
            elements.push(element);
            choice++;
        }
        return elements;
    }

    function addOption() {
        let num = choices.length + 1;
        setChoices((prev) => [...prev, {ref: "option-" + num, label: "Option " + num}]);
    }

    return (
        <div style={STYLES.container}>
            {getOptions()}
            <FontAwesomeIcon icon={faPlus} style={STYLES.add} onClick={addOption}/>
        </div>
    )
}

const STYLES = {
    container: {
        display: "unset",
        color: "white",
        marginTop: "20px",
        width: "100%"
    },
    optionsContainer: {
        display: "flex"
    },
    choice: {
        margin: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    add: {
        marginLeft: "10px",
        cursor: "pointer"
    },
    removeOption: {
        cursor: "pointer"
    }
}

export default MultipleChoice;