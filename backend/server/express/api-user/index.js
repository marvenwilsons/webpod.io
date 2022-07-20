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
        console.log('deleting user')
        console.log( req.params.username)

        res.json({
            message: 'OK'
        })
    })
}