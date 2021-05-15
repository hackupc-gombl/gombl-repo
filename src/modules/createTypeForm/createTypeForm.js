import constants from "../../strings/constants";
import { useEffect, useRef, useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Question from "./question";
import Swal from "sweetalert2";
import firebase from 'firebase';
import { useHistory } from "react-router";

//perdoname dios por hacer esto
function CreateTypeForm() {
    const history = useHistory();
  let [form, setForm] = useState({
    title: "My Offer",
    variables: {
      score: 0
    },
    settings: {
      is_public: true,
      progress_bar: "proportion",
      show_progress_bar: true
    },
    workspace: {
      href: "https://api.typeform.com/workspaces/8tm7t5"
    },
    welcome_screens: [
      {
        ref: "ref-welcome",
        title: "My Offer",
        properties: {
          show_button: true,
          description: "descripcion",
          button_text: "Start"
        }
      }
    ],
    thankyou_screens: [
      {
        ref: "incorrect",
        title: "Congratulations, you are elegible for the job offer!",
        properties: {
          show_button: true,
          description: "You are elegible for the job offer!",
          button_mode: "redirect",
          redirect_url: "URL",
          button_text: "Meet us"
        }
      },
      {
        ref: "correct",
        title: "Sorry",
        properties: {
          show_button: true,
          description: "You do not meet the requirements for this job",
          button_mode: "redirect",
          redirect_url: "URL",
          button_text: "Meet us"
        }
      }
    ],
    fields: [],
    logic: []
  });

  const [user, setUser] = useState({});

  firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUser(user);
        }
        else {
            history.push("/");
        }
    });

  useEffect(function () {
    addQuestion();
  }, []);

  useEffect(function() {
    if(!user.uid)
        return
    let companiesRef = firebase.firestore().collection("empresas").doc(user.uid);
    companiesRef.get(user.uid).then(function(data) {
        if(data.exists) {
            for(let index in form.thankyou_screens)
                form.thankyou_screens[index].properties.redirect_url = data.data().Website;
        }
    });
  }, [user])

  function changeTitle(text) {
    form.title = text.value;
    form.welcome_screens[0].title = text.value;
  }

  function createOffer() {
    let logic = form.logic.filter(function (value) {
      return value != null;
    });
    form.logic = logic;
    let data = JSON.stringify(form);
    fetch( "https://api.typeform.com/forms",{
        method: "POST",
        headers: {
            Authorization: "Bearer 8YHjqMLzHzp1kPBYpMLuDP4fssDQqMKzbGa5V5vYojSL",
        },
        body: data
    }).then(response =>{
        return response.json();}
      )
      .then(json => {
        Swal.fire({
          title: "Ok!",
          text: "Your offer was created successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          background: constants.COLORS.BACKGROUNDITEM,
          customClass: {
            confirmButton: "button",
            title: "white",
            htmlContainer: "white"
          },
          buttonsStyling: false
        })
    });
  }

  function getQuestions() {
    let questions = [];
    for (let question in form.fields) {
      questions.push(<Question form={form} index={question} />);
    }
    return questions;
  }

  function addQuestion() {
    let copy = Object.assign({}, form);
    let index = copy.fields.length;
    copy.fields.push({
      ref: "ref-" + index,
      title: "Question " + index,
      properties: {}
    });
    copy.logic.push({
      type: "field",
      ref: "ref-" + index,
      actions: [
        {
          action: "add",
          details: {
            target: {
              type: "variable",
              value: "score"
            },
            value: {
              type: "constant",
              value: 1
            }
          },
          condition: {
            op: "is",
            vars: []
          }
        }
      ]
    });
    setForm(copy);
  }

  return (
    <div style={constants.STYLES.body}>
      <div style={STYLES.title}>
        <EditText
          name="title"
          style={STYLES.titleInput}
          defaultValue="My Offer"
          inline
          onSave={changeTitle}
        />
        <FontAwesomeIcon icon={faPen} style={STYLES.iconTitle} />
      </div>
      <div style={STYLES.content}>
        {getQuestions()}
        <div style={STYLES.buttonsContainer}>
          <div style={STYLES.button} onClick={addQuestion}>
            Add Question
          </div>
          <div style={STYLES.button} onClick={createOffer}>
            Create Offer
          </div>
        </div>
      </div>
    </div>
  );
}

const STYLES = {
  title: {
    textAlign: "center",
    whiteSpace: "nowrap",
    fontSize: "3.5em"
  },
  titleInput: {
    width: "300px"
  },
  iconTitle: {
    marginLeft: "10px",
    width: "30px"
  },
  content: {
    backgroundColor: constants.COLORS.BACKGROUNDBOX,
    margin: "10vw",
    marginTop: "10vh",
    padding: "20px 20px 60px 20px",
    borderRadius: "10px"
  },
  button: {
    backgroundColor: "#09BC8A",
    padding: "10px 50px 10px 50px",
    borderRadius: "10px",
    fontFamily: "Inter",
    cursor: "pointer",
    marginLeft: "10px"
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

export default CreateTypeForm;
