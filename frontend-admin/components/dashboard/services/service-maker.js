export default {
  name: 'Maker',
  description: 'a sample service',
  userRoleTitle: '',
  body: {
    view: 'simpleNavs', // the name of the view, its a vue component registered globally
    viewConfig: null,
    activator: 'activator is not defined',
    stateLess: true, // if set to true it means that this view will depend on the passed data from the caller pane to work properly
    viewData: [
      {
          name: 'Pane Services',
          items: [
            {
                name: 'Pane Modal',
                itemIcon: 'mdi-poll',
                additionalContent: [
                    {
                        type: 'text',
                        title: 'Description',
                        body: "In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. A modal window creates a mode that disables the main window but keeps it visible, with the modal window as a child window in front of it."
                    },
                    {
                        type: 'events',
                        title: 'Other Services',
                        body: [
                            {
                                title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service',
                                eventName: 'myEvent'
                            }
                        ]
                    },
                    {
                        type: 'events',
                        title: 'Tutorials',
                        body: [
                            {
                                title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                eventName: 'myEvent'
                            },
                            {
                                title: 'Click and you will be directed to a dq service',
                                eventName: 'myEvent'
                            }
                        ]
                    },
                ],
                events: ['Spawn Error', "Spawn Info", "Spawn Warning"],
                warning: null
            },
            {
                name: 'Pane Collection',
                itemIcon: 'mdi-grain',
                additionalContent: undefined,
                events: ['Add New Pane Item', 'Copy And Insert Pane', 'Remove this pane item']
            },
            {
                name: 'View',
                itemIcon: 'mdi-border-all',
                additionalContent: undefined,
                events: ['Update view data','Change view']
            }
          ]
      },
      {
          name: 'Core Applications',
          items: [
              {
                  name: 'System Services',
                  itemIcon: 'mdi-account',
                  events: ['View All Services', "Create New Service"],
                  warning: null
              },
              {
                  name: 'Explore & Install Services',
                  itemIcon: 'mdi-border-all',
                  additionalContent: undefined,
                  events: ['Explore Mar']
              },
          ]
      }
    ],
    // viewHooks is used to read properties within the specified view component and sometimes execute view methods
    // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
    viewHooks: `(paneCollection,pane,view) => ({
      onNavClick(simpleNavs) {
        switch(simpleNavs.clickedOn) {
          // spawn error
          case 'Spawn Error':
            console.log('spawing error')
            pane.spawnModal({
              view: 'error', // Info, Warning, Error, Custom, Loading
              viewData: {
                msg: 'This is an error msg'
              }, // view ralated config
              modalConfig: {
                isClosable: true
              }
            })
          break;
          
          // spawn info
          case 'Spawn Info':
            pane.spawnModal({
              view: 'info', // Info, Warning, Error, Custom, Loading
              viewData: {
                  msg: 'The quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog.'
              }, // view ralated config
              modalConfig: {
                  isClosable: true
              }
            })
          break;

          // spawn warning
          case 'Spawn Warning':
            pane.spawnModal({
              view: 'warning', // Info, Warning, Error, Custom, Loading
              viewData: {
                  msg: 'Hello world'
              }, // view ralated config
              modalConfig: {
                  isClosable: true
              }
            })
          break;

          case 'Create New Service':
            // 1. get the service
            // 2. spawn a new pane using the service
            pane.spawnModal({
              view: 'Loading', // Info, Warning, Error, Custom, Loading
              viewData: {},
              modalConfig: {}
            })

            pane.getService('empty').then((res) => {
              pane.closeModal()
              paneCollection.insert(res.body, '2nd activator')
              // console.log(paneCollection)
            })
          break;
        }
      }
    })`,
    paneConfig: {
        width: '700px',
        title: 'Maker',
    },
    paneHooks: `(paneCollection,pane,view) => ({
        onMount() {
          // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
          // })
          console.log(pane)
        },
        onModalEvent() {
          // console.log('test')
        },
        // onViewEvent is used to handle view emitted events
        onViewEvent() {

        }
    })`
  }
}