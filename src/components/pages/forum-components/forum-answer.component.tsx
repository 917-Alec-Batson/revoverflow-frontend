import React, { useState } from "react";
import {
  makeStyles,
  Box,
  FormControlLabel,
  Modal,
  Fade,
  Backdrop,
  Button,
  Container,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { green } from "@material-ui/core/colors";
import { Answer } from "../../../models/answer";
import * as questionRemote from "../../../remotes/question.remote";
import { Question } from "../../../models/question";
import { IState } from "../../../reducers";
import { connect } from "react-redux";
import { acceptAnswer } from "../../../actions/answer.actions";
import { clickQuestion } from "../../../actions/question.actions";
import { EditorState, convertFromRaw, Editor } from "draft-js";

/**
 * @file Displays general answers belonging to question of interest within forum
 * @author Keith Salzman
 */

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#ffffff",
    border: "2px solid #000",
    padding: 20,
  },
  checkSize: {
    width: 50,
    height: 50,
  },
  boxInternal: {
    marginBottom: 5,
    marginTop: 30,
    paddingBottom: 10,
    borderBottomStyle: "dotted",
    borderColor: "#f26925",
  },
  modalInternal: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  buttonInternal: {
    color: "#ffffff",
    backgroundColor: "#3498db",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f26925",
    },
    secondary: {
      main: "#3498db",
    },
  },
});

export interface ForumAnswerComponentProps {
  answer: Answer;
  selected: boolean;
  setSelected: (selected: boolean) => void;
  acceptAnswer: (answer: Answer, accepted: boolean) => void;
  storeQuestion: any;
  clickQuestion: (question: Question) => void;
  accepted: boolean;
}

export const ForumAnswerComponent: React.FC<ForumAnswerComponentProps> = (
  props
) => {
  const classes = useStyles();
  const [color, setColor] = useState(false);
  const [open, setOpen] = React.useState(false);

  const selectAnswer = async () => {
    if (props.storeQuestion.acceptedId) {
      return;
    } else {
      if (!props.selected) {
        handleOpen();
        if (!color) {
          setColor(!color);
        } else {
          setColor(color);
        }
      } else {
        setColor(color);
      }
    }
  };

  const handleOpen = async () => {
    if (props.storeQuestion.acceptedId) {
      return;
    } else {
      setOpen(true);
    }
  };

  const handleCloseSubmit = async () => {
    let questionInfo: Question;
    try {
      questionInfo = await questionRemote.getQuestionByQuestionId(
        +JSON.parse(JSON.stringify(localStorage.getItem("questionId")))
      );
    } catch {
      alert("You encountered an error1");
      return;
    }

    const payload = {
      id: questionInfo.id,
      acceptedId: props.answer.id,
      title: questionInfo.title,
      content: questionInfo.content,
      creationDate: questionInfo.creationDate,
      editDate: null,
      status: false,
      revatureQuestion: questionInfo.revatureQuestion,
      locationID: questionInfo.locationID,
      userID: +JSON.parse(JSON.stringify(localStorage.getItem("userId"))),
    };

    try {
      const retrievedQuestion = await questionRemote.updateQuestionAcceptedAnswerId(
        payload
      );
      localStorage.setItem("question", JSON.stringify(retrievedQuestion.data));
      props.clickQuestion(retrievedQuestion.data);
      localStorage.setItem("answerId", JSON.stringify(props.answer.id));
      localStorage.setItem("selectedAnswer", JSON.stringify(props.answer));
    } catch {
      alert("You encountered an error");
      return;
    }
    props.acceptAnswer(props.answer, true);
    props.setSelected(true);
    setOpen(false);
    window.location.reload(false);
  };

  const handleCloseCancel = () => {
    setColor(false);
    setOpen(false);
  };

  const questionContent = EditorState.createWithContent(
    convertFromRaw(JSON.parse(props.answer.content))
  );
  const onChange = () => {};

  if (props.storeQuestion.acceptedId === props.answer.id) {
    return <div />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            justifyContent="flex-start"
            display="flex"
            flexDirection="row"
            className={classes.boxInternal}
          >
            {props.storeQuestion.acceptedId === null ? (
              <Box justifyContent="flex-start" display="flex">
                <Box justifyContent="flex-start" display="flex">
                  {color === true ? (
                    <FormControlLabel
                      control={<DoneIcon className={classes.checkSize} />}
                      label=""
                      onClick={() => selectAnswer()}
                      style={{ color: green[500] }}
                    />
                  ) : (
                    <FormControlLabel
                      control={<DoneIcon className={classes.checkSize} />}
                      label=""
                      onClick={() => selectAnswer()}
                    />
                  )}
                </Box>
                <Box textAlign="left">
                  <div>
                    <Editor
                      editorState={questionContent}
                      readOnly={true}
                      onChange={onChange}
                    />
                  </div>
                  <footer>
                    {props.answer.userId} <br />
                    {props.answer.creationDate}
                  </footer>
                </Box>
              </Box>
            ) : (
              <Box justifyContent="flex-start" display="flex">
                <Box justifyContent="flex-start" display="flex">
                  <FormControlLabel
                    control={<DoneIcon className={classes.checkSize} />}
                    label=""
                  />
                </Box>
                <Box textAlign="left">
                  <div>
                    <Editor
                      editorState={questionContent}
                      readOnly={true}
                      onChange={onChange}
                    />
                  </div>
                  <footer>
                    {props.answer.userId} <br />
                    {props.answer.creationDate}
                  </footer>
                </Box>
              </Box>
            )}
          </Box>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Confirm Answer Selection</h2>
                <p id="transition-modal-description">
                  Are you sure this answer wholly answers your question?
                </p>
                <Box className={classes.modalInternal}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseSubmit}
                    className={classes.buttonInternal}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseCancel}
                    className={classes.buttonInternal}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>
        </Container>
      </ThemeProvider>
    );
  }
};

const mapStateToProps = (state: IState) => {
  return {
    storeQuestion: state.questionState.storeQuestion,
    accepted: state.answerState.accepted,
  };
};

const mapDispatchToProps = {
  acceptAnswer,
  clickQuestion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumAnswerComponent);
