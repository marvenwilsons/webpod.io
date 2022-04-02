<template>
    <div style="min-width:250px;"   >
        <!-- eye | order of layer / name of layer | lock -->
        <section class="flex flexend" >
            <v-btn  @click="$emit('addNewLayer')" icon tile >
                <v-icon  class="pointer" >mdi-plus</v-icon>
            </v-btn>
        </section>
        <section style="background: #f5f5f5" class="paneBorder pad050 marginbottom125" >
            <drag-sort 
            @start="drag = true"
            @end="drag = false, doneDrag()"
            v-bind="dragOptions"
            v-model="list" 
            >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null" >
                    <div v-for="(layer) in list" :key="layer.layer_id" >
                        <!-- {{layer.layer_order}} -->
                        <!-- {{layer.layer_blocks}} -->
                        <!-- {{layer.layer_name}} -->
                        <!-- {{layer.layer_lock}} -->
                        <!-- {{layer.layer_show}} -->
                        <v-card outlined hover class="pad025 rounded-0 margintop025 pointer flex flexcol" >
                            <div class="flex pad025 flexcenter" >
                                <div class="flex1 fullheight-percent" >
                                    
                                    <div class=" padright050 flex" >
                                        <div style="min-width: 30px;" class="flex flexcenter flexstart" >
                                           <!-- <v-radio :ripple="false" ></v-radio> -->
                                            <v-icon @click="changeActiveLayer(layer.layer_name,layer.layer_id)" v-if="layer.active_layer != layer.layer_name" >mdi-radiobox-blank</v-icon>
                                            <v-icon v-if="layer.active_layer == layer.layer_name" >mdi-radiobox-marked</v-icon>
                                        </div>
                                        <input v-model="layer.layer_name" class="paneBorder fullwidth pad025 body-1 padleft050"  type="text" >
                                    </div>
                                    <v-expand-transition>
                                        <div class="deep-orange--text accent-3"  v-if="layer.layer_name.trim() === ''" >
                                            Layer name cannot be undefined
                                        </div>
                                    </v-expand-transition>
                                </div>
                                <div>
                                    <v-btn @click="layer.layer_show = false" icon v-if="layer.layer_show == true" >
                                        <v-icon  > mdi-eye-outline</v-icon>
                                    </v-btn>
                                    <v-btn @click="layer.layer_show = true" icon v-if="layer.layer_show == false" >
                                        <v-icon  > mdi-eye-off-outline</v-icon>
                                    </v-btn>
                                    
                                    <v-btn @click="$emit('deleteLayer',layer.layer_id)" icon >
                                        <v-icon  >mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn @click="blockEditorOpen ? blockEditorOpen = undefined : blockEditorOpen = layer.layer_id " icon >
                                        <v-icon  >mdi-view-sequential</v-icon>
                                    </v-btn>
                                    <v-btn :ripple="false" icon text >
                                        <v-icon>mdi-swap-vertical</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <!-- block editor -->
                            <v-expand-transition>
                                 <div v-if="blockEditorOpen == layer.layer_id" class="pad025 " >
                                     <div class="flex flexend" >
                                         <v-btn @click="$emit('addRowBlock',layer.layer_id)" text icon >
                                             <v-icon>mdi-plus</v-icon>
                                         </v-btn>
                                     </div>
                                     <div class="paneBorder pad050">
                                         <!-- rows -->
                                         <div class=" flex flexcenter" v-for="row in layer.layer_rows" :key="uid(row)" >
                                             <v-card outlined tile class=" fullwidth flex marginright025 " >
                                                 <!-- blocks -->
                                                <div class="flex " >
                                                    <v-card 
                                                    outlined
                                                    class="body-1 padleft050 padright050 flex1 pad025 layer-block-item" 
                                                    v-for="block in row.blocks"
                                                    :key="uid(block)"
                                                    tile
                                                    v-ripple
                                                    @click="$emit('blockClick', block)"
                                                    >
                                                        <!-- <block-menu  :block="block" ></block-menu> -->
                                                        <div @click="menu = block.id" class="flex flexcenter" >
                                                            <v-icon v-if="block.component_name == 'text'" >
                                                                mdi-format-text
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'image'" >
                                                                mdi-image
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'video'" >
                                                                mdi-video
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'app-instance'" >
                                                                mdi-application-brackets-outline
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'website'" >
                                                                mdi-web
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'youtube'" >
                                                                mdi-youtube
                                                            </v-icon>
                                                            <v-icon v-if="block.component_name == 'instagram'" >
                                                                mdi-instagram
                                                            </v-icon>
                                                        </div>
                                                    </v-card>
                                                </div>
                                             </v-card>
                                             <dropDown
                                                :options="blockItemOptions"
                                                @command="(cmd) => $emit('rowCmd', {cmd, target_id: row.row_id})"
                                            >
                                                
                                                <v-tooltip top >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn v-bind="attrs" v-on="on" text icon >
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Insert new row</span>
                                                </v-tooltip>
                                            </dropDown>
                                            <dropDown
                                                :options="[
                                                    {title: 'Clone & paste below', d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'}, 
                                                    {title: 'Wrap items', d: row.wrap_items == true ? 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' : ''}, 
                                                    {title: 'Inline Style', d: 'M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z'},
                                                    {title: 'Manage CSS Classes', d: 'M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z'},
                                                ]"
                                                @command="(cmd) => $emit('rowCmd', {cmd, target_id: row.row_id, payload: row})"
                                            >   
                                                <v-tooltip top >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn v-on="on" v-bind="attrs" text icon >
                                                            <v-icon>mdi-pencil</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Row options</span>
                                                </v-tooltip>
                                            </dropDown>
                                             <v-tooltip top >
                                                 <template v-slot:activator="{ on, attrs }">
                                                    <v-btn @click="$emit('rowCmd', {cmd: 'Delete row', target_id: row.row_id})" v-on="on" v-bind="attrs" icon text >
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>
                                                    Delete row
                                                </span>
                                             </v-tooltip>
                                         </div>
                                     </div>
                                 </div>
                            </v-expand-transition>
                        </v-card>
                    </div>
                </transition-group>
            </drag-sort>
        </section>
    </div>
</template>

<script>
import m from '@/m'
import blockMenu from './block-menu.vue'
export default {
    mixins: [m],
    props: ['layers','item'],
    components: {blockMenu},
    data: () => ({
        renaming: false,
        renameValue: undefined,
        drag: false,
        list: undefined,
        menu: false,
        blockEditorOpen: undefined,
        blockItemOptions: [
            {title: 'Insert text block', d: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z'},
            {title: 'Insert image block', d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'},
            {title: 'Insert video block', d: 'M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z'},
            {title: 'Insert app instance block', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
        ]
    }),
    watch: {
        layers() {
            // this.list  = this.layers
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    methods: {
        doneDrag() {
            this.$emit('orderChange', this.list)
        },
        changeActiveLayer(name,id) {
            this.$emit('changeActiveLayer', {
                target_name: name,
                target_id: id
            })
        },
    },
    mounted() {
        this.list = this.layers
    }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.layer-block-item:hover {
    background: #F5F5F5;
}
.v-tooltip__content {
    z-index: 800 !important;
}

</style>