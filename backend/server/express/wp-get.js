function getMode(route) {
    if(route.domain) {
        return route.filters ? 'domain with filter' : 'domain only'
    } else {
        console.log('invalid wp_get route object missing domain property!')
    }
}

function isValidDomain(domainName) {
    const domains = ['users','collections','services','roles', 'menus']
    return domains.includes(domainName) ? true : false
}

function fetchAllDataFromDomain(db,domain) {
    return new Promise((resolve,reject) => {
        if(isValidDomain(domain)) {
            if(domain == 'users') {
                console.log('> Fetching all users using wp_get')
                db.emit('list-all-users', (rows) => {
                    resolve({key: 'users', value: rows})
                })
            }
    
            if(domain == 'collections') {
                resolve({collections: 'hello'})
            }
        }
    })
}

function fetchAllDataFromDomainWithFilter(db,domain,filter) {
    console.log(2)
    return new Promise((resolve,reject) => {
        resolve({key: domain, value: 'hey'})
    })
}

module.exports= (app,db) => {
    app.post('/wp_get', (req,res) => {
        const routesArray = req.body

        if(Array.isArray(routesArray)) {
            const x = routesArray.map(async route => 
                (getMode(route) == 'domain only' && await fetchAllDataFromDomain(db, route.domain) ||
                getMode(route) == 'domain with filter' && await fetchAllDataFromDomainWithFilter(db,route.domain,route.filters))
            )
            Promise.all(x).then(data => {
                const object = data.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{})
                res.json(object)
            })
        } else {
            console.log('wp_get should a type of array')
        }

        /**
         * sample input:
         * [{domain: 'users', domain: 'collections'}]
         * sample output:
         * {
         *  users: [...],
         *  collections: [...]
         * }
         */
    })
}