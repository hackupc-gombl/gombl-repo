import "../fonts/inter.css"

const QUESTION_TYPES = {
  OPEN_ANSWER: "1",
  TEST_UNIQUE_ANSWER: "2",
  TEST_MULTIPLE_ANSWER: "3"
};

const TYPE_QUESTION_ANSWERS = {
  INCORRECT: false,
  CORRECT: true
};

const TYPEFORM_TOKEN = "";

const COLORS = {
  BACKGROUND: "#3C474D",
  BACKGROUNDBOX: "rgba(0,0,0,0.05)",
  FONT: "white",
  BUTTON: "#09BC8A"
}

const STYLES = {
  bodyCenter: {
    backgroundColor: COLORS.BACKGROUND,
    width: "100vw",
    height: "100vh",
    color: COLORS.FONT,
    fontFamily: 'Inter',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: COLORS.BACKGROUND,
    width: "100vw",
    height: "100vh",
    color: COLORS.FONT,
    fontFamily: 'Inter',
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize:'50px',
    fontWeight: "bolder",
    marginBottom: "50px"
  },
  loginBox: { 
      backgroundColor: COLORS.BACKGROUNDBOX,
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
  signOut: {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer"
  }
}

export default { QUESTION_TYPES, TYPE_QUESTION_ANSWERS, TYPEFORM_TOKEN, COLORS, STYLES};
