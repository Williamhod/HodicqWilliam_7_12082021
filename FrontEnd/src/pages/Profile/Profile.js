import "./Profile.scss";
import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/fr";
import AuthContext from "../../context/AuthContext";

function Profile() {
  const [yourProfile, setYourProfile] = useState({});
  const location = useLocation();
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

  return (
    <>
      <div className="Profile">
        {yourProfile ? (
          <>
            <h3>{yourProfile.lastname}</h3>
            <h3>{yourProfile.firstname}</h3>
            <h3>
              {
                <Moment format="ddd DD MMMM YYYY">
                  {yourProfile.dateOfBirth}
                </Moment>
              }
            </h3>
          </>
        ) : (
          "INCONNU"
        )}
      </div>
    </>
  );
}

export default Profile;
