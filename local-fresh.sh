
echo ''
echo '******************************************'
echo '*                                        *'
echo '*        Running WebPod.io locally       *'
echo '*                                        *'
echo '******************************************'
echo ''

rm -rf backend/server/man.json

echo '
{
    "app_name": null,
    "jwt_secret": "sample_jwt_secret_you_should_change_this",
    "database_name": null,
    "db_table_prefix": null,
    "use_pg_admin": true,
    "pgadmin_url": null
}' > webpod/app.json

docker rm -f $(docker ps -aq)
docker network rm $(docker network ls -q)
docker image rm $(docker image ls -q)
docker container rm --force Admin

rm -rf postgres
rm -rf pgadmin
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf backend/package-lock.json
rm -rf backend/yarn.lock
rm -rf fontend-admin/package-lock.json
rm -rf fontend-admin/yarn.lock
rm -rf fontend-public/package-lock.json
rm -rf fontend-public/yarn.lock

npm install
cd backend
npm install
cd ..


# 1. generate docker-compose file
cd webpod/app_starter
node compose-generator

cd ..
cd nginx
cat http > default.conf.template

# 2. start docker-compose
cd ..
docker-compose up