let appInstances = undefined
let appInstance = {}

export default {
    fetchAppInstances: function({app_name},cb) {
        if(appInstances) {
            cb(appInstances)
        } else {
            fetch(`${process.env.API_URL}/apps/${app_name}`)
            .then(response => response.json())
            .then(data => {
                appInstances = data
                cb(data)
            })
            .catch(err => {
                webpod.dashboardMethods.alertError({
                    message: `<span>An error occured while fetching app instances for app: <strong>"${app_name}"</strong>  <br> server says: <strong>"${err.message}"</strong> </span>`,
                    reload: true
                })
            })
        }
    },
    fetchAppInstance: function ({app_name,instance_title},cb) {
        if(appInstance[instance_title] != undefined) {
            cb(appInstance[instance_title])
        } else {
            fetch(`${process.env.API_URL}/apps/${app_name}/${instance_title}`)
            .then(response => response.json())
            .then(data => {
                appInstance[instance_title] = data
                cb(data)
            })
            .catch(err => {
                webpod.dashboardMethods.alertError({
                    message: `<span>An error occured while fetching app instance for app: <strong>"${app_name}"</strong> target instance title:  <strong>"${instance_title}"</strong> <br> server says: <strong >"${err.message}"</strong> </span>`,
                    reload: true
                })
            })
        }
    },
    removeAppInstance: function  ({app_name,instance_title}, cb) {
        const url = `${process.env.API_URL}/apps/${app_name}/${instance_title}`

        function removeFromDb(url,_d) {
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
                if(data.message == 'success') {
                    webpod.server.apps.fetchAppInstances({app_name}, (d) => {
                        cb(_d ? _d : d)
                    })
                } else {
                    webpod.dashboardMethods.alertError({
                        message: `<span>An error occured while deleting <strong>${instance_title}</strong>: ${data.message}</span>`,
                        reload: true
                    })
                }
            });
        }

        if(appInstance[instance_title] != undefined) {
            // query and delete from database first
            // delete from cache
            delete appInstance[instance_title]
            for(let i = 0; i < appInstances.length; i++) {
                if(appInstances[i].title == instance_title) {
                    appInstances.splice(i,1)
                    removeFromDb(url,appInstances)
                    break
                }
            }
        } else {
            removeFromDb(url)
        }
    },
    update(payload,cb) {
        const app_name = webpod.paneCollection.paneCollection[webpod.session.paneOnFocus].view
        const instance_title = webpod.session.appInstanceOnFocus
        const url = `${process.env.API_URL}/apps/${app_name}/${instance_title}`
        
        const request_options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch(url, request_options)
        .then(response => response.json())
        .then(data => {
            cb(data)
        }).catch(err => {
            webpod.dashboardMethods.alertError({
                message: `<span>An error occured while updating app instances for app: <strong>"${app_name}"</strong> target instance title:  <strong>"${instance_title}"</strong> <br> server says: <strong >"${err.message}"</strong> </span>`,
                reload: true
            })
        })
        
    },
    renameAppInstanceTitle: function (new_title,instance_info) {
        const app_name = instance_info.instance_from
        const instance_title = instance_info.title
        const url = `${process.env.API_URL}/apps/${app_name}/${instance_title}?rename_title=${new_title}`
        console.log('rename',url)
    }
}