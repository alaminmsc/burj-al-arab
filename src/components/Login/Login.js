import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import {UserContext} from '../../App';
import { useHistory, useLocation } from "react-router";

const Login = () => {

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    //UseHistory to redirect to another page
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

//Input Context API
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //Google Sign In Handle Button
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

//End Google Handle Button


  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={googleSignIn}>Google Sign In</button>
    </div>
  );
};

export default Login;
