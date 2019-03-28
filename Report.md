# Report (Interim)

## Introduction
The main objective of this project was to develop a application of airports and carriers in the USA by applying methods and Web principles discussed during the course of Web Engineering (WBCS18002.2018-2019.2A). The dataset was provided by CORGIS dataset project.
By understanding the concepts of Front-end and Back-end, it was possible to deliver a functional and simple demo that allows the user to find general or specific information of airports, routes,statistics and carriers. It also extends the possibility of implementing future features.
 

## Requirements to Run
* Docker installed



## Overview of the Web app architecture.
* Client-server architecture where our API and Web app are being deployed in the same cloud machine and the user uses the browser to acess the Web app or requests to the endpoints to use the API.
* The API was built using Django REST Framework which allows quick prototyping and deployment.
* DRF also provides a browsable API via HTML and an interactable documentation in which you can try the API endpoints.
* The database technology is PostgreSQL because Django includes a default object-relational mapping layer (**ORM**) that can be used to interact with application data from various relational databases such as PostgreSQL.
* The project was deployed in a Google Cloud machine using Docker and docker-compose to manage the Django and PostgreSQL containers.
* The database was populated using the API itself by POST requests.
* The front-end was built using Facebook's React framework which efficiently update and render components and has a very simple design views.
* The integration between the different codebase (Python and JavaScript) was done using the library Axios, a promise based HTTP client for the browser and node.js with supports http requests and intercepts request and response.

## Useful Links:
Here's a list of useful links regarding the API so far.

[Interactive API Docs](http://trvl.hopto.org:8000/docs/)

[DRF Browsable API](http://trvl.hopto.org:8000/api/)

