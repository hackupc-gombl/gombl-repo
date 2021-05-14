
import constants from "../../strings/constants"
import { useRef, useState, useCallback, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'


const OffersItem = ({offer}) => {

    const STYLES={
        background:{
            backgroundColor : constants.COLORS.BACKGROUNDITEM,
            borderRadius : "10px",
            padding: "10px 30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10px",
            cursor: "pointer"
        },
        title:{
            fontSize: "18px"
        },
        url: {
            textDecoration: "none",
            color: constants.COLORS.URL
        }
    }
    
    function goToOffer() {
        window.location.href = ("/offers/" + offer.id)
    }

    return(
        <div onClick={goToOffer}>
            <div style = {STYLES.background} >
                <p style={STYLES.title}>
                    {offer.title}
                </p>
                <div>
                    <a href={offer.url} style={STYLES.url} target="_bla">
                        <p>Url</p>
                    </a>
                </div>
            </div>
        </div>  
    )


}

export default OffersItem;