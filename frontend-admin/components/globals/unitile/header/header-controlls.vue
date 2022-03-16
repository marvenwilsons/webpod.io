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
                    @click="HeaderCommand('AddNewTile')" 
                >
                    <v-icon>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </el-tooltip>
            <!-- PREVIEW ON BUTTON -->
            <!-- <el-tooltip  class="pad025" content="Preview on" effect="dark" placement="top-start" >
                <v-btn 
                    style="color:white;" 
                    v-if="preview == 'off'" 
                    @click="preview(true)"
                    icon plain small 
                >
                    <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </el-tooltip> -->
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
                :content="controlls.selection_tool == 'on' ? 'Activate selection tool' : 'Deactivate selection tool'" 
                effect="dark" 
                placement="top-start" 
            >
                <v-btn 
                    style="color:white;" 
                    :disabled="preview == 'on'" 
                    @click="activateSelectionTool(true)" 
                    v-if="controlls.selection_tool == 'off'" plain  icon 
                    class="pointer flex flexccenter pad025 ribbon-item" 
                >
                    <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z" />
                    </svg>
                </v-btn>
                <v-btn 
                    style="color:white;" 
                    :disabled="preview == 'on'" 
                    @click="activateSelectionTool(false)" 
                    v-if="controlls.selection_tool == 'on'" plain  icon 
                    class="pointer flex flexccenter pad025 ribbon-item" 
                >
                    <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21 20C21 20.55 20.55 21 20 21H19V19H21V20M15 21V19H17V21H15M11 21V19H13V21H11M7 21V19H9V21H7M4 21C3.45 21 3 20.55 3 20V19H5V21H4M3 15H5V17H3V15M21 15V17H19V15H21M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8M3 11H5V13H3V11M21 11V13H19V11H21M3 7H5V9H3V7M21 7V9H19V7H21M4 3H5V5H3V4C3 3.45 3.45 3 4 3M20 3C20.55 3 21 3.45 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7Z" />
                    </svg>
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
        selection_tool: 'off'
    }),
    methods: {
        HeaderCommand(command) {
            this.$emit('HeaderCommand', command)
        }
    }
}
</script>