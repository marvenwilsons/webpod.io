export default {
    methods: {
        generateLayerInstance(index,name,layer_lock) {
            return {
                layer_id: 'layer-' + this.uid(),
                layer_order: index,
                layer_blocks: [], // array of block ids
                layer_name: name || 'untitled',
                layer_lock: layer_lock != undefined ? layer_lock : false,
                layer_background: undefined,
                layer_opacity: undefined,
                layer_show: true
            }
        },
        addNewLayer() {
            // console.log(Math.round(new Date().getTime()/1000))
            const len = this.tiles[this.nodeSelectedIndex].layers.length
            this.tiles[this.nodeSelectedIndex].layers.push(this.generateLayerInstance(len + 1, null, false))
        },
        deleteLayer(layerId) {
            const layers = this.tiles[this.nodeSelectedIndex].layers.length
            if(layers == 1) {
                webpod.dash.bottomAlert('You cannot delete this layer')
            } else {
                this.tiles[this.nodeSelectedIndex].layers.map((e,i) => {
                    if(e.layer_id == layerId) {
                        this.tiles[this.nodeSelectedIndex].layers.splice(i)
                    }
                })
            }
            
        }
    },
    mounted() {
    }
}