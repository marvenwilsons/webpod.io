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
                layer: {{layer}}
            </layer>
        </div>
    </div>
</template>

<script>
import m from '@/m'
import layer from './layer.vue'
export default {
    mixins: [m],
    props: ['tile'],
    components: {layer},
    data: () => ({
        layers: [],
    }),
    created() {
        this.layers = this.tile.layers
    }
}
</script>