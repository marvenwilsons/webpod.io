export default {
    methods:{
        showResponsiveOptionModal() {
            const modalInstance = webpod.dash.modal.show({
                modalTitle: 'Define responsive layout',
                viewTrigger: (v) =>  this.$set(this.modals,'define_responsive_layout',v ? 'show' : 'hide')
            })
        }
    }
}