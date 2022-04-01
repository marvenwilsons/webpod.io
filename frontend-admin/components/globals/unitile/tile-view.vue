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
                :class="['flex flex1 borderred',...row.classes, row.wrap_items ? 'flexwrap' : '']" 
                :style="{...row.custom_style}"  
                v-for="row in layer.layer_rows" 
                :key="uid(row)" 
                :id="row.row_id"
                >
                    <div class="borderred flex1"  v-for="block in row.blocks" :key="uid(block)" >
                        <div v-if="block.component_name == 'text'" >
                            {{block.value}} - {{block.id}}
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