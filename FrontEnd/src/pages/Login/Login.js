import React, { useState } from "react";
import "./Login.scss";
import Axios from "axios";

import {useHistory} from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory()

  const login = () => {
    Axios.post("http://localhost:3001/user/login", {
    // http://localhost:3001
    // Axios.post(`${process.env.URL_BACK}/user/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        history.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    });
  };

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <div className="LoginForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Connexion</button>
        <h3>{errorMessage}</h3>
      </div>
    </div>
  );
}

export default Login;
