import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import LogoNavbarMobile from "../../images/Logo/icon.png";
import LogoNavbarDesk from "../../images/Logo/icon-left-font.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withRouter, useLocation } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 0,
    position: "sticky!important",
    top: "0",
    width: "calc(100vw + 10px)",
  },
  menuButton: {
    marginRight: theme.spacing(0),
    width: "auto!important",
    color: "#9c0303",
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
  const isTab = useMediaQuery(theme.breakpoints.down("sm"));

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
      id: 1,
      menuTitle: "Publier",
      pageURL: "/post",
      loggin: "nul",
    },
    {
      id: 2,
      menuTitle: "Profil",
      pageURL: "/profile",
      loggin: "nul",
    },
    {
      id: 3,
      menuTitle: "Déconnexion",
      pageURL: "/login",
      loggin: false,
    },
  ];

  const menuItemsNotLogged = [
    {
      id: 4,
      menuTitle: "Accueil",
      pageURL: "/",
      loggin: "nul",
    },
    {
      id: 5,
      menuTitle: "Inscription",
      pageURL: "/register",
      loggin: "nul",
    },
    {
      id: 6,
      menuTitle: "Connexion",
      pageURL: "/login",
      loggin: "nul",
    },
  ];

  const disconnect = (pageURL,loggin) => {
    handleButtonClick(pageURL);
    if (loggin === false) {
      localStorage.clear();
      window.location.reload(false);
    }
  };

  //ajust menu link by loggin statement
  const menuItems = loggedIn ? menuItemsLogged : menuItemsNotLogged;

  //Ajust the logo by the screen size
  const logoNavbar = isTab ? LogoNavbarMobile : LogoNavbarDesk;

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background:
            "linear-gradient(70deg, rgba(195,215,215,1) 0%, rgba(172, 172, 185, 0.9) 50%, rgb(255, 214, 214)100%)",
        }}
      >
        <Toolbar className="Navbar">
          <div
            className="logo-navbar-container"
            onClick={() => handleButtonClick("/")}
          >
            <img
              className="logo-navbar"
              src={logoNavbar}
              alt="Logo de l'entreprise"
            />
          </div>
          <div className="Navbar-Button-Container">
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
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
                  //  transformOrigin={{
                  //    vertical: "top",
                  //  horizontal: "right",
                  // }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((menuItem) => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                      <MenuItem
                        className="MenuItem-Li"
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
              <div className="Navbar-Button-container">
                {menuItems.map((menuItem) => {
                  const { id,menuTitle, pageURL, loggin } = menuItem;
                  return (
                    <Button
                      className="Navbar-Button"
                      key={id}
                      onClick={()=>disconnect(pageURL,loggin)}
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
