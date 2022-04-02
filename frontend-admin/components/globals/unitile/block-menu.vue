<template>
    <v-menu  bottom offset-x :nudge-width="'160'" :close-on-content-click="false">
        <!-- block display -->
        <template v-slot:activator="{ on, attrs }" >
            <div @click="menu = block.id" v-bind="attrs" v-on="on" class="flex flexcenter" >
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
        </template>
        <!-- menu content -->
        <v-card style="min-width:400px;" class="pad125" :elavation="5" outlined >
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
                    <v-btn  icon text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
                                Id
                            </div > 
                            <input v-model="block.id" class="flex2 fullwidth"  type="text">
                        </div>
                         <!--  -->
                        <div style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                Id
                            </div > 
                            <input v-model="block.id" class="flex2 fullwidth"  type="text">
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
        </v-card>
    </v-menu>
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