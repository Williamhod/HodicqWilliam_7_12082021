import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Post from "./pages/post/Post"

function App() {
  return (
    <>
      <Navbar/>
    <Router>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/post" exact render={()=><Post/>} />
      </Router>
      </>
  );
}

export default App;
