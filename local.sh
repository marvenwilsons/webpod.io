MANFILE="backend/server/man.json"

if [ -e $MANFILE ]
then
    echo "Starting app"

    # copy man.json file to webpod/app.json
    cp $MANFILE webpod/app.json

    echo ''
    echo '******************************************'
    echo '*                                        *'
    echo '*        Running WebPod.io locally       *'
    echo '*                                        *'
    echo '******************************************'
    echo ''

    # 1. generate docker-compose file
    cd webpod/app_starter
    node compose-generator

    cd ..
    cd nginx
    cat http > default.conf.template

    # 2. start docker-compose
    cd ..
    docker-compose up
else
    echo "\n\n (ERROR) Cannot start because man.json is missing in /backend/server directory \n please do not attempt to create this file as this is autogenerated type of file."
    echo "\n\n Please run the (FRESH START) option (sh local-fresh.sh) if you havent initialized the application yet."
fi