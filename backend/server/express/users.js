const db = require('../postgres/events')

module.exports = (app) => {
    app.get('/users', async (req,res) => db.emit('list-all-users', users => res.json(users)) )

    // fetch a specific user
    app.get('/user/:userId', async (req,res) => {
        
    })

    // add a user
    app.post('/user', async (req, res) => {
        // add a new user
    })
}