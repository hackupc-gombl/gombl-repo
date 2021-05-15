import { useRef, useState, useCallback, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { EditText } from 'react-edit-text';

function MultipleChoice({form, index}) {
    form.fields[index].type = "multiple_choice";
    form.fields[index].properties.allow_multiple_selection = true;
    const [choices, setChoices] = useState([
        {
            ref: "option-" + index + "-0",
            label: "Option 1"
        },
        {
            ref: "option-" + index + "-1",
            label: "Option 2"
        },
    ]);

    const [checkers, setCheckers] = useState([false, false]);

    form.fields[index].properties.choices = choices;

    useEffect(function() {
        let refs = [];
        for(let choice of choices) {
            refs.push(choice.ref);
        }

        let logicCopy = []
        for(let logic in form.logic){
            if(!refs.includes(form.logic[logic].actions[0].condition.vars[1].value))
                logicCopy.push(form.logic[logic]);
        }
        form.logic = logicCopy;
        
        for(let choice in choices) {
            if(checkers[choice] === true) { 
                form.logic.push({
                    type: "field",
                    ref: "ref-" + index,
                    actions: [
                        { 
                            action: "add",
                            details: {
                                target: {
                                    type: "variable",
                                    value: "score"
                                },
                                value: {
                                    type: "constant",
                                    value: 1
                                }
                            },
                            condition: {
                                op: "is",
                                vars: [
                                {
                                    type: "field",
                                    value: "ref-" + index
                                },
                                {
                                    type: "choice",
                                    value: choices[choice].ref
                                }]
                            }
                        }
                    ]
                });
            }
        }
        console.log(form.logic);
    }, [checkers]);


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
        let num = choices.length;
        setChoices((prev) => [...prev, {ref: "option-" + index + "-" + num, label: "Option " + num}]);
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