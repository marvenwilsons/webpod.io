module.exports = (app,db,adminEvents,dashboard) => {
    app.get('/users', async (req,res) => db.emit('list-all-users', users => res.json(users)))

    // fetch a specific user
    app.get('/user/:userId', async (req,res) => {
        
    })

    // add a user
    app.post('/user', async (req, res) => {
        // add a new user
        console.log('adding new user', req.body)
    })

    // drop user
    app.delete('/user/:userId', async (req,res) => {
        // delete user
        log('deleting user')
        progress(2)

        setTimeout(() => {
            log('deleting associated contents')
            progress(70)

            prompt({
                header: 'input answer',
                desc: 'are you sure you want to delete'
            }, function (value) {
                console.log('prompt value: ', value)
            })
            

            setTimeout(() => {
                log('finalizing operation')
                progress(90)
                setTimeout(() => {
                    progress(95)
                    setTimeout(() => {
                        progress(100)
                        // refresh()
                        setTimeout(() => {
                            log(null)
                        }, 600)
                    },500)
                },100)
            },500)

        },500)
        console.log( req.params.username)

        res.json({
            message: 'OK'
        })
    })

    // update user
    app.post('/user/:userId', async(req,res) => {
        console.log('user')
    })

}