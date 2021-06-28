//
// This file contains the entry point for a simple microservice 
// that could be called the todo-service.
//
// It's a simple starting point for a Node.js microservice.
//

//
// The microservice's REST API is based on Express, which is the
// Node.js defacto framework for building a web server or REST API.
//
const express = require("express");

//
// Axios is used to make HTTP requests to other microservices and 
// other REST APIs.
//
const axios = require("axios");

//
// This is REST API to get a list of todos.
//
app.get('/get-todos', (req, res) => {

    //
    // Forward the HTTP request to an external service.
    // The "JSON placeholder" service is convenient for playing with
    // HTTP requests.
    //
    axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(response => {
            //
            // Retreives a bunch of JSON data for todos.
            // You could transform or filter the data here.
            //
            // Simply returns the JSON data to the requester:
            //
            res.json(response.data);
        })
        .catch(err => {
            //
            // Handle any error that might occur.
            //
            console.error("An error occurred:");
            console.error(err);
            res.sendStatus(500);
        });
});

app.get("/new-todo", (req, res) => {
    
    //
    // Maybe add a new todo to your database?
    // Your code can do whatever you want here.
    //
    
    res.sendStatus(200);
});

const app = express();

//
// The port that the HTTP server listens on.
// You could read this from an environment variable if you like.
//
const port = 3000;

//
// Starts the REST API.
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});