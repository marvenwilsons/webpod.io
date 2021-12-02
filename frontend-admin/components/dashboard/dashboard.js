export default function (paneCollection, sidebar, topbar, service, dash, socket) {
    dash.loading(true)

/*********************************** DASHBOARD EVENT HANDLERS *************************************************/
    // watch the pane on empty
    paneCollection.onEmpty = () => sidebar.setSelected('Dashboard')
    
    // fires everytime sidebar select property changes
    sidebar.onSelect = (selected_sidebar) => {
        // empty the pane before rendering a new pane
        paneCollection.paneCollection = []
        // get selected service view
        const selectedService = service.getService(selected_sidebar)
        
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
            // topbar set
            topbar.setUser(payload.user)
            topbar.setMsg(payload.app_name)

            // service set
            service.setServices(payload.services)

            // sidebar set
            sidebar.setItems(payload.sidebar_items, () => {
                sidebar.setSelected('Dashboard')
            })
        },
        pushNotify(payload) {
            // push or inserts a new notification item to dashboard
        }
    }
        
    socket.on('notification', ({method_name, payload}) => ioEvents[method_name](payload))


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
    },1000)

}