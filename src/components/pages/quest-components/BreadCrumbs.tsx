import React from 'react';
import { withStyles, Theme, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TorontoIcon, { AllLocationsIcon, Dallas, Morgan, Ny, Orlando, Reston, Tampa } from '../faq-components/custom-icons/toronto';


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
  parentCrumb: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: "100%"

  },
  babyCrumb: {
    // flexGrow:"1"
    margin: "1.5rem",

  },
  crumbIcon: {
    color: "#3498db"
  }

});

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,

    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[100],
      color: "#000000",

      fontWeight: "bold"

    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.primary.main,

    },
  },
}))(Chip) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export interface IBreadCrumbComponentProps{
  handleLocationClick:(e: any) => void
}

export const CustomizedBreadcrumbs:React.FC<IBreadCrumbComponentProps> = (props) => {

  const classes = useStyles();

  function handleClick(locationID: number) {
    // event.preventDefault();
    props.handleLocationClick(locationID)
    console.log(locationID);
  }


  return (

    <ThemeProvider theme={theme} >

      <Breadcrumbs separator="|" className={classes.parentCrumb} aria-label="breadcrumb">
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // locationID="1"
          component="a"
          href="#All Locations"
          label="All Locations"
          icon={<AllLocationsIcon />}
          onClick={() => handleClick(1)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="2"
          component="a"
          href="#Reston"
          label="Reston"
          icon={<Reston />}
          onClick={() => handleClick(2)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="3"
          component="a"
          href="#Toronto"
          label="Toronto"
          icon={<TorontoIcon />}
          onClick={() => handleClick(3)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="4"
          label="Tampa"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Tampa />}
          onClick={() => handleClick(4)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="5"
          label="New York"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Ny />}
          onClick={() => handleClick(5)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="6"
          label="Dallas"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Dallas />}
          onClick={() => handleClick(6)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="7"
          label="Orlando"
          icon={<Orlando />}
          onClick={() => handleClick(7)}
        />
        <StyledBreadcrumb
          className={classes.babyCrumb}
          // value="8"
          label="Morgantown"
          icon={<Morgan />}
          onClick={() => handleClick(8)}
        />
      </Breadcrumbs>

    </ThemeProvider>
  );
}

export default CustomizedBreadcrumbs;