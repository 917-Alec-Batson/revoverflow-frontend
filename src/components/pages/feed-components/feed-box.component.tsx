/**
 * @file Contains and manages questions and answer mapped into boxes within the feed container
 * @author Keith Salzman
 */

import React, { useState } from 'react';
import { makeStyles, Box, Card, Backdrop, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Question } from '../../../models/question';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickQuestion } from '../../../actions/question.actions';
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddFAQComponent } from '../faq-components/add-faq-component';



const drawerWidth = 100;
const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#f26925",
        maxWidth: 1000,
        width: `calc(100% - ${drawerWidth}px)`
    },
    divInternal: {
        paddingTop: 20,
        width: '100%'
    },
    boxInternal: {
        width: '100%',
        paddingLeft: '4em',
        paddingRight: '4em'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    answerButton: {
        marginBottom: '3px'
    },
    circleIcon: {
        color: '#3498db'
    }
}));

export interface FeedBoxComponentProps {
  question: any;
  questionContent: string;
  clickQuestion: (question: Question) => void;
  view: string;
}

export const FeedBoxComponent: React.FC<FeedBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false);
    const admin = localStorage.getItem("admin");

    const handleClose = () => {
        setOpen(false)
    }

    /**
     * retrieves answers, persists question in the Redux store and questionId, quesiton and answers in local storage
     */
    const handleRedirectQ = async () => {
        const retrievedAnswers = await answerRemote.getAnswersByQuestionId(props.question.id, 10, 0);
        props.clickQuestion(props.question);
        localStorage.setItem("questionId", JSON.stringify(props.question.id));
        localStorage.setItem("question", JSON.stringify(props.question));
        localStorage.setItem("answers", JSON.stringify(retrievedAnswers));
        history.push('/forum');
    }

    const handleRedirectA = async () => {
      const retrievedQuestion = await questionRemote.getQuestionByQuestionId(
        props.question.questionId
      );
      const retrievedAnswers = await answerRemote.getAnswersByQuestionId(
        props.question.questionId,
        10,
        0
      );
      localStorage.setItem("questionId", JSON.stringify(retrievedQuestion.id));
      localStorage.setItem("question", JSON.stringify(retrievedQuestion));
      localStorage.setItem("answers", JSON.stringify(retrievedAnswers));
      props.clickQuestion(retrievedQuestion);
      history.push("/forum");
    };
  /**
   * retrieves Question and Answer. Persists question in the Redux store and questionId, quesiton and answers in local storage
   */

    /**
     * Redirects you to a page to FAQ page TODO
     */
    const handleRedirectFAQ = async (e:React.SyntheticEvent) =>  {
        e.stopPropagation()
        setOpen(true)

    }
    
    let questionContent;
    try {
        questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.question.content)));
    } catch(e) {
        questionContent = EditorState.createEmpty();
    }

    const onChange = () => { };

    //!First box here contains answers not questions, so does its handler deal with answer not questions FAQ
    return (
        <>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <AddFAQComponent defaultQuestion={props.question} onSubmit={handleClose}/>
        </Backdrop>
        <Box display="flex" justifyContent="center" >
            <Card className={classes.card}>
                {props.question.questionId ?
                    <Box display="flex" justifyContent="left" onClick={() => handleRedirectA()}>
                        <Box paddingLeft={2} paddingRight={2} className={classes.boxInternal} >
                            <div className={classes.divInternal}><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                            <h3>{props.question.userId}</h3>
                            <p>{new Date(props.question.creationDate).toLocaleString()}</p>
                            <Button className={classes.answerButton} onClick={handleRedirectFAQ}><AddCircleIcon className={classes.circleIcon} id="addQuestionFAQButton"/></Button>

                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box display="flex" justifyContent="left" onClick={() => handleRedirectQ()}>
                            <Box paddingLeft={2} paddingRight={2} className={classes.boxInternal}>
                                <h2>{props.question.title}</h2>
                                <div><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                                <h3>{props.question.userId}</h3>
                                <p>{new Date(props.question.creationDate).toLocaleString()}</p>
                                {admin === "true" ? (
                                <Button className={classes.answerButton} onClick={handleRedirectFAQ}>
                                    <AddCircleIcon className={classes.circleIcon} id="addQuestionFAQButton"/>
                                </Button>):''}

                            </Box>
                        </Box>
                    </Box>}
            </Card>
        </Box>
        </>
    )
}

const mapStateToProps = (state: IState) => {};

const mapDispatchToProps = {
  clickQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBoxComponent);
