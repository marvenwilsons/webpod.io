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
        }
    },
    removeAppInstance: function  ({app_name,instance_title}, cb) {
        if(appInstance[instance_title] != undefined) {
            // query and delete from database first

            // delete from cache
            delete appInstance[instance_title]
            for(let i = 0; i < appInstances.length; i++) {
                if(appInstances[i].title == instance_title) {
                    appInstances.splice(i,1)
                    break
                }
            }
        } else {

        }
    }
}