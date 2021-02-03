import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import ForumAnswerComponent from './forum-answer.component';
import ForumQuestionComponent from './forum-question.component';
import ForumAcceptedAnswerComponent from './forum-accepted-answer.component';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as answerRemote from '../../../remotes/answer.remote';
import * as questionRemote from '../../../remotes/question.remote';
import { Answer } from '../../../models/answer';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import protectComponent from '../../protected-route/UserAuthRoute'

/**
 * @file Contains and manages questions, accepted answers, and general answers displayed in forums. 
 * @author Keith Salzman 
 */

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

const drawerWidth = 100;
const useStyles = makeStyles({
    boxInternal: {
        color: "#f26925"
    },
    containerInternal: {
        paddingTop: 10,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20
    }
});

export interface ForumContainerComponentProps {
    storeQuestion: any;
    storeAnswer: any;
    storeAnswers: Answer[];
}

export const ForumContainerComponent: React.FC<ForumContainerComponentProps> = (props) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [answer, setAnswer] = useState<Answer[]>([]);
    const size = 10;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        load(value - 1);
    };

    const load = async (page: number) => {
        let retrievedAnswerPageable: any;
        retrievedAnswerPageable = await answerRemote.getAnswersByQuestionId(props.storeQuestion.id, size, page);
        setTotalPages(retrievedAnswerPageable.totalPages);
        setAnswers(retrievedAnswerPageable.content);
    }

    useEffect(() => {
        const load = async (page: number) => {
            let retrievedAnswerPageable: any;
            try {
                retrievedAnswerPageable = await answerRemote.getAnswersByQuestionId(+JSON.parse(JSON.stringify(localStorage.getItem('questionId'))), size, page);
            } catch {
                return;
            }
            setTotalPages(retrievedAnswerPageable.totalPages);
            setAnswers(retrievedAnswerPageable.content);
        }

        const reload = async () => {
            let retrievedAnswer: Answer;
            const reQuestionId = +JSON.parse(JSON.stringify(localStorage.getItem('questionId')))
            try {
                const reQuestion = await questionRemote.getQuestionByQuestionId(reQuestionId);
                if (reQuestion.acceptedId === null) {
                    return;
                } else {
                    retrievedAnswer = await answerRemote.getAnswerByAnswerId(reQuestion.acceptedId);
                }
            } catch {
                return;
            }
            setAnswer([retrievedAnswer]);
        }

        load(0);
        reload();
    }, [])

    const renderForumQuestionComponents = () => {
        return (
            <ForumQuestionComponent />
        )
    }

    const renderForumAcceptedAnswerComponents = () => {
        return answer.map(answer => {
            return (
                <ForumAcceptedAnswerComponent key={answer.id} answer={answer} selected={selected} />
            )
        })
    }

    const renderForumAnswerComponents = () => {
        return answers.map(answer => {
            return (
                <ForumAnswerComponent key={answer.id} answer={answer} setSelected={setSelected} selected={selected} />
            )
        })
    }

    return (
        <div className={classes.breadcrumbBar}>
            <ThemeProvider theme={theme}>
                <BreadcrumbBarComponent />
                <Container className={classes.containerInternal} >
                    <div style={{ width: '100%' }}>
                        <Box justifyContent="center" display="flex" flexDirection="column">
                            {renderForumQuestionComponents()}
                            {renderForumAcceptedAnswerComponents()}
                            {renderForumAnswerComponents()}
                        </Box>
                    </div>
                </Container>
                <Box display="flex" justifyContent="center" padding={5}>
                    <Pagination size="medium" count={totalPages} page={page} color="secondary" onChange={handlePageChange} />
                </Box>
            </ThemeProvider>
        </div>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestion: state.questionState.storeQuestion,
        storeAnswer: state.answerState.storeAnswer,
        storeAnswers: state.answerState.collectedAnswers,
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(protectComponent(ForumContainerComponent));