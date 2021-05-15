import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./modules/login/login";
import Offers from "./modules/offers/offers";
import CompanyDetails from "./modules/companyDetails/companyDetails";
import Offer from "./modules/offers/offer/offer"
import CreateTypeForm from "./modules/createTypeForm/createTypeForm"
import firebase from "firebase";
import "./swal.css"

const firebaseConfig = {
  apiKey: "AIzaSyA8uN9OT4DLMtm3FGudAoGo5KmCwgDH5XQ",
  authDomain: "hackupc-61a16.firebaseapp.com",
  projectId: "hackupc-61a16",
  storageBucket: "hackupc-61a16.appspot.com",
  messagingSenderId: "1417774097",
  appId: "1:1417774097:web:f5917e2dbd93a95d0f5db0",
  measurementId: "G-R3X9HKVY8D"
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  

  return (
    <Router>
        <Switch>
          <Route exact path="/"> <Login/> </Route>
          <Route exact path="/offers"> <Offers/> </Route>
          <Route exact path="/companyDetails"> <CompanyDetails/> </Route>
          <Route path="/offers/:id"> <Offer/> </Route>
          <Route exact path="/createOffer"> <CreateTypeForm/>  </Route>
        </Switch>
    </Router>
  );
}