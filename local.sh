
echo ''
echo '******************************************'
echo '*                                        *'
echo '*        Running WebPod.io locally       *'
echo '*                                        *'
echo '******************************************'
echo ''

# 1. generate docker-compose file
cd config/app_starter
node compose-generator

cd ..
cd nginx
cat http > default.conf.template

# 2. start docker-compose
cd ..
docker-compose up