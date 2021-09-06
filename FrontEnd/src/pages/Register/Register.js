import React, { useState } from "react";
import "./Register.scss";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ContactsIcon from "@material-ui/icons/Contacts";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Register() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  let history = useHistory();

  const register = () => {
    Axios.post("http://localhost:3001/user/register", {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    })
      .then((response) => {
        console.log(response);
        //redirection sur la page de connexion
        setTimeout(() => history.push("/login"), 2000);
      })
      .catch((error) => {
        // Affichage message d'erreur
        console.error("Erreur", error.status, ":", error.statusText);
        console.error("URL :", error.responseURL);
      });
  };

  return (
    <div className="Register-main-container">
      <div className="Register-main-content">
        <h1>Création de compte</h1>
      </div>
      <div className="register-form-main-container">
        <FormControl className="register-form-container">
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
            className="register-input"
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
      <div className="register-form-main-container">
        <FormControl className="register-form-container">
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
            type="password"
            className="register-input"
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
      <div className="register-form-main-container">
        <FormControl className="register-form-container">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Votre nom de famille
          </InputLabel>
          <Input
            className="register-input"
            id="input-with-icon-adornment"
            onChange={(event) => {
              setLastname(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <ContactsIcon
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
      <div className="register-form-main-container">
        <FormControl className="register-form-container">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Votre prénom
          </InputLabel>
          <Input
            className="register-input"
            id="input-with-icon-adornment"
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <ContactsIcon
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
      <div className="register-button">
        <Button
          variant="contained"
          style={{
            background:
              "linear-gradient(70deg, rgba(195,215,215,1) 0%, rgb(255, 214, 214) 50%,rgba(172, 172, 185, 0.9) 100%)",
          }}
          className={classes.button}
          onClick={register}
          startIcon={<AccountBoxIcon />}
        >
          Inscription
        </Button>
      </div>
    </div>
  );
}

export default Register;
