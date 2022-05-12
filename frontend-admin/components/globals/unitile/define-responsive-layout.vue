<template>
    <div style="width:400px;" >
        <div>
            Select width variant for this layout
        </div>
        <!-- add -->
        <div class="flex flexend" >
            <v-btn @click="addLayoutEntry" tile icon >
                <v-icon>mdi-eye-plus-outline</v-icon>
            </v-btn>
        </div>
        <!-- representation -->
        <div style="min-height: 50px; gap: 3px;" 
        class="flex paneBorder flexcol pad025" >
            <v-card v-ripple v-for="(layout,index) in layouts" :key="index"
            :class="['flex flexcenter pointer light-blue darken-4 pad125',layout.name == 'default' ? 'fullwidth' : '']"
            :style="{ minWidth: '50px'}"
            >
                <div style="font-family: 'Menlo'" class="flex fullheight-percent flexcol white--text" >
                    <div class="flex spacebetween marginbottom025" >
                        <strong>{{layout.name != 'default' ? `${layout.startLayoutOn}px` : 'Default'}}</strong>
                        <dropDown
                            v-if="layout.name != 'default'"
                            @command="(title) => handleCmd(title,layout.startLayoutOn)"
                            :options="[
                                {title: 'Remove', d: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'},
                                {title: 'Update trigger'},
                                {title: 'Copy trigger layout content'}
                            ]"
                        >
                            <v-btn small icon >
                                <v-icon color="white" >mdi-dots-vertical</v-icon>
                            </v-btn>
                        </dropDown>
                        
                    </div>
                    <div v-if="layout.name == 'default'" class="caption" >
                        This layout trigger will be activated starting on <strong v-if="layouts[1]" >{{layouts[1].startLayoutOn}}px</strong> up until screen fullwidth.
                    </div>
                    <div class="caption" v-if="layout.name != 'default' " >
                        This layout trigger will be actiavated starting on <strong>{{layouts[index].startLayoutOn}}px</strong> up until to
                        <strong>{{layouts[index + 1] == undefined ? 'lowest width' : layouts[index + 1].startLayoutOn + 'px'}}</strong>
                    </div>
                </div>
            </v-card>
        </div>
        <!-- list -->
        <div></div>
    </div>
</template>

<script>
export default {
    data: () => ({
        layouts: [
            {
                name: 'default',
                layout: null,
            }, 
            {
                name: 'medium',
                startLayoutOn: 300 // activating layout starting 600px below
            },
        ],
        errorMsg: null
    }),
    methods: {
        addLayoutEntry() {
            const prsElement = document.getElementById('prs')
            const selectedWidth = parseInt(prsElement.textContent)

            const addEntry = () => {
                this.layouts.push({
                    name: 'none',
                    startLayoutOn: selectedWidth,
                    layout: null
                })
                webpod.dash.modal.setData(this.layouts)
            }
            
            if(this.layouts.length == 1) {
                addEntry()
            } else {
                const lastLayout = this.layouts[this.layouts.length - 1]
                if(prsElement.textContent != 'N/A') {
                    if(lastLayout.startLayoutOn == selectedWidth) {
                        webpod.dash.bottomAlert(`new entry should have lower width than ${selectedWidth}px`)
                    } else {
                        addEntry()
                        this.layouts = this.layouts.sort((a,b) => b.startLayoutOn - a.startLayoutOn)
                    }
                } else {
                    webpod.dash.bottomAlert(`new entry should have lower width than current fullwidth value`)
                }
                
            }

            
        },
        getUnclaimedSpace() {

        },
        updateWidth() {
            const selectedWidth = document.getElementById('prs').textContent
            if(selectedWidth != 'N/A') {
                const v = parseInt(selectedWidth)
            }
        },
        handleCmd(commandTitle,startLayoutOn) {
            if(commandTitle == 'Update trigger') {
                this.updateWidth()
            }

            if(commandTitle == 'Remove') {
                for(let i = 0; i < this.layouts.length; i++) {
                    if(this.layouts[i].startLayoutOn == startLayoutOn) {
                        this.layouts.splice(i,1)
                        break
                    }
                }
                // this.layouts.splice(1)
            }
        }
    }
}
</script>
