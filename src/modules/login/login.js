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
        if (user) 
            window.location.href = "/offers"
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
        <div style={STYLES.loginBox}>
            <b style={STYLES.title}>GoMBL Jobs</b>
            <input type="email" placeholder="email" style={STYLES.inputText} ref={emailRef}></input>
            <input type="password" placeholder="password" onKeyPress={handleKeypress} style={STYLES.inputText} ref={passwordRef} ></input>
            <div style={STYLES.loginButton} onClick={signIn}>
                Login
            </div>
            <div style={STYLES.signUp} onClick={signUp}>
                or Sign up
            </div>
        </div>
    </div>
}

const STYLES = {
    title: {
    fontSize:'50px',
    fontWeight: "bolder",
    marginBottom: "50px"
  },
  loginBox: { 
      backgroundColor: constants.COLORS.BACKGROUNDBOX,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin:'auto',
      padding: '20px 20px 60px 20px',
      borderRadius: "10px",
  },
  loginButton: {
    backgroundColor: "#09BC8A",
    padding: "10px 50px 10px 50px",
    borderRadius: "10px",
    margin: "30px 30px 10px 30px",
    fontFamily: "Inter",
    cursor: "pointer"
  },
  inputText: {
    margin: "10px",
    fontSize:"15px",
    width: "40vw",
    height: "20px",
    borderRadius: "10px",
    padding: "10px"
  },
  signUp: {
    cursor: "pointer"
  },
}