import constants from "../../strings/constants"
import { useRef } from "react"
import firebase from 'firebase'
import Swal from "sweetalert2"

export default function Offers() {
    function signOut(){
        firebase.auth().signOut();
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "/"
        }
      });

    return <div style={constants.STYLES.body}>
        <div onClick={signOut} style={constants.STYLES.signOut}>Sign Out</div>
        <p>Offers</p>
    </div>
}
