export default {
    methods:{
        showResponsiveOptionModal() {
            const modalInstance = webpod.dash.modal.show({
                modalTitle: 'Select layout variant',
                viewTrigger: (v) =>  this.$set(this.modals,'define_responsive_layout',v ? 'show' : 'hide')
            })

            modalInstance.on('data', (data) => {
                console.log(data)
                // data = {firstName: 'Jane', lastName: 'Doe}
            })
        }
    }
}