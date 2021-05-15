
import constants from "../../strings/constants"
import { useRef, useState, useCallback, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import firebase from 'firebase';
import Swal from "sweetalert2";

const OffersItem = ({offer}) => {
    const history = useHistory();
    let db = firebase.firestore();
    var offersRef = db.collection("offers");
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
            marginTop:"15px",
            fontSize: "18px"
        },
        url: {
            marginTop:"15px",
            textDecoration: "none",
            color: constants.COLORS.URL,
        },
        leftOption: {
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
        },
        settings: {
            marginLeft: "10px",
            color: constants.COLORS.FONT
        }
    }
    function deleteOffer(e) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                db.collection("offers").doc(offer.id).delete().then(() => {
                    Swal.fire(
                        'Deleted!',
                        'This offer has been deleted',
                        'success'
                      )
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
                

            }
          })
    }
    function goToOffer(e) {
        history.push("/offers/" + offer.id);
    }

    return(
        <div onClick={goToOffer}>
            <div style = {STYLES.background} >
                <p style={STYLES.title}>
                    {offer.title}
                </p>
                <div style={STYLES.leftOption} onClick={(e) => { e.stopPropagation(); }}>
                    <a href={offer.url} style={STYLES.url} target="_blank">
                        <p>Url</p>
                    </a>
                    <Dropdown style={{width:'50%', backgroundColor:'rgba(0,0,0,0)'}}>
                        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                            <FontAwesomeIcon icon={faCog} style={STYLES.settings} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Edit Offer</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={(e) => { deleteOffer()}}>&times; Delete Offer</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>  
    )


}

export default OffersItem;