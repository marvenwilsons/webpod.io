<template>
    <div class="flex relative fullheight-percent" >
        <div 
        :style="{order: layer.layer_order}" 
        class="absolute fullwidth fullheight-percent" 
        v-for="layer in layers" :key="uid(layer)" 
        >
            <layer
            v-if="layer.layer_show"
            :backgroundColor="layer.layer_background"
            :opacity="layer.layer_opacity"
            >
                <section 
                v-for="(row,i) in layer.layer_rows"
                :key="uid(i)" 
                :style="row && {...row.custom_style}"  
                :class="row && ['flex flex1',...row.classes, row.wrap_items ? 'flexwrap' : '']" 
                :id="row && row.row_id"
                >
                    <div class="flex1"  v-for="block in row.blocks" :key="uid(block)" >
                        <div v-if="block.component_name == 'text'" >
                            <span :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </span>
                        </div>
                        <div v-if="block.component_name == 'paragraph'" >
                            <p v-html="block.value" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                            </p>
                        </div>
                    </div>
                </section>
            </layer>
        </div>
    </div>
</template>

<script>
import m from '@/m'
import layer from './layer.vue'
import elementBlock from './elementBlock.vue'
export default {
    mixins: [m],
    props: ['tile'],
    components: {layer, elementBlock},
    data: () => ({
        layers: [],
    }),
    created() {
        this.layers = this.tile.layers
    }
}
</script>