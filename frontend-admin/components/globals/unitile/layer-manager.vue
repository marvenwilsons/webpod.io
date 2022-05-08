<template>
    <div style="min-width:250px;"   >
        <!-- eye | order of layer / name of layer | lock -->
        <section class="flex flexend" >
            <v-tooltip top >
                <template  v-slot:activator="{on, attrs}" >
                    <v-btn @click="$emit('openLayerAndBlockcontroller')" v-bind="attrs" v-on="on"  icon tile >
                        <v-icon>mdi-code-parentheses</v-icon>
                    </v-btn>
                </template>
                <span>Layer & block controller</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{on, attrs}" >
                    <v-btn v-on="on" v-bind="attrs" @click="$emit('addNewLayer')" icon tile >
                        <v-icon  class="pointer" >mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>
                    Add new layer
                </span>
            </v-tooltip>
            
        </section>
        <section style="background: #f5f5f5 " class="paneBorder rounded-lg pad050 marginbottom125 " >
            <drag-sort 
            @start="drag = true"
            @end="drag = false, doneDrag()"
            v-bind="dragOptions"
            v-model="list" 
            :handle="'.drag-handle'"
            >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null" >
                    <div  v-for="layer in list" :key="layer.layer_id" >
                        <v-card outlined hover  class="pad025 rounded-0 margintop025 pointer flex flexcol rounded-lg" >
                            <!-- layer name and active button -->
                            <div class="flex pad025 flexcenter" >
                                <div class="flex1 fullheight-percent" >
                                    
                                    <div class=" padright050 flex" >
                                        <div style="min-width: 30px;" class="flex flexcenter flexstart" >
                                           <!-- <v-radio :ripple="false" ></v-radio> -->
                                            <v-icon @click="changeActiveLayer(layer.layer_name,layer.layer_id)" v-if="layer.active_layer != layer.layer_name" >mdi-radiobox-blank</v-icon>
                                            <v-icon v-if="layer.active_layer == layer.layer_name" >mdi-radiobox-marked</v-icon>
                                        </div>
                                        <input v-model="layer.layer_name" class="paneBorder borderRad4 fullwidth pad025 body-1 padleft050"  type="text" >
                                    </div>
                                    <v-expand-transition>
                                        <div class="deep-orange--text accent-3"  v-if="layer.layer_name.trim() === ''" >
                                            Layer name cannot be undefined
                                        </div>
                                    </v-expand-transition>
                                </div>
                                <!-- layer side controlls -->
                                <div>
                                    <v-tooltip top>
                                        <template v-slot:activator="{on,attrs}" >
                                            <span v-bind="attrs" v-on="on"  >
                                                <v-btn @click="layer.layer_show = false" icon v-if="layer.layer_show == true" >
                                                <v-icon  > mdi-eye-outline</v-icon>
                                            </v-btn>
                                            <v-btn @click="layer.layer_show = true" icon v-if="layer.layer_show == false" >
                                                <v-icon  > mdi-eye-off-outline</v-icon>
                                            </v-btn>
                                            </span>
                                        </template>
                                        <span>Toggle layer visibility</span>
                                    </v-tooltip>
                                    
                                    
                                    <v-tooltip top>
                                        <template v-slot:activator="{on,attrs}">
                                            <v-btn v-bind="attrs" v-on="on" @click="$emit('deleteLayer',layer.layer_id)" icon >
                                                <v-icon  >mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Delete this layer </span>
                                    </v-tooltip>
                                    
                                    <v-tooltip top>
                                        <template v-slot:activator="{on, attrs}" >
                                            <v-btn class="drag-handle" v-bind="attrs" v-on="on" @click="blockEditorOpen == layer.layer_id ? blockEditorOpen = undefined : blockEditorOpen = layer.layer_id " icon >
                                                <v-icon  >mdi-view-sequential</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Open Layer and row options / drag handle</span>
                                    </v-tooltip>
                                    
                                    <!-- <v-btn :ripple="false" icon text >
                                        <v-icon>mdi-swap-vertical</v-icon>
                                    </v-btn> -->
                                </div>
                            </div>
                            <!-- block editor -->
                                 <div v-if="blockEditorOpen == layer.layer_id" class="pad025 " >
                                     <div class="flex flexend" >
                                        <v-tooltip top >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn  @click="$emit('addRowBlock',layer.layer_id)" v-bind="attrs" v-on="on" text icon tile >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Insert new row block</span>
                                        </v-tooltip>
                                     </div>
                                     <div class=" ">
                                         <!-- rows -->
                                        <drag-sort
                                        v-bind="dragOptions"
                                        v-model="layer.layer_rows" 
                                        :handle="'.drag-handle'"
                                        >
                                             <div class=" flex flexcenter margintop025" v-for="(row, rowIndex) in layer.layer_rows" :key="uid(row)" >
                                                <v-card v-if="row != undefined"  tile class=" fullwidth flex marginright025 pad050 rounded-lg" >
                                                    <div class="flex flexcenter spacebetween" >
                                                        <div class="caption" > <v-chip small >Layer row {{rowIndex + 1}} </v-chip> </div>
                                                        <div class="marginbottom025" >
                                                            <v-btn class="drag-handle" icon >
                                                                <v-icon>mdi-arrow-all</v-icon>
                                                            </v-btn>
                                                            <!-- row method insert row block -->
                                                            <dropDown
                                                                :options="blockItemOptions"
                                                                :divideOptionsBefore="['Insert image block','Insert app instance block','Insert youtube video']"
                                                                @command="(cmd) => $emit('rowCmd', {cmd, target_id: row.row_id})"
                                                            >
                                                                
                                                                <v-tooltip top >
                                                                    <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn v-bind="attrs" v-on="on" text icon >
                                                                            <v-icon>mdi-plus</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <span>Insert element block to this row</span>
                                                                </v-tooltip>
                                                            </dropDown>
                                                            <!-- row method, display row options -->
                                                            <dropDown
                                                                :options="[
                                                                    {title: 'Clone this row', d: 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'}, 
                                                                    {title: 'Wrap items', d: row != undefined && row.wrap_items == true ? 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' : ''}, 
                                                                    {title: 'Inline Style', d: 'M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z'},
                                                                    {title: 'CSS Classes', d: 'M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z'},
                                                                ]"
                                                                @command="(cmd) => $emit('rowCmd', {cmd, target_id: row.row_id, payload: {row,layer} })"
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
                                                            <!-- row method, delete row -->
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
                                                    <!-- blocks -->
                                                    <div class="flex" style="gap:2px;" >
                                                        <drag-sort
                                                         v-model="row.blocks"
                                                         class="flex">
                                                             <v-card
                                                            :ripple="false" 
                                                            outlined
                                                            class="body-1 padleft050 padright050 flex1 pad025 layer-block-item rounded-lg"
                                                            :style="{background: selectedBlock.id == block.id ? '#EEEEEE' : ''}"
                                                            v-for="block in row.blocks"
                                                            :key="uid(block)"
                                                            tile
                                                            @click="blockClick(block,row)"
                                                            >
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
                                                                    <v-icon v-if="block.component_name == 'twitter'" >
                                                                        mdi-twitter
                                                                    </v-icon>
                                                                    <v-icon v-if="block.component_name == 'iframe'" >
                                                                        mdi-application-parentheses-outline
                                                                    </v-icon>
                                                                    <v-icon v-if="block.component_name == 'rich text'" >
                                                                        mdi-format-paragraph
                                                                    </v-icon>
                                                                    <v-icon v-if="block.component_name == 'heading'" >
                                                                        mdi-format-header-pound
                                                                    </v-icon>
                                                                </div>
                                                            </v-card>
                                                        </drag-sort>
                                                    <div class="pat-1 fullwidth" style="min-height:30px;" v-if="row.blocks.length == 0" ></div>
                                                    </div>
                                                </v-card>
                                            </div>
                                         </drag-sort>
                                         <div class="pat-1" style="min-height:30px;" v-if="layer.layer_rows.length == 0" >
                                         </div>
                                     </div>
                                 </div>
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
        selectedBlock: '',
        renaming: false,
        renameValue: undefined,
        drag: false,
        list: undefined,
        menu: false,
        blockEditorOpen: undefined,
        blockItemOptions: [
            {title: 'Insert text block', d: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z'},
            {title: 'Insert rich text', d: 'M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z'},
            {title: 'Insert heading block', d: 'M3,4H5V10H9V4H11V18H9V12H5V18H3V4M13,8H15.31L15.63,5H17.63L17.31,8H19.31L19.63,5H21.63L21.31,8H23V10H21.1L20.9,12H23V14H20.69L20.37,17H18.37L18.69,14H16.69L16.37,17H14.37L14.69,14H13V12H14.9L15.1,10H13V8M17.1,10L16.9,12H18.9L19.1,10H17.1Z'},
            {title: 'Insert image block', d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'},
            {title: 'Insert video block', d: 'M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z'},
            {title: 'Insert youtube video', d: 'M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z'},
            {title: 'Insert instagram feed', d: 'M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z'},
            {title: 'Insert twitter feed', d: 'M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z'},
            {title: 'Insert iframe block', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20M15.6 8C17.1 9.3 18 11.1 18 13C18 14.9 17.1 16.7 15.6 18L14 17.4C15.3 16.4 16 14.7 16 13S15.3 9.6 14 8.6L15.6 8M8.4 8L10 8.6C8.7 9.6 8 11.3 8 13S8.7 16.4 10 17.4L8.4 18C6.9 16.7 6 14.9 6 13S6.9 9.3 8.4 8Z'},
            {title: 'Insert app instance block', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
        ]
    }),
    watch: {
        layers() {
            this.list  = this.layers
            console.log('layers changed!')
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
        blockClick(block,row) {
            this.selectedBlock = block
            this.$emit('blockClick', {block,row})
        }
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
.pat-1 {
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='15' height='15' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(141)'%3E%3Crect width='100%25' height='100%25' fill='rgba(247, 250, 252,1)'/%3E%3Cpath d='M-10 30h60v11h-60zM-10-10h60v11h-60' fill='rgba(226, 232, 240,1)'/%3E%3Cpath d='M-10 11h60v12h-60zM-10-29h60v12h-60z' fill='rgba(247, 250, 252,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")
}
.pat-2 {
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='15' height='15' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(141)'%3E%3Crect width='100%25' height='100%25' fill='rgba(247, 250, 252,1)'/%3E%3Cpath d='M-20 15.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20-24.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20 55.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z ' fill='rgba(226, 232, 240,1)'/%3E%3Cpath d='M-19 36l20-20l20 20l20-20l20 20l20-20l20 20v-12l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-19-4l20-20l20 20l20-20l20 20l20-20l20 20v-12l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-19 76l20-20l20 20l20-20l20 20l20-20l20 20v-12l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z ' fill='rgba(247, 250, 252,1)'/%3E%3Cpath d='M-20 35.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20-4.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20 75.5l20-20l20 20l20-20l20 20l20-20l20 20v-11l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z ' fill='rgba(226, 232, 240,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")
}

</style>