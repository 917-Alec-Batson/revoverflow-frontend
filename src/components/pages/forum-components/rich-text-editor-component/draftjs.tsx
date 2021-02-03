/**
 * @file
 * @author D. Jared Chase
 * @author Milton Reyes
 * @author Jerry Pujals
 * @author Kelvin Trinh
 * @author Stephen Wong
 * @author Mohammed Hammad
 * @author Jinyeong Kim
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Menu, MenuItem, FormControlLabel, Checkbox,Button, createMuiTheme, makeStyles, ThemeProvider, Box, Container, Typography, FormControl, InputBase, Snackbar } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import HttpIcon from '@material-ui/icons/Http';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import * as questionRemote from '../../../../remotes/question.remote';
import { useHistory } from 'react-router';
import { BreadcrumbBarComponent } from '../../breadcrumb-bar.component';
import protectComponent from '../../../protected-route/UserAuthRoute'
import { getLocations } from "../../../../remotes/location.remote";
import { Location } from "../../../../models/location";
import { Alert } from "@material-ui/lab";

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
  boxInternal: {
    color: "#f26925",
  },
  containerTool: {
    paddingTop: 50,
    width: "70%",
    display: "flex",
    flexDirection: "column",
  },
  titleTool: {
    borderStyle: "solid",
    borderColor: "#f26925",
    height: "6vh",
    overflowY: "auto",
  },
  editorTool: {
    borderStyle: "solid",
    borderColor: "#f26925",
    height: "40vh",
    overflowY: "auto",
    fontSize: 20,
    padding: 10,
  },
  buttonInternal: {
    padding: 2,
    marginBottom: 3,
  },
  breadcrumbBar: {
    marginTop: 60,
    marginLeft: 20,
  },
  font: {
    fontSize: 25,
    paddingLeft: 10,
  },
  formControl: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
    minWidth: 120,
  },
  locationDropdownButton: {
    color: "#3498db",
    borderColor: "#3498db"
  }
});

const styleMap = {
  HIGHLIGHT: {
    padding: 4,
    backgroundColor: "#D3D3D3",
  },
};

export const RichTextEditorComponent: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [locations, setLocations] = useState(new Array<any>());
  const [revatureBasedQuestion, setRevatureBasedQuestion] = useState(false);
  const [locationBasedQuestion, setLocationBasedQuestion] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  
  const [formHasEmptyTitle, changeFormHasEmptyTitle] = useState(false);
  const [formHasEmptyDescription, changeFormHasEmptyDescription] = useState(
    false
  );
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const onChange = (editorState: EditorState) => setEditorState(editorState);
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    } else {
      return "not-handled";
    }
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

  useEffect(() => {
    //fetch location data
    async function fetchData() {
      let locationsData: Location[] = await getLocations();
      //console.log(locationsData);
      setLocations(locationsData);
    }
    fetchData();
  }, []);

  const toggleLocationBasedQuestion = () => {
    if (locationBasedQuestion) {
      setCurrentLocation(null);
    }
    else {
      setCurrentLocation(new Object({ id: 1, locationName: "All Locations" }));
    }

    setLocationBasedQuestion(!locationBasedQuestion);
  };

  const saveQuestion = async () => {
    const contentState = editorState.getCurrentContent();

    if (!title) {
      changeFormHasEmptyTitle(true);
    } else {
      changeFormHasEmptyTitle(false);

      if (!contentState.hasText()) {
        changeFormHasEmptyDescription(true);
      } else {
        changeFormHasEmptyDescription(false);
        const payload: any = {
          title: title,
          content: JSON.stringify(convertToRaw(contentState)),
          creationDate: new Date(),
          status: false,
          revatureQuestion: revatureBasedQuestion,
          //locationBasedQuestion: locationBasedQuestion,
          locationID: currentLocation !== null ? currentLocation.id : null,
          userID: +JSON.parse(JSON.stringify(localStorage.getItem("userId"))),
        };

        await questionRemote.postQuestion(payload);
        history.push("/feed");
        window.location.reload(false);
      }
    }
  };

  const toggleRevatureBasedQuestion = () => {
    setRevatureBasedQuestion(!revatureBasedQuestion);
  };

  const handleSnackBarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    changeFormHasEmptyDescription(false);
    changeFormHasEmptyTitle(false);
  };

  //INLINE and BLOCK LEVEL styles, consists of these functions and an array of buttons to map to span button elements
  const buttonVariant = (name: string) => {
    const currentInLineStyle = editorState.getCurrentInlineStyle();
    if (currentInLineStyle.has(name)) {
      return true;
    } else {
      return false;
    }
  };

  const blockbuttonVariant = (name: string) => {
    const currentInLineStyle = RichUtils.getCurrentBlockType(editorState);
    if (currentInLineStyle === name) {
      return true;
    } else {
      return false;
    }
  };

  const onBoldClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const onItalicClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  const onUnderlineClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  const onStrikethroughClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };
  const onCodeClick = (event: any) => {
    event.preventDefault();
    let editor: EditorState = editorState;
    editor = RichUtils.toggleInlineStyle(editor, "HIGHLIGHT");
    editor = RichUtils.toggleInlineStyle(editor, "CODE");
    onChange(editor);
  };
  const onHead1Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-one"));
  };
  const onHead2Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-two"));
  };
  const onHead3Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-three"));
  };
  const onOrderClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };
  const onUnorderClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };
  const onAddLink = (event: any) => {
    event.preventDefault();

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      let url = prompt("Select text then enter link", "");

      if (!url) return;

      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url: url }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });

      onChange(
        RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        )
      );
    } else {
      alert("No text selected");
    }
  };

  const buttons = [
    { function: onBoldClick, name: <FormatBoldIcon />, style: "BOLD" },
    { function: onItalicClick, name: <FormatItalicIcon />, style: "ITALIC" },
    {
      function: onUnderlineClick,
      name: <FormatUnderlinedIcon />,
      style: "UNDERLINE",
    },
    {
      function: onStrikethroughClick,
      name: <StrikethroughSIcon />,
      style: "STRIKETHROUGH",
    },
    { function: onCodeClick, name: <CodeIcon />, style: "CODE" },
  ];
  const blockbuttons = [
    {
      function: onOrderClick,
      name: <FormatListNumberedIcon />,
      block: "ordered-list-item",
    },
    {
      function: onUnorderClick,
      name: <FormatListBulletedIcon />,
      block: "unordered-list-item",
    },
    { function: onHead1Click, name: "H1", block: "header-one" },
    { function: onHead2Click, name: "H2", block: "header-two" },
    { function: onHead3Click, name: "H3", block: "header-three" },
  ];
  const linkbutton = [{ function: onAddLink, name: <HttpIcon /> }];

  return (
    <div className={classes.breadcrumbBar}>
      <BreadcrumbBarComponent />
      <ThemeProvider theme={theme}>
        <Container className={classes.containerTool}>
          <Box justifyContent="flex-start" display="center" padding={3}>
            <Typography variant="h4">Ask a Question</Typography>
          </Box>
          <Box display="flex" flexDirection="column" paddingBottom={3}>
            <Box display="flex">
              <Typography variant="h5">Title:</Typography>
            </Box>
            <Box display="flex" className={classes.titleTool}>
              <FormControl fullWidth variant="outlined">
                <InputBase
                  className={classes.font}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
          </Box>

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
          <Box justifyContent="flex-start" display="flex" flexWrap="wrap">
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
                  variant="outlined"
                  className={classes.locationDropdownButton}
                  id="location-dropdown-button"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {currentLocation.locationName} <ArrowDropDownIcon />
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
          </Box>
          <br />
          <Box>
            <Box justifyContent="center" display="flex" flexDirection="column">
              <Box justifyContent="flex-start" display="flex">
                <Typography variant="h5">Content:</Typography>
              </Box>
              <Box justifyContent="flex-start" display="flex" flexWrap="wrap">
                {buttons.map((b) =>
                  buttonVariant(b.style) ? (
                    <span key={b.style} className={classes.buttonInternal}>
                      <Button
                        key={b.style}
                        onMouseDown={b.function}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        {b.name}
                      </Button>
                    </span>
                  ) : (
                    <span key={b.style} className={classes.buttonInternal}>
                      <Button
                        key={b.style}
                        onMouseDown={b.function}
                        size="small"
                        color="secondary"
                        variant="contained"
                      >
                        {b.name}{" "}
                      </Button>
                    </span>
                  )
                )}
                {blockbuttons.map((b) =>
                  blockbuttonVariant(b.block) ? (
                    <span className={classes.buttonInternal}>
                      <Button
                        key={b.block}
                        onMouseDown={b.function}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        {b.name}
                      </Button>
                    </span>
                  ) : (
                    <span key={b.block} className={classes.buttonInternal}>
                      <Button
                        key={b.block}
                        onMouseDown={b.function}
                        size="small"
                        color="secondary"
                        variant="contained"
                      >
                        {b.name}
                      </Button>
                    </span>
                  )
                )}
                {linkbutton.map((b) => (
                  <span className={classes.buttonInternal}>
                    <Button
                      onMouseDown={b.function}
                      size="small"
                      color="secondary"
                      variant="contained"
                    >
                      {b.name}
                    </Button>
                  </span>
                ))}
              </Box>
            </Box>
            <Box
              justifyContent="center"
              display="flex"
              flexDirection="column"
              className={classes.editorTool}
            >
              <Editor
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange}
              />
            </Box>
            <Box
              justifyContent="flex-end"
              display="flex"
              padding={2}
              paddingBottom={20}
            >
              <Button
                onClick={saveQuestion}
                variant="contained"
                color="secondary"
                size="large"
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Snackbar
            open={formHasEmptyTitle}
            autoHideDuration={6000}
            onClose={handleSnackBarClose}
          >
            <Alert severity="error">Please enter a title</Alert>
          </Snackbar>
          <Snackbar
            open={formHasEmptyDescription}
            autoHideDuration={6000}
            onClose={handleSnackBarClose}
          >
            <Alert severity="error">Please enter a description</Alert>
          </Snackbar>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default protectComponent(RichTextEditorComponent)
