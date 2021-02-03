import React, { useState } from 'react';
import { makeStyles, Box, Container, Button, Card, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { Question } from '../../../models/question';
import * as questionRemote from '../../../remotes/question.remote';
import { clickQuestion } from '../../../actions/question.actions';
import { clickConfirm } from '../../../actions/question.actions';
import { EditorState, convertFromRaw, Editor } from 'draft-js';
import { AnswerRichTextEditorComponent } from './rich-text-editor-component/answer-draftjs';

/**
 * @file Displays question of interest within forum
 * @author Keith Salzman 
 */

const useStyles = makeStyles({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#f26925",
        padding: 10,
        minWidth: 450
    },
    buttonInternal: {
        maxWidth: 110,
        maxHeight: 35
    }
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});

export interface ForumQuestionComponentProps {
    storeQuestion: any;
    storeAnswer: any;
    storeConfirm: any;
    clickQuestion: (question: Question) => void;
    clickConfirm: (question: Question, confirm: boolean) => void;
}

export const ForumQuestionComponent: React.FC<ForumQuestionComponentProps> = (props) => {
    const classes = useStyles();
    const admin = (localStorage.getItem("admin"));
    const [answerFields, setAnswerFields] = useState(false);

    const confirmAnswer = async () => {
        let questionInfo: Question;
        try {
            questionInfo = await questionRemote.getQuestionByQuestionId(+JSON.parse(JSON.stringify(localStorage.getItem('questionId'))))
        } catch {
            alert("You encountered an error")
            return;
        }
        const payload = {
            id: questionInfo.id,
            acceptedId: questionInfo.acceptedId,
            title: questionInfo.title,
            content: questionInfo.content,
            creationDate: questionInfo.creationDate,
            editDate: null,
            status: true,
            revatureQuestion: questionInfo.revatureQuestion,
            locationID: questionInfo.locationID,
            userID: +JSON.parse(JSON.stringify(localStorage.getItem('userId')))
        };

        try {
            const retrievedQuestion = await questionRemote.updateQuestionStatus(payload);
            localStorage.setItem("question", JSON.stringify(retrievedQuestion.data));
            props.clickConfirm(retrievedQuestion.data, true);
            window.location.reload(false);
        } catch {
            alert("You encountered an error")
            return;
        }
    }

    const handleRedirect = () => {
        setAnswerFields(true);
    }

    const questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.storeQuestion.content)));
    const onChange = () => { }

    return (
        <ThemeProvider theme={theme} >
            <Container >
                <Card className={classes.boxInternal}>
                    <Box justifyContent="space-between" display="flex" flexDirection="column" color="primary">
                        <Box textAlign="left" >
                            <h2>{props.storeQuestion.title}</h2>
                            <div><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                            <footer>{props.storeQuestion.userId} <br />{props.storeQuestion.creationDate}</footer>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Box paddingTop={2} display="flex"  >
                                <Button className={classes.buttonInternal} size="large" variant="contained" color="secondary" onClick={() => handleRedirect()}>
                                    Answer
                            </Button>
                                <Box display="flex" paddingLeft={2} >
                                    {((admin === 'true') && (props.storeQuestion.status === false) && (props.storeQuestion.acceptedId !== null) && !props.storeConfirm) ?
                                        <Button className={classes.buttonInternal} size="large" variant="contained" color="secondary" onClick={() => confirmAnswer()}>
                                            Confirm
                            </Button>
                                        :
                                        ""}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Card>
                {answerFields ?
                    <AnswerRichTextEditorComponent setAnswerFields={setAnswerFields} answerFields={answerFields} />
                    :
                    ""
                }
            </Container>
        </ThemeProvider>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestion: state.questionState.storeQuestion,
        storeAnswer: state.answerState.storeAnswer,
        storeConfirm: state.questionState.confirm,
    }
}

const mapDispatchToProps = {
    clickQuestion,
    clickConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumQuestionComponent);