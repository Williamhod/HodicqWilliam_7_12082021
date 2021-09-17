import React, { useState } from "react";
import "./PostForm.scss";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const classes = useStyles();

  const history = useHistory();

  const post = () => {
    const formData = new FormData();
    formData.append("image", image[0]);
    formData.append("title", title);
    formData.append("description", description);
    Axios
      .post("http://localhost:3001/post", formData)
      .then(() => history.push("/"));
  };
  return (
    <div className="post-main-container">
      <div className="post-main-content">
        <h1>Réalise ta publication</h1>
      </div>
      <div className="post-form-main-container">
        <FormControl className="post-form-container">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Titre de la publication
          </InputLabel>
          <Input
            className="post-input"
            type="text"
            placeholder="Titre..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <TitleIcon
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
      <div className="post-form-main-container">
        <FormControl className="post-form-container">
          <InputLabel
            type="text"
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Description
          </InputLabel>
          <Input
            type="text"
            placeholder="Description..."
            className="post-input"
            id="input-with-icon-adornment"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <DescriptionIcon
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
      <div className="post-form-main-container">
        <FormControl className="post-form-container">
          <InputLabel
            type="text"
            htmlFor="input-with-icon-adornment"
            style={{
              fontSize: 24,
              margin: -5,
            }}
          >
            Images, gifs partagez-les !
          </InputLabel>
          <Input
            className="post-input"
            type="file"
            onChange={(e) => setImage(e.target.files)}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AttachFileIcon
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
          onClick={post}
          endIcon={<PublishIcon />}
        >
          Propage !
        </Button>
      </div>
    </div>
  );
}

export default Post;
