<template>
    <div class="flex relative fullheight-percent" >
        <div 
        :style="{order: layer.layer_order}" 
        class="absolute fullwidth fullheight-percent" 
        v-for="layer in layers" :key="uid(layer)" 
        >
            <layer
            :backgroundColor="layer.background"
            :opacity="layer.opacity"
            :show="layer.show"
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
        layers: []
    }),
    created() {
        this.layers = this.tile.layers
    }
}
</script>