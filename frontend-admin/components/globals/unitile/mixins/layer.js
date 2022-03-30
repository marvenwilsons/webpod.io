export default {
    data: () => ({
        active_layer: undefined
    }),
    methods: {
        generateLayerInstance(index,name,layer_lock) {
            return {
                layer_id: 'layer-' + this.uid(),
                layer_order: index,
                layer_blocks: [], // array of block ids
                layer_name: name || 'untitled_' + Math.floor(Math.random() * 100),
                layer_lock: layer_lock != undefined ? layer_lock : false,
                layer_background: undefined,
                layer_opacity: undefined,
                layer_show: true,
                active_layer: undefined
            }
        },
        addNewLayer() {
            this.tiles[this.nodeSelectedIndex].layers.map((layer,index) => {
                this.tiles[this.nodeSelectedIndex].layers[index].active_layer = undefined
            })
            // console.log(Math.round(new Date().getTime()/1000))
            const len = this.tiles[this.nodeSelectedIndex].layers.length
            const layer = this.generateLayerInstance(len + 1, null, false)
            layer.active_layer = layer.layer_name
            this.tiles[this.nodeSelectedIndex].layers.push(layer)
            this.$nextTick(() => {
                this.addSessionEntry() 
                this.active_layer = layer.layer_name
                console.log('asdf', this.active_layer)
            })
        },
        deleteLayer(layerId) {
            const layers = this.tiles[this.nodeSelectedIndex].layers.length
            if(layers == 1) {
                webpod.dash.bottomAlert('You cannot delete a primary layer')
            } else {
                this.tiles[this.nodeSelectedIndex].layers.map((e,i) => {
                    if(e.layer_id == layerId) {
                        if(e.active_layer != undefined) {
                            webpod.dash.bottomAlert('You cannot delete an active layer')
                        } else {
                            this.tiles[this.nodeSelectedIndex].layers.splice(i,1)
                            this.tiles[this.nodeSelectedIndex].layers.splice(this.tiles[this.nodeSelectedIndex].layers.length)
                        }
                        
                    }
                })
            }
            
            this.$nextTick(() => {
                this.refresh()
                this.addSessionEntry()
            })
        },
        updateLayerOrder(v) {
            v.map((e,i) =>  v[i].layer_order = i + 1)
            this.$set(this.tiles[this.nodeSelectedIndex], 'layers', v)
            this.$nextTick(() => {
                this.addSessionEntry()   
            })
        },
        changeActiveLayer({target_id, target_name}) {
            this.tiles[this.nodeSelectedIndex].layers.map((layer,index) => {
                this.tiles[this.nodeSelectedIndex].layers[index].active_layer = undefined

                if(layer.layer_name == target_name && layer.layer_id == target_id) {
                    layer.active_layer = target_name
                }
            })
        }
    }
}