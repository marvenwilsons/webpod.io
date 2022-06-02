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
            /**
             * inputs: 
             * ranges is an array of max widths, sample ['Infinity', '700']
             * 
             * done is a void function that mutates the updateRangeForm object in layout-manager.vue
             * error is a function that accepts string input that mutates the updateRangeForm object in layout-manager.vue
             */
            
            
            /**
             * the newRanages variable holds an array of strings output from 
             * constructLayoutRange of minMax format
             * 
             * sample output of constructLayoutRange: ['Infinity-700','700-300','300-1']
             */
            const newRanges = 
                layoutUtils
                .constructLayoutRange(ranges)
                .minMax
            
            /**
             * newScreensObject is temp variable
             */
            let newScreensObject = {}


            /**
             * loop through each screens property to locate the screen item to
             * be saved in the temp variable.
             * 
             * the temp variable will be holding a screens item property
             */
            newRanges.map((range,rangeIndex) => {
                newScreensObject[range] = this.screens[Object.keys(this.screens)[rangeIndex]]
            })


            // TODO: server update needs to be finalized!
            webpod.server.apps.update(newScreensObject, (response) => {
                if(response.message == 'OK') {
                    // saving is successfull
                    webpod.dash.bottomAlert(`Layout successfully updated!`)
                    this.alterScreen(newScreensObject)
                    setTimeout(() => {
                        done()
                    },1000)
                } else {
                    error(response.message)
                }
            })
            

            
        },
        createNewRange(newRangeStringToCreate) {        
            const v = newRangeStringToCreate
            const targetScreensPropertyMax = v.split('-')[1]

            let temp = {}
            Object.entries(this.screens).forEach(
                ([key, value]) => {
                    /**
                     * Find the smallest range in screens array then delete it but keep its contents,
                     * add new property to the screens array with old contents as its value
                     * sample output: '1-300', or '1-500'
                     * anything that there is 1 in it is considered to be the smallest range 
                     */
                    if(key.includes('1')) {
                        temp = value
                        this.dropScreenItem(key)
                    }
                }
            );

            webpod.dash.bottomAlert(`${v} range added!`)
        },
        rangeUpdate(v) {
            console.log('range update!', v)
        }
    }
}