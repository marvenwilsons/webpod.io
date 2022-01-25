<template>
    <div class="flex flexcol" >
        <span class="overline" > SIZE </span>
        <div class="flex" >
            <div class="flex" >
                <div class="flex flexcol flexcenter" >
                    <div class=" flex" >
                        <div @click="width('minus')" style="min-height:9px;" class=" flex flexcenter" >
                            <v-btn x-small icon >
                                <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                </svg>
                            </v-btn>
                        </div>
                        <div class="paneBorder padleft025" style="width:40px; max-height:18px" >
                            {{widthValue}}pt
                        </div>
                        <div @click="width('add')" style="min-height:9px;" class=" flex flexcenter" >
                            <v-btn x-small icon >
                                <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </v-btn>
                        </div>
                    </div>
                    <div class="marginleft025" >
                        <span>
                            horizontal span
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex" >
                <div class="flex flexcol flexcenter" >
                    <div class=" flex" >
                        
                        <div @click="height('minus')" style="min-height:9px;" class=" flex flexcenter" >
                            <v-btn x-small icon >
                            <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                            </svg>
                            </v-btn>
                        </div>
                        <div class="paneBorder padleft025 " style="width:40px; max-height:18px" >
                            {{heightValue}}pt
                        </div>
                        <div @click="height('add')" style="min-height:9px;" class=" flex flexcenter" >
                            <v-btn x-small icon >
                            <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                            </v-btn>
                        </div>
                    </div>
                    <div class="marginleft025" >
                        <span>
                            vertical span
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        widthValue: 0,
        heightValue: 0
    }),
    methods: {
        width(condition) {
            this.$parent.width(condition,null,this.$parent.nodeSelectedIndex)
            this.widthValue = this.$parent.tiles[this.$parent.nodeSelectedIndex].colEnd
        },
        height(condition) {
            this.$parent.height(condition,null,this.$parent.nodeSelectedIndex)
            this.heightValue = this.$parent.tiles[this.$parent.nodeSelectedIndex].rowEnd
        }
    },
    mounted() {
        this.heightValue = this.$parent.tiles[this.$parent.nodeSelectedIndex].rowEnd
        this.widthValue = this.$parent.tiles[this.$parent.nodeSelectedIndex].colEnd

    }
}
</script>