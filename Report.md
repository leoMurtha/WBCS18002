# Report (Interim)

## Overview of the Web app architecture.
* Client-server architecture where our API and Web app are being deployed in the same cloud machine and the user uses the browser to acess the Web app or requests to the endpoints to use the API.
* The API was built using Django REST Framework which allows quick prototyping and deployment and It's also great when you need both Web app and API backend in same codebase to comply with “Single source of truth” (aka DRY).
* DRF also provides a browsable API via HTML and an interactable documentation in which you can try the API endpoints.
* The database technology is PostgreSQL because Django includes a default object-relational mapping layer (**ORM**) that can be used to interact with application data from various relational databases such as PostgreSQL.
* The project was deployed in a Google Cloud machine using Docker and docker-compose to manage the Django and PostgreSQL containers.
* The database was populated using the API itself by POST requests.
* The front-end will be built using Facebook's React framework.

## Useful Links:
Here's a list of useful links regarding the API so far.

[Interactive API Docs](http://trvl.hopto.org:8000/docs/)

[DRF Browsable API](http://trvl.hopto.org:8000/api/)

