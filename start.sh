docker rm -f $(docker ps -aq)
docker network rm $(docker network ls -q)
docker image rm $(docker image ls -q)
docker container rm $(docker container ls -q)

# 1. generate docker-compose file
cd config/app_starter
node compose-generator

# 2. start docker-compose
cd ..
docker-compose up