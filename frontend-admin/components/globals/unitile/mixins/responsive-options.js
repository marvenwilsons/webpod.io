export default {
    methods:{
        showResponsiveOptionModal() {
            const modalInstance = webpod.dash.modal.show({
                modalTitle: 'Manage Layout Variants',
                viewTrigger: (v) =>  this.$set(this.modals,'layout_manager',v ? 'show' : 'hide')
            })

            
        }
    }
}