module.exports = (app,db,adminEvents,dashboard) => {
    app.get('/users', async (req,res) => db.emit('list-all-users', users => res.json(users)) )

    // fetch a specific user
    app.get('/user/:userId', async (req,res) => {
        
    })

    // add a user
    app.post('/user', async (req, res) => {
        // add a new user
        console.log('adding new user', req.body)
    })

    // drop user
    app.delete('/user/:username', async (req,res) => {
        // delete user
        global.log('deleting user')
        global.progress(2)

        setTimeout(() => {
            global.log('deleting associated contents')
            global.progress(70)

            setTimeout(() => {
                global.log('finalizing operation')
                global.progress(90)
                setTimeout(() => {
                    global.progress(95)
                    setTimeout(() => {
                        global.progress(100)
                        setTimeout(() => {
                            global.log(null)
                        }, 3000)
                    },3000)
                },3000)
            },500)

        },500)
        console.log( req.params.username)

        res.json({
            message: 'OK'
        })
    })
}