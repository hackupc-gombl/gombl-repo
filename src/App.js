import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./modules/login/login";
import Offers from "./modules/offers/offers";
import firebase from "firebase";

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
        <Route path="/offers"> <Offers/> </Route>
          <Route path="/"> <Login/> </Route>
        </Switch>
    </Router>
  );
}