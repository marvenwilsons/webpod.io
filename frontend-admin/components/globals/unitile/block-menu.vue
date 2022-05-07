<template>
    <div id="block-menu" class="fullheight-percent overflow-y-auto" >
        <!-- menu content -->
        <div  class="pad125 fullheight-percen"  >
            <!-- block info -->
            <div class="flex spacebetween flexcenter marginbottom050">
                <div class="body-1 borderRad4 pad025 padright050" style="background: #f5f5f5;">
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
                <!-- right side heading buttons -->
                <div>
                    <div class="flex" >
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}" >
                                <v-btn @click="copyBlockContent(block)" v-on="on" v-bind="attrs"  icon text>
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-btn>
                            </template>
                            <span>Copy block content</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}" >
                                <v-btn @click="openImportContentWindow()" v-on="on" v-bind="attrs"  icon text>
                                    <v-icon>mdi-import</v-icon>
                                </v-btn>
                            </template>
                            <span>Import block content</span>
                        </v-tooltip>

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
                </div>
            </div>
            <v-card class="pad050 flex flexcol" v-if="openImportBlockContentWindow" >
                <div class="caption" >
                    Copied block content string is auto pasted below. <br> <br>
                    To avoid weird results please avoid editing the <em>"auto pasted block content"</em> unless you know what you're doing.
                    <br> <br>
                </div>
                <div class="flex flexend flexcenter" >
                   <div class="marginright050" >Auto assign unique block id </div>
                   <v-switch v-model="autoAssignUniqueId" x-small ></v-switch>
                </div>
                <textarea style="resize:none; height:100px; font-family:Menlo;" class="paneBorder fullwidth pad050 code" v-model="importedBlockContent"></textarea>
                <div class=" text-err caption" v-if="importBlockContentError" >
                    {{importBlockContentError}}
                </div>
                <div class="flex flexend">
                    <v-btn small @click="cancelBlockImport" class="marginright050" >cancel</v-btn>
                    <v-btn small @click="saveAndValidatedBlockContent" >validate & save</v-btn>
                </div>
            </v-card>
            <!-- block editor -->
            <v-card v-if="!openImportBlockContentWindow" elevation="0"  class="margintop050" >
                <!-- main block tab navs -->
                <div class="flex marginbottom050"  >
                    <div @click="menu_nav = 'properties'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav caption marginright025 rounded-lg', menu_nav == 'properties' ? 'block-menu-nav--active' : '']" >Properties</div>
                    <div @click="menu_nav = 'inline style'"  v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav caption marginright025 rounded-lg', menu_nav == 'inline style' ? 'block-menu-nav--active' : '']">Inline Style</div>
                    <div @click="menu_nav = 'classes'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav caption marginright025 rounded-lg', menu_nav == 'classes' ? 'block-menu-nav--active' : '']">Classes</div>
                    <div @click="menu_nav = 'animation'" v-ripple :class="['body-2 paneBorder pad025 padleft050 padright050 pointer block-menu-nav caption rounded-lg', menu_nav == 'animation' ? 'block-menu-nav--active' : '']">Animation</div>
                </div>
                <!-- properties tab -->
                <div v-if="menu_nav == 'properties'" >
                    <div  class="body-2 flex flexcol flexcenter paneBorder rounded-lg overflow-hidden" >
                        <!-- id -->
                        <div style="border-bottom:1px solid lightgray;" class="flex flexcenter flexend fullwidth" >
                            <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                id
                            </div > 
                            <input v-model="block.id" class="flex2 fullwidth"  type="text">
                        </div>
                        <!-- text -->
                        <div v-if="block.component_name == 'text'"  class="flex flexcol flexend fullwidth" >
                            <div class="flex"  >
                                <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                    text-value
                                </div > 
                                <input v-model="block.value" class="flex2 fullwidth"  type="text">
                            </div>
                        </div>
                        <!-- rich text -->
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
                        <!-- heading -->
                         <div v-if="block.component_name == 'heading'"  class="flex flexcol flexend fullwidth" >
                            <div class="flex" style="border-bottom:1px solid lightgray;" >
                                <div style="border-right:1px solid lightgray; max-width:110px; min-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                    level
                                </div > 
                                <div class="flex padright050 flexwrap pad025" >
                                    <v-btn v-for="h in (['h1','h2','h3','h4','h5','h6'])" 
                                    :key="h"
                                    @click="block.level = h" :class="['rounded-lg', block.level == h ? 'grey lighten-3' : '' ]" icon   >
                                        {{h}}
                                    </v-btn>
                                </div>
                                <!-- <input v-model="block.value" class="flex2 fullwidth"  type="text"> -->
                            </div>
                            <div class="flex">
                                <div style="border-right:1px solid lightgray; max-width:110px;" class="caption padright050 padtop025 padbottom025 marginright050 flex flexend" >
                                    text
                                </div > 
                                <input v-model="block.value" class="flex2 fullwidth"  type="text">
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
            </v-card>
            <!-- classes -->
        </div>
    </div>
