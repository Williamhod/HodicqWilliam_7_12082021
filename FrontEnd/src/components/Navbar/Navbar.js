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
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 0,
    position: "sticky!important",
    top: "0",
    width: "calc(100vw + 10px)",
    zIndex: 999,
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
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTab = useMediaQuery(theme.breakpoints.down("sm"));

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
      disconnect: false,
    },
    {
      id: 2,
      menuTitle: "Profil",
      pageURL: "/profile",
      disconnect: false,
    },
    {
      id: 3,
      menuTitle: "Déconnexion",
      pageURL: "/login",
      disconnect: true,
    },
  ];

  const menuItemsNotLogged = [
    {
      id: 4,
      menuTitle: "Accueil",
      pageURL: "/",
      disconnect: false,
    },
    {
      id: 5,
      menuTitle: "Inscription",
      pageURL: "/register",
      disconnect: false,
    },
    {
      id: 6,
      menuTitle: "Connexion",
      pageURL: "/login",
      disconnect: false,
    },
  ];

  const changeUrl = async (pageURL, disconnect) => {
    console.log("disconnect", disconnect);
    if (disconnect) {
      localStorage.clear();
      await Axios.get("http://localhost:3001/user/logout")
      // window.location.reload(false);
      .then(console.log)
      .then(() => getLoggedIn())
      // .then(() => handleButtonClick(pageURL));
    }
      handleButtonClick(pageURL);
    // }
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
                  const { id, menuTitle, pageURL, disconnect } = menuItem;
                  return (
                    <Button
                      className="Navbar-Button"
                      key={id}
                      onClick={() => changeUrl(pageURL, disconnect)}
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
