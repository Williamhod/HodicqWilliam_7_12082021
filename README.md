# Projet 7 OC Groupomania

- [Projet 7 OC Groupomania](#projet-7-oc-groupomania)
  - [Presentation](#presentation)
  - [Specificity](#specificity)
  - [Technology](#technology)
    - [Front-technology](#front-technology)
      - [Dependancies](#dependancies)
    - [Back-technology](#back-technology)
      - [SQL Data Base](#sql-data-base)
      - [Dependancies](#dependancies-1)
  - [Scripts](#scripts)
    - [Front-end](#front-end)
      - [`npm start`](#npm-start)
      - [`npm build`](#npm-build)
    - [Back-End](#back-end)
      - [`npm server`](#npm-server)

## Presentation

---

This is the seventh projet from OC training. goal was to realize internal social network for a fictional compagny "Groupomania".

This application must use one front-end framework, sql for data base, and javascript for all the code.

I use node.js and express for the back-end server.

## Specificity

---

This social network is here to help people in this compagny to know each other
between the different services.

the requirements issued by the steering committee :

- Account creation must be simple and possible with a mobile phone
- Profile me get few informations
- deletion of account must be possible
- acces to a main page where employe publish media content
- acces to a main page where employe publish text content
- user have to found easily the last post
- moderation must be available to moderate interactions between employed
- make sure that the user will be able to request the requested data from SQL and will be able to submit these changes to the SQL database.
- Login data must also be secure

## Technology

---

### Front-technology

This project use React framework and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) to ease the work environment.

#### Dependancies

|     NPM Dependencies      |                         Utility                         |
| :-----------------------: | :-----------------------------------------------------: |
|           Axios           |             Use to realize our http request             |
|        Lorem-ipsum        |      Use to lighten our code with lorem-ipsum text      |
|          Moment           |      Facilitate the way to form Time data on page       |
|           React           | Our framework technology use for the front of this app  |
|           Sass            |           The style is provided by scss files           |
| Material-ui/core and else | Running material ui compenant for style and icon in app |

### Back-technology

For the server, i use node.js and express to build the app who will exchange data with our SQL database.

#### SQL Data Base

|  Tables  |                                   contents                                    |
| :------: | :---------------------------------------------------------------------------: |
|  users   | userId, username, password, firstname, lastname, avatar, isAdmin, dateOfBirth |
|   post   |       postId, created_at, updated_at, title, description, image, userId       |
|  likes   |                                userId, postId                                 |
| comments |                      commentId, userId, postId, comment                       |

#### Dependancies

|  NPM Dependencies  |                                                   Utility                                                   |
| :----------------: | :---------------------------------------------------------------------------------------------------------: |
|      nodemon       |                          Allows you to restart the server at the slightest change                           |
|      express       |                                   Framework to build the web application                                    |
|       bcrypt       |                         Encryption technology used to store our passwords in the DB                         |
| password-validator |                                Allows us to create a typical password scheme                                |
|    jsonwebtoken    |                       Allows the creation of identification tokens to secure our app                        |
|       multer       |                        Package that allows to manage incoming files in our requests                         |
|        path        |           Used to upload our images in order to work on the path of the files in our directories            |
|       dotenv       |                       Used to load the environment variables contained in a file.env                        |
| express-rate-limit |                      Limits the number of requests per IP on the configured time index                      |
|       helmet       | Secures the application of well-known vulnerabilities (cross-site scripting, sniffing, xss protection, ...) |
|         fs         |                (File System) Allows you to manage the downloading and modification of images                |
|      no cache      |                    Allows not to keep a backend cache to always have the update version                     |
|       chalk        |                       Use to provide color on our console.log or message from server                        |
|   cookie-parser    |                                  Allows the use of cookies in this project                                  |
|        Cors        |                                   Simplifies headers, cors configuration                                    |
|       Morgan       |                             Provide informations on terminal about http request                             |

## Scripts

---

In the project directory, you can run:

### Front-end

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Back-End

#### `npm server`

runs server on port 3001, direct [link](http://localhost:3001)
