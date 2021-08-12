import React, { useEffect } from "react";
import "./Home.scss";

function Home() {
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);
  return (
    <div className="home">
      <div className="post"> 

      </div>
    </div>
  );
}

export default Home;
