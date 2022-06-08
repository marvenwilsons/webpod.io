export default {
    data: () => ({
        selected_block: undefined,
        selected_layer_row: undefined,
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
        addRowBlock(layer_id, block_payload) {
            console.log('Adding row block! ', layer_id)
            this.tiles[this.nodeSelectedIndex].layers.map(layer => {
                if(layer.layer_id == layer_id) {
                    if(block_payload) {
                        const newBlocks = block_payload.blocks.map(b => {
                            b.id = this.uid()
                            return b
                        })

                        block_payload.blocks = newBlocks
                        layer.layer_rows.push(block_payload)
                    } else {
                        layer.layer_rows.push({
                            custom_style: {},
                            classes: [],
                            wrap_items: false,
                            blocks: [],
                            row_id: this.uid()
                        })
                    }
                    
                } else {
                    console.log('Layer not found!', layer_id)
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
                    text_style: 'rich text',
                    ...this.generateCommonElementProp('Lorem ipsum','rich text')
                })
            }

            if(cmd == 'Insert heading block') {
                this.addBlock(target_id, {
                    text_style: 'heading',
                    level: 'h1',
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

            if(cmd == 'Insert instagram post') {
                this.addBlock(target_id,{
                    feed_source: '',
                    ...this.generateCommonElementProp(null,'instagram')
                })
            }

            if(cmd == 'Insert twitter post') {
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


            if(cmd == 'Clone this row') {
                console.log('Cloning row!')
                let p = this.copy(payload)
                p.row.row_id = this.uid()
                this.addRowBlock(p.layer.layer_id,p.row)
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

            if(cmd == 'Inline Style') {
                console.log('Row Inline Style')
                this.selected_layer_row = payload.row

                const modalInstace = webpod.dash.modal.show({
                    modalTitle: 'Row Inline Style',
                    viewTrigger: (v) => this.$set(this.modals,'row_inline_css_editor', v ? 'show' : 'hide')
                })

                modalInstace.on('data', (data) => this.selected_layer_row.custom_style = data)
            }

            if(cmd == 'CSS Classes') {
                this.selected_layer_row = payload.row

                const modalInstace = webpod.dash.modal.show({
                    modalTitle: 'Row CSS Classes',
                    viewTrigger: (v) => this.$set(this.modals,'row_css_classes_editor', v ? 'show' : 'hide')
                })

                modalInstace.on('show', () => {
                    this.$refs.rowClasses.setClasses(payload.row.classes)

                    this.$refs.rowClasses.onData = (classesArray) => {
                        this.selected_layer_row.classes = classesArray
                    }
                })
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
        },
        onImportBlock(block, row_id) {
            // console.log(this.tiles[this.nodeSelectedIndex].layers)
            this.tiles[this.nodeSelectedIndex].layers.map((layer,layer_index) => {
                //  locate active layer
                if(layer.layer_name == this.getActiveLayer.layer_name) {
                    // locate the target row
                   layer.layer_rows.map((row,row_index) => {
                        if(row.row_id === this.selected_layer_row.row_id) {
                            // locate the target block
                            row.blocks.map((sblock,block_index) => {
                                if(sblock.id == this.selected_block.id) {
                                    // mutate block
                                    this.tiles[this.nodeSelectedIndex]
                                        .layers[layer_index]
                                        .layer_rows[row_index]
                                        .blocks[block_index] = block

                                }
                            })
                        }
                   })
                }
            })
        }
    }
}