/**
 * @file
 * @author D. Jared Chase
 * @author Milton Reyes
 * @author Jerry Pujals
 */

import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  ContentBlock,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Box,
  Button,
} from "@material-ui/core";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import HttpIcon from "@material-ui/icons/Http";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import * as questionRemote from "../remotes/question.remote";
import { useHistory } from "react-router";
import { AnyARecord } from "dns";

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
  editorTool: {
    borderRadius:"8px",
    border:"1px solid #f26925",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    fontSize: 20,
    padding: 10,
  },
  buttonInternal: {
      padding: "0.2rem",
  },
});

const styleMap = {
  HIGHLIGHT: {
    padding: 4,
    backgroundColor: "#D3D3D3",
  },
};

export interface RichTextBoxComponentProps {
  defaultText?: any;
  id?: string;
  placeholder?: string;
  handleChange: (e: any) => void;
  showButtons?:boolean
}

export const RichTextBoxComponent: React.FC<RichTextBoxComponentProps> = (
  props
) => {
  const classes = useStyles();

  let defaultTextParsed: any = props.defaultText;
  let textIsPlain: boolean = false;
  //try to parse into an object
  try {
    defaultTextParsed = convertFromRaw(JSON.parse(props.defaultText));
    textIsPlain = false;
  } catch (e) {
    //this catch will run if the string was not an object
    //we will simply treat it as plain text at this point
    defaultTextParsed = props.defaultText ?? "";
    textIsPlain = true;
  }
  const [editorState, setEditorState] = useState(
    textIsPlain
      ? EditorState.createWithContent(
          ContentState.createFromText(defaultTextParsed)
        )
      : EditorState.createWithContent(defaultTextParsed)
  );
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
    props.handleChange(
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    } else {
      return "not-handled";
    }
  };
  const buttonVariant = (name: string) => {
    const currentInLineStyle = editorState.getCurrentInlineStyle();
    if (currentInLineStyle.has(name)) {
        return true;
    } else {
        return false;
    }
}
const blockbuttonVariant = (name: string) => {
    const currentInLineStyle = RichUtils.getCurrentBlockType(editorState);
    if (currentInLineStyle === name) {
        return true;
    } else {
        return false;
    }
}

const onBoldClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
}

const onItalicClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
}
const onUnderlineClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
}
const onStrikethroughClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
}
const onCodeClick = (event: any) => {
    event.preventDefault();
    let editor: EditorState = editorState;
    editor = RichUtils.toggleInlineStyle(editor, 'HIGHLIGHT');
    editor = RichUtils.toggleInlineStyle(editor, 'CODE');
    onChange(editor);
}
const onHead1Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, 'header-one'));
}
const onHead2Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, 'header-two'));
}
const onHead3Click = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, 'header-three'));
}
const onOrderClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
}
const onUnorderClick = (event: any) => {
    event.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
}
const onAddLink = (event: any) => {

    event.preventDefault();

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
        let url = prompt("Select text then enter link", "");

        if (!url) return

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        onChange(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ));

    } else {
        alert('No text selected')
    }
};

  const buttons = [
    { function: onBoldClick, name: <FormatBoldIcon />, style: 'BOLD' },
    { function: onItalicClick, name: <FormatItalicIcon />, style: 'ITALIC' },
    { function: onUnderlineClick, name: <FormatUnderlinedIcon />, style: 'UNDERLINE' },
    { function: onStrikethroughClick, name: <StrikethroughSIcon />, style: 'STRIKETHROUGH' },
    { function: onCodeClick, name: <CodeIcon />, style: 'CODE' }]
const blockbuttons = [

    { function: onOrderClick, name: <FormatListNumberedIcon />, block: 'ordered-list-item' },
    { function: onUnorderClick, name: <FormatListBulletedIcon />, block: 'unordered-list-item' },
    { function: onHead1Click, name: 'H1', block: 'header-one' },
    { function: onHead2Click, name: 'H2', block: 'header-two' },
    { function: onHead3Click, name: 'H3', block: 'header-three' }]
const linkbutton = [{ function: onAddLink, name: <HttpIcon /> }]
  return (
    <ThemeProvider theme={theme}>
      {(props.showButtons)?<Box style={{backgroundColor:"salmon"}}>
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
              1/3
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
               2/3
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
            3/3
          </span>
        ))}
      </Box>
      :<></>}
      <Box className={classes.editorTool}>
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          placeholder={props.placeholder}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          readOnly={props.defaultText ? true : false}
        />
      </Box>
    </ThemeProvider>
  );
};
