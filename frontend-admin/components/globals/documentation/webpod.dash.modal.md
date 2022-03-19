@docs webpod.dash.modal
```js
<template>
    <div>
        <portal v-if="componentToBeShownInsideModal" to="modal">
            HELLO I AM A MODAL CONTENT
        </portal>
    </div>
</template>

<script>
export default {
    data: () => ({
        componentToBeShownInsideModal: false
    }),
    methods: {
        showModal() {
            // Create a modal instance
            const modalInstance = webpod.dash.modal.show({
                modalTitle: 'Column Editor',
                isPlayable: true,
                viewTrigger: (s) => {
                    // takes care of render toggling  the html view inside modal
                    this.componentToBeShownInsideModal = s
                },
                // its like a submit button, it will appear an enables the event .on('submit')
                button: 'click me'
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

            // btn-click event usage
            modalInstance.on('btn-click', (btn) => {
                btn.disabled(true)
                btn.progress(true)
                btn.loading(true)
                btn.text('creating ...')
            })

            // emits "data" event on modal instance
            webpod.dash.modal.setData({
                firstName: 'Jane',
                lastName: 'Doe'
            })
            modalInstance.on('data', (data) => {
                // data = {firstName: 'Jane', lastName: 'Doe}
            })
        }
    }
}
</script>
```