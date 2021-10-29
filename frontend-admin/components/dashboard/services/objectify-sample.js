export default {
  name: 'objectifySample',
  body: {
    view: 'uniview',
    viewData: (uniview) => {
        return [
            {
              view:'objectify',
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
                        onMount(input) {
                          // console.log('onMount', input)
              
                        },
                        onInput(input) {                          
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
                        },
                        onError(err) {
                          // console.log('on error', err)
                        },
                        onBlur(input) {
                            // console.log('onBlur', input)
                            // if(input.value != 'marven wilson') {
                            //     input.error.push(`Invalid selection ${input.value} should be marven wilson`)
                            // } else {
                            //     input.check(true)
                            // }
                        },
                        onUpdate(input) {
                            // console.log('onUpdate', input)

                            setTimeout(() => {
                                // console.log('done')
                                // input.error.push('Cannot reach server, please try again later')
                                input.update.done()
                                // console.log('input value',input.value)
                            },300)
                        }
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
                        method: schema => schema['user information'].value && schema['user information'].value.length > 5
                    },
                    hooks: {
                        onUpdate(n) {
                            console.log(n)
                        },
                        onUpdate(input) {
                            console.log('onUpdate',input)
                            setTimeout(() => {
                                console.log('done')
                                // input.error.push('Cannot reach server, please try again later')
                                input.update.done()
                                // console.log('input value',input.value)
                            },300)
                        }
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
                        method: schema => {
                            if (schema['user information'].value) {
                                return (
                                    schema['user information'].value.length > 2 &&
                                    schema.name.value == "test"
                                );
                            }
                        }
                    },
                    hooks: {
                        onInput(input) {
                          //   console.log('number',input.value)
                        },
                        onBlur(input) {
                            
                        },
                        onUpdate(input) {
                            // console.log('onUpdate number', input)
                            setTimeout(() => {
                                input.update.done()
                            }, 300)
                        }
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
                        method: schema => schema.tabindex.value == 5
                    },
                    hooks: {
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            }, 300)
                        }
                    }
                },
                /**
                 * list origin from depends on isAList value
                 */
                "list origin from": {
                    type: "select",
                    options: ["models", "collections"],
                    value: null,
                    hoverInfo:
                        "dq-studio global attribute: re renders element repeatedly",
                    renderCondition: {
                        controllers: ["isAList", "tabindex"],
                        method: schema =>
                            schema.isAList.value == 0 &&
                            schema.tabindex.value == 5
                    },
                    hooks: {
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            },300)
                        }
                    }
                },
                /**
                 * Collections list and Models depends on isAList value and list origin from value
                 */
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
                        method: schema =>
                            schema["list origin from"].value == 1 &&
                            schema.isAList.value == 0
                    }
                },
                models: {
                    type: "string",
                    minChar: 1,
                    maxChar: 900,
                    allowWhiteSpace: false,
                    allowSpecialChars: true,
                    mode: null,
                    hoverInfo: null,
                    value: null,
                    renderCondition: {
                        controllers: ["list origin from", "isAList"],
                        method: schema =>
                            schema["list origin from"].value == 0 &&
                            schema.isAList.value == 0
                    },
                    hooks: {
                        onBlur(input) {
                            // console.log('Blurred', input)
                            input.loading(true)
                            input.setDescription('checking please wait ...')

                            setTimeout(() => {
                                input.loading(false)
                                input.setDescription(null)
                                input.check(true)
                            },1500)
                        },
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            }, 300)
                        }
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
                        method: schema =>
                            schema["list origin from"].value == 0 &&
                            schema.isAList.value == 0
                    },
                    // new that only native to password
                    rules: {
                        includeSpecialCharacters: 2,
                        includeUpperCaseLetters: 3,
                        includeLowerCaseLetters: 3,
                        includeNumericCharacters: 2
                    },
                    hooks: {
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            }, 300)
                        }
                    }
                },
                multiselect: {
                  type: "multiselect",
                  options: ['foo','baz', 'bar','sample_1','sample_2'],
                  value: ['bar','foo'],
                  hoverInfo: 'multiselect',
                  renderCondition: {
                    controllers: ["list origin from", "isAList"],
                    method: schema =>
                        schema["list origin from"].value == 0 &&
                        schema.isAList.value == 0
                  },
                  hooks: {
                    onMount(input) {
                        // console.log('onMount multiselect', input)
                        // input.multiselect.addOption('test')
                    },
                    onInput(input) {
                        // console.log('onInput', input)
                    },
                    onEmpty(input) {
                        input.error.push('This field is required')
                        // console.log('its empty!', input)
                    },
                    onError() {
                        // console.log('Whaaaaaaat?')
                    },
                    onUpdate(n) {
                        setTimeout(() => {
                            n.update.done()
                        }, 300)
                    }
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
                      method: schema =>
                          schema["list origin from"].value == 0 &&
                          schema.isAList.value == 0
                  },
                  hooks: {
                      onUpdate(n) {
                          setTimeout(() => {
                            n.update.done()
                          },300)
                      }
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
                        method: schema =>
                            schema["list origin from"].value == 0 &&
                            schema.isAList.value == 0
                    },
                    hooks: {
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            }, 100)
                        }
                    }
                },
                "Comments" : {
                    type: 'textarea',
                    value: 'the quick brown fox jumps over the lazy dog',
                    hoverInfo: 'Comments',
                    maxlength: 200,
                    hooks: {
                        onInput() {
                            console.log('textarea onInput')
                        },
                        onUpdate(input) {
                            console.log('onUpdate', input)
                            input.update.done()
                        }
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
                        onInput(n) {
                            console.log('onInput agreement', n)

                        },
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            },500)
                        }
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
                        onUpdate(n) {
                            setTimeout(() => {
                                n.update.done()
                            }, 1000)
                        }
                    }
                }
              },
            //   
              viewConfig: {
                  /**
                   * form mode - data to be sumbmitted, empty forms
                   * view mode - view the values only
                   * update mode - view data and be able to update
                   */
                  mode: 'form',
                  title: 'Sample Form',
                  operation: 'rw'
              }
            }
          ]
    },
  }
}