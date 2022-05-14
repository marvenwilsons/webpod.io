import Vue from 'vue'

Vue.directive('resizable', {
  inserted: function (el, binding, vnode) {
    el.style.minHeight = '10px'

    const interact = vnode.context.$interact
    const valid_values = ['top','bottom','left','right']
    const { value } = binding
    const $edges = {
      top: false,
      bottom: false,
      left: false,
      right:false
    }
    let infoWidthElement = null
    let infoHeightElement =  null
    let stopWidthAtValue = null
    let stopHeightValue = null
    let onResizeFunction = () => {}

    if(typeof value == 'string') {
      if( valid_values.includes(value) ) {
        const key = valid_values[valid_values.indexOf(value)]
        $edges[key] = true
      } else {
        console.error(`Invalid resizable value "${value}"`)
      }
    }

    if(Array.isArray(value)) {
      value.map(key => {
        if($edges[key] != undefined) {
          $edges[key] = true
        } else {
          console.error(`Invalid resizable value "${key}"`)
        }
      })
    }

    if(!Array.isArray(value) && typeof value == 'object') {
      const {edges, infoWidth, infoHeight, stopWidthAt, stopHeight, onResize} = value

      if(typeof edges == 'string') {
        if( valid_values.includes(edges) ) {
          const key = valid_values[valid_values.indexOf(edges)]
          $edges[key] = true
        } else {
          console.error(`Invalid resizable value "${edges}"`)
        }
      }
  
      if(Array.isArray(edges)) {
        edges.map(key => {
          if($edges[key] != undefined) {
            $edges[key] = true
          } else {
            console.error(`Invalid resizable value "${key}"`)
          }
        })
      }

      if(infoWidth) {
        infoWidthElement = infoWidth
      }

      if(infoHeight) {
        infoHeightElement = infoHeight
      }

      if(stopWidthAt) {
        stopWidthAtValue = stopWidthAt
      }

      if(stopHeight) {
        stopHeightValue = stopHeight
      }

      if(onResize) {
        onResizeFunction = onResize
      }

    }

    interact(el).resizable({
        edges: $edges,
        listeners: {
            move: function (event) {
                let { x, y } = event.target.dataset
                x = (parseFloat(x) || 0) + event.deltaRect.left
                y = (parseFloat(y) || 0) + event.deltaRect.top

                const startResize = () => {
                  Object.assign(event.target.style, {
                      width: `${event.rect.width}px`,
                      height: `${event.rect.height}px`,
                      transform: `translate(${x}px, ${y}px)`
                  })

                  if(event.target.style['min-width'] != '') {
                    const minWidth = parseInt(event.target.style['min-width'].split('px'))
                    if(infoWidthElement) {
                      const w = Math.round(event.rect.width) > minWidth ? Math.round(event.rect.width) : minWidth
                      document.querySelector(infoWidthElement).textContent = w
                    }
                  } else {
                    if(infoWidthElement) {
                      document.querySelector(infoWidthElement).textContent = `${Math.round(event.rect.width)}`
                    }
                  }

                  if(event.target.style['min-height'] != '') {
                    const minHeight = parseInt(event.target.style['min-height'].split('px'))
                    if(infoHeightElement) {
                      const h = Math.round(event.rect.height) > minWidth ? Math.round(event.rect.height) : minHeight
                      document.querySelector(infoHeightElement).textContent = h
                    }
                  } else {
                    if(infoHeightElement) {
                      document.querySelector(infoHeightElement).textContent = `${Math.round(event.rect.height)}`
                    }
                  }
                  
                  onResizeFunction({
                    width: Math.round(event.rect.width),
                    height: Math.round(event.rect.height)
                  })
                }

                startResize()
                
                Object.assign(event.target.dataset, { x, y })

               
            }
        },
    })

  }
})