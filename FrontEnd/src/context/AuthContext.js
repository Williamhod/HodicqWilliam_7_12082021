import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const initialContext = { loggedIn: undefined };

/**  Auth context is necessary for the front the get answer from server is user is well connected with a verif token 
* then is also get all informations from token about user. the server response get to item about loggin statement and user inf
* that can be use for routes and all pages 
**/
function AuthContextProvider(props) {
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
