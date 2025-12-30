#!/bin/bash
echo \ ?? Starting Rainer Portfolio Frontend with Docker...\
echo \?? Building image...\
docker build -t rainer-frontend .
echo \?? Starting service...\
docker-compose up -d
echo \? Frontend is running!\
echo \\
echo \?? Services:\
echo \ • App: http://localhost:3000\
echo \ • API URL: \\
echo \\
echo \?? Commands:\
echo \ • View logs: docker-compose logs -f\
echo \ • Stop services: docker-compose down\
