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
import * as utils from "../../utils";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Register() {
  const classes = useStyles();
  const [dbMessage, setDbMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let history = useHistory();

  const register = () => {
    Axios.post("http://localhost:3001/user/register", formData)
      .then((response) => {
        console.log(response);
        //redirection sur la page de connexion
        setDbMessage(
          "inscription validée ! redirection de la page en cours..."
        );
        setTimeout(() => history.push("/login"), 2500);
      })
      .catch(({ response }) => {
        // Affichage message d'erreur
        !utils.empty(response)
          ? setDbMessage(`Erreur ${response.status} :  ${response.statusText}`)
          : setDbMessage("");
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
            onChange={handleChange}
            name="username"
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
            onChange={handleChange}
            name="password"
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
            onChange={handleChange}
            name="lastname"
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
            onChange={handleChange}
            name="firstname"
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
      <div>
        <p className="loggin-error-message">{dbMessage}</p>
      </div>
    </div>
  );
}

export default Register;
