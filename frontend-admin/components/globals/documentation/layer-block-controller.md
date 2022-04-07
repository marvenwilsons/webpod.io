```js
function(layer, block) {

    // block api
    const buttonBlock = block('myButton')
    buttonBlock.show()
    buttonBlock.hide()
    buttonBlock.on('click', (el) => {})
    buttonBlock.on('onmousehover', (el) => {})
    buttonBlock.on('onmouseleave', (el) => {})
    buttonBlock.on('mount', (el) => {})
    buttonBlock.emit('mutate-property', (prop) => {
        prop.value = 'hello world'
    })
    buttonBlock.emit('animate',(el,gsap) => {
        gsap('el').fromTo(/** custom animation here*/)
    })

    // layer api
    const targetLayer = layer('default')
    targetLayer.show()
    targetLayer.hide()
}
```