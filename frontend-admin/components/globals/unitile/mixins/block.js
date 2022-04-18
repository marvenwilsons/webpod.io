export default {
    data: () => ({
        selected_block: undefined,
        selected_layer_row: undefined
    }),
    watch: {
        nodeSelectedIndex() {
            if(this.nodeSelectedIndex == undefined) {
                this.selected_block = undefined
            }
        }
    },
    methods: {
        addElementBlock(block) {
            this.tiles[this.nodeSelectedIndex].blocks.push(block)
        },
        addRowBlock(layer_id) {

            this.tiles[this.nodeSelectedIndex].layers.map(layer => {
                if(layer.layer_id == layer_id) {
                    layer.layer_rows.push({
                        custom_style: {},
                        classes: [],
                        wrap_items: false,
                        blocks: [],
                        row_id: this.uid()
                    })
                }
            })
        },
        deleteRow(target_id) {
            this.tiles[this.nodeSelectedIndex].layers.map((layer,layer_index) => {
                layer.layer_rows.map((row,row_index) => {
                    if(row.row_id == target_id) {
                        this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows.splice(row_index,1)
                    }
                })
            })
        },
        generateImageBlock() {
            return {
                alt: '',
                width: '',
                height: '',
                src: '',
                ...this.generateCommonElementProp(null,'image')
            }
        },
        generateCommonElementProp(value,component_name) {
            return {
                value,
                component_name,
                custom_inline_style: {},
                classes: [],
                id: this.uid()
            }
        },
        addBlock(target_id,block) {
            this.tiles[this.nodeSelectedIndex].layers.map((layer,layer_index) => {
                layer.layer_rows.map((row,row_index) => {
                    if(row != undefined) {
                        if(row.row_id == target_id) {
                            this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows[row_index].blocks.push(block)
                        }
                    }
                   
                })
            })
        },
        rowCmd({cmd,target_id,payload}) {
            if(cmd == 'Insert text block') {
                this.addBlock(target_id, {
                    text_style: 'text',
                    ...this.generateCommonElementProp('Lorem ipsum','text')
                })
            }

            if(cmd == 'Insert rich text') {
                this.addBlock(target_id, {
                    text_style: 'rich text',// text, p, h1, h2, h3, h4, h5, h6
                    ...this.generateCommonElementProp('Lorem ipsum','rich text')
                })
            }

            if(cmd == 'Insert heading block') {
                console.log('heading')
                this.addBlock(target_id, {
                    text_style: 'heading',// text, p, h1, h2, h3, h4, h5, h6
                    ...this.generateCommonElementProp('Lorem ipsum','heading')
                })
            }

            if(cmd == 'Insert image block') {
                this.addBlock(target_id,{
                    alt: '',
                    width: '',
                    height: '',
                    src: '',
                    ...this.generateCommonElementProp(null,'image')
                })
            }

            if(cmd == 'Insert video block') {
                this.addBlock(target_id,{
                    width: '',
                    height: '',
                    src: '',
                    ...this.generateCommonElementProp(null,'video')
                })
            }

            if(cmd == 'Insert app instance block') {
                this.addBlock(target_id,{
                    app_name: '',
                    app_instance_name: '',
                    ...this.generateCommonElementProp(null,'app-instance')
                })
            }

            if(cmd == 'Insert youtube video') {
                this.addBlock(target_id,{
                    youtube_source: '',
                    ...this.generateCommonElementProp(null,'youtube')
                })
            }

            if(cmd == 'Insert instagram feed') {
                this.addBlock(target_id,{
                    feed_source: '',
                    ...this.generateCommonElementProp(null,'instagram')
                })
            }

            if(cmd == 'Insert twitter feed') {
                this.addBlock(target_id,{
                    feed_source: '',
                    ...this.generateCommonElementProp(null,'twitter')
                })
            }

            if(cmd == 'Insert iframe block') {
                this.addBlock(target_id,{
                    link: '',
                    ...this.generateCommonElementProp(null,'iframe')
                })
            }


            if(cmd == 'Clone & paste below') {
                let p = this.copy(payload)
                p.row_id = undefined
                p.row_id = this.uid()
                this.addRowBlock(target_id,p)
            }

            if(cmd == 'Wrap items') {
                console.log('wrap items cmd', target_id)

                this.tiles[this.nodeSelectedIndex].layers.map((layer,layer_index) => {
                    layer.layer_rows.map((row,row_index) => {
                        if(row.row_id == target_id) {
                            let w = this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows[row_index].wrap_items

                            if(w == true) {
                                this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows[row_index].wrap_items = false
                            } else {
                                this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows[row_index].wrap_items = true
                            }
                        }
                    })
                })
            }

            if(cmd == 'Delete row') {
                this.deleteRow(target_id)
            }
        },
        deleteBlock(block,layer_row_id) {
            this.selected_layer_row.blocks.map((b,i) => {
                if(b.id == block.id) {
                    this.selected_layer_row.blocks.splice(i,1)
                    this.$nextTick(() => {
                        this.selected_block = undefined
                        this.selected_layer_row = undefined
                    })
                }
            })
        },
        blockClick({block,row}) {
            this.selected_block = undefined
            this.selected_layer_row = undefined
            this.$set(this.layerAndBlockContoller,'show', false)

            this.$nextTick(() => {
                this.selected_block = block
                this.selected_layer_row = row
                this.$set(this.layerAndBlockContoller,'show', false)
            })
            
        }
    }
}