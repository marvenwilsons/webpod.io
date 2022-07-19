export default {
    user: {
        getUsers(cb) {
            fetch(`${process.env.API_URL}/users`)
            .then(response => response.json())
            .then(data => {
                cb(data)
            })
            .catch(err => {
                webpod.dash.alertError({
                    message: `${err.message}`,
                    reload: true
                })
            })

           
        },
        getUser(userId,cb) {
            fetch(`${process.env.API_URL}/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                webpod.dash.alertError({
                    message: `${err.message}`,
                    reload: true
                })
            })
        },
        addNewUser({firstName, lastName,email, username, password, role}) {
            // TODO:
            const url = `${process.env.API_URL}/user`
        
            const request_options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName, lastName, email, username, password, role
                }) 
            };
            fetch(url, request_options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(err => {
                webpod.dash.alertError({
                    message: `${err.message}`,
                    reload: true
                })
            })
        },
        updateUserProp(userId,propName,value) {
            const url = `${process.env.API_URL}/users/${userId}/`
        
            const request_options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({propName, value})
            };
            fetch(url, request_options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(err => {
                webpod.dash.alertError({
                    message: `${err.message}`,
                    reload: true
                })
            })
        },
        dropUser(user,cb) {
            const url = `${process.env.API_URL}/user/${user.username}/`

            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
                if(data.message == 'OK') {
                    cb(true)
                } else {
                    webpod.dash.alertError({
                        message: `<span>An error occured while deleting <strong>${user}</strong>: ${data.message}</span>`,
                        reload: true
                    })
                }
            });
        },
        sendUserMessage(user,message) {
    
        }
    },
    role: {
        getRoles() {

        },
        getRole() {

        },
        addNewRole() {

        },
        updateRole(roleName,value) {

        },
        deleteRole(role) {

        }
    },
    services: {
        getServices() {

        },
        getService(serviceId) {

        },
        addNewService(serviceObject) {

        },
        updateService(serviceId) {

        },
        deleteService(serviceId) {

        }
    }
}