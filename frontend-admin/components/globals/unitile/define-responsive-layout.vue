<template>
    <div style="width:600px;" >
        <!-- add -->
        <div class="flex flexend" >
            <v-btn @click="addLayoutEntry" tile icon >
                <v-icon>mdi-eye-plus-outline</v-icon>
            </v-btn>
        </div>
        <!-- representation -->
        <div style="min-height: 40px; flex-direction: row-reverse; gap: 3px;" class="flex paneBorder flexend pad025" >
            <v-card v-ripple v-for="(layout,index) in layouts" :key="index"
            :class="['flex flexcenter pointer light-blue darken-4',layout.name == 'default' ? 'fullwidth' : '']"
            :style="{width: layout.name != 'default' ? `${layout.startLayoutOn}px`  : '100%', minWidth: '50px'}"
            >
                <div style="font-family: 'Menlo'" class="flex fullheight-percent flexcenter white--text" >
                    {{layout.name != 'default' ? `${layout.startLayoutOn}px` : 'wide - *'}}
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
                layout: null

            }, 
            {
                name: 'medium',
                startLayoutOn: 600 // activating layout starting 600px below
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
            }
            
            if(this.layouts.length == 1) {
                addEntry()
                webpod.dash.modal.setData(this.layouts)
            } else {
                const lastLayout = this.layouts[this.layouts.length - 1]
                if(prsElement.textContent != 'N/A') {
                    if(lastLayout.startLayoutOn == selectedWidth || lastLayout.startLayoutOn < selectedWidth) {
                        webpod.dash.bottomAlert(`new entry should have lower width than ${selectedWidth}px`)
                    } else {
                        addEntry()
                    }
                } else {
                    webpod.dash.bottomAlert(`new entry should have lower width than 100%`)
                }
                
            }

            
        }
    }
}
</script>
