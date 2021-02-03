/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./login.component.css";
import * as loginRemote from '../../../remotes/login.remote'
import { useHistory } from 'react-router';
import { useState } from 'react';
import { authAxios } from "../../../remotes/internal.axios";
import firebase from "firebase/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100ch",
      },
    },
  })
);

export const LoginComponent: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => { }, []);

  let response: any;
  const setInformation = async (accessToken:any, email:any) => {
    authAxios.defaults.headers["Authorization"]= accessToken;
    await retrievePoints(email);
    setInputEmail('');
    setInputPassword('');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email)
    history.push('/feed')
  }

  const retrievePoints = async (email : any) => {

    const response = authAxios.get(`/user/${email}/points`)
    localStorage.setItem('points', (await response).data.points)
    localStorage.setItem('admin', (await response).data.admin)

  }

  const addLoginCredentials = async (e: any) => {
    e.preventDefault()
    try {

       
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(inputEmail, inputPassword)

        console.log(user)

      const accessToken = await firebase.auth().currentUser?.getIdToken(true)
      const email = firebase.auth().currentUser?.email
      
      await setInformation(`Bearer ${accessToken}`, email);
     
    } catch {
      alert('Incorrect username and/or password')
    }

  }



  return (
    <div>
      <img alt="logo" id="logo" src={require("../../../logo/image.png")} />

      <div className="wrapper">
        <div className="form-wrapper">
          <h3 className="h3">Login</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <div className="logIn">
              <button type="submit" onClick={(e) => addLoginCredentials(e)}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
