# About 
This is a template for react websites. It'll get you up and running in no time. Follow the setup instructions and test it out. 
I've added a simple login screen in order to show the basic flow of the program and give you the part you might need in order to get started.

# Setup 
- `git clone https://github.com/victor-axelsson/react_template.git`
- `npm install`
- Add env file `src/js/core/env.js`
```
export const ENV = {
    LOG: {
        NETWORK: true,
    },
    DEV: true,
    BASE_URL: "http://localhost:3000/v1"
}
``` 
- `npm start`

# Adding navigation
If you want to navigate to another page you need o do the following: 
- Create your new component
- Create a entry in the `core/constants.js` file
- Return you new component in the `components/router.js`
- Dispatch the navigation event, like in the home component. 

```
dispatch({
    type: CONSTANTS.NAVIGATE_TO_PAGE, 
    payload: {
        name: CONSTANTS.LOGIN,
        title: "Login"
    }
}); 
``` 

# Making http requests
You can have a look in the api folder, there should be a userApi.js file that is responsible for making http requests that regard the user. 
If you have other kind of models, this is where you create you api calls. The easiest way is probably to mimic how it's already implemented. 
You can import the http module which should have support for: 

- GET
- PUT
- POST 
- DELETE

Should you need any other web methods, please implement and make a pull request. 

# Persistent storage
You can use the `core/persistentStorage.js` module if you want to save something perment. It has support for key/val storage. Currently it's used
for storing the user object so that you don't get logged out if you refresh the browser. My suggestion is that you try and json encode your
objects and store them as a key instead of saving all variables as sepparate keys. This will make it easier for you to retrieve bigger objects.

