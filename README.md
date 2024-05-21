# **QuantumBot Core**

## **Project Overview**
This project is meant to introduce the core functionality of a backend service using NodeJS and Firebase. The project goes through setup, usage, deployment, and endpoint testing of a backend via Postman, which ultimately leads to a functional way to add messages (or any kind of data) to a Firebase database.
## **Installation**
This project uses NodeJS and Firebase, so make sure that NodeJS is downloaded and you have a Firebase account set up.

To initalize a Firebase project with all the required dependencies, run the following commands:
```
npm install -g firebase-tools
firebase login
firebase init
```
This should lead you to the Firebase initalization in the terminal, where you should select `functions`. To emulate the structure seen in this project, a folder named `api` should be added in the `functions` folder, where all the api functions should be added.

Postman (or some other API testing software) should be downloaded to be able to test the endpoint later on.
## **Usage**
Write an endpoint in the `functions/api/` folder (such as the one in this repository) and export it in the `functions/index.js` file, and after that is completed, it can be deployed (note that you must be on the Firebase Blaze plan) using:
```
firebase deploy --only functions
```
You can go to the Firebase console to check that the function has been deployed. To test this project, an API testing software like Postman can be used to write POST requests, where the content type is `json`, and the content structure looks like this:
```
{
    "data": {
        "text": "test message",
        "userID": "testuser"
    }
}  
```

After sending the POST request, you should be able to see the data added in the Firebase console.
## **Structure**
The relevant file structure for this project is as follows:
```
root/
|───functions/     # relevant files for the Firebase functions
    |───api/       # where written endpoint functions will be
    |───index.js   # where functions will need to be exported
```
## **Contact**
For any questions or issues, contact me at akh3294@my.utexas.edu.