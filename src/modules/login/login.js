import constants from "../../strings/constants"
import { useRef } from "react"
import firebase from 'firebase'
import Swal from "sweetalert2"

export default function Login() {
    document.title = "Login - GoMbl Jobs";
    const auth = firebase.auth();
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleKeypress (e) {
        if (e.key === "Enter") {
            signIn();
        }
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = "/offers"
        }
    });

    function signUp() {
        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        });        
    }
    function signIn() {
        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }

    return <div style={constants.STYLES.bodyCenter}>
        <div style={constants.STYLES.loginBox}>
            <b style={constants.STYLES.title}>GoMBL Jobs</b>
            <input type="email" placeholder="email" style={constants.STYLES.inputText} ref={emailRef}></input>
            <input type="password" placeholder="password" onKeyPress={handleKeypress} style={constants.STYLES.inputText} ref={passwordRef} ></input>
            <div style={constants.STYLES.loginButton} onClick={signIn}>
                Login
            </div>
            <div style={constants.STYLES.signUp} onClick={signUp}>
                or Sign up
            </div>
        </div>
    </div>
}
