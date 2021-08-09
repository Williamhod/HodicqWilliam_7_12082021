import React, { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, [localStorage.getItem("loggedIn")]);

  return (
    <div className="Navbar">
      <a href="/">Home</a>

      {loggedIn ? (
        <>
          <a href="/profile">Profile</a>
          <a href="/post">post</a>
        </>
      ) : (
        <>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </>
      )}
    </div>
  );
}

export default Navbar;
