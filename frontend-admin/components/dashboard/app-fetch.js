export default {
    fetchAppInstances: function({app_name},cb) {
        fetch(`${process.env.API_URL}/apps/${app_name}`)
        .then(response => response.json())
        .then(data => cb(data))
    },
    fetchAppInstance: function ({app_name,instance_title},cb) {
        fetch(`${process.env.API_URL}/apps/${app_name}/${instance_title}`)
        .then(response => response.json())
        .then(data => cb(data))
    },
    removeAppInstance: function  ({app_name,instance_title}, cb) {
        
    }
}