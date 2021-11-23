export default {
  name: 'TodoList',
  description: 'empty',
  userRoleTitle: '',
  body: {
    view: 'todo-list', // the name of the view, its a vue component registered globally
    viewConfig: {
      menu: ['Submit to admin', 'Request a revision'],
      write: true // if set to true, edit in menu will appear and enables edit mode
    },
    viewData: [
      {
        task: '1. Create all apps, and integrate',
        description: 'fields, objectify, ribbon, simpleNavs, table, widget, progress, formBuilder, monaco',
        isDone: false
      },
      {
        task: '2. Create the service maker',
        isDone: false
      },
      {
        task: '3. Create the "Apps" using the service maker, and integrate all apps',
        description: 'Each apps should have, App Name, View All Instances, Create New, View Docs, Settings',
        isDone: false
      },
      {
        task: '4. Test the view activator, using the uniview and some of the apps',
        isDone: false
      }
    ],
    // viewHooks is used to read properties within the specified view component and sometimes execute view methods
    // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
    viewHooks: `(paneCollection,pane,view,server) => ({
      // fires when user defined menu is clicked
      onMenuClick(todolist) {
        console.log('menu click', todolist.menu)
        if(todolist.menu == 'Request a revision') {
          pane.spawnModal({
            view: 'uniview',
            viewData: (uniview) => ([
              {
                view: 'info',
                viewData: {
                  msg: 'Please compose a simple message about the revision'
                },
                viewConfig: {},
              }
            ]),
            modalConfig: {
              isClosable: true
            }
          })
        }
      },
      // fires when on save
      onSave(context) {
        console.log('onSaved', context)
      },
      // fires when 
      onMarkAdDone() {
        console.log('marking as done')
      }
    })`,
    paneConfig: {
        width: '600px',
        title: 'Todo List',
    },
    paneHooks: `(paneCollection,pane,view) => ({
      onMount() {
        // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
        // })
        
      },
    })`
  }
}