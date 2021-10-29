export default {
  name: 'uniview',
  description: 'empty',
  userRoleTitle: '',
  body: {
    view: 'uniview', // the name of the view, its a vue component registered globally
    viewConfig: {},
    viewData: function(uniview) {
      return [
        // info
        {
          view: 'info',
          viewData: {
            msg: 'This is an info'
          },
          viewConfig: {
          },
          viewHooks: {}
        },
        // error
        {
          view: 'error',
          viewData: {
            msg: 'This is an error'
          }
        },
        // warning
        {
          view: 'warning',
          viewData: {
            msg: 'This is a warning'
          }
        },
        // doc
        {
          view: 'doc',
          viewData: [
            '--h--: Here are some facts about something',
            `--p--: Lorem Ipsum, the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog.
            <br/><br/>
            <strong>the quick brown fox jumps over the lazy dog.</strong>
            `,
            `--hr--:`,
            `--spacer--: 50px`,
            '--h--: Code Sample',
            '--p--: This is a code sample',
            `--code--:const x = { 
  name: 'marven', 
  last: 'donque'
}

function getName() {
  return x
}
`,
            '--p--: end of code sample',
            '--p--: A List sample',
            '--li--: -foo -bar -baz -bin'
          ]
        },
        // ribbon
        {
          view: 'ribbon',
          viewData: ['objectify-sample', 'table-sample', 'weird-table', 'monaco-editor', 'simple-navs'],
          viewHooks: `(paneCollection,pane,view) => ({
            onButtonClick(item) {
              pane.spawnModal({
                view: 'Loading', // Info, Warning, Error, Custom, Loading
                viewData: {},
                modalConfig: {}
              })
              
              if(item === 'objectify-sample') {
                pane.getService('objectifySample').then((view) => {
                  pane.closeModal()
                  view.body.paneConfig.width = '800px'
                  // console.log(view.body)
                  paneCollection.insert(view.body, 'Input Components')
                })
              } else if(item === 'table-sample') {
                pane.getService('table-sample').then((view) => {
                  pane.closeModal()
                  view.body.paneConfig.width = '1080px'
                  // console.log(view.body)
                  paneCollection.insert(view.body, 'Table')
                })
              } else if(item === 'field-sample') {

              } else if(item === 'weird-table') {

              } else if(item === 'monaco-editor') {

              } else if(item === 'simple-navs') {

              }
              
            }
          })`
        },
        // table
        // weird table
        // field
        // monaco editor
        // simple navs
      ]
    },
    // viewHooks is used to read properties within the specified view component and sometimes execute view methods
    // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
    viewHooks: `(paneCollection,pane,view) => ({
    })`,
    paneConfig: {
        width: '700px',
        title: 'Uniview Pane',
    },
    paneHooks: `(paneCollection,pane,view) => ({
      onMount() {
        // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
        // })
        // console.clear()
      },
    })`
  }
}