import React, { useState } from "react";
import "./Post.scss";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  let history = useHistory();

  const post = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    Axios.post("http://localhost:3001/upload", {
      title: title,
      description: description,
      image: image,
      author: localStorage.getItem("username"),
    }).then(() => {
      history.push("/");
    });
  };
  return (
    <div className="Post">
      <h2>Réalise ton post</h2>
      <div className="PostForm">
        <input
          type="text"
          placeholder="Titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description..."
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <input type="file" onChange={(e) => setImage(e.target.files)} />
        <button onClick={post}>Let's Share it</button>
      </div>
    </div>
  );
}

export default Post;
