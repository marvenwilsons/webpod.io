<template>
    <main :class="['flex spacebetween fullheight-percent borderRad4', editMode ? '' : '']" >
        <div :class="['flex flexcol']" 
            :style="{'max-width': !editMode && '1920px', 
                'border': editMode ? '1px solid #d3d3d3' : '',
                overflow: 'hidden',
                borderRadius: '5px'
            }" 
        >
            <!-- header -->
            <u-header
            @HeaderCommand="handleHeaderCommand"
            @renameTitle="headerTitleClick"
            ></u-header>
            <div>
                <div class="flex flexcol" >
                    <div
                    id="unitile-ribbon"
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
                        <!-- GRID SETTINGS -->
                        <v-fade-transition>
                            <div v-if="nodeSelectedIndex == undefined"  style="gap:5px; overflow:hidden;" 
                            class="marginleft050 marginright050 flex spacebetween borderRad4 fullwidth" >
                                <div id="start" ></div>

                                <opt-container title="Grid Gap" >
                                    <grid-gap @change="applyGridGap" :gap="gridGap" class="marginright025" />
                                </opt-container>

                                <opt-container title="Grid Columns" >
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

                                <opt-container  title="Column Size" >
                                    <div v-ripple @click="openColumnEditor" 
                                    style="white-space: nowrap;"
                                    class="caption paneBorder padleft025 padright025 borderRad4 ribbon-item" >
                                        <code>{{gridColumns.join(' ')}} - ({{gridColumns.length}})</code>
                                    </div>
                                </opt-container>

                                <opt-container title="Grid Container Custom CSS" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-container-custom-css')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Tiles Global Style" >
                                    <div 
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-tile-custom-css')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Globaly Position Items" >
                                    <div class="borderRad4 padleft025 padright025" >
                                        <container-justify-items @change="containerJustifyItems" />
                                    </div>
                                </opt-container>
                                
                                <div id="end" ></div>
                            </div>
                        </v-fade-transition>
                        <!-- INDIVIDUAL SETTINGS -->
                        <v-fade-transition>
                            <div v-if="nodeSelectedIndex != undefined" style="gap:5px; overflow:hidden;" 
                            class="marginleft050 marginright050 flex spacebetween borderRad4 fullwidth"
                            >
                                <div id="start" ></div>

                                <opt-container title="Position" >
                                    C:
                                    <div @click="move('top',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-up-thick</v-icon>
                                    </div>
                                    <div @click="move('bottom',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-down-thick</v-icon>
                                    </div>
                                    <span class="marginleft050" >
                                        R:
                                    </span>
                                    <div @click="move('left',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-left-thick</v-icon>
                                    </div>
                                    <div @click="move('right',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-right-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Vertical Span" >
                                    <div @click="width('minus',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div @click="width('add',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Horizontal Span" >
                                    <div @click="height('minus',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div @click="height('add',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Tile View" >
                                    <div v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-cog</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Tile Inline Style" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-tile-custom-css')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Tile CSS Classes" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-tile-custom-css')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Z-Index" >
                                    <div class="borderRad4 paneBorder padleft025 padright025 marginright025">
                                        1
                                    </div>
                                    <div v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container title="Align Items" >
                                    <div v-ripple class="borderRad4 padleft025 padright025" >
                                        <container-justify-items @change="containerJustifyItems" />
                                    </div>
                                </opt-container>

                                <div id="end" ></div>
                            </div>
                        </v-fade-transition>
                        <div style="z-index:3" class="margintop025" >
                            <v-btn @click="ribbonScrollTo('end')" fab x-small text >
                                <v-icon>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tile presentation -->
            <section id="tile-presentation" style="overflow:auto; " class="flex1 grey lighten-5" >
                <v-fade-transition>
                    <div
                    v-if="ready"
                    class="wp-dash-grid relative " 
                    @keydown="keydown"
                    :id="`grid-${currentUid}`"
                    :style="{
                        ...gridContainerStyle,
                        'justify-items': gridContainerJustify,
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
                        ...tiles_global_style,
                        ...item.customStyle,
                    }"
                    >
                        <div class="relative fullheight-percent" >
                            <!-- dropDown component is handled by options.js -->
                            <div v-if="editMode && controlls.selection_tool === 'off'" style="right:0;background: #f5f5f5;" class="flex flexcenter spacebetween pad025 tile-btn absolute" >
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
                </v-fade-transition>
            </section>
        </div>
        <wp-modal v-if="modals.grid_settings == 'show'" class=" borderred">
            <div  v-if="editMode && !controlls.preview == 'on'" 
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
                        <span class="overline" > GRID CONTAINER INLINE STYLE </span> <br>
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
        </wp-modal>
        <!-- modal column editor -->
        <wp-modal v-if="modals.column_editor == 'show'">
            <div class="fullheight-percent fullwidth padbottom125"   >
                {{maxCol}} Columns 
                <columnEditor ref="colEditor" :maxCol="maxCol" :gridColumns="copy(gridColumns)" />
            </div>
        </wp-modal>
        <!-- modal grid container custom css -->
        <wp-modal v-if="modals.grid_container_inline_style == 'show'">
            <custom-css 
            :cssObject="gridContainerStyle"
            :el_id="'#grid-container-inline-style'" 
            style="min-width:400px;" >
            </custom-css>
        </wp-modal>
        <!-- inline style for all tiles in the grid -->
        <wp-modal v-if="modals.tiles_global_inline_style == 'show'">
            <custom-css
            ref="tiles_global_style"
            :cssObject="tiles_global_style"
            :el_id="'#inline-style-for-all-tiles'" 
            style="min-width:400px;" >
            </custom-css>
        </wp-modal>
        <!-- rename title -->
        <wp-modal v-if="modals.rename_title == 'show'"   >
            <div >
                <v-text-field v-model="projectTitle" ></v-text-field>
                <div @click="validateAndRenameProjectTitle" class="flex flexend" >
                    <v-btn>
                        Save
                    </v-btn>
                </div>
            </div>
        </wp-modal>
    </main>
</template>
// https://github.com/ThibaultJanBeyer/DragSelect
// https://github.com/ThibaultJanBeyer/dragNdrop
<script>
import m from '@/m'
import optionHandler from './mixins/options.js'
import undoRedo from '@/undo-redo.js'
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

import uHeader from './header/layout.vue'

export default {
    name: 'unitile',
    mixins: [m,optionHandler,undoRedo],
    components: {tileSettingPosition, tileSettingSize,tileSettingZIndex,tileView,gridGuides,
    customCss,customClasses,alignSelf,gridGap, containerJustifyItems, columnEditor, optContainer, uHeader},
    props: ['myData','config', 'paneIndex', 'hooks'],
    data: () => ({
        projectTitle: undefined,
        tiles: [],
        maxRows: 4,
        maxCol: 4,
        gridGap: 5,
        gridColumns: undefined,
        gridContainerStyle: {},
        gridContainerJustify: 'stretch',
        tiles_global_style: {},
        nodeSelectedIndex: undefined,
        minTileWidth: '50px',
        minTileHeight: '50px',
        ready: true,
        editMode: true,
        currentUid: undefined,
        useGridGuides: false,
        selectedNodesBySelectionTool: [],
        controlls: {
            preview: 'off',
            use_grid_guides: 'off',
            selection_tool: 'off'
        },
        modals: {
            grid_container_inline_style: 'hide',
            tiles_global_inline_style: 'hide',
            column_editor: 'hide',
            grid_settings: 'hide',
            rename_title: 'hide'
        }
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
                this.addSessionEntry()
            }, 0)
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
            setTimeout(() => {
                this.addSessionEntry()
            },0)
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
            if(this.nodeSelectedIndex != undefined && this.controlls.selection_tool == 'off') {
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
        AddNewTile(isClone,tileIndex) {
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
                tiles: this.tiles,
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles_global_style: this.tiles_global_style,
                gridColumns: this.gridColumns,
                gridContainerJustify: this.gridContainerJustify
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
            this.$set(this.controlls,'selection_tool',value ? 'on' : 'off')

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
            this.$set(this.controlls,'preview',state ? 'on' : 'off')
        },
        tileALignChange(value) {
            this.tiles[this.nodeSelectedIndex].align = value
        },
        containerCustomStyle(value) {
            console.log('container custom style', value)
        },
        containerJustifyItems(value) {
            this.gridContainerJustify = value
            this.addSessionEntry()
        },
        tileCustomStyle(cssObject) {
            this.tiles[this.nodeSelectedIndex].customStyle = cssObject
        },
        applyGridGap(value) {
            this.gridGap = value
            this.addSessionEntry()
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
                modalTitle: 'COLUMN EDITOR',
                isPlayable: true,
                viewTrigger: (v) => this.$set(this.modals,'column_editor',v ? 'show' : 'hide')
            })

            columnEditor.on('play', () => {
                this.gridColumns = this.$refs.colEditor.frs
                this.addSessionEntry()
                webpod.dash.modal.hide()
            })
        },
        handleRibbonContainerCmd(cmd,val) {
            console.log(cmd)

            if(cmd === 'grid-container-custom-css') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'GRID CONTAINER INLINE STYLE',
                    viewTrigger: (v) => this.$set(this.modals,'grid_container_inline_style',v ? 'show' : 'hide')
                })

                modal.on('data', (data) => {
                    this.gridContainerStyle = data
                })
            }

            if(cmd === 'grid-tile-custom-css') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'GRID TILES GLOBAL INLINE STYLE',
                    viewTrigger: (v) => this.$set(this.modals,'tiles_global_inline_style',v ? 'show' : 'hide')
                })

                modal.on('data', (data) => {
                    this.tiles_global_style = data
                })

                modal.on('show', () => {
                    this.$refs.tiles_global_style.onError = (err) => {
                        modal.emit('error', err)
                    }
                })
            }

            if(cmd === 'grid-columns') {
                this.changeGridColumn(val)
                this.addSessionEntry()
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
        },
        headerTitleClick() {
            webpod.dash.modal.show({
                modalTitle: 'Rename Title',
                viewTrigger: (v) => this.$set(this.modals, 'rename_title', v ? 'show' : 'hide')
            })
        },
        validateAndRenameProjectTitle() {
            //validate and confirm project title renaming
            console.log(this.projectTitle)
        },
        handleHeaderCommand(command) {
            if(command == 'Redo') {
                this.Redo()
            }
            if(command == 'Undo') {
                this.Undo()
            }
            if(command == 'AddNewTile') {
                this.AddNewTile()
            }
            if(command == 'SaveLayout') {
                this.saveLayout()
            }
        }
    },
    mounted() {
        // bottom alert
        const welcomMsg = webpod.dash.bottomAlert('Welcome to Unitile v-0.1', 'learn more')
        welcomMsg.on('btn-click', () => {
            // show documentation in modal
        })

        // sidebar cog
        const cog = webpod.dash.cog.show()
        cog.on('click', () => {
            webpod.dash.modal.show({
                modalTitle: 'GRID SETTINGS',
                viewTrigger: (v) => this.$set(this.modals,'grid_settings',v ? 'show' : 'hide')
            })
        })
        
        // when toggling pane hide the cog
        webpod.session.onPaneToggle = (currentIndex) => {
            if(this.paneIndex != currentIndex) {
                webpod.dash.cog.hide()
            } else {
                setTimeout(() => {
                    const x = webpod.dash.cog.show()
                    x.on('click', () => {
                        webpod.dash.modal.show({
                            modalTitle: 'GRID SETTINGS',
                        })
                    })
                }, 100)
            }
        }

        // for undo and redo manager
        this.setSessionTrackData(() => {
            return {
                tiles: this.tiles,
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles_global_style: this.tiles_global_style,
                gridColumns: this.gridColumns,
                gridContainerJustify: this.gridContainerJustify
            }
        })

        this.session.onUndoRedo = ({tiles, gridGap, maxCol, gridColumns, gridContainerStyle, tiles_global_style, gridContainerJustify}) => {
            // data contains the tracked content
            this.changeGridColumn(maxCol)
            this.tiles = tiles
            this.gridGap = gridGap
            this.gridContainerStyle = gridContainerStyle
            this.tiles_global_style = tiles_global_style
            this.gridColumns = gridColumns
            this.gridContainerJustify = gridContainerJustify
        }

        this.session.onMsg = (msg) => {
            webpod.dash.bottomAlert(msg)
        }


    },
    beforeDestroy() {
        webpod.dash.cog.hide()
        this.nodeSelectedIndex = undefined
        this.tiles = []
        this.refresh()

        // clear undoRedo session
        this.clearSession()
    },
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert
        webpod.session.allowOverflow = false

        if(this.myData) {
            this.projectTitle = this.myData.title

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
