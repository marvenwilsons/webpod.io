<template>
    <div class="" style="overflow: hidden;" >
        <div class="flex" >
            <div >
                <el-tooltip  class="pad025" content="Align Start" effect="dark" placement="top-start" >
                <v-btn :style="{color: selected == 'start' ? 'black' : 'lightgray' }"  :ripple="false"  @click="selected = 'start'"  icon class="" >
                    <v-icon>
                        mdi-format-horizontal-align-left
                    </v-icon>
                </v-btn>
                </el-tooltip>
            </div>
            <div  >
                <el-tooltip  class="pad025" content="Align Center" effect="dark" placement="top-start" >
                <v-btn :style="{color: selected == 'center' ?  'black' : 'lightgray' }" :ripple="false"  @click="selected = 'center'" icon class="" >
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,16V13H23V11H19V8L15,12L19,16M5,8V11H1V13H5V16L9,12L5,8M11,20H13V4H11V20Z" />
                    </svg>
                </v-btn>
                </el-tooltip>
            </div>
            <div  >
                <el-tooltip  class="pad025" content="Align End" effect="dark" placement="top-start" >
                <v-btn :style="{color: selected == 'end' ? 'black' : 'lightgray'  }" :ripple="false"  @click="selected = 'end'"  icon class="" >
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13,8V11H3V13H13V16L17,12L13,8M19,20H21V4H19V20Z" />
                    </svg>
                </v-btn>
                </el-tooltip>
            </div>
            <div  >
                <el-tooltip  class="pad025" content="Stretch" effect="dark" placement="top-start" >
                <v-btn :style="{color: selected == 'stretch' ? 'black' : 'lightgray'  }" :ripple="false"  @click="selected = 'stretch'"  icon class="" >
                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,2H4C2.89,2 2,2.89 2,4V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V4C22,2.89 21.11,2 20,2M20,20H4V4H20M8.83,10.25L7.29,8.71L6,10V6H10L8.71,7.29L10.25,8.83M13.75,8.83L15.29,7.29L14,6H18V10L16.71,8.71L15.17,10.25M15.17,13.75L16.71,15.29L18,14V18H14L15.29,16.71L13.75,15.17M10.25,15.17L8.71,16.71L10,18H6V14L7.29,15.29L8.83,13.75" />
                    </svg>
                </v-btn>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        selected: 'stretch'
    }),
    watch: {
        selected(n) {
            this.$emit('change',n)
            // 
        }
    }
}
</script>