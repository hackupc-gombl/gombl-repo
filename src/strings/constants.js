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
  BACKGROUNDITEM: "#475256",
  FONT: "white",
  BUTTON: "#09BC8A",
  URL: "#38AFF1"
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
  }
}

export default { QUESTION_TYPES, TYPE_QUESTION_ANSWERS, TYPEFORM_TOKEN, COLORS, STYLES};
