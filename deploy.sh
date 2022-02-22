docker rm -f $(docker ps -aq)
docker network rm $(docker network ls -q)
docker image rm $(docker image ls -q)
docker container rm --force Admin

# 1. generate docker-compose file
cd config/app_starter
node compose-generator

cd ..
cd nginx
cat https > default.conf.template

# 2. start docker-compose
cd ..
docker-compose up