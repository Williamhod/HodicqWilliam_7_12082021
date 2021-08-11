import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import "./Navbar.scss";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const location = useLocation();

  function setLogged() {
    console.log('changement')
    const item = localStorage.getItem('loggedIn')

    if (item) {
      setLoggedIn(JSON.parse(item))
    }
  }
  useEffect(() => {
    window.addEventListener('storage', ()=>setLogged());

    setLogged();
  
    return () => {
      window.removeEventListener('storage', setLogged)
    }
  }, [location]);

  return (
    <div className="Navbar">
      <Link to="/">Home</Link>

      {loggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/post">post</Link>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
