import React, { useEffect, useState } from "react";
import "./Home.scss";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Logobar from "../../images/Logo/icon-left-font.png";
import { LoremIpsum } from "lorem-ipsum";
import Post from "../../components/Post/Post";
import LogoLoading from "../../images/Logo/icon.png";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();
  const userId = localStorage.getItem("userid");
  console.log(userId);

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  useEffect(() => {
    if (loggedIn === false) {
    }
    if (loggedIn === true) {
      Axios.get("http://localhost:3001/post?userId=" + userId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.data)
        .then((res) => {
          setPosts(res);
          console.log(res);
        });
    }
  }, [location, loggedIn, userId]);

  const likeVal = [1, -1];

  const likePost = async (i) => {
    const lesPosts = [...posts];

    lesPosts[i].nbLikes += likeVal[+lesPosts[i].isLiked];
    lesPosts[i].isLiked = !lesPosts[i].isLiked;

    await Axios.post(
      "http://localhost:3001/post/like",
      {
        userId: userId,
        postId: lesPosts[i].id,
        like: lesPosts[i].isLiked,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      setPosts(lesPosts);
    });
  };

  return (
    <>
      {loggedIn ? (
        <div className="home">
          <div className="home-loggin">
            {posts.map((post, key) => (
              <Post post={post} key={key} index={key} likePost={likePost} />
            ))}
            <div>
              <img
                className="logo-homePage"
                src={LogoLoading}
                alt="Logo de l'entreprise"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="home">
          <div className="home-notloggin">
            <div className="home-notloggin-main">
              <img
                src={Logobar}
                alt="Logo de l'entreprise"
                className="home-main-img"
              />
              <h1>Bienvenue à tous sur notre réseaux sociale d'entreprise !</h1>
            </div>
            <div>
              <p className="home-notloggin-P">{lorem.generateParagraphs(7)}</p>
              <p className="home-notloggin-P">{lorem.generateParagraphs(5)}</p>
              <p className="home-notloggin-P">{lorem.generateParagraphs(3)}</p>
              <p className="home-notloggin-P">{lorem.generateParagraphs(2)}</p>
              <p className="home-notloggin-P">{lorem.generateParagraphs(1)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
