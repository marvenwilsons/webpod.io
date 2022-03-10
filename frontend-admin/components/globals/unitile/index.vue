<template>
    <main :class="['flex spacebetween fullheight-percent borderRad4', editMode ? '' : '']" >
        <div :class="['borderred flex flexcol']" 
            :style="{'max-width': !editMode && '1920px', 
                'border': editMode ? '1px solid #d3d3d3' : '',
                overflow: 'hidden',
                borderRadius: '5px'
            }" 
        >
            <!-- ribbon -->
            <div>
                <div class="flex flexcol" >
                    <div v-if="editMode"  class="flex flexcenter flexstart flexwrap pad050 grey darken-4" >
                        <div style="max-width:95px;" class="padleft050 padright125 flex flexcenter borderRad4" >
                            <h6 
                            class="white--text"
                            style="margin:0; font-size: 17px; font-weight: 600;"  
                            >UNITILE</h6>
                        </div>
                        <div style="flex-basis: content;" class=" pointer white--text" >
                            <div class="pad025 padleft050 padright050" >
                                <div class="flex" >
                                    <div class="padright025" >
                                        {{myData.title}}
                                    </div>
                                    <v-icon color="white" small >
                                        mdi-chevron-down
                                    </v-icon>
                                </div>
                            </div>
                            
                        </div>
                        <div class="pad025 padleft050 padright050" style="flex-basis: content;"  >
                            <div class="flex flexcenter grey--text lighten-4--text" >
                                Last edited a minute ago
                            </div>
                        </div>
                        <div class="flex1 flex flexend" >
                            <div>
                                <el-tooltip  class="pad025" content="Undo" effect="light" placement="top-start" >
                                    <v-btn v-if="sessionHistoryCollection && sessionHistoryCollection.length" style="color:white;" icon :disabled="undoBtnIsDisabled || previewIsOn" @click="undo" plain small >
                                        <v-icon>
                                            mdi-arrow-u-left-top
                                        </v-icon>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Redo" effect="light" placement="top-start" >
                                    <v-btn v-if="sessionHistoryCollection && sessionHistoryCollection.length" style="color:white;" icon :disabled="redoBtnIsDisabled || previewIsOn" @click="redo" plain small >
                                        <v-icon>
                                            mdi-arrow-u-right-top
                                        </v-icon>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Add new tile" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" :disabled="selectionToolIsActivated || previewIsOn" icon plain small @click="addNewTile" >
                                        <v-icon>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Preview on" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" v-if="!previewIsOn" @click="preview(true)" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                        <v-icon>mdi-eye-outline</v-icon>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Preview off" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" v-if="previewIsOn" @click="preview(false)" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                        <v-icon>mdi-eye-off</v-icon>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" :content="!selectionToolIsActivated ? 'Activate selection tool' : 'Deactivate selection tool'" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" :disabled="previewIsOn" @click="activateSelectionTool(true)" v-if="selectionToolIsActivated == false" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                        <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z" />
                                        </svg>
                                    </v-btn>
                                    <v-btn style="color:white;" :disabled="previewIsOn" @click="activateSelectionTool(false)" v-if="selectionToolIsActivated == true" plain  icon class="pointer flex flexccenter pad025 ribbon-item"  >
                                        <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M21 20C21 20.55 20.55 21 20 21H19V19H21V20M15 21V19H17V21H15M11 21V19H13V21H11M7 21V19H9V21H7M4 21C3.45 21 3 20.55 3 20V19H5V21H4M3 15H5V17H3V15M21 15V17H19V15H21M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8M3 11H5V13H3V11M21 11V13H19V11H21M3 7H5V9H3V7M21 7V9H19V7H21M4 3H5V5H3V4C3 3.45 3.45 3 4 3M20 3C20.55 3 21 3.45 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7Z" />
                                        </svg>
                                    </v-btn>
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Refresh Editor" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" plain @click="refresh" icon class="pointer flex flexccenter pad025 ribbon-item" >
                                        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                            <path fill="gray" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                                        </svg>
                                    </v-btn>     
                                </el-tooltip>
                                <el-tooltip  class="pad025" content="Save Layout" effect="light" placement="top-start" >
                                    <v-btn style="color:white;" plain icon @click="saveLayout" >
                                        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                                        </svg>
                                    </v-btn>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                    <div
                        id="unitile-ribbon"
                        v-if="nodeSelectedIndex == undefined" 
                        :style="{'min-height':'45px', 'z-index': 1, 'overflow':'hidden', }" 
                        class="grey lighten-3 padtop025 padbottom025 padleft050 padright050 flex  elevation-5 relative" 
                    >
                        <div style="right:0px; z-index:3" class="margintop025" >
                            <v-btn @click="ribbonScrollTo('start')" fab x-small text >
                                    <v-icon>
                                        mdi-chevron-left
                                    </v-icon>
                            </v-btn>
                        </div>
                        <div style="gap:5px; overflow:hidden;" 
                        class="marginleft050 marginright050 flex spacebetween borderRad4 fullwidth" >
                            <div id="start" ></div>
                            <opt-container title="GRID GAP" >
                                <grid-gap @change="applyGridGap" :gap="gridGap" class="marginright025" />
                                <!-- <v-divider
                                    vertical
                                ></v-divider> -->
                                <!-- <div class="marginleft050 borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                    <dropDown
                                        @command="(cmd) => {handleRibbonContainerCmd('grid-gap',cmd)}"
                                        :options="scaleUnits"
                                    >px</dropDown>
                                </div> -->
                            </opt-container>
                            <opt-container title="GRID COLUMNS" >
                                <div  class="borderRad4 paneBorder ribbon-item" >
                                    <dropDown
                                        class="padleft025 padright025"
                                        @command="(cmd) => {handleRibbonContainerCmd('grid-columns',cmd)}"
                                        :options="[
                                            {title: 1},
                                            {title: 2},
                                            {title: 3},
                                            {title: 4},
                                            {title: 5},
                                            {title: 6},
                                            {title: 7},
                                            {title: 8},
                                            {title: 9},
                                            {title: 10},
                                            {title: 11},
                                            {title: 12}
                                        ]"
                                        :selected="maxCol"
                                    >
                                        {{maxCol}}
                                    </dropDown>
                                </div>
                            </opt-container>
                            <opt-container  title="COLUMN SIZES" >
                                <div @click="openColumnEditor" 
                                style="white-space: nowrap;"
                                class="caption paneBorder padleft025 padright025 borderRad4 ribbon-item" >
                                    <code>{{gridColumns.join(' ')}} - ({{gridColumns.length}})</code>
                                </div>
                            </opt-container>
                            <opt-container title="GRID CONTAINER CUSTOM CSS" >
                                <div
                                @click="handleRibbonContainerCmd('grid-container-custom-css')"
                                class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                    <v-icon small >mdi-language-css3</v-icon>
                                </div>
                            </opt-container>
                            <opt-container title="GRID TILES CUSTOM CSS" >
                                <div 
                                @click="handleRibbonContainerCmd('grid-tile-custom-css')"
                                class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                    <v-icon small >mdi-language-css3</v-icon>
                                </div>
                            </opt-container>
                            <opt-container title="JUSTIFY ITEMS" >
                                <div class="borderRad4 padleft025 padright025" >
                                    <container-justify-items @change="containerJustifyItems" />
                                </div>
                            </opt-container>
                            <div id="end" ></div>
                        </div>
                        <div style="z-index:3" class="margintop025" >
                            <v-btn @click="ribbonScrollTo('end')" fab x-small text >
                                <v-icon>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="nodeSelectedIndex != undefined"
                        style="min-height:45px; grid-gap: 5px; z-index: 1;" 
                        class="grey lighten-3 padtop025 padbottom025 padleft025 padright025 flex elevation-5 flexwrap"
                    >
                        <opt-container title="GRID GAP" >
                            <grid-gap class="marginright025" />
                            <v-divider
                                vertical
                            ></v-divider>
                            <div class="marginleft050 borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                <dropDown
                                    :options="[{title: 'px'},{title: '%'}]"
                                >px</dropDown>
                            </div>
                        </opt-container>
                    </div>
                </div>
            </div>
            <!-- tile presentation -->
            <section id="tile-presentation" style="overflow:auto; " class="flex1 grey lighten-5" >
                <div
                    v-if="ready"
                    class="wp-dash-grid relative " 
                    @keydown="keydown"
                    :id="`grid-${currentUid}`"
                    :style="{
                        ...gridContainerStyle,
                        'grid-template-rows': `repeat(${maxRows}, ${minTileHeight})`,
                        'min-width': `${minTileWidth}`,
                        'grid-template-columns': `${gridColumns.join(' ')}`,
                        'grid-gap': `${gridGap}px`

                    }"
                >
                    <grid-guides
                     v-if="useGridGuides"
                     :maxRows="maxRows"
                     :maxCol="maxCol"
                     :minTileWidth="minTileWidth"
                     :minTileHeight="minTileHeight"
                    ></grid-guides>
                    <div v-for="(item,item_index) in tiles" 
                    :key="item.id" 
                    :id="`${item.id}-${item_index}`"
                    :class="['selectable-nodes wp-dash-grid-item flex flexcol pointer', editMode ? 'paneBorder': '', ...item.customClasses]" 
                    :style="{
                        'grid-area':`${item.id}`,
                        'grid-row-start':item.rowStart,
                        'grid-row-end':item.rowEnd,
                        'grid-column-start':item.colStart,
                        'grid-column-end':item.colEnd,
                        'overflow':'auto',
                        justifySelf: item.align,
                        background:'white',
                        ...item.customStyle,
                    }"
                    >
                        <div class="relative fullheight-percent" >
                            <!-- dropDown component is handled by options.js -->
                            <div v-if="editMode && selectionToolIsActivated == false" style="right:0;background: #f5f5f5;" class="flex flexcenter spacebetween pad025 tile-btn absolute" >
                                <input class="marginleft025" @change="(e) => {nodeSelect(e,item_index)}" v-model="item.selected" type="checkbox">
                                <dropDown
                                    :svgTrigger="'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'"
                                    :options="options"
                                    :divideOptionsBefore="['Move down','Expand height','100% width']"
                                    :disabledOptions="disabledOptions"
                                    @command="(cmd) => {handleDropDownCommand(cmd,item_index,item,tiles)}"
                                />
                            </div>
                            <div class="fullheight-percent fullwidth"  >
                                <!-- view content here -->

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <portal v-if="gridSettingsModalIsOpen" class=" borderred" to="modal" >
            <div  v-if="editMode && !previewIsOn" 
                style="background:white; font-family: 'Menlo'; overflow: auto; max-width:500px;" 
                class="pad125 text-small " 
            >
                <!-- TILE SETTINGS -->
                <div v-if="nodeSelectedIndex != undefined" >
                    <tile-setting-position/>
                        <v-divider />
                    <tile-setting-size></tile-setting-size>
                        <v-divider />
                    <tile-setting-z-index />
                        <v-divider />
                    <align-self ref="tileCustomCssTextEditor" @change="tileALignChange"  />
                        <v-divider />
                    <tile-view />
                        <v-divider />
                    <span class="overline" > TILE CUSTOM STYLE </span> <br>
                    <span class="marginbottom125 caption" >
                        Custom CSS Style to be applied for this selected tile only.
                    </span>
                    <custom-css v-if="ready" 
                        @change="tileCustomStyle" 
                        :cssObject="tiles[nodeSelectedIndex].customStyle"
                        :el_id="tiles[nodeSelectedIndex].id" 
                    />
                        <v-divider />
                    <custom-classes />
                </div>
                <!-- CONTAINER SETINGS -->
                <div v-else class="flex flexcol" >
                    <!-- GRID GAP -->
                    <grid-gap @change="applyGridGap" :gap="gridGap" />
                    <v-divider />
                    <!-- COLUMN SIZE -->
                    <div role="global style for all tiles">
                        <span class="overline" >GRID COLUMNS </span> <br>
                        <span class="marginbottom125 " >
                            Define how many columns for the grid container to have.
                        </span>
                        <br> <br>
                        <v-btn 
                            @click="changeGridColumn(i)"  
                            elavation="0" 
                            fab 
                            :plain="maxCol != i" tile  v-for="i in 12" :key="uid(i)" 
                        >{{i}}</v-btn>
                    </div>
                    <v-divider />
                    <!-- COLUMN SIZE -->
                    <div role="grid column size">
                        <span class="overline" >GRID COLUMN SIZE </span> <br>
                        <span class="marginbottom125 " >
                            Define the size of each columns.
                        </span>
                        <br> <br>
                        <div class="flex flexcenter paneBorder marginbottom025 pad025" >
                            <code>{{gridColumns.join(' ')}} - ({{gridColumns.length}})</code>
                        </div>
                        <v-btn block plain @click="openColumnEditor" >OPEN COLUMN EDITOR</v-btn>
                    </div>
                    <v-divider />
                    <!-- CUSTOM CSS CONTAINER -->
                    <div role="global style for all tiles">
                        <span class="overline" >GRID TILE's CUSTOM CSS * </span> <br>
                        <span class="marginbottom125 " >
                            Custom CSS Style to be applied for each tile
                        </span>
                        <br> <br>
                        <custom-css v-if="ready" @change="containerCustomStyle" />
                    </div>
                    <v-divider />
                    <!-- CUSTOM CSS TILES -->
                    <div role="grid container style">
                        <span class="overline" > GRID CONTAINER CUSTOM CSS </span> <br>
                        <span class="marginbottom125 " >
                            Custom CSS Style to be applied for the grid container
                        </span>
                        <br> <br>
                        <custom-css v-if="ready" @change="containerCustomStyle" />
                    </div>
                    <v-divider />
                    <container-justify-items @change="containerJustifyItems" />
                </div>
            </div>
        </portal>

        <!-- modals -->
        <div  >
            <portal  class="" to="modal">
                <div v-if="columnEditorIsOpen" class="fullheight-percent fullwidth padbottom125"   >
                    {{maxCol}} Columns 
                    <columnEditor ref="colEditor" :maxCol="maxCol" :gridColumns="copy(gridColumns)" />
                </div>
            </portal>
        </div>
    </main>
