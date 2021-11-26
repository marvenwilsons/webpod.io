export default function (pane, sidebar, topbar, service, dash, socket) {
  // watch the pane on empty
  pane.onEmpty = () => sidebar.setSelected('Dashboard')

  // set default sidebar
  sidebar.setSelected('Dashboard')

  // fires everytime sidebar select property changes
  sidebar.onSelect = (selected_sidebar) => {
      // empty the pane before rendering a new pane
      pane.paneCollection = []
      // get selected service view
      const selectedService = service.getService(selected_sidebar)
      
      setTimeout(() => {
          try {
              pane.insertPaneCollectionItem(0)(selectedService.body)
          }catch(err) {
              location.reload()
          }
      }, 0)
  }


  const server_service_getter_method_name = 'getUserServices'
  if(localStorage.getItem('token') != null && localStorage.getItem('user')) {
    socket.emit('req', {
        name: server_service_getter_method_name,
        payload: {
            token:localStorage.getItem('token'),
            user: localStorage.getItem('user')
        }
    })
  } else {
      location.href = '/login'
  }

  socket.on('notification', ({method_name, payload}) => {
      console.log('Notification recieved', method_name)
      if(method_name === server_service_getter_method_name) {
        topbar.setUser(payload.user)
        topbar.setMsg(payload.app_name)
        sidebar.setItems(payload.sidebar_items)
      }
  })

  
  setTimeout(() => {
      dash.loading(false)
      dash.showDashboard(true)
  },1000)
}