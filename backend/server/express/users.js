const db = require('../postgres/events')

module.exports = (app) => {
    app.get('/users', async (req,res) => db.emit('list-all-users', users => res.json(users)) )

    app.get('/user/:userId', async (req,res) => {
        
    })
}