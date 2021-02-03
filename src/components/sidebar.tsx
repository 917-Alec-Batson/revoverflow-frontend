import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      marginTop: "5em", //THIS IS BAD: its hardcoding the position for the top of the sidebar
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    listItem: {
        alignItems: "center",
        paddingLeft: "0.5em"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    orange: {
        color: "#F26925",
        fontSize: 40,
      },
  })
);

const Sidebar: React.FC<any> = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
            {!open ? 
                (<IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    // className={clsx(classes.menuButton, classes.orange, {
                    //     [classes.hide]: open,
                    // })} 
                    >
                        <ChevronRightIcon />
                </IconButton>
                ) : (
                <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                )
            }
        </div>
        <List>
          {["Feed"].map((text, index) => (
            <ListItem
              id="feedTab"
              onClick={() => history.push("/feed")}
              style={{ color: "#F26925" }}
              button
              key={text}
            >
              <ListItemIcon className={classes.listItem}>
                <LiveHelpIcon
                  onClick={() => history.push("/feed")}
                  style={{ color: "#F26925" }}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider />
          {["Post A Question"].map((text, index) => (
            <ListItem
              id="postQuestionTab"
              onClick={() => {
                history.push("/question");
              }}
              style={{ color: "#F26925" }}
              button
              key={text}
            >
              <ListItemIcon className={classes.listItem}>
                <QuestionAnswerIcon
                  onClick={() => {
                    history.push("/question");
                  }}
                  style={{ color: "#F26925" }}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider />
          {["FAQ"].map((text, index) => (
            <ListItem
              onClick={() => {
                history.push("/faq");
              }}
              style={{ color: "#F26925" }}
              button
              key={text}
            >
              <ListItemIcon className={classes.listItem}>
                <RecordVoiceOverIcon
                  onClick={() => {
                    history.push("/faq");
                  }}
                  style={{ color: "#F26925" }}
                ></RecordVoiceOverIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider />
          {["Question"].map((text, index) => (
            <ListItem
              id="allQuestionsTab"
              onClick={() => {
                history.push("/all-questions");
              }}
              style={{ color: "#F26925" }}
              button
              key={text}
            >
              <ListItemIcon className={classes.listItem}>
                <HelpOutlineIcon
                  onClick={() => {
                    history.push("/all-questions");
                  }}
                  style={{ color: "#F26925" }}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
