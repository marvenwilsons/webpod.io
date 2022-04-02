<template>
    <div class="fullheight-percent overflow-y-auto" >
        <!-- menu content -->
        <div  class="pad125 fullheight-percen"  >
            <div class="flex spacebetween flexcenter marginbottom050">
                <div class="body-1 paneBorder pad025 padright050" style="background: #f5f5f5;">
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
                    {{block.component_name}}-block
                </div>
                <div class="" >
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}" >
                             <v-btn @click="$emit('deleteBlock')" v-on="on" v-bind="attrs"  icon text>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete this {{block.component_name}} block</span>
                    </v-tooltip>
                </div>
            </div>
            <!-- id -->
            
            <!-- native block properties -->
            <!-- inline style -->
            <div style="overflow: hidden; max-height: 200px;" class="margintop050 paneBorder" >
                <div class="flex " style="background: #f5f5f5;" >
                    <div @click="menu_nav = 'properties'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'properties' ? 'block-menu-nav--active' : '']" >Properties</div>
                    <div @click="menu_nav = 'inline style'"  v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'inline style' ? 'block-menu-nav--active' : '']">Inline Style</div>
                    <div @click="menu_nav = 'classes'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'classes' ? 'block-menu-nav--active' : '']">Classes</div>
                </div>
                <div v-if="menu_nav == 'properties'" >
                    <div class="body-2 flex flexcol flexcenter paneBorder" >
                        <!--  -->
                        <div style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                id
                            </div > 
                            <input v-model="block.id" class="flex2 fullwidth"  type="text">
                        </div>
                         <!--  -->
                        <div style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                text-value
                            </div > 
                            <input v-model="block.value" class="flex2 fullwidth"  type="text">
                        </div>

                    </div>
                </div>
                <div v-if="menu_nav == 'inline style'" >
                    <custom-css></custom-css>
                </div>
                <div v-if="menu_nav == 'classes'" >
                    classes
                </div>
            </div>
            <!-- classes -->
        </div>
    </div>
</template>

<script>
import customCss from './custom-css.vue'
export default {
    components: {customCss},
    props: ['block'],
    data: () => ({
        menu_nav: 'properties'
    })
}
</script>

<style>
.block-menu-nav:hover {
    background: lightgray !important;
}
.block-menu-nav--active {
    background: lightgray !important;
}
</style>