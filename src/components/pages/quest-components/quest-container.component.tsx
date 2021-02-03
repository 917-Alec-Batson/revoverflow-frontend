
import React, { useState } from 'react';
import { Checkbox, InputLabel } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import QuestBoxComponent from './quest-box.component';
import { createMuiTheme, makeStyles, Container, Box, ThemeProvider } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import { BreadcrumbBarComponent } from '../breadcrumb-bar.component';
import * as questionRemote from '../../../remotes/question.remote';
import { Question } from '../../../models/question';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import { clickTab } from '../../../actions/question.actions';
import CustomizedBreadcrumbs from './BreadCrumbs';
import './question.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
//import useForceUpdate from 'use-force-update';


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

const useStyles = makeStyles({
    boxExternal: {
        minWidth: 500,
    },
    boxInternal: {
        color: '#f26925',
    },
    breadcrumbBar: {
        marginTop: 60,
        marginLeft: 20
    },
    containerInternal: {
        paddingTop: 10,
    },
    unchecked: {
        color: '#f26925',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,

    },
    checked: {
        color: '#f26925',
        backgroundColor: '#fad6c3',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    }
})

export interface QuestContainerComponentProps {
    storeQuestions: Question[]
    clickTab: (questions: Question[], tab: number, pageCount: number, page: number) => void;
    storeTab: number;
    storePageCount: number;
    storePage: number;
}

export const QuestContainerComponent: React.FC<QuestContainerComponentProps> = (props) => {
    const classes = useStyles();
    const [revatureBasedQuestion, setRevatureBasedQuestion] = useState(false);
    const [locationBasedQuestion, setLocationBasedQuestion] = useState(false);
    const userId = (+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    const size = 10;

    const toggleQuestion = (e: any) => {
        if (e.target.name === 'revatureChk') {
            load(e.target.checked, locationBasedQuestion, 0)
            setRevatureBasedQuestion(e.target.checked)
        } else {
            load(revatureBasedQuestion, e.target.checked, 0)
            setLocationBasedQuestion(e.target.checked)
        }
    };

    const handleBreadcrumbChange = (locationID: number) => {

        load(revatureBasedQuestion, locationBasedQuestion, 0, locationID);

    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        load(revatureBasedQuestion, locationBasedQuestion, value - 1);
    };

    const load = async (revature: boolean, location: boolean, page: number, locationID?: number) => {
        let retrievedPageable: any;
        let tab: any;
        console.log("revature: " + revature)
        console.log("location: " + location)

        if (revature) {

            if (!location) {

                retrievedPageable = await questionRemote.getAllRevatureQuestions(size, page, true);

                if (retrievedPageable.numberOfElements === 0) {
                    return;
                }

            } else {

                if (locationID === 1) {
                    retrievedPageable = await questionRemote.getAllRevatureAndLocationQuestions(size, page);

                } else if (locationID === 2) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 2);

                } else if (locationID === 3) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 3);

                } else if (locationID === 4) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 4);

                } else if (locationID === 5) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 5);

                } else if (locationID === 6) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 6);

                } else if (locationID === 7) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 7);

                } else if (locationID === 8) {
                    retrievedPageable = await questionRemote.getQuestionsByRevatureAndLocationId(size, page, true, 8);

                } else {
                    return;
                }
            }
        } else {
            if (location) {

                if (locationID === 1) {
                    retrievedPageable = await questionRemote.getAllLocationQuestions(size, page);

                } else if (locationID === 2) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 2);

                } else if (locationID === 3) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 3);

                } else if (locationID === 4) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 4);

                } else if (locationID === 5) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 5);

                } else if (locationID === 6) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 6);

                } else if (locationID === 7) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 7);

                } else if (locationID === 8) {
                    retrievedPageable = await questionRemote.getQuestionsByLocationId(size, page, 8);

                } else {
                    return;
                }

            } else {
                return;
            }
        }
        props.clickTab(retrievedPageable.content, tab, retrievedPageable.totalPages, retrievedPageable.number);
    }

    if (props.storeQuestions.length === 0) {
        load(revatureBasedQuestion, locationBasedQuestion, 0);
    }

    const renderQuestBoxComponents = () => {
        return props.storeQuestions.map(question => {
            return (
                <QuestBoxComponent key={question.id} question={question} questionContent={question.content} view='' />
            )
        })
    }

    return (
        <div className={classes.breadcrumbBar}>
            <BreadcrumbBarComponent />
            <Container className={classes.containerInternal}>
                <ThemeProvider theme={theme} >
                    <Box justifyContent="center" display="flex" className={classes.boxExternal}>
                        <span id="checkbox"></span>
                        <FormControlLabel
                            className={classes.boxInternal}
                            labelPlacement='bottom'
                            control={
                                <Checkbox name="revatureChk"
                                    icon={<BusinessIcon style={{ fontSize: 42 }} className={classes.unchecked} />}
                                    checkedIcon={<BusinessIcon style={{ fontSize: 42 }} className={classes.checked} />}
                                    checked={revatureBasedQuestion}
                                    onChange={toggleQuestion} />
                            }
                            label="REVATURE"
                        />
                        <FormControlLabel
                            className={classes.boxInternal}
                            labelPlacement='bottom'
                            control={
                                <Checkbox name="locationChk" //label="LOCATION"
                                    icon={<LocationOnIcon style={{ fontSize: 42 }} className={classes.unchecked} />}
                                    checkedIcon={<LocationOnIcon style={{ fontSize: 42 }} className={classes.checked} />}
                                    checked={locationBasedQuestion}
                                    onChange={toggleQuestion} />
                            }
                            label="LOCATION"
                        />
                    </Box>
                    {/* <Box justifyContent="center" display="flex"  className={classes.boxExternal}>
                    <label>REVATURE</label><label>LOCATION</label>
                    </Box> */}
                    <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                            {/*renderQuestBoxComponents()*/}
                            {locationBasedQuestion ? <CustomizedBreadcrumbs handleLocationClick={handleBreadcrumbChange} /> : ''}
                            {(locationBasedQuestion || revatureBasedQuestion) ? renderQuestBoxComponents() : ''}
                        </Box>
                    </div>
                    <Box display="flex" justifyContent="center" padding={5}>
                        <Pagination size="medium" count={props.storePageCount} page={props.storePage + 1} color="secondary" onChange={handlePageChange} />
                    </Box>
                </ThemeProvider>
            </Container>
        </div>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        storeQuestions: state.questionState.collectedQuestions,
        storeQuestion: state.questionState.storeQuestion,
        storeTab: state.questionState.storeTab,
        storePageCount: state.questionState.storePageCount,
        storePage: state.questionState.storePage,
    }
}

const mapDispatchToProps = {
    clickTab
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestContainerComponent);