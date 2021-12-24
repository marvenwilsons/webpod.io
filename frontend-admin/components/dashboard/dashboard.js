export default function (paneCollection, menu, topbar, service, dash, sidebar, socket) {
    dash.loading(true)

/*********************************** DASHBOARD EVENT HANDLERS *************************************************/
    // watch the pane on empty
    paneCollection.onEmpty = () => menu.setSelected('Dashboard')
    
    // fires everytime menu select property changes
    menu.onSelect = (selected_menu) => {
        // empty the pane before rendering a new pane
        paneCollection.paneCollection = []
        // get selected service view
        const selectedService = service.getService(selected_menu)
        //
        paneCollection.onPaneCollectionChange = function() {
            const title = paneCollection.paneCollection.map(e => {
                return e.paneConfig.title || 'untitled'
            })
            topbar.history.panes = title
        }
        
        setTimeout(() => {
            try {
                paneCollection.insertPaneCollectionItem(0)(selectedService.body)
            }catch(err) {
                location.reload()
            }
        }, 0)
    }



/*********************************** SOCKET.IO EVENT HANDLERS *************************************************/
    
    const ioEvents = {
        getUserServices(payload) {
            // user set
            dash.setUser({
                name: payload.name,
                email: payload.email,
                avatar: payload.avatar
            })

            // topbar set
            topbar.setMsg(payload.app_name)

            // service set
            service.setServices(payload.services)

            // menu set
            menu.setItems(payload.menu_items, () => {
                menu.setSelected('Dashboard')
            })

            // let c = 0

            sidebar.pushNotification({
                app: `System`,
                time: '2:20 PM',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            })
            
        },
        pushNotify(payload) {
            // push or inserts a new notification item to dashboard
        }
    }
        
    socket.on('notification', ({method_name, payload}) => ioEvents[method_name](payload))
    socket.on('exec', (e) => {
        const dashboard_locations = { paneCollection, menu, topbar, service, dash, sidebar }
        dashboard_locations[e.location][e.action](e.payload)
    })
    socket.on('error', (payload) => {

        console.error('err', payload)
        if(payload.message === 'authentication failed') {
            localStorage.removeItem('token'),
            localStorage.removeItem('user')
            location.href = '/login'
        }
    })


/*********************************** ON DASHBOARD LOAD *****************************************************/
    if(localStorage.getItem('token') != null && localStorage.getItem('user')) {
        socket.emit('req', {
            name: 'getUserServices',
            payload: {
                token:localStorage.getItem('token'),
                user: localStorage.getItem('user')
            }
        })
    } else {
        location.href = '/login'
    }
    setTimeout(() => {
        dash.loading(false)
        dash.showDashboard(true)

        
        // setTimeout(() => {
        //     setTimeout(() => {
        //         sidebar.close()
        //     }, 1000)
        // }, 5000)
    },1000)

}