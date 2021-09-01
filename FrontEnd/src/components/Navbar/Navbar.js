import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
// Link,
import "./Navbar.scss";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withRouter, useLocation } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
//import { typography } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    [theme.breakpoints.down("xs")]: { flexGrow: 1 },
  },
}));

function Navbar(props) {
  const { history } = props;
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn"))
  );
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  function setLogged() {
    const item = localStorage.getItem("loggedIn");

    if (item) {
      setLoggedIn(JSON.parse(item));
    }
  }
  useEffect(() => {
    window.addEventListener("storage", () => setLogged());

    setLogged();

    return () => {
      window.removeEventListener("storage", setLogged);
    };
  }, [location]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItemsLogged = [
    {
      id: 0,
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      id: 1,
      menuTitle: "Post",
      pageURL: "/post",
    },
    {
      id: 2,
      menuTitle: "Profile",
      pageURL: "/profile",
    },
  ];

  const menuItemsNotLogged = [
    {
      id: 3,
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      id: 4,
      menuTitle: "Register",
      pageURL: "/register",
    },
    {
      id: 5,
      menuTitle: "Login",
      pageURL: "/login",
    },
  ];

  const menuItems = loggedIn ? menuItemsLogged : menuItemsNotLogged;
  console.log(menuItems);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background:
            "linear-gradient(70deg, rgba(125,124,124,1) 0%, rgba(114,114,126,0.9) 43%, rgba(255,215,215,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          <div className="Navbar-Button-Container">
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  // transformOrigin={{
                  //   vertical: "top",
                  //   horizontal: "right",
                  // }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((menuItem) => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                      <MenuItem
                        key={menuItem.id}
                        onClick={() => handleMenuClick(pageURL)}
                      >
                        {menuTitle}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <div className="Navbar-Button">
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button
                      key={menuItem.id}
                      variant="contained"
                      onClick={() => handleButtonClick(pageURL)}
                    >
                      {menuTitle}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);
/*function Navbar() {
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const location = useLocation();

  function setLogged() {
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
*/
