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
                        <!-- text -->
                        <div v-if="block.component_name == 'text'" >
                            <span :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </span>
                        </div>
                        <!-- heading -->
                         <div v-if="block.component_name == 'heading'" >
                            <h1 v-if="block.level == 'h1'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h1>
                            <h2 v-if="block.level == 'h2'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h2>
                            <h3 v-if="block.level == 'h3'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h3>
                            <h4 v-if="block.level == 'h4'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h4>
                            <h5 v-if="block.level == 'h5'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h5>
                            <h6 v-if="block.level == 'h6'" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                                {{block.value}}
                            </h6>
                        </div>
                        <!-- rich text -->
                        <div v-if="block.component_name == 'rich text'" >

                            <p v-html="block.value" :style="{...block.custom_inline_style}" :class="[...block.classes]" >
                            </p>
                        </div>
                        <!-- img -->
                        <div v-if="block.component_name == 'image'" >
                            <v-icon>mdi-image-area</v-icon>
                            <img 
                                v-if="block.value" 
                                :src="block.value" 
                                :alt="block.alt"
                                :style="{...block.custom_inline_style}" :class="[...block.classes]"
                                :crossorigin="'anonymous'"
                            >
                        </div>
                        <!-- video -->
                        <div v-if="block.component_name == 'video'" >
                            <v-icon>mdi-video-area</v-icon>
                            <!-- <video 
                                v-if="block.value" 
                                preload
                                :alt="block.alt"
                                :style="{...block.custom_inline_style}" :class="[...block.classes]"
                                :crossorigin="'anonymous'"
                            >
                                <source :src="block.value" type="video/mp4">
                            </video> -->
                            <embed 
                                v-if="block.value" 
                                :src="block.value" 
                                :alt="block.alt"
                                :style="{...block.custom_inline_style}" :class="[...block.classes]"
                                :crossorigin="'anonymous'"
                            >
                        </div>
                        <!-- instagram -->
                        <div v-if="block.component_name == 'instagram'" >
                            <instagram 
                                v-if="block.value"
                                :instaLink="block.value"
                            />
                        </div>
                        <!-- twitter -->
                        <div v-if="block.component_name == 'twitter'" >
                            <twitter 
                                v-if="block.value"
                                :embedCode="block.value"
                            />
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
import instagram from './instagram.vue'
import twitter from './twitter.vue'

export default {
    mixins: [m],
    props: ['tile'],
    components: {layer, elementBlock, instagram, twitter},
    data: () => ({
        layers: [],
    }),
    created() {
        this.layers = this.tile.layers
    },
}
</script>