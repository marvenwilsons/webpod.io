export default function (pane, sidebar, topbar, service, dash, socket) {
  dash.loading(true)
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

  topbar.setUser('marvenwilsons@gmail.com')
  topbar.setMsg('sample.com')

  setTimeout(() => dash.loading(false),1000)
}