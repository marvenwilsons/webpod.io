<template>
    <div id="block-menu" class="fullheight-percent overflow-y-auto" >
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
                    <v-icon v-if="block.component_name == 'twitter'" >
                        mdi-twitter
                    </v-icon>
                    <v-icon v-if="block.component_name == 'rich text'" >
                        mdi-format-paragraph
                    </v-icon>
                    <v-icon v-if="block.component_name == 'heading'" >
                        mdi-format-header-pound
                    </v-icon>
                    {{block.component_name}}-block
                </div>
                <div class="" >
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}" >
                             <v-btn @click="$emit('deleteBlock', block)" v-on="on" v-bind="attrs"  icon text>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete this {{block.component_name}} block</span>
                    </v-tooltip>
                </div>
            </div>
            <!-- block editor -->
            <div  class="margintop050 paneBorder" >
                <!-- main block tab navs -->
                <div class="flex " style="background: #f5f5f5;" >
                    <div @click="menu_nav = 'properties'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'properties' ? 'block-menu-nav--active' : '']" >Properties</div>
                    <div @click="menu_nav = 'inline style'"  v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'inline style' ? 'block-menu-nav--active' : '']">Inline Style</div>
                    <div @click="menu_nav = 'classes'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'classes' ? 'block-menu-nav--active' : '']">Classes</div>
                    <div @click="menu_nav = 'animation'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', menu_nav == 'animation' ? 'block-menu-nav--active' : '']">Animation</div>
                </div>
                <!-- properties tab -->
                <div v-if="menu_nav == 'properties'" >
                    <div  class="body-2 flex flexcol flexcenter paneBorder" >
                        <!-- id -->
                        <div style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                id
                            </div > 
                            <input v-model="block.id" class="flex2 fullwidth"  type="text">
                        </div>
                        <!-- text -->
                        <div v-if="block.component_name == 'text'" style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                text-value
                            </div > 
                            <input v-model="block.value" class="flex2 fullwidth"  type="text">
                        </div>
                        <!-- paragraph -->
                        <div v-if="block.component_name == 'rich text'" style="border-bottom:1px solid lightgray; align-items: stretch;" class="flex flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px; align-items:center" class="caption padright050 padtop025 padbottom025  flex flexend" >
                                text-value
                            </div > 
                            <div class="flex2 pad050">
                                <tiptap-editor
                                @contentChange="(v) => block.value = v"
                                :content="block.value"
                                ></tiptap-editor>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padbottom125" v-if="menu_nav == 'inline style'" >
                    <custom-css
                    ref="block_inline_style"
                    @change="apllyBlockInlineStyle"
                    :cssObject="block_inline_style"
                    :el_id="`#${block.id}`" 
                    />
                </div>
                <div class="padbottom125" v-if="menu_nav == 'classes'" >
                    <custom-classes
                    ref="classEditor"
                    />
                </div>
                <div class="padbottom125" v-if="menu_nav == 'animation'"  >
                    <div class="flex"  style="background: #f5f5f5; border-top: 1px solid lightgray;" >
                        <div @click="animation_nav = 'load'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', animation_nav == 'load' ? 'block-menu-nav--active' : '']">Load</div>
                        <div @click="animation_nav = 'leave'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', animation_nav == 'leave' ? 'block-menu-nav--active' : '']">Leave</div>
                        <div @click="animation_nav = 'hover'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', animation_nav == 'hover' ? 'block-menu-nav--active' : '']">Hover</div>
                        <div @click="animation_nav = 'click'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav', animation_nav == 'click' ? 'block-menu-nav--active' : '']">Click</div>
                    </div>
                    <div v-if="animation_nav == 'load'" class="pad025" >
                        Load animations <br>
                        - fade-in <br>
                        - slide-in-from-top <br>
                        - slide-in-from-left <br>
                        - slide-in-from-right <br>
                        - slide-in-from-bottom <br>
                        - scale-in-from-top <br>
                        - scale-in-from-left <br>
                        - scale-in-from-right <br>
                        - scale-in-from-bottom <br>
                    </div>
                    <div v-if="animation_nav == 'leave'" class="pad025" >
                        Load animations <br>
                        - fade-in <br>
                        - slide-in-from-top <br>
                        - slide-in-from-left <br>
                        - slide-in-from-right <br>
                        - slide-in-from-bottom <br>
                    </div>
                </div>
            </div>
            <!-- classes -->
        </div>
    </div>
</template>

<script>
import customCss from './custom-css.vue'
import customClasses from './cutom-classes.vue'
import pBlock from './block-menu/p-block.vue'
import TiptapEditor from './rich-text-editor/TiptapEditor.vue'
export default {
    components: {customCss, customClasses, pBlock, TiptapEditor },
    props: ['block'],
    data: () => ({
        menu_nav: 'properties',
        animation_nav: 'load',
        block_inline_style: {},
        block_value: undefined
    }),
    methods: {
        apllyBlockInlineStyle(css) {
            this.block_inline_style = css
            this.block.custom_inline_style = css
        },
        applyBlockCustomClasses(c){

        },
    },
    watch: {
        menu_nav(n) {
            if(n == 'classes') {
                this.$nextTick(()=> {
                    this.$refs.classEditor.setClasses(this.block.classes)
                    this.$refs.classEditor.onData = (c) => {
                        this.block.classes = c
                    }
                })
            }
        }
    },
    mounted(){
        this.block_inline_style = this.block.custom_inline_style
        this.block_value = this.block.value
    }
}
</script>

<style>
.block-menu-nav:hover {
    background: lightgray !important;
     /* -webkit-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    -moz-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572); */

}
.block-menu-nav--active {
    background: lightgray !important;
    /* -webkit-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    -moz-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572); */
}
</style>