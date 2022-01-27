<template>
    <div class="flex flexcol" >
        <span class="overline" > POSITION </span>
        <div class="flex paneBorder flexcenter" >
            <div class="flex" >
                <v-btn @click="move('left')" role="left" rounded plain x-small icon >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
                </v-btn>
            </div>
            <div class="flex flexcol" >
                <div>
                    <v-btn @click="move('top')" role="up" rounded plain x-small icon >
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
                        </svg>
                    </v-btn>
                </div>
                <div>
                    <v-btn @click="move('bottom')" role="down" rounded plain x-small icon >
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </v-btn>
                </div>
            </div>
            <div>
                <v-btn @click="move('right')" role="right"  rounded plain x-small icon >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        move(direction) {
            if(this.$parent.selectionToolIsActivated) {
                this.$parent.selectedNodesBySelectionTool.map(tileId => {
                    const index = parseInt(tileId.split('-')[1])
                    this.$parent.move(direction,null,index)
                })
            } else {
                this.$parent.move(direction,null,this.$parent.nodeSelectedIndex)
            }
        }
    }
}
</script>