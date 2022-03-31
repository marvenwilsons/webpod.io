export default {
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
        generateTextBlock(text_style) {
            return {
                text_style: 'text', // text, p, h1, h2, h3, h4, h5, h6
                ...this.generateCommonElementProp('Lorem ipsum','text')
            }
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
        generateVideoBlock() {
            return {
                width: '',
                height: '',
                src: '',
                ...this.generateCommonElementProp(null,'video')
            }
        },
        generateAppBlock() {
            return {
                app_name: '',
                app_instance_name: '',
                ...this.generateCommonElementProp(null,'app-instance')
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
                    if(row.row_id == target_id) {
                        this.tiles[this.nodeSelectedIndex].layers[layer_index].layer_rows[row_index].blocks.push(block)
                    }
                })
            })
        },
        rowCmd({cmd,target_id}) {
            if(cmd == 'Insert text block') {
                this.addBlock(target_id,this.generateTextBlock('text'))
            }
            if(cmd == 'Insert image block') {
                this.addBlock(target_id,this.generateImageBlock('image'))
            }

            if(cmd == 'Insert video block') {
                this.addBlock(target_id,this.generateVideoBlock('video'))
            }

            if(cmd == 'Insert app instance block') {
                this.addBlock(target_id,this.generateAppBlock('app-instance'))
            }
        }
    }
}