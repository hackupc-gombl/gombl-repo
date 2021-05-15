import { useRef, useState, useCallback, useEffect } from "react"
import { EditText } from 'react-edit-text';

function OpenAnswer({form, index}) {
    form.fields[index].type = "short_text"
    form.logic[index] = null;

    return (
        <div style = {STYLES.open}> <br/> 
        </div>
    )
}


const STYLES = {
    open: {
        justifyContent:'center'
    },
    questiontitle: {
textColocolor:'white'
    }
}

export default OpenAnswer;