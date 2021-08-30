import React, { useEffect, useState } from "react";
import "./Home.scss";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
    if (localStorage.getItem("loggedIn", true)) {
      Axios.get("http://localhost:3001/post")
        .then((res) => res.data)
        .then((res) => {
          setPosts(res);
          console.log(res);
        });
    }
  }, [location]);


  const likeVal = [1, -1];

  const likePost = async (i) => {
    const lesPosts = [...posts];

    lesPosts[i].nbLikes += likeVal[+lesPosts[i].isLiked];
    lesPosts[i].isLiked = !lesPosts[i].isLiked;

    await Axios.post("http://localhost:3001/post/like", {
      userId: 1,
      postId: lesPosts[i].id,
      like: lesPosts[i].isLiked,
    }).then((response) => {
      setPosts(lesPosts);
    });
  };

  return (
    <>
      {loggedIn ? (
        <div className="home">
          {posts.map((post, key) => {
            return (
              <div className="post" key={post.id}>
                <div className="image">
                  <img src={`http://localhost:3001/${post.image}`} alt="" />
                </div>
                <div className="content">
                  <div className="title">
                    {post.title} /by @ {post.lastname} {post.firstname}
                  </div>
                  <div className="description">{post.description}</div>
                </div>
                <div className="Engagement">
                  {post.isLiked ? (
                    <ThumbUpIcon
                      id="likeButton"
                      onClick={() => {
                        likePost(key);
                      }}
                    />
                  ) : (
                    <ThumbDownIcon
                      id="likeButton"
                      onClick={() => {
                        likePost(key);
                      }}
                    />
                  )}
                  {post.nbLikes}
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
