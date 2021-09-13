import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const initialContext = { loggedIn: undefined };

function AuthContextProvider(props) {
  // const [loggedIn, setLoggedIn] = useState(undefined);
  const [connexion, setConnexion] = useState(initialContext);

  async function getConnexion() {
    const connexionRes = await axios
      .get("http://localhost:3001/user/loggedIn")
      .then((res) => res.data);
    
    console.log("res", connexionRes);
    setConnexion(connexionRes);
  }
  useEffect(() => {
    getConnexion();
  }, []);
  return (
    <AuthContext.Provider value={{ connexion, getConnexion }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
