const stringify = function (fn) {
    return fn.toString()
}

module.exports =  {
    name: 'Marven Wilson Donque',
    email: 'marvenwilsons@gmail.com',
    user: 'marvenwilsons',
    avatar: '',
    app_name: 'marvenwilsondonque.com',
    menu_items: ['Dashboard','Collections','Site','Services','Settings','Media','Apps','User & Roles','Layout Builder'],
    services: [
      {
        name: 'Dashboard',
        description: 'a sample service',
        userRoleTitle: '',
        body: {
          view: 'simpleNavs', // the name of the view, its a vue component registered globally
          viewConfig: {
            // ribbons: {
            //   'Add New': ['Dashboard', 'Test 2'],
            //   'Create New': [],
            //   'Delete': ['one','bulk']
            // },
            view_versions: ['v1','v2','v3','v4'], // will be mapped to Dashboard/v1
            default_view: 'v1'
          },
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
                      warning: null,
                      style: {
                        width: '500px'
                      }
                  },
                  {
                      name: 'Pane Collection',
                      itemIcon: 'mdi-grain',
                      additionalContent: undefined,
                      events: ['Add New Pane Item', 'Copy And Insert Pane', 'Remove this pane item'],
                      style: {
                        width: '400px'
                      }
                  },
                  {
                      name: 'View',
                      itemIcon: 'mdi-border-all',
                      additionalContent: undefined,
                      events: ['Update view data','Change view'],
                      style: {
                        width: '400px'
                      }
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
          viewHooks: stringify((paneCollection,pane,view) => ({
              onRibbonClick(e) {
                console.log('ribbon has benn clicked!!', e)
                console.log(paneCollection)
              },
              onNavClick(simpleNavs) {
                switch(simpleNavs.clickedOn) {
                  // spawn error
                  case 'Spawn Error':
                    console.log('spawing error')
                    console.log(pane)
                    pane.setPaneData(['test','test2'])
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
                    console.log('Dashboard')
                    
                    // pane.getService(Create New Service','sample activator string').then((res) => {
                    //   console.log('res', res)
                    // })
                  break;
                }
              }
          })),
          paneConfig: {
              title: 'My Dashboard',
              isClosable: false,
          },
          paneHooks: stringify((paneCollection,pane,view) => ({
              
              onMount() {
                // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
                // })
              },
              onModalEvent() {
                // console.log('test')
              },
              // onViewEvent is used to handle view emitted events
              onViewEvent() {
      
              }
          }))
        }
      },
      {
        name: 'uniview',
        description: 'empty',
        userRoleTitle: '',
        body: {
          view: 'uniview', // the name of the view, its a vue component registered globally
          viewConfig: {},
          viewData: [
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
              viewData: ['formBuilder', 'table-sample', 'weird-table', 'monaco-editor', 'simple-navs'],
              viewHooks: stringify((paneCollection,pane,view) => ({
                onButtonClick(item) {
                  pane.spawnModal({
                    view: 'Loading', // Info, Warning, Error, Custom, Loading
                    viewData: {},
                    modalConfig: {}
                  })
                  
                  if(item === 'formBuilder') {
                    pane.getService('formBuilder').then((view) => {
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
              }))
            },
          ],
          // viewHooks is used to read properties within the specified view component and sometimes execute view methods
          // each view has its own viewHooks, to know the viewHooks on every views, a documentation will be provided
          viewHooks: `(paneCollection,pane,view) => ({
          })`,
          paneConfig: {
              // width: '700px',
              title: 'Sample Services Version 1',
          },
          paneHooks: stringify((paneCollection,pane,view) => ({
            onMount() {
              // pane.setPaneData('https://jsonplaceholder.typicode.com/todos',(data) => {
              // })
              // console.clear()
            },
          }))
        }
      },
      {
        name: 'formBuilder',
        body: {
          paneConfig: {
            title: 'Form Builder',
          },
          view: 'uniview',
          viewData:[
            {
              view:'formBuilder',
              viewData: {
                // Normal
                'user information': {
                    type: "string",
                    minChar: 1,
                    maxChar: 120,
                    allowSpecialChars: true,
                    allowWhiteSpace: true,
                    hoverInfo: "Element Id",
                    value: 'mar',
                    description: 'You can find the ID in the provided physcial id from the farma',
                    mode: null,
                    useAutoComplete: true,
                    autocompleteData: [
                        {
                            name: 'marven wilson',
                            title: 'developer'
                        },
                        {
                            name: 'marchael angelo',
                            title: 'analyst'
                        },
                        {
                            name: 'marlon jatico',
                            title: 'analyst'
                        },
                        {
                            name: 'mitch doe',
                            title: 'analyst'
                        },
                        {
                            name: 'janny ann',
                            title: 'wife'
                        },
                        {
                            name: 'psalm pearsons',
                            title: 'son'
                        }
                    ],
                    appendBefore: '$',
                    appendAfter: '.gmail',
                    operation: 'rw', // r -- read only values already supplied, rw -- readwrite values already supplied with updatable, w -- write values to be supplied
                    hooks: {
                        onMount: stringify(function (input) {
                          // console.log('onMount', input)
              
                        }),
                        onInput: stringify(function(input) {                          
                          // simple data set
                          const sampleQueryResult = [
                              'how to delete instagram account',
                              'how to lose weight fast',
                              'how to gain weight',
                              'how to low',
                              'Janny Ann',
                              'Marven Wilson',
                              'Psalm Pearson'
                          ]
                        }),
                        onError: stringify(function (err) {
                          // console.log('on error', err)
                        }),
                        onBlur: stringify(function(input) {
                          // console.log('onBlur', input)
                          // if(input.value != 'marven wilson') {
                          //     input.error.push('')
                          // } else {
                          //     input.check(true)
                          // }
                        }),
                        onUpdate: stringify(function (input) {
                            // console.log('onUpdate', input)

                            setTimeout(() => {
                                // input.error.push('Cannot reach server, please try again later')

                                // reach out to server here an update the target property in database
                                input.update.done('hello world')
                                // console.log('input value',input.value)
                            },300)
                        })
                    }
                },
                name: {
                    mode: null,
                    type: "string",
                    minChar: 1,
                    maxChar: 100,
                    value: null,
                    allowWhiteSpace: true,
                    allowSpecialChars: true,
                    hoverInfo: "Your Name",
                    headDescription: 'The quick brown fox jumps over the lazy dog.',
                    description: [
                        'this is first description',
                        'this is second description',
                    ],
                    renderCondition: {
                        controllers: ["user information"],
                        method: stringify(function (schema) {
                          return schema['user information'].value && schema['user information'].value.length > 5
                        })
                    },
                    hooks: {
                      onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                          }, 300)
                      })
                    }
                },
                tabindex: {
                    type: "number",
                    min: 0,
                    max: 999,
                    step: 1,
                    value: null,
                    hoverInfo: "Your Name",
                    appendBefore: '$',
                    appendAfter: '.00',
                    renderCondition: {
                        controllers: ["user information", "name"],
                        method: stringify(function(schema) {
                            if (schema['user information'].value) {
                                return (
                                    schema['user information'].value.length > 2 &&
                                    schema.name.value == "test"
                                );
                            }
                        })
                    },
                    hooks: {
                        onInput: stringify(function (input) {
                          //   console.log('number',input.value)
                        }),
                        onBlur: `function(input) {
                            
                        }`,
                        onUpdate: stringify(function(input) {
                          // console.log('onUpdate number', input)
                          setTimeout(() => {
                              input.update.done()
                          }, 300)
                        })
                    }
                },
                isAList: {
                    type: "select",
                    options: ["Yes", "No"],
                    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    operation: 'rw',
                    optio, eaque rerum! Provident similique accusantium nemo autem.`,
                    value: 1,
                    hoverInfo:
                        "dq-studio global attribute: re renders element repeatedly",
                    renderCondition: {
                        controllers: ["tabindex"],
                        method: stringify(function (schema) {
                          return schema.tabindex.value == 5
                        }),
                    },
                    hooks: {
                      onUpdate: stringify(function (n) {
                        setTimeout(() => {
                            n.update.done()
                        }, 300)
                      })
                    }
                },
                // list origin from depends on isAList value
                "list origin from": {
                    type: "select",
                    options: ["models", "collections"],
                    value: null,
                    hoverInfo:
                        "dq-studio global attribute: re renders element repeatedly",
                    renderCondition: {
                        controllers: ["isAList", "tabindex"],
                        method: stringify(function (schema) {
                          return schema.isAList.value == 0 &&
                          schema.tabindex.value == 5
                        })
                    },
                    hooks: {
                        onUpdate:stringify(function (n) {
                            setTimeout(() => {
                                n.update.done()
                            },300)
                        })
                    }
                },
                // Collections list and Models depends on isAList value and list origin from value
                "collections list": {
                    type: "string",
                    minChar: 1,
                    maxChar: 900,
                    allowWhiteSpace: false,
                    allowSpecialChars: true,
                    mode: null,
                    hoverInfo: 'Collection list name',
                    value: null,
                    renderCondition: {
                        controllers: ["list origin from", "isAList"],
                        method: stringify(function(schema) {
                            return schema["list origin from"].value == 1 &&
                            schema.isAList.value == 0
                        })
                    }
                },
                models: {
                    type: "string",
                    minChar: 1,
                    maxChar: 900,
                    allowWhiteSpace: false,
                    allowSpecialChars: true,
                    hoverInfo: 'test',
                    mode: null,
                    value: null,
                    renderCondition: {
                        controllers: ["list origin from", "isAList"],
                        method: stringify(function(schema) {
                          return schema["list origin from"].value == 0 &&
                          schema.isAList.value == 0
                      })
                    },
                    hooks: {
                      onBlur: stringify(function(n) {

                      }),
                      onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                          }, 300)
                      })
                    }
                },
                password: {
                    type: "string",
                    mode: 'password',
                    minChar: 1,
                    maxChar: 900,
                    allowWhiteSpace: false,
                    allowSpecialChars: true,
                    hoverInfo: null,
                    value: null,
                    description: [
                        'Must have special characters',
                        'Must have numerical characters',
                        'Must have small & all caps characters'
                    ],
                    renderCondition: {
                        controllers: ["list origin from", "isAList"],
                        method: stringify(function(schema) {
                          return schema["list origin from"].value == 0 &&
                          schema.isAList.value == 0
                      })
                    },
                    // new that only native to password
                    rules: {
                        includeSpecialCharacters: 2,
                        includeUpperCaseLetters: 3,
                        includeLowerCaseLetters: 3,
                        includeNumericCharacters: 2
                    },
                    hooks: {
                      onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                          }, 300)
                      })
                    }
                },
                multiselect: {
                  type: "multiselect",
                  options: ['foo','baz', 'bar','sample_1','sample_2'],
                  value: ['bar','foo'],
                  hoverInfo: 'multiselect',
                  renderCondition: {
                    controllers: ["list origin from", "isAList"],
                    method: stringify(schema =>
                      schema["list origin from"].value == 0 &&
                      schema.isAList.value == 0),
                    method: stringify(function(schema) {
                      return schema["list origin from"].value == 0 && schema.isAList.value == 0
                    })
                  },
                  hooks: {
                    onMount: stringify(function(input) {
                      // console.log('onMount multiselect', input)
                      // input.multiselect.addOption('test')
                    }),
                    onInput: stringify(function(input) {
                      // console.log('onInput', input)
                    }),
                    onEmpty: stringify(function(input) {
                      input.error.push('This field is required')
                      // console.log('its empty!', input)
                    }),
                    onError: stringify(function() {
                      // console.log('Whaaaaaaat?')
                    }),
                    onUpdate: stringify(function(n) {
                      setTimeout(() => {
                          n.update.done()
                      }, 300)
                    })
                  }
                },
                tags: {
                  type: "tags",
                  value: ['bar','foo'],
                  minChar: 1,
                  maxChar: 900,
                  allowWhiteSpace: false,
                  allowSpecialChars: false,
                  mode: null,
                  hoverInfo: null,
                  hoverInfo: 'tags',
                  renderCondition: {
                      controllers: ["list origin from", "isAList"],
                      method: stringify(function(schema) {
                        return schema["list origin from"].value == 0 && schema.isAList.value == 0
                      })
                  },
                  hooks: {
                      onUpdate: stringify(function(n) {
                        setTimeout(() => {
                          console.log('mao na dha!',n)
                          n.update.done()
                        },300)
                    })
                  }
                },
                "EXR Range2": {
                    type: 'minmax',
                    options: {
                        min: 1,
                        max: 15
                    },
                    value: {
                        min: 1,
                        max: 10
                    },
                    hoverInfo: 'EXR Range2',
                    renderCondition: {
                        controllers: ["list origin from", "isAList"],
                        method: stringify(schema =>
                          schema["list origin from"].value == 0 &&
                          schema.isAList.value == 0),
                        method: stringify(function(schema) {
                          return schema["list origin from"].value == 0 && schema.isAList.value == 0
                        })
                    },
                    hooks: {
                        onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                          }, 100)
                      })
                    }
                },
                "Comments" : {
                    type: 'textarea',
                    value: 'the quick brown fox jumps over the lazy dog',
                    hoverInfo: 'Comments',
                    maxlength: 200,
                    hooks: {
                        onInput: `function() {
                            console.log('textarea onInput')
                        }`,
                        onUpdate: stringify(function(n) {
                          console.log('onUpdate', n)
                          setTimeout(() => {
                            n.update.done()
                          }, 500)
                      })
                    }
                },
                "Agreement" : {
                    type: 'checkbox',
                    value: false,
                    content: `You agree that we collect, use and disclose Personal Information to provide 
                    you with the product or service you have requested and to offer you additional 
                    products and services we believe you might be interested in.`,
                    hoverInfo: 'Agreement',
                    description: 'disclosure aggreement',
                    hooks: {
                        onInput: stringify(function(n) {
                          console.log('onInput agreement', n)
                        }),
                        onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                          },500)
                      })
                    }
                },
                "Agreement2" : {
                    type: 'checkbox',
                    value: false,
                    content: `You agree that we collect, use and disclose Personal Information to provide 
                    you with the product or service you have requested and to offer you additional 
                    products and services we believe you might be interested in.`,
                    hoverInfo: 'Agreement',
                    description: 'disclosure aggreement',
                    hooks: {
                        onUpdate: stringify(function(n) {
                          setTimeout(() => {
                              n.update.done()
                              n.formData.value = true
                          }, 1000)
                      })
                    }
                },
                "onUpdate Hook": {
                  type: 'text-editor',
                  value: "function onLoad(input) {\n\twebpod.alert('hello world')\n}\n",
                  lang: 'javascript', // js phyton scss only
                  readOnly: false,
                  playable: true,
                  hoverInfo: 'test',
                  height: '200px',
                  useCmdLine: false,
                  hooks: {
                    onUpdate: stringify(function(n) {
                      setTimeout(() => {
                          n.update.done()
                          n.formData.value = true
                      }, 1000)
                    }),
                    onPlay: stringify(function(n) {
                      console.log('onPlay in server', n)
                      let v = 0
                      const i = setInterval(() => {
                        v++
                        
                        if(v == 201 || v == 101) {
                          n.log({
                            type: 'success',
                            msg: `installed ${v} component`
                          })
                        } else {
                          n.log(`building ${v}`)
                        }

                        if(v == 400) {
                          clearInterval(i)
                          setTimeout(() => {
                            n.stop()
                          },100)
                        }
                      }, 5)

                    }),
                    onCmd: stringify(function(p) {
                      if(p.cmd.split(' ')[0] == 'alert') {
                        p.dash.alert(p.cmd.replace('alert',''))
                      }
                      // console.log('onCmd', p)
                    })
                  }
                },
                
              },
              viewConfig: {
                  /**
                   * form mode - data to be sumbmitted, empty forms
                   * view mode - view the values only
                   * update mode - view data and be able to update
                   */
                  mode: 'form',
                  title: 'Sample Form Group 1',
                  operation: 'rw'
              },
              viewHooks: stringify((paneCollection,pane,view) => ({
                test() {
                  console.log(pane)
                }
              }))
            }
          ],
        },
        
      },
      {
        name: 'Layout Builder',
        body: {
          paneConfig: {
            title: 'Layout Builder (unitile ver-alpha)',
            isClosable: true
          },
          view: 'unitile',
          viewData: [
            
          ],
          viewHooks: stringify((paneCollection,pane,view) => ({
            onSaveLayout(layout) {
              layout.map(e => {
                console.log('heheh',JSON.stringify(e))
              })
            }
          })),
          viewConfig: {
            editable: true
          }
        }
      }
    ]
  }