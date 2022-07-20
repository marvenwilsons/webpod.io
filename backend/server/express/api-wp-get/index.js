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

function transformValues(domain,rows) {
    if(domain == 'users') {
        // decrypt password
    }
    return rows
}

// return all instances of a domain
function fetchAllDataFromDomain(db,domain) {
    return new Promise((resolve,reject) => {
        if(isValidDomain(domain)) {
            console.log(`> Fetching all ${domain} using wp_get`)
            try {
                db.emit(`list-all-${domain}`, (rows) => 
                resolve({key: domain, value: transformValues(domain,rows)}))
            } catch(err) {
                reject(err)
            }
        }
    })
}

function fetchAllDataFromDomainWithFilter(db,domain,filter) {
    return new Promise((resolve,reject) => {
        // SELECT * WHERE filter FROM domain
        resolve({key: domain, value: 'hey'})
    })
}

module.exports= (app,db) => {
    app.post('/wp_get', ({body},res) => {
        if(Array.isArray(body)) {
            const x = body.map(async route => 
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
    })
}