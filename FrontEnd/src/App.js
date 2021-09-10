import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

//to accept cookie
axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />

          {loggedIn === false && (
            <>
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </>
          )}
          {loggedIn === true && (
            <>
              <Route path="/post" exact component={Post} />
              <Route path="/profile" exact component={Profile} />
            </>
          )}
        </Switch>
        <Footer />
      </Router>
  );
}

export default App;
