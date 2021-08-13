import React, { useEffect, useState } from "react";
import "./Home.scss";
import Axios from "axios";
import { useLocation } from "react-router-dom";

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

  return (
    <div>
      {loggedIn ? (
        <div className="home">
          {post.map((val) => {
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
              </div>
            );
          })}
        </div>
      ) : (
        <div>home dc</div>
      )}
    </div>
  );
}

export default Home;
