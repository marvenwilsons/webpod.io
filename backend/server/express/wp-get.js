module.exports= (app) => {
    app.post('/wp_get', (req,res) => {
        console.log('wp_get!!!')

        const routesArray = req.body

        if(Array.isArray(routesArray)) {
            routesArray.map(route => {
                console.log(route)
            })
        } else {
            console.log('wp_get should a type of array')
        }

        setTimeout(() => {
            res.json({
                message: 'OK'
            })
        }, 500)
    })
}