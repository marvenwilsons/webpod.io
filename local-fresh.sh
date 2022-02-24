
echo ''
echo '******************************************'
echo '*                                        *'
echo '*        Running WebPod.io locally       *'
echo '*                                        *'
echo '******************************************'
echo ''

rm backend/server/man.json

echo '
{
    "app_name": null,
    "jwt_secret": "sample_jwt_secret_you_should_change_this",
    "database_name": null,
    "db_table_prefix": null,
    "use_pg_admin": true,
    "pgadmin_url": null
}' > config/app.json

# docker rm -f $(docker ps -aq)
# docker network rm $(docker network ls -q)
# docker image rm $(docker image ls -q)
# docker container rm --force Admin

rm -rf postgres
rm -rf pgadmin

# 1. generate docker-compose file
cd config/app_starter
node compose-generator

cd ..
cd nginx
cat http > default.conf.template

# 2. start docker-compose
cd ..
docker-compose up