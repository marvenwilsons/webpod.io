import layoutUtils from './layouts'
export default {
    methods:{
        showResponsiveOptionModal() {
            const modalInstance = webpod.dash.modal.show({
                modalTitle: 'Manage Layout Variants',
                viewTrigger: (v) =>  this.$set(this.modals,'layout_manager',v ? 'show' : 'hide')
            })

            modalInstance.on('data', ({name,payload}) => {
                if(name == 'dropLayout') {
                    // flips into a min max format, for example if payload is
                    // 700-300 this code will flip it to 300-700
                    const layoutRangeKey = payload.split('-').sort((a,b) => a-b).join('-')
                    this.dropScreenItem(layoutRangeKey)
                }

                if(name == 'addLayout') {
                    
                }
            })

            
        }
    }
}