</template>
// https://github.com/ThibaultJanBeyer/DragSelect
// https://github.com/ThibaultJanBeyer/dragNdrop
<script>
import m from '@/m'
import optionHandler from './options'
import sessionHistory from './sessions-history'
import gridGuides from './grid-guides.vue'

import gridGap from './c-grid-gap.vue'
import containerJustifyItems from './c-justify-items.vue'
import columnEditor from './column-editor.vue'

import tileSettingPosition from './tile-s-position.vue'
import tileSettingSize from './tile-s-size.vue'
import tileSettingZIndex from './tile-s-z-index.vue'
import tileView from './tiles-s-view.vue'
import customCss from './custom-css.vue'
import customClasses from './cutom-classes.vue'
import alignSelf from './self-align.vue'
import optContainer from './opt-container.vue'

export default {
    name: 'unitile',
    mixins: [m,optionHandler,sessionHistory],
    components: {tileSettingPosition, tileSettingSize,tileSettingZIndex,tileView,gridGuides,
    customCss,customClasses,alignSelf,gridGap, containerJustifyItems, columnEditor, optContainer},
    props: ['myData','config', 'paneIndex', 'hooks'],
    data: () => ({
        tiles: [],
        maxRows: 4,
        maxCol: 4,
        gridGap: 5,
        gridColumns: undefined,
        gridContainerStyle: {},
        nodeSelectedIndex: undefined,
        minTileWidth: '50px',
        minTileHeight: '50px',
        ready: true,
        editMode: true,
        currentUid: undefined,
        useGridGuides: false,
        selectionToolIsActivated: false,
        selectedNodesBySelectionTool: [],
        previewIsOn: false,
        gridSettingsModalIsOpen: false,
        columnEditorIsOpen: false,
        ribbonContainerWidth: undefined
    }),
    methods: {
        removeUnwantedRows() {
            // get the lowest or the most bottom element in the layout
            let maxRowEnd = 0
            const rowEnds = this.tiles.map(tile => {
                // console.log('s',this.maxRows,tile.rowEnd)
                // console.log(this.maxRows - tile.rowEnd)
                if(maxRowEnd < tile.rowEnd) {
                    maxRowEnd = tile.rowEnd
                }
            })

            if(maxRowEnd + 1 != this.maxRows) {
                if(this.maxRows != 4) {
                    if(maxRowEnd - 1 != this.maxRows) {
                        this.maxRows-- // remove rows
                    }
                }
            }
        },  
        move(moveDirection,id,index) {
            if(moveDirection == 'right') {
                if(this.tiles[index].colEnd != this.maxCol + 1) {
                    this.tiles[index].colStart = this.tiles[index].colStart + 1
                    this.tiles[index].colEnd = this.tiles[index].colEnd + 1
                }
            }
            if(moveDirection == 'left') {
                if(this.tiles[index].colStart + 1 != 2 ) {
                    this.tiles[index].colStart = this.tiles[index].colStart - 1
                    this.tiles[index].colEnd = this.tiles[index].colEnd - 1
                }
            }
            if(moveDirection == 'top') {
                if(this.tiles[index].rowStart + 1 != 2 ) {
                    this.tiles[index].rowStart = this.tiles[index].rowStart - 1
                    this.tiles[index].rowEnd = this.tiles[index].rowEnd - 1
                    this.removeUnwantedRows()
                }   
            }
            if(moveDirection == 'bottom') {
                this.tiles[index].rowStart = this.tiles[index].rowStart + 1

                const newRowEndVal = this.tiles[index].rowEnd + 1
                this.tiles[index].rowEnd = newRowEndVal

                this.tiles[index].rowEnd = newRowEndVal
                if(newRowEndVal - 1 == this.maxRows) {
                    this.maxRows = this.maxRows + 1
                }

            }
            setTimeout(() => {
                this.addSessionEntry(this.copy(this.tiles))
            }, 10)
        },
        height(mode,id,index) {
            this.addSessionEntry(this.tiles)
            if(mode == 'add') {
                // this.tiles[index].rowStart = this.tiles[index].rowStart
                const newRowEndVal = this.tiles[index].rowEnd + 1
                this.tiles[index].rowEnd = newRowEndVal
                if(newRowEndVal == this.maxRows) {
                    this.maxRows = this.maxRows + 1
                } else {
                    if(newRowEndVal > this.maxRows) {
                        this.maxRows = newRowEndVal + 1
                    }
                }
            }
            if(mode == 'minus') {
                if(this.tiles[index].rowStart + 1 != this.tiles[index].rowEnd) {
                    this.tiles[index].rowEnd = this.tiles[index].rowEnd - 1
                    this.removeUnwantedRows()
                }

            }
        },
        width(mode,id,index) {
            this.addSessionEntry(this.tiles)
            if(mode == 'add') {
                if(this.tiles[index].colEnd != this.maxCol + 1) {
                    this.tiles[index].colEnd = this.tiles[index].colEnd + 1
                    // console.log(this.tiles[index].colEnd, this.maxCol)
                }   
            }
            if(mode == 'minus') {
                if(this.tiles[index].colEnd != 2) {
                    this.tiles[index].colEnd = this.tiles[index].colEnd - 1
                }

            }
        },
        nodeSelect(e,index) {
            if(e.target.checked) {
                this.tiles[index].selected = true
                this.tiles.map((tile,tile_index) => {
                    if(tile.selected) {
                        if(tile_index != index) {
                            this.tiles[tile_index].selected = false
                        }
                    }
                })

                this.nodeSelectedIndex = undefined
                setTimeout(() => {
                    this.nodeSelectedIndex = index
                },10)
            } else {
                this.nodeSelectedIndex = undefined
                this.tiles[index].selected = false
            }
        },
        keydown(e) {
            if(this.nodeSelectedIndex != undefined && this.selectionToolIsActivated == false) {
                if(e.key == 'ArrowRight') {
                    this.move('right',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowLeft') {
                    this.move('left',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowDown') {
                    this.move('bottom',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowUp') {
                    this.move('top',null,this.nodeSelectedIndex)
                }
            }
        },
        clearSelectedNode() {
            if(this.nodeSelectedIndex != undefined) {
                this.tiles[this.nodeSelectedIndex].selected = false
                this.nodeSelectedIndex = undefined
            }
        },
        addNewTile(isClone,tileIndex) {
            if(isClone == true) {
                this.tiles.push({
                    name: undefined, 
                    id:this.uid(), 
                    rowStart: this.tiles[tileIndex].rowStart, 
                    rowEnd: this.tiles[tileIndex].rowEnd, 
                    colStart: this.tiles[tileIndex].colStart, 
                    colEnd: this.tiles[tileIndex].colEnd, 
                    selected: false,
                    customStyle: this.tiles[tileIndex].customStyle,
                    customClasses: [],
                    isAClone: this.tiles[tileIndex].id,
                    view: this.tiles[tileIndex].view
                })
            } else {
                this.tiles.push({
                    name: undefined, 
                    id:this.uid(), 
                    rowStart: 1, 
                    rowEnd: 2, 
                    colStart: 1, 
                    colEnd: 2, 
                    selected: false,
                    customClasses: [],
                    customStyle: {},
                    view: undefined,
                    align: 'stretch'
                })
            }
            
            this.clearSelectedNode()
            setTimeout(() => {
                this.addSessionEntry(this.copy(this.tiles))
            },0)
        },
        saveLayout() {
            const data = {
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles: this.tiles,
                gridColumns: this.gridColumns
            }
            // this.hooks.onSaveLayout(data)
            console.log(data)
            webpod.server.apps.update(data, (response) => {
                if(response.message == 'success') {
                    // saving is successfull
                }
            })
        },
        refresh() {
            this.ready = false
            setTimeout(() => {
                this.ready = true
            },0)
        },
        activateSelectionTool(value) {
            let ds = undefined
            let selectedTiles = []
            this.selectionToolIsActivated = value

            if(value == true) {
                const area = document.getElementById('tile-presentation')
                area.style.cursor = 'crosshair'
                ds = new this.$DragSelect({
                    selectables: document.querySelectorAll('.selectable-nodes'),
                    area: area
                });

                ds.subscribe('callback', ({ items, event }) => {
                    if(items.length > 0) {
                        items.map(item => {
                            if(!this.selectedNodesBySelectionTool.includes(item.id)) {
                                this.selectedNodesBySelectionTool.push(item.id)
                                item.style.border = '1px dashed #d3d3d3'
                            } else {
                                this.selectedNodesBySelectionTool.splice(this.selectedNodesBySelectionTool.indexOf(item.id), 1)
                                item.style.border  = 'none'
                            }
                        })
                    } else {
                        this.selectedNodesBySelectionTool.map(item => {
                            const el = document.getElementById(item)
                            el.style.border = 'none'
                            this.selectedNodesBySelectionTool = []
                        })
                    }
                })

                
            }

            if(value == false) {
                const area = document.getElementById('tile-presentation')
                area.style.cursor = 'auto'
                const selectorArea = document.querySelectorAll('.ds-selector-area')
                for (var i = 0; i < selectorArea.length; i++) {
                    selectorArea[i].remove()
                }
                this.refresh()
            }
        },
        preview(state) {
            this.previewIsOn = state
        },
        tileALignChange(value) {
            this.tiles[this.nodeSelectedIndex].align = value
        },
        containerCustomStyle(value) {
            console.log('container custom style', value)
        },
        containerJustifyItems(value) {
            console.log('asdf', value)
        },
        tileCustomStyle(cssObject) {
            this.tiles[this.nodeSelectedIndex].customStyle = cssObject
        },
        applyGridGap(value) {
            this.gridGap = value
        },
        changeGridColumn(value) {
            this.maxCol = value

            // populate gridColumns with 1fr 
            for(let i = 0; i < value; i++) {
                if(i > this.gridColumns.length - 1) {
                    this.gridColumns.push('1fr')
                }
            }

            // when the selected value is lower than the past value
            const t = this.gridColumns.length - value
            if(this.gridColumns.length > value) {
                for(let i = 0; i <  t; i++) {
                    this.gridColumns.pop()
                }
            }
        },
        openColumnEditor() {
            const columnEditor = webpod.dash.modal.show({
                modalTitle: 'Column Editor',
                isPlayable: true,
                viewTrigger: (s) => this.columnEditorIsOpen = s
            })

            columnEditor.on('play', () => {
                this.gridColumns = this.$refs.colEditor.frs
                webpod.dash.modal.hide()
            })
        },
        handleRibbonContainerCmd(cmd,val) {
            if(cmd === 'grid-gap') {

            }

            if(cmd === 'grid-gap') {

            }

            if(cmd === 'grid-container-custom-css') {

            }

            if(cmd === 'grid-tile-custom-css') {
                console.log(cmd)
            }

            if(cmd === 'grid-columns') {
                this.changeGridColumn(val)
            }
        },
        ribbonScrollTo(e) {
            if(e == 'end') {
                document.getElementById('end').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                document.getElementById('start').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    },
    mounted() {
        const cog = webpod.dash.cog.show()

        cog.on('click', () => {
            webpod.dash.modal.show({
                modalTitle: 'GRID SETTINGS',
                viewTrigger: (s) => {
                    this.gridSettingsModalIsOpen = s
                }
            })
        })
        
        // when toggling pane hide the cog
        webpod.session.onPaneToggle = (currentIndex) => {
            if(this.paneIndex != currentIndex) {
                webpod.dash.cog.hide()
            } else {
                setTimeout(() => {
                    console.log("ssss")
                    const x = webpod.dash.cog.show()
                    x.on('click', () => {
                        webpod.dash.modal.show({
                            modalTitle: 'GRID SETTINGS',
                        })
                    })
                }, 100)
            }
        }
    },
    beforeDestroy() {
        webpod.dash.cog.hide()
    },
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert
        webpod.session.allowOverflow = false

        if(this.myData) {
            if(Object.keys(this.config).includes('editable')) {
                this.editMode = this.config.editable
            } else {
                _alert('Error: Cannot find editable property in viewConfig, defaulting to read only mode.')
                this.editMode = false
            }

            let largestRowEnd = 0
            this.myData.tiles.map(item => {
                if(typeof item != 'object') {
                    alert(`Found invalid type inside unitile's viewData it should be an array of objects`)
                    location.reload()
                } else {
                    if(largestRowEnd < item.rowEnd) {
                        largestRowEnd = item.rowEnd
                    }   
                    
                    this.tiles.push(item)
                }
            })

            // default grid settings
            if(this.myData.maxCol) { this.maxCol = this.myData.maxCol }
            if(this.myData.gridGap) { this.gridGap = this.myData.gridGap }
            if(this.myData.gridContainerStyle) { this.gridContainerStyle = this.myData.gridContainerStyle }
            this.maxRows = largestRowEnd + 2

            if(this.myData.gridColumns != undefined) {
                this.gridColumns = this.myData.gridColumns
            } else {
                let col = []
                for(let i = 0; i < this.maxCol; i++) {
                    col.push(`1fr`)
                }
                this.gridColumns = col
            }
            

        } else {
            _alert('Error: unitile data is undefined')
        }
    }
}
</script>

<style>
.wp-dash-grid {
    display: grid;
    padding: 10px;
    transition: 1s !important;
}

.tile-item > button {
    padding: 0 !important;
}
.text-gray {
    color: #737373;
}
.ribbon-item:hover {
    color: black;
    background: #F5F5F5;
    cursor: pointer;
    transition: 0.2s;
}
</style>
