import React, { useState } from "react";
import "./Register.scss";
import Axios from "axios";
import { useHistory } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  let history = useHistory()

  const register = () => {
    Axios.post("http://localhost:3001/user/register", {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    })
      .then((response) => {
        console.log(response);
        alert("La création de votre compte est réussit ! ");
        //redirection sur la page de connexion 
        setTimeout(() => (history.push("/login")), 2000);
      })
      .catch((error) => {
        // Affichage message d'erreur
        console.error("Erreur", error.status, ":", error.statusText);
        console.error("URL :", error.responseURL);
      });
  };
  
  return (
    <div className="Register">
      <h2>création de compte</h2>
      <div className="RegisterForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="Password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="Firstname"
          placeholder="firstname..."
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
        />
        <input
          type="Lastname"
          placeholder="lastname"
          onChange={(event) => {
            setLastname(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Register;
