const db  = require('./postgres/events')

module.exports = (app) => {
    
    // returns all users
    app.get('/users', async (req,res) => db.emit('list-all-users', users => res.json(users)))

    // returns a single user
    app.get('/users/:userId', async (req,res) => {

    })
}