import "./Profile.scss";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Profile() {
  const [yourProfile, setYourProfile] = useState({});
  const location = useLocation();

  const getProfile = async (username) => {
    return await Axios.get("http://localhost:3001/user/profile/" + username)
      .then((res) => res.data)
      .catch(console.log);
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("loggedIn")) {
        localStorage.setItem("loggedIn", false);
      }
      if (localStorage.getItem("loggedIn", true)) {
        const username = localStorage.getItem("username");
        setYourProfile(await getProfile(username));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div className="Profile">
        {yourProfile ? (
          <>
            <h3>{yourProfile.lastname}</h3>
            <h3>{yourProfile.firstname}</h3>
            <h3>{yourProfile.dateOfBirth}</h3>
          </>
        ) : (
          "INCONNU"
        )}
      </div>
    </>
  );
}

export default Profile;
