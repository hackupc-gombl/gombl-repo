import {useState, useEffect} from 'react'
import constants from "../../../strings/constants"
const AnswerItem = (
    answer
)=>{

    useEffect(()=>{
        //fetch de las respuestas de un usuario
        //return() vaciar ventqana
    },[])

    const STYLES ={
        background: {
            backgroundColor : constants.COLORS.BACKGROUNDITEM,
            marginTop: '10px',
            borderRadius:'10px',
            padding: "10px 30px",
        }
    }

    return (
        <div style = {STYLES.background}>

        </div>
    )
}
export default AnswerItem