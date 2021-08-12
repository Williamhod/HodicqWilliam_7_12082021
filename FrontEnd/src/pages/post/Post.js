import React, { useState } from "react";
import "./Post.scss";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const author = localStorage.getItem("username");
  
  let history = useHistory();

  const post = () => {
    const formData = new FormData();
    formData.append("image", image[0]);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author)
    Axios
      // .post("http://localhost:3001/post", { title, description, image })
      .post("http://localhost:3001/post", formData)
    .then(() => {
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
