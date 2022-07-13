module.exports= (app,db) => {
    app.post('/wp_get', (req,res) => {
        console.log('wp_get!!!')

        const routesArray = req.body

        if(Array.isArray(routesArray)) {
            routesArray.map(route => {
                if(route.domain) {
                    if(route.filters) {
                        // perform a SELECT * FROM route.domain WHERE route.filters
                    } else {
                        // get all or perform a SELECT * FROM route.domain 
                    }
                } else {
                    console.log('invalid wp_get route object missing domain property!')
                }
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