export default function (pane, sidebar, topbar, service, dash, socket) {
  // watch the pane on empty
  pane.onEmpty = () => sidebar.setSelected('Dashboard')

  // set default sidebar
  sidebar.setSelected('Dashboard')

  // fires everytime sidebar select property changes
  sidebar.onSelect = (selected) => {
      // empty the pane before rendering a new pane
      pane.paneCollection = []
      // get selected service view
      const selectedService = service.getService(selected)
      
      setTimeout(() => {
          try {
              pane.insertPaneCollectionItem(0)(selectedService.body)
          }catch(err) {
              location.reload()
          }
      }, 0)
  }
}