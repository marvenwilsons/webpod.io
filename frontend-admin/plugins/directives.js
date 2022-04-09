import Vue from 'vue'

Vue.directive('resizable', {
  inserted: function (el, binding, vnode) {
    el.style.minHeight = '10px'

    const interact = vnode.context.$interact
    const valid_values = ['top','bottom','left','right']
    const { value } = binding
    const edges = {
      top: false,
      bottom: false,
      left: false,
      right:false
    }

    if(typeof value == 'string') {
      if( valid_values.includes(value) ) {
        const key = valid_values[valid_values.indexOf(value)]
        edges[key] = true
      } else {
        console.error(`Invalid resizable value "${value}"`)
      }
    }

    if(Array.isArray(value)) {
      value.map(key => {
        if(edges[key] != undefined) {
          edges[key] = true
        } else {
          console.error(`Invalid resizable value "${key}"`)
        }
      })
    }

    interact(el).resizable({
        edges,
        listeners: {
            move: function (event) {
                let { x, y } = event.target.dataset
                x = (parseFloat(x) || 0) + event.deltaRect.left
                y = (parseFloat(y) || 0) + event.deltaRect.top
                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                })
                Object.assign(event.target.dataset, { x, y })
            }
        },
    })

  }
})