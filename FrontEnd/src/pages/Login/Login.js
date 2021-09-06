import React, { useState } from "react";
import "./Login.scss";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

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
        localStorage.setItem("userid", response.data.id);
        history.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    });
  };

  return (
    <div className="Login-main-container">
      <div className="Login-main-content">
        <h1>Connexion</h1>
      </div>

      <div className="login-form-main-container">
        <FormControl className="login-form-container">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Votre identifiant
          </InputLabel>
          <Input
            className="login-input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className="login-form-main-container">
        <FormControl className="login-form-container">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Votre mot de passe
          </InputLabel>
          <Input
            type="Password"
            className="login-input"
            id="input-with-icon-adornment"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <VpnKeyIcon
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className="log-button">
        <Button
          variant="contained"
          style={{
            background:
              "linear-gradient(70deg, rgba(195,215,215,1) 0%, rgb(255, 214, 214) 50%,rgba(172, 172, 185, 0.9) 100%)",
          }}
          className={classes.button}
          onClick={login}
          endIcon={<NavigateNextIcon />}
        >
          Connexion
        </Button>
      </div>
      <div>
        <p className="loggin-error-message">{errorMessage}</p>
      </div>
    </div>
  );
}

export default Login;
