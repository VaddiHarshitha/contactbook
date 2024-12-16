This Repository consists of Frontend folders and Backend folders.<br /> <br />
**Frontend folders :** <br /><br/>
contactbook-frontend<br />
To run the react folder we have to use the **npm start** command through navigating to src folder in it.

**Backend folders:** <br />
contactbookproject,contactbookapp <br />

To run the django server , we use the following commands :<br />
**python manage.py makemigrations**<br />
**python manage.py migrate**<br />
**python manage.py runserver**<br />


******Dockerising the application******<br /><br />

We Should dockerise the application using the following commands.<br />

1)Clone the repository<br />
2)Install the Docker<br />

In the contactbook-backend folder we have the Dockerfile to create an image for the backend.<br />
In the contactbook-frontend folder we have the Docekerfile to create an image for frontend.<br />

Run the following commands:<br />

**cd contactbook-backend**<br />
**docker build -t django-backend .** -building an image for backend<br />
**docker network create contactbook-network** create a network to establish the communication between the frontend and Backend container.<br />
**docker run -d --name django-backend --network contactbook-network -p 8000:8000 django-backend** - creating and starting the backend container with the above image.<br />

**cd ..<br />
cd contactbook-frontend**<br />

**docker build -t react-frontend .** - building an image for frontend <br />
**docker run -d --name react-frontend --network contactbook-network -p 3000:3000 react-frontend** -creating and starting the frontend container with the above image.<br />

The containers created and started and they are up and it is accesssible using the following endpoints.<br />

Backend endpoint:<br />
http://127.0.0.1:8000/api/contacts/<br />

frontend endpoint :<br />
http://127.0.0.1:3000<br />
