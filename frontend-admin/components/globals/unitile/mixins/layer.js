export default {
    methods: {
        generateLayerInstance(index,name,layer_lock) {
            return {
                layer_id: 'layer-' + this.uid(),
                layer_index: index,
                layer_blocks: [], // array of block ids
                layer_name: name || 'untitled',
                layer_lock: layer_lock != undefined ? layer_lock : false,
                layer_background: undefined,
                layer_opacity: undefined,
                layer_show: true
            }
        },
        addNewLayer() {
            const len = this.tiles[this.nodeSelectedIndex].layers.length
            this.tiles[this.nodeSelectedIndex].layers.push(this.generateLayerInstance(len + 1, null, false))
        },
        removeLayer(layerId) {
            const layers = this.tiles[this.nodeSelectedIndex].layers.length
            for(let i = 0; layers < i; i++) {
                if(this.tiles[this.nodeSelectedIndex].layers[i].layerId == layerId) {
                    this.tiles[this.nodeSelectedIndex].layers.splice(i)
                    break
                }
            }
        }
    }
}