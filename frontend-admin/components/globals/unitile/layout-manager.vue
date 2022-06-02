<template>
    <div style="width:400px;" >
        <!-- add -->
        <div v-if="saveMode == false" class="flex flexend" >
            <v-tabs v-model="tab" >
                <v-tab>Layout ranges list</v-tab>
                <v-tab>Add new range</v-tab>
                <v-tab>Layout snapshots</v-tab>
            </v-tabs>
        </div> 
        <div v-if="tab == 1" class=" rounded pad025 marginbottom050" >
            <div class="padtop050" >
                <v-text-field
                class="marginleft050 marginright050"
                label="Maximum Range"
                type="number"
                v-model="addLayoutRangeForm.maxWidth"
                :hint="addLayoutRangeForm.hint"
                persistent-hint
                :error="addLayoutRangeForm.error ? true : false"
                :error-messages="addLayoutRangeForm.error"
                />
            </div>
            <div class="flex flexend" >
                <v-btn @click="closeLayoutRangeForm" icon > <v-icon>mdi-close</v-icon> </v-btn>
                <v-btn icon @click="createNewRange" > <v-icon>mdi-arrow-right</v-icon> </v-btn>
            </div>
        </div>
        <!-- representation -->
        <div v-if="saveMode == false && tab == 0" style="min-height: 50px; gap: 3px;" 
        class="flex paneBorder flexcol pad050 rounded" >
            <v-card v-for="(layout,index) in layouts" :key="index"
            :class="['flex flexcenter pointer light-blue darken-4 pad125']"
            :style="{ minWidth: '50px'}"
            >
                <div class="flex fullheight-percent flexcol white--text" >
                    <div class="flex spacebetween marginbottom025" >
                        <div>
                            <strong>{{`From ${layout.replace('-',' to ')}px`}}</strong>
                            <div v-if="layout != 'default'" class="caption" >Layout for {{layout}}px screen width</div>
                        </div>
                        <dropDown
                            v-if="index != 0"
                            @command="(title) => handleCmd(title,layout,index)"
                            :options="[
                                {title: 'Remove', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
                                {title: 'Update range'},
                            ]"
                        >
                            <v-btn small icon >
                                <v-icon color="white" >mdi-dots-vertical</v-icon>
                            </v-btn>
                        </dropDown>
                    </div>
                    <v-expand-transition>
                        <v-card v-if="updateRangeForm.key == layout" 
                            :class="['padtop050', updateRangeForm.error ? 'err_shake' : '']" 
                        >
                            <v-text-field
                            class="marginleft050 marginright050 "
                            label="Maximum Width"
                            :type="index == 0 ? 'text' : 'number'"
                            :value="index == 0 ? 'Ininity' : updateRangeForm.maxWidth"
                            v-model="updateRangeForm.maxWidth"
                            :disabled="index == 0 ? true : false"
                            :error="updateRangeForm.error ? true : false"
                            :error-messages="updateRangeForm.error"
                            />
                            <div class="flex flexend padright050 padbottom050" >
                                <v-btn @click="updateRangeForm.key = undefined" icon >
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-btn :loading="updateRangeForm.loading" @click="validatedAndAlterRange(index,layout)" icon >
                                    <v-icon>mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                        </v-card>
                    </v-expand-transition>
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
        tab: undefined,
        addLayoutRangeForm: {
            maxWidth: undefined,
            hint: undefined,
            error: undefined
        },
        updateRangeForm: {
            maxWidth: undefined,
            key: undefined,
            index: undefined,
            loading: false,
            error: undefined
        }
    }),
    mounted() {
        this.initializedLayout()        
    },
    watch: {
        screenLayoutRanges() {
            this.initializedLayout()        
        },
        tab(n) {
            if(n == 1) {
                const latestMinimumRange = parseFloat(this.layouts[this.layouts.length - 1].split('-')[0])
                this.$set(this.addLayoutRangeForm,'maxWidth', latestMinimumRange - 1)
                this.$set(this.addLayoutRangeForm,'hint', `Input a number below ${latestMinimumRange - 1} only`)
            }
        },
        'addLayoutRangeForm.maxWidth'(n) {
            const latestMinimumRange = parseFloat(this.layouts[this.layouts.length - 1].split('-')[0])
            if(n >= latestMinimumRange) {
                this.addLayoutRangeForm.error = `Value cannot go above or equal ${latestMinimumRange}`
                this.$nextTick(() => {
                    this.$set(this.addLayoutRangeForm,'maxWidth', latestMinimumRange - 1)
                })
            } else {
                this.addLayoutRangeForm.error = undefined
            }
        },  
        'updateRangeForm.key'(n) {
            if(n == undefined) {
                this.$set(this.updateRangeForm,'error',undefined)
                this.$set(this.updateRangeForm,'loading',false)
            }
        }
        
    },
    methods: {
        initializedLayout() {
            const layoutKeys = layoutUtils.getLayoutKeys(this.screenLayoutRanges)
            const layoutRanges = layoutUtils.constructLayoutRange(layoutKeys.max).maxMin

            this.layouts = layoutRanges
        },
        addLayoutRangeEntry() {
            // show form
            this.$set(this.addLayoutRangeForm,'show',true)
        },
        validatedAndAlterRange(layoutIndex,oldRange) {
            const userDefinedMaxWidth = parseFloat(this.updateRangeForm.maxWidth)
            const currentMaxSet = layoutUtils.getLayoutMax(this.layouts)

            currentMaxSet[layoutIndex] = userDefinedMaxWidth

            if(userDefinedMaxWidth <= currentMaxSet[layoutIndex + 1]) {
                // if the user defined value of max width is lower than the next node
                this.$set(this.updateRangeForm,'error',`Maximum range cannot go below or equal ${currentMaxSet[layoutIndex + 1]}`)
            } else {
                // if there are error messages clear it
                this.$set(this.updateRangeForm,'error',undefined)
                this.$set(this.updateRangeForm,'loading',true)

                // get the new range defined by the user
                const newRange = (layoutUtils.constructLayoutRange(currentMaxSet).maxMin)[layoutIndex]

                // send outside
                this.$emit('renameRange', {
                    targetRange: `${oldRange.split('-')[1]}-${oldRange.split('-')[0]}`,
                    newRange: `${newRange.split('-')[1]}-${newRange.split('-')[0]}`,
                    ranges: currentMaxSet,
                    done: () => {
                        this.$set(this.updateRangeForm,'loading',false)
                        this.$set(this.updateRangeForm,'key',undefined)
                        this.$set(this.updateRangeForm,'index',undefined)
                    }, 
                    error: err => this.$set(this.updateRangeForm,'error',err)
                })
            }
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
        handleCmd(commandTitle,layout,index) {
            if(commandTitle == 'Update range') {
                this.$set(this.updateRangeForm,'key',layout)
                this.$set(this.updateRangeForm,'index',index)
                this.$set(this.updateRangeForm,'maxWidth',parseFloat(layout.split('-')[0]))
            }

            if(commandTitle == 'Remove') {
                webpod.dash.modal.setData({
                    name: 'dropLayout',
                    payload: layout
                })
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
        },
        createNewRange() {
            const currentMaxSet = layoutUtils.getLayoutMax(this.layouts)

            const userDefinedMaxWidth = parseInt(this.addLayoutRangeForm.maxWidth)
            currentMaxSet.push(userDefinedMaxWidth)
            const newRangeSet = layoutUtils.constructLayoutRange(currentMaxSet).minMax

            this.$emit('createNewRange', newRangeSet[newRangeSet.length - 1])

            this.tab = 0
        },
    }
}
</script>
