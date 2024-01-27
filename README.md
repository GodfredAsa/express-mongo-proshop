# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## FRONTEND 
### DEPENDENCIES IN THE FRONTEND DIRECTORY 
1. react-bootstrap 
2. bootstrap 
3. react icons
</> `npm i react-bootstrap bootstrap react-icons`
4. REACT ROUTER DOM `npm i react-router-dom`
5. REACT ROUTER BOOTSTRAP `react-router-bootstrap`
6. `npm i axios` use axios for api requests
7. added a proxy to the package.json
8. Install Redux `npm i @reduxjs/toolkit react-redux`: react redux is the bridge that connects redux and and react together NB: you can use redux without react you can use it with VUE, ANGULAR and EVEN REGULAR JS.

## BACKEND 

INSTALLING NODEMON AND CONCURRENTLY.
1. nodemon: auto app restarting
2. concurrently enables running of both the server and client with a single command.
NB: installed them ad dev dependencies as we don't need such behaviour in production.
NB: run the command in the root directly 
- in the package.json at the root directory add `type: module` to follow this approach just as seen on line 5
`npm i -D nodemon concurrently`
COMMAND FOR RUNNING BOTH SERVER AND CLIENT SAME TIME: `npm run dev`
3. `npm i -D dotenv` as a dev dependency
4. `npm i mongoose` root directory 
5. ADDING A DATABASE SEEDER: THIS IS A FILE THAT POPULATES THE DB IN START OF THE APPLICATION. 
6. encrypted passwords using `bcrypt` => </> `npm install bcryptjs`
7. `npm install colors` Library for adding colors to the output of the terminal.

NB: Every mongoose method returns a promise.
NB: to run the seeders file in the terminal 

SEEDING DATA INTO THE MONGO DB

`node backend/seeder -d`: this runs the destroyedData method. The dash -d could be anything.

- File: backend/seeder.js
- script for running the file in package.json at the root directory line 12 and 13
- `npm run data:import`: runs the importData function
- `npm run data:destroy`: runs function that clears data from the db.
NB: Built mine customized error Handler.


#### JSON WEB TOKEN INSTALLATION AT ROOT DIR
- `npm i jsonwebtoken`: runs function that clears data from the db.
NB: The server stores the token in HTTP-Only Cookie

`npm i cookie-parser ` enables parsing the cookie from the request object. and its enabled in server.js

NB: Once the user registers we automatically log the user in.

`npm i react-toastify` for notification 