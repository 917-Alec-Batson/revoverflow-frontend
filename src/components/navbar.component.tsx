/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

/**
 * @file Nanage the side menu component for the web application
 * @author Yurrian Pierre-Boyer
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { CssBaseline, Typography, IconButton } from "@material-ui/core";
import { Menu, MenuItem, Box } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as loginRemote from '../remotes/login.remote'
import firebase from "firebase/app";


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
      backgroundColor: "#FFFFFF",
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
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    orange: {
      color: "#F26925",
      fontSize: 40,
    },
    pointsDisplay: {
      color: "#F26925",
      fontSize: 30,
      paddingTop: 11,
    },
    imageDoor: {
      paddingBottom: 10,
    },
    arrangement: {
      display: "flex",
      justifyContent: "space-between",
    },
    arrangementInternal: {
      display: "flex",
      flexDirection: "row",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      color: "white",
      backgroundColor: "gray",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "white",
      fontWeight: "bolder",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    logo: {
      marginTop: "-1em",
      position: "absolute",
      cursor: "pointer",
    },
  })
);
export const NavbarComponent: React.FC<any> = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");
      localStorage.removeItem("points");
    }).catch((error) => {
      alert('Error Occured while trying to logout')
    })
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose()}>
        {" "}
        <Typography onClick={() => history.push("/")}> Log Out </Typography>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const [points, setPoints] = useState<any>(0);
  const gettingPoints = localStorage.getItem("points");

  //update components when point change
  useEffect(() => {
    displayPoints();
  }, [points]);

  const displayPoints = async () => {
    if (gettingPoints) {
      try {
        const response = await loginRemote.getUserById(localStorage.getItem('email'));
      localStorage.setItem('points', JSON.stringify(response.data.points));
      } catch {
        alert("Couldnt retrieve points");
      }
      setPoints(localStorage.getItem("points"));
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar className={classes.arrangement}>
          <Box className={classes.arrangementInternal}>
            <Box className={classes.imageDoor}>
                <img
                  className={classes.logo}
                  onClick={() => {history.push("/feed")}}
                  src={require("../logo/image.png")}
                  height={40}
                  width={100}
                  alt="pop"
                />
            </Box>
          </Box>

          <Box id="profile-icon-box" className={classes.arrangementInternal}>
            <IconButton
              id="profile-icon-button"
              edge="start"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle className={classes.orange} />
            </IconButton>

            <Typography className={classes.pointsDisplay} variant="h4" >
              Points: {points || 0}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
        {renderMobileMenu}
        {renderMenu}
    </div>
  );
};
