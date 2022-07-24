import appFetch from "./app-fetch"
import eventEmitter from '../../EventEmitter'
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
        
        
        console.log('Menu on select', menu, selected)
        const menuMappingRole = dash.menuMappingRole
        const serviceMappingRole = dash.serviceMappingRole
        const primary_version = menuMappingRole[menu.menu_id].primary_version
        const service_id = menuMappingRole[menu.menu_id].service_id
        const view = serviceMappingRole[ service_id ][ primary_version ]
        const { instancer, version_data, version_name } = view
        let selected_service = undefined
        const empty = {body: {
            paneConfig: {
              isClosable: false,
              title: 'No service assigned',
            },
            viewConfig: {},
            view: 'pd',
            viewData: undefined,
            viewHooks: ''
          }}

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
                        version_data: version_data || empty,
                        title: selected
                    }
                }
            }
        } else {
            
            if(!version_data) {
                // empty
                selected_service = {
                    body: {
                      paneConfig: {
                        isClosable: false,
                        title: 'No service assigned',
                      },
                      viewConfig: {},
                      view: 'pd',
                      viewData: undefined,
                      viewHooks: ''
                    }
                }
            } else {    
                selected_service = {...version_data}
            }
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
            const closablePanes = paneCollection.paneCollection.map(e => e.paneConfig.isClosable)
            // topbar.history.panes = title
            if(window.webpod) {
                webpod.session.paneCollection = title
                webpod.session.closablePanes = closablePanes
                webpod.session.paneOnFocus = title.length - 1
                
                if(title.length > 1) {
                    setTimeout(() => {
                        dash.history.historyBtn.show()
                        dash.setIfPaneIsClosable(paneCollection.paneCollection[webpod.session.paneOnFocus].paneConfig.isClosable)
                    },700)
                } else if(title.length == 1) {
                    dash.history.historyBtn.hide()
                    dash.setIfPaneIsClosable(paneCollection.paneCollection[webpod.session.paneOnFocus].paneConfig.isClosable)
                }
                setTimeout(() => {
                    webpod.session.events.emit('pane-toggle',title.length - 1)
                },0)
            }
        }
        
        /**
         * handling each menu change to server
         */
         socket.emit('req', {
            name: 'menuChange',
            payload: {
                token:localStorage.getItem('token'),
                user: localStorage.getItem('user'),
                menu: selected
            }
        })

       
        
        setTimeout(() => {
            try {
                 /**
                 * Check if viewData has wp-get property
                 * wp_get is used to fetch data from the database like collections data
                 * or users, app data.
                 * 
                 * wp_get property holds an array of route strings ei.
                 * ['users','collections/flowers'] .. from this example it will fetch all users
                 * and the all the flowers in the collections,
                 * 
                 * formated as 'domain/path1/path2/etc..'
                 */
                paneCollection.insertPaneCollectionItem(0)(selected_service.body)
            }catch(err) {
                dash.alertError({
                    message: err,
                    reload: true
                })
                console.error(err)
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
            console.log('** dashboard exec ', e.location)
            dashboard_locations[e.location][e.action](e.payload)
        } catch(err) {
            dash.alertError({
                message: <div class="text-err" style="max-width:500px;" > <strong>${e.location}</strong> - <strong>${e.action}</strong> cannot be executed, please check console logs for more information about this error. </div>,
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
        dash.log(msg)
    })

    socket.on('progress', (val) => {
        webpod.session.onProgress(val)
        dash.progress(val)

        if(val == '100%' || val == 100) {
            webpod.session.logs = []
        }
    })

    socket.on('refresh', () => {
        webpod.session.events.emit('refresh')
    })

    socket.on('prompt', (body) => {
        const modalInstance = dash.modal.show({
            modalTitle: 'header' in body.prompt ? body.prompt.header : 'Prompt',
            viewTrigger: (state) => dash.prompt(state,body)
        })

        modalInstance.on('data', (data) => {
            socket.emit('prompt-response', data)
        })
    })


/*********************************** ON DASHBOARD LOAD *****************************************************/
    fetch(`${process.env.API_URL}`)
    .then(response => response.json())
    .then(({message, generated_db_info}) => {
        if(message == 'APP IS NOT INITIALIZED') {
            console.log('APP IS NOT INITIALIZED')
            dash.showInitForms(true,generated_db_info)
        } else {    
            if(localStorage.getItem('token') != null && localStorage.getItem('user')) {
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
        }
    })
    

    setTimeout(() => {
        const sessionEvents = new eventEmitter()


        window.webpod = Object.seal({
            dash: {...dash},
            paneCollection,
            server: {
                apps: {...appFetch},
                collections: {},
                users: {},
                roles: {},
            },
            session: {
                paneOnFocus: 0,
                appInstanceOnFocus: undefined,
                logs: [],
                onLog: () => {},
                onProgress: () => {},
                onPaneToggle: () => {},
                events: sessionEvents,
            },
            menuData: undefined,
            dashSettings: {
                'Pane Slide': 'yes',
                'Slide on history click':'yes'
            }
        })
    },0)

}