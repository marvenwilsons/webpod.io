<template>
    <section class="flex1 flex flexend" >
        <div>
            <!-- UNDO REDO -->
            <el-tooltip  class="pad025" content="Undo" effect="dark" placement="top-start" >
                <v-btn 
                :disabled="undo_button == 'on' || preview == 'on'" 
                style="color:white;" 
                @click="HeaderCommand('Undo')"  
                icon 
                plain 
                small
                >
                    <v-icon>
                        mdi-arrow-u-left-top
                    </v-icon>
                </v-btn>
            </el-tooltip>

            <!-- REDO BUTTON -->
            <el-tooltip  class="pad025" content="Redo" effect="dark" placement="top-start" >
                <v-btn 
                    :disabled="redo_button == 'on' || preview == 'on'" 
                    style="color:white;" 
                    @click="HeaderCommand('Redo')" 
                    icon 
                    plain 
                    small 
                >
                    <v-icon>
                        mdi-arrow-u-right-top
                    </v-icon>
                </v-btn>
            </el-tooltip>

            <!-- ADD NEW TILE BUTTON -->
            <el-tooltip  class="pad025" content="Create New Tile" effect="dark" placement="top-start" >
                <v-btn 
                    style="color:white;" 
                    :disabled="selection_tool == 'on' || preview == 'on'" 
                    icon 
                    plain 
                    small 
                    @click="HeaderCommand('addNewTile')" 
                >
                    <v-icon>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </el-tooltip>
            <!-- PREVIEW ON BUTTON -->
            <el-tooltip  class="pad025" content="View project" effect="dark" placement="top-start" >
                <v-btn 
                    style="color:white;" 
                    @click="HeaderCommand('view-project')"
                    icon plain small 
                >
                    <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </el-tooltip>
            <!-- PREVIEW OFF BUTTON -->
            <!-- <el-tooltip  class="pad025" content="Preview off" effect="dark" placement="top-start" >
                <v-btn 
                    style="color:white;" 
                    v-if="preview == 'on'" 
                    @click="preview(false)" plain  icon 
                    class="pointer flex flexccenter pad025 ribbon-item" 
                >
                    <v-icon>mdi-eye-off</v-icon>
                </v-btn>
            </el-tooltip> -->
            <!-- SELECTCTION TOOL  -->
            <!-- <el-tooltip  
                class="pad025" 
                content="Move multiple mode" 
                effect="dark" 
                placement="top-start" 
            >
                <v-btn
                    :ripple="false"
                    @click="toggleMoveMultiple"
                    :style="{color: multiple_select_mode ? '#00E676' : 'white'}" 
                    class="pointer flex flexccenter pad025" 
                    plain 
                    icon
                    small
                >
                   <v-icon>mdi-axis-arrow</v-icon>
                </v-btn>
            </el-tooltip> -->
            <!-- REFRESH BUTTON -->
            <el-tooltip  class="pad025" content="Refresh Editor" effect="dark" placement="top-start" >
                <v-btn 
                class="pointer flex flexccenter pad025"
                style="color:white;"
                @click="HeaderCommand('Refresh')" 
                plain 
                icon  
                >
                    <v-icon>
                        mdi-refresh
                    </v-icon>
                </v-btn>     
            </el-tooltip>
            <!-- SAVE LAYOUT BUTTON -->
            <el-tooltip  class="pad025" content="Save Layout" effect="dark" placement="top-start" >
                <v-btn 
                style="color:white;" 
                @click="HeaderCommand('SaveLayout')"
                plain 
                icon  
                >
                    <v-icon>
                        mdi-content-save
                    </v-icon>
                </v-btn>
            </el-tooltip>
        </div>
    </section>
</template>

<script>
export default {
    data: () => ({

        // preview button values are on - off
        preview: 'off', 

        // undo button values are on - off
        undo_button: 'off',

        // redo button values are on - off
        redo_button: 'off',

        // selection tool button values are on - off
        selection_tool: 'off',

        // move multiple
        multiple_select_mode: false
    }),
    methods: {
        HeaderCommand(command) {
            this.$emit('HeaderCommand', command)
        },
        toggleMoveMultiple() {
            this.multiple_select_mode = !this.multiple_select_mode
            if(this.multiple_select_mode) {
                this.$emit('HeaderCommand', 'multiple-select-on')
            } else {
                this.$emit('HeaderCommand', 'multiple-select-off')
            }
        }
    }
}
</script>