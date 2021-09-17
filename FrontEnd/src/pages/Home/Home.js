import React, { useCallback, useEffect, useState } from "react";
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
  const {
    connexion: { loggedIn, user },
  } = useContext(AuthContext);
  const location = useLocation();
  const userId = user?.userId;

  //this dependance is use for lorem auto sentence and lighten the code
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
  const getPosts = useCallback(() => {
    console.log('getpost');
    Axios.get("http://localhost:3001/post?userId=" + userId)
      .then((res) => res.data)
      .then((res) => {
        setPosts(res);
        console.log(res);
      });
  },[userId]);

  //this use effect is use to verified the context of connexion and realize the call to get posts
  useEffect(() => {
    
    if (loggedIn === true) {
      getPosts();
    }
  }, [location, loggedIn,getPosts]);

  const likeVal = [1, -1];
  // function use to adapte front about user like and realise call on db server to increment or remove the like
  const likePost = async (i) => {
    const lesPosts = [...posts];

    lesPosts[i].nbLikes += likeVal[+lesPosts[i].isLiked];
    lesPosts[i].isLiked = !lesPosts[i].isLiked;

    await Axios.post("http://localhost:3001/post/like", {
      userId: user.userId,
      postId: lesPosts[i].id,
      like: lesPosts[i].isLiked,
    }).then((response) => {
      setPosts(lesPosts);
    });
  };

  return (
    //home page if context return true about connexion
    <>
      {loggedIn ? (
        <div className="home">
          <div className="home-loggin">
            {posts.length ? (
              posts.map((post, key) => (
                <Post
                  post={post}
                  key={key}
                  index={key}
                  likePost={likePost}
                  getPosts={getPosts}
                />
              ))
            ) : (
              <p>Soyez le premier a publier !</p>
            )}
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
        //home page when context return false about connexion
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
