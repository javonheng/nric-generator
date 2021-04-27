To run it in your docker container:

1) Open your terminal in the root directory.
2) npm install 
3) Go to client folder - cd client
4) npm install
5) Cd .. return to root directory and type docker-compose up --build or docker-compose up, if you do not want to build the image.
6) View it at http://localhost:3000 or  <"your docker machine IP address">:3000 (depending on where your docker is hosted on)
7) You can get your docker machine IP address by typing docker-machine ip in the cmd

To run locally:
1) Repeat steps 1 to 4 from above.
2) Use npm run dev in the root directory.
