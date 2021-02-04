import { Box, Button, Card, Checkbox, FormControlLabel, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { ContentState, convertFromRaw } from "draft-js";
import React, { useState, useEffect } from "react";
import { Answer } from "../../../models/answer";
import { Question } from "../../../models/question";
import {Location} from "../../../models/location"
import { addToFAQ, getAllFAQ, updateFAQuestion } from "../../../remotes/faquestion.remote";
import { getLocations } from "../../../remotes/location.remote";
import { RichTextBoxComponent } from "../../rich-text-box-component";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  card: {
    width: "60vw",
    height: "auto",
    padding: "2rem",
    boxSizing: "border-box" as "border-box",
    
    // textAlign: "left"
  },
  cardBoxes1: {
    width: "100%",
    height: "5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
  },
  cardBoxes2: {
    width: "100%",
    height: "22.5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
    // display:"flex"
  },
  cardBoxes3: {
    width: "100%",
    height: "22.5vh",
    // backgroundColor:"lightgray",
    margin: "1.5rem",
    // display:"flex"
  },
  label: {
    fontSize: "1.2rem",
    textAlign: "left" as "left",
    padding: "0",
    margin: "0 0 0.5rem 1.4rem",

    fontWeight: "bold" as "bold",
  },

  title: {
    height: "20%",
  },
  submit: {
    backgroundColor: "#3498db",
    margin: "1rem",
    width: "100%",
    borderRadius: "8px",
  },
  btn:{
    width: "100%",
    color:"#000"
  },
  checkbox:{
    margin: "1.5rem",
    width: "100%",
    textAlign: "center" as "center"
  },
  locationDropdownButton: {
    color: "#3498db",
    borderColor: "#3498db"
  }
});

//pass in if there is no default question
export interface AddFAQComponentProps {
  defaultQuestion?: any;
  defaultAnswer?: any;
  faqId?: number;
  onSubmit:() => void;
}

