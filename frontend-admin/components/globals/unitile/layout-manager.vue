<template>
    <div style="width:400px;" >
        <!-- <div v-if="saveMode == false" >
            Select width variant for this layout
        </div> -->
        <!-- add -->
        <div v-if="saveMode == false" class="flex flexend" >
            <v-btn @click="addLayoutRangeEntry" icon >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <v-expand-transition>
            <div v-if="addLayoutRangeForm.show" class=" rounded pad025 marginbottom050" >
            <div class="padtop050" >
                <v-text-field
                class="marginleft050 marginright050"
                label="Minimum Width"
                type="number"
                />
                <v-text-field
                class="marginleft050 marginright050"
                label="Maximum Width"
                type="number"
                />
            </div>
            <div class="flex flexend" >
                <v-btn @click="closeLayoutRangeForm" icon > <v-icon>mdi-close</v-icon> </v-btn>
                <v-btn icon > <v-icon>mdi-plus</v-icon> </v-btn>
            </div>
        </div>
        </v-expand-transition>
        <!-- representation -->
        <div v-if="saveMode == false" style="min-height: 50px; gap: 3px;" 
        class="flex paneBorder flexcol pad050 rounded" >
            <v-card  v-ripple v-for="(layout,index) in layouts" :key="index"
            :class="['flex flexcenter pointer light-blue darken-4 pad125']"
            :style="{ minWidth: '50px'}"
            >
                <div class="flex fullheight-percent flexcol white--text" >
                    <div class="flex spacebetween marginbottom025" >
                        <div>
                            <strong>{{layout != 'default' ? `${layout}px` : 'Default'}}</strong>
                            <div v-if="layout != 'default'" class="caption" >Layout for {{layout}}px screen width</div>
                        </div>
                        <dropDown
                            @command="(title) => handleCmd(title,layout)"
                            :options="
                            layout != 'default' ?
                            [
                                {title: 'Remove', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
                                {title: 'Update range'},
                                {title: 'Copy layout content'},
                            ] :
                            [
                                {title: 'Copy trigger layout content'},
                            ]"
                        >
                            <v-btn small icon >
                                <v-icon color="white" >mdi-dots-vertical</v-icon>
                            </v-btn>
                        </dropDown>
                    </div>
                </div>
            </v-card>
        </div>
        <!-- representation save options -->
        <div v-if="saveMode == true" style="min-height: 50px; gap: 3px;" 
        class="flex paneBorder flexcol pad025" >
            <v-card @click="handleCmd('Save layout', layout)"  v-ripple v-for="(layout,index) in layouts" :key="index"
            :class="['flex flexcenter pointer light-blue darken-4 pad125']"
            :style="{ minWidth: '50px'}"
            >
                <div style="font-family: 'Menlo'" class="flex fullheight-percent flexcol white--text" >
                    <div class="flex spacebetween marginbottom025" >
                        <div>
                            <strong>{{layout != 'default' ? `${layout}px` : 'Default'}}</strong>
                            <div v-if="layout != 'default'" class="caption" >Layout for {{layout}}px screen width</div>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
        <!-- list -->
        <div></div>
    </div>
</template>

<script>
import layoutUtils from './mixins/layouts'
export default {
    props: ['screenLayoutRanges'],
    data: () => ({
        layouts: [],
        errorMsg: null,
        saveMode: false,
        ready: false,
        addLayoutRangeForm: {
            show: false,
            minWidth: undefined,
            maxWidth: undefined
        }
    }),
    mounted() {
        this.initializedLayout()        
    },
    watch: {
        screenLayoutRanges() {
            this.initializedLayout()        
        }
    },
    methods: {
        initializedLayout() {
            const layoutKeys = layoutUtils.getLayoutKeys(this.screenLayoutRanges)
            const layoutRanges = layoutUtils.constructLayoutRange(layoutKeys.max).maxMin
            layoutRanges[0] = 'default'

            this.layouts = layoutRanges
        },
        addLayoutRangeEntry() {
            this.$set(this.addLayoutRangeForm,'show',true)
            // const prsElement = document.getElementById('prs')
            // const selectedWidth = parseInt(prsElement.textContent)
            // if(prsElement.textContent != 'N/A') {
            //     webpod.dash.modal.setData({
            //         name: 'createLayoutScreen',
            //         payload: selectedWidth
            //     })
            // } else {
            //     webpod.dash.bottomAlert(`new entry should have lower width than current fullwidth value`)
            // }
        },
        closeLayoutRangeForm() {
            this.$set(this.addLayoutRangeForm,'show',false)
        },
        updateWidth() {
            const selectedWidth = document.getElementById('prs').textContent
            if(selectedWidth != 'N/A') {
                const v = parseInt(selectedWidth)
            }
        },
        handleCmd(commandTitle,layout) {
            if(commandTitle == 'Update trigger') {
                this.updateWidth()
            }

            if(commandTitle == 'Remove') {
                webpod.dash.modal.setData({
                    name: 'dropLayout',
                    payload: layout
                })
                // for(let i = 0; i < this.layouts.length; i++) {
                //     if(this.layouts[i] == layout) {
                //         this.layouts.splice(i,1)
                //         break
                //     }
                // }
            }

            if(commandTitle == 'Copy trigger layout content') {
                console.log('copy trigger content')
            }

            if(commandTitle == 'Save layout') {
                webpod.dash.modal.setData({
                    name: 'saveLayout',
                    payload: layout
                })
            }
        }
    }
}
</script>
