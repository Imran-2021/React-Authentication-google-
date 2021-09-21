import React, { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from './Firebase.Config';
initializeApp(firebaseConfig);

function App() {
  const [user,setUser]=useState({
    isSignIn:false,
    name:"",
    email:"",
    photo:""
  })
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
const {name,email,photo,isSignIn} = user;
const handleSignIn=()=>{
  signInWithPopup(auth, provider)
    .then((result) => {
      const {displayName,email,photoURL} = result.user;
      const singnInUser = {
        isSignIn:true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(singnInUser)

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
}
  return (
    <div style={{padding: '10px', margin:"20px"}}>
    <h3>react authentication..!!!</h3>
    <button onClick={handleSignIn} style={{cursor:"pointer"}}>Sign In with Google</button> <br /> <br />
    {
      isSignIn && <div>
     <img src={photo} alt="" />
    <p>Name : - {name}</p>
    <p>Email :- {email}</p> 
      </div>
    }
    </div>
  );
}

export default App;