export const AddFAQComponent: React.FC<AddFAQComponentProps> = (props) => {
  const [questionTitle, setQuestionTitle] = useState<string>(props.defaultQuestion?props.defaultQuestion.title:'');
  const [questionBody, setQuestionBody] = useState<string>(props.defaultQuestion?props.defaultQuestion.content:'');
  const classes = useStyles();
  const [answer, setAnswer] = useState<string>("");
  const [defaultQuestionProvided, setDefaultQuestionProvided] = useState<boolean>(false);
  const [locations, setLocations] = useState(new Array<any>());
  const [revatureBasedQuestion, setRevatureBasedQuestion] = useState(false);
  const [locationBasedQuestion, setLocationBasedQuestion] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  //if there is a default question set our question equal to it
  useEffect(() => {
    //get the truthiness of the defaultQuestion
    setDefaultQuestionProvided(props.defaultQuestion ? true : false);
  }, [props.defaultQuestion]);

  useEffect(() => {
    //fetch location data
    async function fetchData() {
      let locationsData: Location[] = await getLocations();
      //console.log(locationsData);
      setLocations(locationsData);
    }
    fetchData();
  }, []);

  
  
  const handleQuestionTitleChange = (e: string) => {
    setQuestionTitle(convertFromRaw(JSON.parse(e)).getPlainText());
  };
  const handleQuestionBodyChange = (e: string) => {
    setQuestionBody(e);
  };
  const handleAnswerChange = (e: string) => {
    setAnswer(e);
  };


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocationChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    location: Location
  ) => {
    e.preventDefault();
    console.log(location);
    setCurrentLocation(location);
    console.log(currentLocation.id);
    handleClose();
  };
  
  const toggleLocationBasedQuestion = () => {
    if (locationBasedQuestion) {
      setCurrentLocation(null);
    }
    else {
      setCurrentLocation(new Object({ id: 1, locationName: "All Locations" }));
    }

    setLocationBasedQuestion(!locationBasedQuestion);
  };

  const submitFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //dont remove this we need if for the test
    console.log("submitting FAQ");
    // if (!defaultQuestionProvided) {
    try {
      let q: Question = {
        id:  props.defaultQuestion.id || 0,
        acceptedId: 0,
        title: questionTitle,
        content: questionBody,
        creationDate: new Date(),
        status: true,
        userID: JSON.parse(localStorage.getItem("userId")!),
        locationID: locations.find((e)=>currentLocation === e)?.id,
        revatureQuestion: revatureBasedQuestion
      };

      let a: Answer = {
        id: props.defaultAnswer.id ||0,
        content: answer,
        creationDate: new Date(),
        questionId: 0,
        userId: JSON.parse(localStorage.getItem("userId")!),
      };

      // console.log(convertFromRaw(JSON.parse(q.content)).getPlainText())
      // This prevents users from submitting empty text boxes
          let submitToFAQ;
          if(props.defaultAnswer && props.defaultQuestion?true:false){
            submitToFAQ = await updateFAQuestion(q, a, props.faqId ||  0)
          }
      else if(questionTitle && questionBody && answer) {
        try{
          if(convertFromRaw(JSON.parse(questionBody)).getPlainText() && convertFromRaw(JSON.parse(answer)).getPlainText()){
          submitToFAQ = await addToFAQ(q, a)
          console.log(submitToFAQ);
          props.onSubmit()
          }
        }
        catch(e){
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e);
    } 

    
  };

  return (
    <Card className={classes.card} onClick={(e) => e.stopPropagation()}>
      <form id="addFAQForm" onSubmit={submitFAQ}>
        <div className={classes.cardBoxes1}>
          <p className={classes.label}>TITLE</p>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.title}
            id="questionTitleInput"
            handleChange={handleQuestionTitleChange}
            placeholder={"Write a descriptive title"}
            update={props.defaultQuestion||props.defaultAnswer}
          />
        </div>

        <div className={classes.cardBoxes2}>
          <p className={classes.label}>BODY</p>
          <RichTextBoxComponent
            defaultText={props.defaultQuestion?.content}
            placeholder={"Describe your question here"}
            id="questionBodyInput"
            handleChange={handleQuestionBodyChange}
            update={props.defaultQuestion||props.defaultAnswer}
          />
        </div>
        <div className={classes.cardBoxes3}>
          <p className={classes.label}>ANSWER</p>

          <RichTextBoxComponent
            defaultText={props.defaultAnswer?.content}
            id="answerInput"
            handleChange={handleAnswerChange}
            placeholder={"Answer"}
            update={props.defaultQuestion||props.defaultAnswer}
          />
        </div>
          
        <div className={classes.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                checked={revatureBasedQuestion}
                id="revature-based-checkbox"
                onChange={() =>
                  setRevatureBasedQuestion(!revatureBasedQuestion)
                }
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="This question is specific to Revature"
          />

           

            <FormControlLabel
              control={
                <Checkbox
                  checked={locationBasedQuestion}
                  id="location-based-checkbox"
                  onChange={() => toggleLocationBasedQuestion()}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="This question is specific to a location"
            />

            {locationBasedQuestion ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  id="location-dropdown-button"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="outlined"
                  className={classes.locationDropdownButton}
                >
                  {currentLocation.locationName}  <ArrowDropDownIcon />
                </Button>

                <Menu
                  id="location-dropdown-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {locations.map((location) => {
                    return (
                      <MenuItem
                        key={location.id}
                        onClick={(e) => handleLocationChange(e, location)}
                        value={location}
                      >
                        {location.locationName}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              ""
            )}
        </div>

        


        <div className={classes.submit}>
          <Button
            className={classes.btn}
            type="submit"
            id="submitFAQButton"
            disabled={false}
          >
            {" "}
            Submit{" "}
          </Button>
        </div>
      </form>
    </Card>
  );
};
