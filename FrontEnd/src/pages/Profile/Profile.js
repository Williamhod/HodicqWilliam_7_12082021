import "./Profile.scss";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/fr";
import AuthContext from "../../context/AuthContext";
import profilePicture from "../../images/profile/profile.png";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Profile() {
  const [yourProfile, setYourProfile] = useState({});
  const location = useLocation();
  const history = useHistory();
  const {
    connexion: { user },
  } = useContext(AuthContext);
  const username = user.username;

  const getProfile = async (username) => {
    return await Axios.get("http://localhost:3001/user/profile/" + username)
      .then((res) => res.data)
      .catch(console.log);
  };

  useEffect(() => {
    (async () => {
      setYourProfile(await getProfile(username));
    })();
  }, [username, location]);

  const removeAccount = () => {
    Axios.delete("http://localhost:3001/user/" + user.userId)
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="Profile-main-container">
        {yourProfile ? (
          <>
            <div className="Profile-container">
              <div className="Profile-main-content"></div>

              <div className="profile-user-main-board">
                <div className="profile-image">
                  <img src={profilePicture} alt="" />
                </div>
                <h2 className="profile-user-name">
                  {yourProfile.lastname}.{yourProfile.firstname}
                </h2>
                <div className="profile-user-born">
                  <p>
                    Né(e) le :{}
                    <span className="profile-user-born-content">
                      {
                        <Moment format="ddd DD MMMM YYYY">
                          {yourProfile.dateOfBirth}
                        </Moment>
                      }
                    </span>
                  </p>
                </div>
                <div className="profile-stats">
                  <ul>
                    <li className="profile-stat-count">
                      <span>164</span> posts
                    </li>
                    <li className="profile-stat-count">
                      <span>188</span> likes
                    </li>
                  </ul>
                </div>
                <div className="profile-bio">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit rem sapiente quidem nobis necessitatibus, quasi
                    suscipit voluptatem optio odit doloribus! Incidunt
                    perspiciatis debitis voluptatibus ipsa sequi eaque veritatis
                    rerum iusto. Distinctio magnam vero officia saepe quod dicta
                    quas et corrupti laudantium facilis. Id labore in officia
                    nam at tenetur fuga. 📷✈️🏕️
                  </p>
                </div>
              </div>

              <Button
                variant="contained"
                onClick={removeAccount}
                className="profile-btn-remove"
                style={{
                  background:
                    "radial-gradient(circle, rgba(189,3,3,1) 10%, rgba(246,209,210,1) 50%, rgba(189,3,3,1) 90%)",
                }}
                endIcon={<DeleteOutlineIcon />}
              >
                Supprimer mon compte
              </Button>
            </div>
          </>
        ) : (
          "INCONNU"
        )}
      </div>
    </>
  );
}

export default Profile;
