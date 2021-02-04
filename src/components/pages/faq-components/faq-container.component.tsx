import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Container,
  createMuiTheme,
  ThemeProvider,
  Box,
  Button,
  makeStyles,
  Backdrop,
} from "@material-ui/core";
import FeedBoxComponent from "../feed-components/feed-box.component";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import DynamicFeedOutlinedIcon from "@material-ui/icons/DynamicFeedOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import Pagination from "@material-ui/lab/Pagination";
import { BreadcrumbBarComponent } from "../breadcrumb-bar.component";
import { useHistory } from "react-router";
import * as answerRemote from "../../../remotes/answer.remote";
import * as questionRemote from "../../../remotes/question.remote";
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Question } from "../../../models/question";
import { IState } from "../../../reducers";
import { connect } from "react-redux";
import { clickTab } from "../../../actions/question.actions";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessIcon from "@material-ui/icons/Business";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { CustomizedBreadcrumbs } from "./BreadCrumbs";
import { AddFAQComponent } from "./add-faq-component";
import { getRevatureBasedFAQ, getFAQByLocation, getAllFAQ } from "../../../remotes/faquestion.remote";
import { Faq } from "../../../models/faquestion";
import { FaqBoxComponent } from "./faq-box.component";
import { LensTwoTone } from "@material-ui/icons";

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

const useStyles = makeStyles({
  boxExternal: {
    minWidth: 500,
  },
  boxInternal: {
    color: "#f26925",
  },
  containerInternal: {
    paddingTop: 10,
  },
  breadcrumbBar: {
    marginTop: 60,
    marginLeft: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

export interface FeedContainerComponentProps {
  storeQuestions: Question[];
  clickTab: (
    questions: Question[],
    tab: number,
    pageCount: number,
    page: number
  ) => void;
  storeTab: number;
  storePageCount: number;
  storePage: number;
}

export const FaqContainerComponent: React.FC<FeedContainerComponentProps> = (
  props
) => {
  const classes = useStyles();
  const history = useHistory();
  const [view, setView] = useState("all");
  const [value, setValue] = useState(props.storeTab);
  const [open, setOpen] = useState<boolean>(false);
  const [faqTodisplay, setFAQs] = useState<Array<Faq>>();
  const [allFAQs, setAllFAQs] = useState<Array<Faq>>();
  const userId = +JSON.parse(JSON.stringify(localStorage.getItem("userId")));
  const admin = localStorage.getItem("admin");
  const size = 10;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    
  };

  const handleBreadcrumbChange = async (name:any) => {
    let faq = await getFAQByLocation(name)
    let locationId:number;
    if(name == "AllLocations"){
      locationId = 1
    }
    if(name == "Reston"){
      locationId = 2
    }
    if(name == "Toronto"){
      locationId = 3
    }
    if(name == "Tampa"){
      locationId = 4
    }
    if(name == "NewYork"){
      locationId = 5
    }
    if(name == "Dallas"){
      locationId=6
    }
    if(name == "Orlando"){
      locationId = 7
    }
    if(name == "Morgantown"){
      locationId = 8
    }
    setFAQs(allFAQs?.filter((faq)=>{
      return (faq.question.locationID  === locationId)
    }))
    // setFAQs(faq || [])
    console.log("all faqs is after locatiion filter")
    console.log(allFAQs)

  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    load(view, value - 1);
  };

  const getView = () => {
    return view;
  };

  useEffect(() => {
    load(view, 1);
    const getFAQs = async () =>{
      try{
        let results = await getAllFAQ()
        setAllFAQs(results)
      }catch(e){
        
      }
    }
    getFAQs()
  }, [view, open]);



  /**
   * Populates the feed with answers or questions according to the particular view and page input.
   * @param view string variable that dictates what is displayed in the rendered feed box components
   * @param page number variable that describes which page to display form the paginated information recieved from the server
   */
  const load = async (currentView: string, page: number) => {
    let tab: any;
    
    if (currentView === "all") {
      console.log("all")
      tab = 0;
      setFAQs(allFAQs)
      if (allFAQs?.length === 0) {
        setFAQs(allFAQs)
        return;
      }
    } 
    else if (currentView === "revature") {
      setFAQs(allFAQs?.filter((faq)=>{
        return faq.question.revatureQuestion === true
      }))
      tab = 1;
    }else if (currentView === "location") {
      tab = 2;
    }
    console.log("all faqs is")
    console.log(allFAQs)
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const renderDropdown = () => {};

  const handleClose = () => {
    console.log("closing");
    setOpen(false);
  };

  return (
    <div>
      <BreadcrumbBarComponent/>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <AddFAQComponent onSubmit={handleClose}/>
      </Backdrop>
      <Container className={classes.containerInternal}>
        <Box justifyContent="flex-end" display="flex">
          <ThemeProvider theme={theme}>
            {admin === "true" ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => openBackdrop()}
              >
                Post FAQ
              </Button>
            ) : (
              ""
            )}
          </ThemeProvider>
        </Box>
        <ThemeProvider theme={theme}>
          <Box
            justifyContent="center"
            display="flex"
            className={classes.boxExternal}
          >
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="primary"
              variant="fullWidth"
              scrollButtons="auto"
              onChange={handleChange}
            >
              
              <Tab
                id="AllFAQTab"
                icon={<ListAltIcon fontSize="large" />}
                label="All FAQ"
                className={classes.boxInternal}
                onClick={(e) => setView("all")}
              />
              <Tab
                id="revatureTab"
                icon={<BusinessIcon fontSize="large" />}
                label="Revature"
                className={classes.boxInternal}
                onClick={(e) => setView("revature")}
              />
              <Tab
                id="locationsTab"
                icon={<LocationOnIcon fontSize="large" />}
                label="Location"
                className={classes.boxInternal}
                onClick={(e) => setView("location")}
              />
            </Tabs>
          </Box>

          <div style={{ width: "100%" }}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              {(getView() === "location" )? (
                <>
                <CustomizedBreadcrumbs handleLocationClick={handleBreadcrumbChange} />
                {(faqTodisplay)?
                faqTodisplay.map(faquestion => {
                return (
                    <FaqBoxComponent key={faquestion.id} answer={faquestion.answer} 
                    question={faquestion.question} questionContent={faquestion.question.content} faqId={faquestion.id}view={view} />
                )})
                :
                "Please choose a location"
                }
                </>
              ) : (
                faqTodisplay && faqTodisplay.map(faquestion => {
                return (
                    <FaqBoxComponent key={faquestion.id} answer={faquestion.answer} 
                    question={faquestion.question} questionContent={faquestion.question.content} view={view} faqId={faquestion.id}/>
                )})
              )}
            </Box>
          </div>
          <Box display="flex" justifyContent="center" padding={5}>
            <Pagination
              size="medium"
              count={props.storePageCount}
              page={props.storePage + 1}
              color="secondary"
              onChange={handlePageChange}
            />
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    storeQuestions: state.questionState.collectedQuestions,
    storeQuestion: state.questionState.storeQuestion,
    storeTab: state.questionState.storeTab,
    storePageCount: state.questionState.storePageCount,
    storePage: state.questionState.storePage,
  };
};

const mapDispatchToProps = {
  clickTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaqContainerComponent);
