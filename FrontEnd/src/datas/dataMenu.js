export const menuItemsLogged = [
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

export const menuItemsNotLogged = [
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

const menuItems = { menuItemsLogged, menuItemsNotLogged };

export default menuItems;
