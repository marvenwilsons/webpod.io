export default {
  name: 'empty',
  description: 'empty',
  userRoleTitle: '',
  body: {
    view: 'div', // the name of the view, its a vue component registered globally
    viewConfig: null,
    viewData: [],
    // viewHooks is used to read properties within the specified view component and sometimes execute view methods
    // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
    viewHooks: `(paneCollection,pane,view) => ({
    })`,
    paneConfig: {
        width: '600px',
        title: 'untitled',
    },
    paneHooks: `(paneCollection,pane,view) => ({
      onMount() {
        // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
        // })
        pane.setPaneLoading(true)
        pane.setPaneTitle(pane.activator)
      },
    })`
  }
}