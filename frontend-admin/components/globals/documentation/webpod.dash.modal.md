```js
// Create a modal instance
const modalInstance = webpod.dash.modal.show({
    modalTitle: 'Column Editor',
    isPlayable: true
})

// if on instanciation isPlayable is set to true a play button will appear in modal
// and this event will fire when that button is clicked
modalInstance.on('play', () => {
    console.log('ey playing')
    // modalInstance.emit('error', 'There was an error analizing the columns please try again.')
    setTimeout(() => {
        webpod.dash.modal.hide()
    },4000)
})

// this event will fire when the modal mounted
modalInstance.on('show', () => {
    this.modalInstanceIsOpen = true
})

// this event will fire when the modal.hide() is called
// you can abort the closing by executing the callback function
// supplying it with true if you want to abort and false if you want to proceed on closing.
modalInstance.on('close', (abort) => {
    console.log('closing')
    // if(false) {
    //     abort(true)
    // } else {
    //     abort(false)
    // }
})

// stops the loading animation of the play button
modalInstance.emit('stop-playing')

```