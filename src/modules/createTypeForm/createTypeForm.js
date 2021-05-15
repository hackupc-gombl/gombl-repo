import constants from "../../strings/constants";
import { useEffect, useRef, useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Question from "./question";
import Swal from "sweetalert2";
import firebase from "firebase";
import { useHistory } from "react-router";
//perdoname dios por hacer esto
function CreateTypeForm() {
  const history = useHistory();
  let [form, setForm] = useState({
    title: "My Offer",
    theme: {
      href: "https://api.typeform.com/themes/ZFDEUn"
    },
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
          description: "",
          button_text: "Start"
        }
      }
    ],
    thankyou_screens: [
      {
        ref: "correct",
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
        ref: "incorrect",
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

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      history.push("/");
    }
  });

  useEffect(function () {
    addQuestion();
  }, []);

  useEffect(
    function () {
      if (!user.uid) return;
      let companiesRef = firebase
        .firestore()
        .collection("empresas")
        .doc(user.uid);
      companiesRef.get(user.uid).then(function (data) {
        if (data.exists) {
          for (let index in form.thankyou_screens)
            form.thankyou_screens[index].properties.redirect_url =
              data.data().Website;
        }
      });
    },
    [user]
  );

  function changeTitle(text) {
    form.title = text.value;
    form.welcome_screens[0].title = text.value;
  }

  function createOffer() {
    /*for(let index = 0; index<form.logic.length; index++){
          if(form.logic[index] != null && form.logic[index].actions[0].condition.vars.length < 2 && form.fields[index].type == "multiple_choice")
            console.log(form.logic[index].actions[0].condition.vars.length)
            console.log(form.fields[index].type)
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'You must select the correct answer for all questions'
                  })
            );
    }*/

    form.fields.push({
      ref: "email",
      title: "Your contact email",
      type: "email"
    });

    form.logic.push({
      type: "field",
      ref: "email",
      actions: [{
          action: "jump",
          details: {
              to: {
                type: "thankyou",
                value: "incorrect"
              }
          }, condition: {
            op: "lower_than",
            vars:[
              {
                type: "variable",
                value: "score"
              },
              {
                type: "constant",
                value: form.logic.length - 1
              }
            ]
          }
        }
      ]
    });

    let data = JSON.stringify(form);
    fetch("https://api.typeform.com/forms", {
      method: "POST",
      headers: {
        Authorization: "Bearer 8YHjqMLzHzp1kPBYpMLuDP4fssDQqMKzbGa5V5vYojSL"
      },
      body: data
    }).then(response => response.json())
    .then( json => {
        let url = json._links.display;
        firebase.firestore().collection("offers").add({
            company: user.uid,
            title: form.title,
            url: url
        });

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
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/offers/")
          } 
        });
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
    
    setForm(copy);
  }

  return (
    <div style={constants.STYLES.body}>
      <FontAwesomeIcon icon={faArrowLeft} style={STYLES.backArrow} onClick={() => history.push("/offers")}/>
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
  },
  backArrow: {
    position: "absolute",
    top: "30px",
    left: "30px",
    cursor: "pointer",
    color: "white",
    transition:'0.5s',
    width:'50px',
    height:'50px'
  }
};

export default CreateTypeForm;
