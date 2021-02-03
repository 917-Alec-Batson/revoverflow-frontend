/**
 * @file Contains and manages questions and answer mapped into boxes within the feed container
 * @author Keith Salzman 
 */

import React from 'react';
import { makeStyles, Box, Card } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Question } from '../../../models/question';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickQuestion } from '../../../actions/question.actions';
import { convertFromRaw, EditorState, Editor } from 'draft-js';


const drawerWidth = 100;
const useStyles = makeStyles({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#f26925",
        maxWidth: 1000,
        width: `calc(100% - ${drawerWidth}px)`
    },
    divInternal: {
        paddingTop: 20
    },
    boxText: {
        justifyContent: "left"
    },
});

export interface QuestBoxComponentProps {
    question: any;
    questionContent: string;
    clickQuestion: (question: Question) => void;
    view: string;
}

export const QuestBoxComponent: React.FC<QuestBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

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

    /**
     * retrieves Question and Answer. Persists question in the Redux store and questionId, quesiton and answers in local storage
     */

    const handleRedirectA = async () => {
        const retrievedQuestion = await questionRemote.getQuestionByQuestionId(props.question.questionId);
        const retrievedAnswers = await answerRemote.getAnswersByQuestionId(props.question.questionId, 10, 0);
        localStorage.setItem("questionId", JSON.stringify(retrievedQuestion.id));
        localStorage.setItem("question", JSON.stringify(retrievedQuestion));
        localStorage.setItem("answers", JSON.stringify(retrievedAnswers));
        props.clickQuestion(retrievedQuestion);
        history.push('/forum');
    }

    const questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.question.content)));
    const onChange = () => { };

    //!First box here contains answers not questions, so does its handler deal with answer not questions
    return (
        <Box display="flex" justifyContent="center" >
            <Card className={classes.boxInternal}>
                {props.question.questionId ?
                    <Box display="flex" justifyContent="left" onClick={() => handleRedirectA()}  >
                        <Box paddingLeft={2} paddingRight={2} >
                            <div className={classes.divInternal}><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                            <h3>{props.question.userId}</h3>
                            <p>{new Date(props.question.creationDate).toLocaleString()}</p>
                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box display="block" style={{width:'100%'}} justifyContent="left" onClick={() => handleRedirectQ()} >
                            <Box display="block" style={{width:'100%'}} paddingLeft={2} paddingRight={2}>
                                <h2 style={{justifyContent:"left"}}>{props.question.title}</h2>
                                <div><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                                <h3>{props.question.userId}</h3>
                                <p>{new Date(props.question.creationDate).toLocaleString()}</p>
                            </Box>
                        </Box>
                    </Box>}
            </Card>
        </Box>
    )
}

const mapStateToProps = (state: IState) => {

}

const mapDispatchToProps = {
    clickQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestBoxComponent);