export default function (paneCollection, menu, topbar, service, dash, sidebar, socket) {
    dash.loading(true)
    let dashboard_resource = {
      admin: undefined,
      admin_dash_settings: undefined,
      role: undefined,
      menu: undefined,
      services: undefined
    }

/*********************************** DASHBOARD EVENT HANDLERS *************************************************/
    // watch the pane on empty
    // paneCollection.onEmpty = () => menu.setSelected('Dashboard')
    
    // fires everytime menu select property changes
    menu.onSelect = (selected_menu) => {
        // empty the pane before rendering a new pane
        paneCollection.paneCollection = []
        // get selected service view
        const selectedService = service.getService(selected_menu) // instancer logic here`
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
        pushNotify(payload) {
            // push or inserts a new notification item to dashboard
        }
    }
        
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
        socket.emit('req', {
            name: 'getDashboardResource',
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
        window.webpod = Object.seal({
            dashboardMethods: {...dash}
        })
    },500)

}