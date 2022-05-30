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
                    console.log('removing ', payload)
                    /**
                     * flips into a min max format, for example if payload is 
                     * 700-300 this code will flip it to 300-700
                     */
                    const layoutRangeKey = payload.split('-').sort((a,b) => a-b).join('-')
                    this.dropScreenItem(layoutRangeKey)
                }
            })
        },
        renameScreenRange({ranges, done, error}) {

            const newRanges = layoutUtils.constructLayoutRange(ranges).minMax
            let newScreensObject = {}

            newRanges.map((range,rangeIndex) => {
                newScreensObject[range] = this.screens[Object.keys(this.screens)[rangeIndex]]
            })
            // TODO: server update needs to be finalized!
            webpod.server.apps.update(newScreensObject, (response) => {
                if(response.message == 'OK') {
                    // saving is successfull
                    webpod.dash.bottomAlert(`Layout successfully updated!`)
                    this.alterScreen(newScreensObject)
                } else {
                    error(response.message)
                }
            })
            

            setTimeout(() => {
                done()
            },1000)
        },
        createNewRange(v) {
            this.$set(this.screens,v,{})
            webpod.dash.bottomAlert(`${v} range added!`)
        },
    }
}