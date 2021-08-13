import React, { useEffect, useState } from "react";
import "./Home.scss";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";

function Home() {
  const [post, setPost] = useState([]);
  const [loggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
    if (localStorage.getItem("loggedIn", true)) {
      Axios.get("http://localhost:3001/post").then((response) => {
        setPost(response.data);
      });
    }
  }, [location]);

  const likePost = (id, key) => {
    let tempLikes = post;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post("http://localhost:3001/like", {
      userLiking: localStorage.getItem("username"),
      postId: id,
    }).then((response) => {
      console.log("you like this post ");
      setPost(tempLikes);
    });
  };

  return (
    <>
      {loggedIn ? (
        <div className="home">
          {post.map((val,key) => {
            return (
              <div className="post">
                <div className="image">
                  <img src={`http://localhost:3001/${val.image}`} alt="" />
                </div>
                <div className="content">
                  <div className="title">
                    {val.title} /by @ {val.author}
                  </div>
                  <div className="description">{val.description}</div>
                </div>
                <div className="Engagement">
                  <ThumbUpAltTwoToneIcon
                    id="likeButton"
                    onClick={() => {
                      likePost(val.id, key);
                    }}
                  />
                  {val.likes}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>home dc</div>
      )}
    </>
  );
}

export default Home;
