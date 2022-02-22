/**
 * > Start application using localhost env or HTTP env
 * > Reset & Start application using localhost env or HTTP env (Warning! this option will DELETE all data)
 * > Start application using remote env or HTTPS env
 * > About
 */


 const prompts = require('prompts'); // https://github.com/terkelg/prompts#readme
 const shell = require('shelljs')
 const fs = require('fs')
 const path = require('path')
 const child_process = require('child_process');

 const questions = [
    {
        type: 'select',
        name: 'startUpEnv',
        message: 'Select startup environment',
        choices: [
            'Start application using localhost env or HTTP env', 
            `(FRESH START) Start application using localhost env or HTTP env (Warning! this option will DELETE all data including ALL docker containers.)`,
            'Start application using remote env or HTTPS env',
            'About'
        ],
        initial: null
    }
]
prompts(questions).then(response => {
    const {startUpEnv} = response
    if(startUpEnv == 0) {
        fs.readFile(path.join(__dirname,'./backend/server/man.json'), 'utf-8', (err, data) => {
            if(data) {
                fs.writeFile(path.join(__dirname,'./config/app.json'), data, null, () => {
                    setTimeout(() => {
                        // shell.exec('chmod +x ./local.sh')
                        // shell.exec('./local.sh')

                        process.once('SIGINT', code => {
                            console.log('done!')
                            // Note: there's no shell.errorCode() API, so we just return 1 if
                            // there's an error.
                            // process.kill('SIGINT')
                            // process.exit()
                        });
                    },1000)
                })
                
            } else {
                console.log('\n\n   (ERROR) Cannot start because man.json is missing in /backend/server directory')
                console.log('\n\n   Please select the (FRESH START) option if you havent initialized the application yet.')
            }
        })

        
    }  

    if(startUpEnv === 1) {
        const defaultAppState = {
            app_name: null,
            jwt_secret: 'sample_jwt_secret_you_should_change_this',
            database_name: null,
            db_table_prefix: null,
            use_pg_admin: true,
            pgadmin_url: null
        }
        fs.writeFileSync(path.join(__dirname, './config/app.json',),JSON.stringify(defaultAppState,null,4))

        shell.exec('chmod +x ./local-reset.sh')
        shell.exec('./local-fresh.sh')
    }

    if(startUpEnv === 2) {
        shell.exec('chmod +x ./start.sh')
        shell.exec('./start.sh')
    }

    if(startUpEnv === 3) {
        shell.exec('cat ./config/app.json')
    }
})