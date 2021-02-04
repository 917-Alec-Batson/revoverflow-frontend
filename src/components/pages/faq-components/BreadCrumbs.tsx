import React, { useEffect } from 'react';
import { emphasize, withStyles, Theme, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TorontoIcon, {AllLocationsIcon, Dallas, Morgan, Ny, Orlando, Reston, Tampa} from './custom-icons/toronto'



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

    parentCrumb:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      boxSizing:"border-box",
      width:"100%",      
    },
    babyCrumb:{
      margin: "1rem 0.5rem",

    },
    crumbIcon: {
      color: "#3498db"
    },

});



const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[100],
      color: "#f26925",

      
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


  function handleClick(event:any) {
    event.preventDefault();
   (event.target.tagName == "IMG") ? props.handleLocationClick(event.target.alt) : props.handleLocationClick(event.target.innerText)
  }

  const classes = useStyles();


  return (

    <ThemeProvider theme={theme} > 
      <Breadcrumbs separator="|" className={classes.parentCrumb} aria-label="breadcrumb">
            
      {/* <StyledBreadcrumb
            className={classes.babyCrumb}
            component="a"
            href="#AllLocations"
            label="AllLocations"
            icon={<AllLocationsIcon />}
            onClick={handleClick}
          />
           */}
          <StyledBreadcrumb
            className={classes.babyCrumb}
            component="a"
            href="#Toronto"
            label="Toronto"
            icon={<TorontoIcon />}
            onClick={handleClick}
          />
        
        <StyledBreadcrumb 
        className={classes.babyCrumb}
        component="a" 
        href="#Reston" 
        label="Dallas" 
        icon={<Dallas />}
        onClick={handleClick} 
        />
        
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Morgantown"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Morgan />}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="NewYork"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Ny />}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Orlando"
          deleteIcon={<ExpandMoreIcon />}
          icon={<Orlando />}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Reston"
          icon={<Reston />}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Tampa"
          icon={<Tampa />}
          onClick={handleClick}
        />
        
      </Breadcrumbs>

    </ThemeProvider>
  );
}
