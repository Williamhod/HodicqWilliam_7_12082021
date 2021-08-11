import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Post from "./pages/post/Post";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/post" exact component={Post} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