</template>

<script>
import customCss from './custom-css.vue'
import customClasses from './cutom-classes.vue'
import pBlock from './block-menu/p-block.vue'
import TiptapEditor from './rich-text-editor/TiptapEditor.vue'
import m from '@/m'
export default {
    components: {customCss, customClasses, pBlock, TiptapEditor },
    props: ['block'],
    mixins: [m],
    data: () => ({
        menu_nav: 'properties',
        animation_nav: 'load',
        block_inline_style: {},
        block_value: undefined,
        // Importing block content data
        openImportBlockContentWindow: false,
        importedBlockContent: undefined,
        importBlockContentError: undefined,
        autoAssignUniqueId: true,
        copiedBlockValue: undefined
    }),
    methods: {
        apllyBlockInlineStyle(css) {
            this.block_inline_style = css
            this.block.custom_inline_style = css
        },
        applyBlockCustomClasses(c){

        },
        copyBlockContent(block) {
            webpod.dash.temp = JSON.stringify(block)
            // navigator.clipboard.writeText(JSON.stringify(block))

            webpod.dash.bottomAlert('Block content copied!')
        },
        // Importing block content methods
        openImportContentWindow() {
            this.openImportBlockContentWindow = true
            this.copiedBlockValue = webpod.dash.temp

            if(this.copiedBlockValue != undefined) {
                this.importedBlockContent = this.copiedBlockValue
                webpod.dash.bottomAlert('Block content pasted successfully!')
                setTimeout(() => {                           
                    webpod.dash.temp = null
                },100)
            }
        },
        validateBlockContent() {
            try {
                const block = JSON.parse(`${this.importedBlockContent}`)
                const blockKeys = Object.keys(block)
                if(blockKeys.includes('id') && blockKeys.includes('classes') && blockKeys.includes('custom_inline_style') && blockKeys.includes('component_name')) {
                    console.log('yep all important keys are there')
                    block.id = this.uid()
                    this.$emit('onImportBlock', block)
                    this.$nextTick(() => {
                        this.cancelBlockImport()
                    })
                }
            } catch(err) {
                this.importBlockContentError = 'Invalid block string entry'
            }
        },
        saveAndValidatedBlockContent() {
            this.validateBlockContent()
        },
        cancelBlockImport() {
            this.openImportBlockContentWindow = false
            this.importedBlockContent = undefined,
            this.importBlockContentError = undefined
        }
        // end
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
    background: #EEEEEE !important;
     /* -webkit-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    -moz-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572); */

}
.block-menu-nav--active {
    background: #EEEEEE !important;
    /* -webkit-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    -moz-box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572);
    box-shadow: inset 0px 0px 9px 3px rgba(133, 133, 133, 0.572); */
}
</style>