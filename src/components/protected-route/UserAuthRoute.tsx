import React from 'react'
import { Redirect } from 'react-router'
import {FirebaseAuthConsumer} from '@react-firebase/auth';
import firebase from "firebase/app";

const UserAuthRoute: React.FunctionComponent<any> = (props) => {
   
    return (
        // <FirebaseAuthConsumer>
        // {({ isSignedIn, user, providerId }) => {
        //   console.log(isSignedIn)
        //     return isSignedIn ? (
        //         <>
        //         {console.log("IN Consumer : " + isSignedIn + "  _ " + user)}
        //             {props.children}
        //         </>
        //     ) : <Redirect to="/" />
        // }}
        // </FirebaseAuthConsumer> 
        localStorage.getItem("accessToken")? 
            <>
            {props.children} 
            </> :
        <Redirect to='/'/>
    )         
}

//HOC
const protectComponent = (Component: any) => {
    return (props: any) => {
        return (
            <>
                <UserAuthRoute>
                    <Component {...props} />
                </UserAuthRoute>
            </>
        )
    }
}

export default protectComponent