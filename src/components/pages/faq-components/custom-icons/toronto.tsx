import React from 'react'

const style = {
    icons:{
        width:"2rem", 
        borderRadius:"50%", 
        margin:"0"
    }
}

export const AllLocationsIcon = ()=>{


    return(
            <img style={style.icons} alt="AllLocations"  src="./icons/to.png"/>
    )   
}

const TorontoIcon = ()=>{


    return(
            <img style={style.icons} alt="Toronto"  src="./icons/to.png"/>
    )   
}

export const Dallas = ()=>{

    return(
            <img style={style.icons} alt="Dallas" src="./icons/dl.png"/>
    )   
}

export const Morgan = ()=>{

    return(
            <img style={style.icons} alt="Morgantown" src="./icons/mt.png"/>
    )   
}
export const Ny = ()=>{

    return(
            <img style={style.icons} alt="New York" src="./icons/NYC.png"/>
    )   
}
export const Orlando = ()=>{

    return(
            <img style={style.icons} alt="Orlando" src="./icons/ol.png"/>
    )   
}
export const Reston = ()=>{

    return(
            <img style={style.icons} alt="Reston" src="./icons/re.png"/>
    )   
}
export const Tampa = ()=>{

    return(
            <img style={style.icons} alt="Tampa" src="./icons/ta.png"/>
    )   
}

export default TorontoIcon