import appFetch from "./app-fetch"
export default function (paneCollection, menu, service, dash, sidebar, socket) {
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
    paneCollection.onEmpty = () => menu.setSelected('Dashboard')
    
    // fires everytime menu select property changes
    menu.onSelect = ({selected, menu}) => {
        const menuMappingRole = dash.menuMappingRole
        const serviceMappingRole = dash.serviceMappingRole
        const primary_version = menuMappingRole[menu.menu_id].primary_version
        const service_id = menuMappingRole[menu.menu_id].service_id
        const view = serviceMappingRole[ service_id ][ primary_version ]
        const { instancer, version_data, version_name } = view
        let selected_service = undefined


        if(instancer){
            selected_service = {
                body: {
                    paneConfig: {
                        isClosable: false,
                        title: selected,
                    },
                    viewConfig: {},
                    view: 'instancer',
                    viewData: {
                        instancer: {...instancer},
                        version_data,
                        title: selected
                    }
                }
            }
        } else {
            // if service has an instancer object, it means the view data of the next service willxcv be provided by the instancer
            selected_service = service.getService(selected)
        }

        // empty the pane before rendering a new pane
        paneCollection.paneCollection = []
        // get selected service view
        
        paneCollection.onPaneCollectionChange = function() {
            setTimeout(() => {
                dash.accountBtn.show()
            },500)
            const title = paneCollection.paneCollection.map(e => {
                return e.paneConfig.title || 'untitled'
            })
            // topbar.history.panes = title
            if(webpod) {
                webpod.session.paneCollection = title
                webpod.session.paneOnFocus = title.length - 1
                if(title.length > 1) {
                    setTimeout(() => {
                        dash.history.historyBtn.show()
                    },700)
                } else if(title.length == 1) {
                    dash.history.historyBtn.hide()    
                }
            }
        }
        
        setTimeout(() => {
            try {
                paneCollection.insertPaneCollectionItem(0)(selected_service.body)
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
        const dashboard_locations = { paneCollection, menu, service, dash, sidebar }
        try {
            dashboard_locations[e.location][e.action](e.payload)
        } catch(err) {
            dash.alertError({
                message: `<span> <strong>${e.location}</strong> - <strong>${e.action}</strong> cannot be executed, please check console logs for more information about this error. </span>`,
                reload: true
            })
            console.error(err)
        }
    })
    socket.on('error', (payload) => {

        console.error('err', payload)
        if(payload.message === 'authentication failed') {
            localStorage.removeItem('token'),
            localStorage.removeItem('user')
            location.href = '/login'
        }
    })
    socket.on('log', (msg) => {
        webpod.session.logs.push(msg)
        webpod.session.onLog(msg)
    })

    socket.on('progress', (val) => {
        webpod.session.onProgress(val)

        if(val == '100%') {
            webpod.session.logs = []
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
        fetch(`${process.env.API_URL}`)
        .then(response => response.json())
        .then(({message, generated_db_info}) => {
            if(message == 'APP IS NOT INITIALIZED') {
                console.log('APP IS NOT INITIALIZED')
                dash.showInitForms(true,generated_db_info)
            } else {    
                location.href = '/login'
            }
        })
    }

    setTimeout(() => {
        // dash.loading(false)
        // dash.showDashboard(true)
        window.webpod = Object.seal({
            dash: {...dash},
            paneCollection,
            server: {
                apps: {...appFetch},
                collections: {},
                users: {},
                roles: {}
            },
            session: {
                paneOnFocus: 0,
                appInstanceOnFocus: undefined,
                logs: [],
                onLog: () => {},
                onProgress: () => {}
            },
            dashSettings: {
                'Pane Slide': 'yes',
                'Slide on history click':'yes'
            }
        })
    },0)

}