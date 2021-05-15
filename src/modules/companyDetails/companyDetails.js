import constants from "../../strings/constants";
import { useRef } from "react";
import firebase from "firebase";
import Swal from "sweetalert2";
import { useState, useCallback, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

export default function CompanyDetails() {
  const [user, setUser] = useState({});
  const [ordata,setOrData] = useState([]);
  const history = useHistory();
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        setUser(user);
    }
    else {
        history.push("/");
    }
  });
  let db = firebase.firestore();
  var empreref = db.collection("empresas");

  useEffect(() => {
    if(!user.uid)
        return;
    empreref.doc(user.uid).get()
    .then(function(result) {
        if(result.exists)
          setOrData(result.data());
    });
    return emptyOrData;
  }, [user]);
  const emptyOrData = useCallback(()=>{
    setOrData([])
  },[]);


  const NameRef = useRef();
  const AddressRef = useRef();
  const WebsiteRef = useRef();
  const PhoneNumberRef = useRef();
  function saveData() {
    empreref.doc(user.uid).update({Name:NameRef.current.value, Address:AddressRef.current.value, Website:WebsiteRef.current.value, Phonenumber:PhoneNumberRef.current.value})
    .then((result) =>{
      Swal.fire(
        'Saved!',
        result,
        'success'
      )
      history.push("/offers");
    }

    )
  }
  function cancelData() {
    history.push("/offers");
  }
  return (
    <div style={constants.STYLES.body}>
      <p style={STYLES.title}>Company details</p>
      <div style={STYLES.box}>
        <div style={STYLES.form}>
          <p style={STYLES.inputLabel}>Name</p>
          <input
            defaultValue={ordata.Name}
            style={STYLES.inputTextName}
            ref={NameRef}
          ></input>
          <p style={STYLES.inputLabel}>Address</p>
          <input
            defaultValue={ordata.Address}
            style={STYLES.inputTextAddress}
            ref={AddressRef}
          ></input>
          <p style={STYLES.inputLabel}>Website</p>
          <input
            defaultValue={ordata.Website}
            style={STYLES.inputTextWebsite}
            ref={WebsiteRef}
          ></input>
          <p style={STYLES.inputLabel}>Phone number</p>
          <input
            defaultValue={ordata.Phonenumber}
            style={STYLES.inputTextPhoneNumber}
            ref={PhoneNumberRef}
          ></input>
          <div style={{display:'inline'}}>
            <div style={STYLES.saveButton} onClick={saveData}>
              Save
            </div>
            <div style={STYLES.cancelButton} onClick={cancelData}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STYLES = {
  title: {
    fontSize: "4em",
    fontWeight: "bold",
    textAlign: "center"
  },
  box: {
    backgroundColor: constants.COLORS.BACKGROUNDBOX,
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: "10px",
    marginTop: "4%",
    paddingLeft: "10%"
  },
  inputTextName: {
    fontSize: "15px",
    width: "50vw",
    borderRadius: "10px",
    padding: "5px",
    boxSizing: "unset",
    display: "inline-block"
  },
  inputTextAddress: {
    fontSize: "15px",
    width: "50vw",
    borderRadius: "10px",
    padding: "5px",
    boxSizing: "unset",
    display: "inline-block"
  },
  inputTextWebsite: {
    fontSize: "15px",
    width: "50vw",
    borderRadius: "10px",
    padding: "5px",
    boxSizing: "unset",
    display: "inline-block"
  },
  inputTextPhoneNumber: {
    fontSize: "15px",
    width: "50vw",
    borderRadius: "10px",
    padding: "5px",
    boxSizing: "unset",
    display: "inline-block"
  },
  inputLabel: {
    color: "#9A9A9A",
    marginTop: "25px",
    fontSize: "25px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100px",
    height: "40px",
    backgroundColor: "#09BC8A",
    borderRadius: "10px",
    marginRight: "150px",
    marginTop: "35px",
    marginBottom: "20px",
    fontFamily: "Inter",
    cursor: "pointer"
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100px",
    height: "40px",
    backgroundColor: "red",
    borderRadius: "10px",
    marginRight: "150px",
    marginTop: "35px",
    marginBottom: "20px",
    fontFamily: "Inter",
    cursor: "pointer"
  },
  button: {
    justifyContent: "center",
    display: "flex"
  }
};
