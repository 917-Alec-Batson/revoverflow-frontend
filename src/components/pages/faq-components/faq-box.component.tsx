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
import { deleteFAQuestion, updateFAQuestion } from '../../../remotes/faquestion.remote';
import { Answer } from '../../../models/answer';



const drawerWidth = 100;
const useStyles = makeStyles((theme) => ({
    boxInternal: {
        marginBottom: 5,
        marginTop: 10,
        borderStyle: "solid",
        border: "2px solid #f26925",
        maxWidth: 1000,
        borderRadius: "18px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "1rem"
    },
    divInternal: {
        paddingTop: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    textCenter:{
        textAlign: "center",
    },
}));

export interface FaqBoxComponentProps {
    question: any;
    questionContent: string;
    answer: Answer
    // clickQuestion: (question: Question) => void;
    view: string;
    faqId: number;
}

export const FaqBoxComponent: React.FC<FaqBoxComponentProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false);


    const openBackdrop = () => {
        setOpen(true);
      };

    const handleClose = () => {
        console.log("closing");
        setOpen(false);
      };
    
    let questionContent;
    let answerContent;
    try {
        questionContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.question.content)));
        answerContent = EditorState.createWithContent(convertFromRaw(JSON.parse(props.answer.content)));
    } catch(e) {
        questionContent = EditorState.createEmpty();
        answerContent = EditorState.createEmpty();
    }

    const onChange = () => { };

    //!First box here contains answers not questions, so does its handler deal with answer not questions
    return (
        <>
        {/* <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <AddFAQComponent onSubmit={handleClose} defaultQuestion={props.question} defaultAnswer={props.answer} faqId={props.faqId}/>
        </Backdrop> */}
        <Box display="flex" justifyContent="center" >
            <Card className={classes.boxInternal}>
                {props.question.questionId ?
                    <Box display="flex" justifyContent="center">
                        <Box paddingLeft={2} paddingRight={2} >
                            <div className={classes.divInternal}><Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                            <h3>{props.question.userId}</h3>
                            <div className={classes.divInternal}><Editor editorState={answerContent} readOnly={true} onChange={onChange} /></div>
                        </Box>
                    </Box>
                    :
                    <Box>
                        <Box display="flex" justifyContent="center">
                            <Box paddingLeft={2} paddingRight={2}>
                                <h2>Title: {props.question.title}</h2>
                                <h4>Question</h4>
                                <div style={{display:"flex", justifyContent:"center"}}>   <Editor editorState={questionContent} readOnly={true} onChange={onChange} /></div>
                                <h3>{props.question.userId}</h3>
                                <h4>Answer</h4>
                                <div  style={{display:"flex", justifyContent:"center"}} className={classes.divInternal}> <Editor editorState={answerContent} readOnly={true} onChange={onChange} /></div>
                                <Button onClick={()=>deleteFAQuestion(props.faqId)} >Delete</Button>
                             </Box>
                        </Box>
                    </Box>}
            </Card>
        </Box>
        </>
    )
}

const mapStateToProps = (state: IState) => {

}

const mapDispatchToProps = {
    clickQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqBoxComponent);
