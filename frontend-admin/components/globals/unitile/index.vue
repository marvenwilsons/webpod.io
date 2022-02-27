<template>
    <main :class="['flex spacebetween fullheight-percent', editMode ? '' : '']" >
        <div :class="['fullwidth flex flexcol']" 
            :style="{'max-width': !editMode && '1920px', 
                'border': editMode ? '1px solid #d3d3d3' : '', 
            }" 
        >
            <!-- ribbon -->
            <div>
                <div v-if="editMode" style="background:#fbfbfb" class="flex spacebetween  flexcenter pad050" >
                    <div class="flex" >
                        <el-tooltip  class="pad025" content="Add new tile" effect="light" placement="top-start" >
                            <v-btn :disabled="selectionToolIsActivated || previewIsOn" icon plain small @click="addNewTile" >
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </v-btn>
                        </el-tooltip>
                        <div v-if="sessionHistoryCollection && sessionHistoryCollection.length" >
                            <el-tooltip  class="pad025" content="Undo" effect="light" placement="top-start" >
                                <v-btn icon :disabled="undoBtnIsDisabled || previewIsOn" @click="undo" plain small >
                                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
                                    </svg>
                                </v-btn>
                            </el-tooltip>
                            <el-tooltip  class="pad025" content="Redo" effect="light" placement="top-start" >
                                <v-btn icon :disabled="redoBtnIsDisabled || previewIsOn" @click="redo" plain small >
                                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
                                    </svg>
                                </v-btn>
                            </el-tooltip>
                        </div>
                    </div>
                    <div>
                        <el-tooltip  class="pad025" content="Preview on" effect="light" placement="top-start" >
                            <v-btn v-if="!previewIsOn" @click="preview(true)" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
                                </svg>
                            </v-btn>
                        </el-tooltip>
                        <el-tooltip  class="pad025" content="Preview off" effect="light" placement="top-start" >
                            <v-btn v-if="previewIsOn" @click="preview(false)" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" />
                                </svg>
                            </v-btn>
                        </el-tooltip>
                        <el-tooltip  class="pad025" :content="!selectionToolIsActivated ? 'Activate selection tool' : 'Deactivate selection tool'" effect="light" placement="top-start" >
                            <v-btn :disabled="previewIsOn" @click="activateSelectionTool(true)" v-if="selectionToolIsActivated == false" plain  icon class="pointer flex flexccenter pad025 ribbon-item" >
                                <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z" />
                                </svg>
                            </v-btn>
                            <v-btn :disabled="previewIsOn" @click="activateSelectionTool(false)" v-if="selectionToolIsActivated == true" plain  icon class="pointer flex flexccenter pad025 ribbon-item"  >
                                <svg  style="width:20px;height:20px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M21 20C21 20.55 20.55 21 20 21H19V19H21V20M15 21V19H17V21H15M11 21V19H13V21H11M7 21V19H9V21H7M4 21C3.45 21 3 20.55 3 20V19H5V21H4M3 15H5V17H3V15M21 15V17H19V15H21M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8M3 11H5V13H3V11M21 11V13H19V11H21M3 7H5V9H3V7M21 7V9H19V7H21M4 3H5V5H3V4C3 3.45 3.45 3 4 3M20 3C20.55 3 21 3.45 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7Z" />
                                </svg>
                            </v-btn>
                        </el-tooltip>
                    <el-tooltip  class="pad025" content="Refresh Editor" effect="light" placement="top-start" >
                        <v-btn plain @click="refresh" icon class="pointer flex flexccenter pad025 ribbon-item" >
                            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="gray" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                            </svg>
                        </v-btn>     
                    </el-tooltip>
                    </div>
                    <el-tooltip  class="pad025" content="Save Layout" effect="light" placement="top-start" >
                        <v-btn plain icon @click="saveLayout" >
                            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                            </svg>
                        </v-btn>
                    </el-tooltip>
                </div>
            </div>
            <!-- tile presentation -->
            <section id="tile-presentation" style="overflow:auto;" class="flex1" >
                <div
                    v-if="ready"
                    class="wp-dash-grid relative" 
                    @keydown="keydown"
                    :id="`grid-${currentUid}`"
                    :style="{
                        'grid-template-rows': `repeat(${maxRows}, ${minTileHeight})`,
                        'min-width': `${minTileWidth}`,
                        'grid-template-columns': `repeat(${maxCol}, 1fr)`,
                        'grid-gap': gridGap

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
        <div v-if="editMode && !previewIsOn" 
            style="max-width:350px; min-width:350px; background:#fbfbfb; font-family: 'Menlo'; overflow: auto; 
            border-top: 1px solid #d3d3d3;
            border-bottom: 1px solid #d3d3d3;
            border-right: 1px solid #d3d3d3;
            " 
            class="pad125 text-small" 
        >
            <div v-if="nodeSelectedIndex != undefined" >
                <tile-setting-position/>
                    <v-divider />
                <tile-setting-size></tile-setting-size>
                    <v-divider />
                <tile-setting-z-index />
                    <v-divider />
                <align-self />
                    <v-divider />
                <tile-view />
                    <v-divider />
                <tile-custom-css v-if="ready" />
                    <v-divider />
                <custom-classes />
            </div>
            <div v-else class="flex flexcol" >
                <span class="overline" >GRID SETTINGS</span>

                <span class="overline" >TILE CUSTOM STYLE</span>
                <span class="text-small" >Style to be applied on every tile</span>
            </div>
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

import tileSettingPosition from './tile-s-position.vue'
import tileSettingSize from './tile-s-size.vue'
import tileSettingZIndex from './tile-s-z-index.vue'
import tileView from './tiles-s-view.vue'
import tileCustomCss from './tile-custom-css.vue'
import customClasses from './cutom-classes.vue'
import alignSelf from './self-align.vue'

export default {
    mixins: [m,optionHandler,sessionHistory],
    components: {tileSettingPosition, tileSettingSize,tileSettingZIndex,tileView,gridGuides,
    tileCustomCss,customClasses,alignSelf
    },
    props: ['myData','config', 'paneIndex', 'hooks'],
    data: () => ({
        tiles: [],
        maxRows: 4,
        maxCol: 4,
        gridGap: '5px',
        nodeSelectedIndex: undefined,
        minTileWidth: '50px',
        minTileHeight: '50px',
        ready: true,
        editMode: true,
        currentUid: undefined,
        useGridGuides: false,
        selectionToolIsActivated: false,
        selectedNodesBySelectionTool: [],
        previewIsOn: false
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
            this.hooks.onSaveLayout(this.tiles)
            webpod.server.apps.update(this.tiles, (response) => {
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
        }
    },
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert

        const {instances} = this.myData

        if(this.myData) {
            if(!Array.isArray(this.myData)) {
                _alert(`Error: Expected array but got an ${typeof this.myData}`)
            } else {
                
                if(Object.keys(this.config).includes('editable')) {
                    this.editMode = this.config.editable
                } else {
                    _alert('Error: Cannot find editable property in viewConfig, defaulting to read only mode.')
                    this.editMode = false
                }

                let largestRowEnd = 0
                this.myData.map(item => {
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

                this.maxRows = largestRowEnd + 2
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
}
</style>
