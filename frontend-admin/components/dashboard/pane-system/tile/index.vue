<template>
    <main :class="['flex spacebetween fullheight-percent', editMode ? 'paneBorder' : '']" >
        <div :class="['fullwidth flex flexcol']" 
        :style="{'max-width': !editMode && '1920px'}" >
            <!-- ribbon -->
            <div>
                <div v-if="editMode" style="background:#fbfbfb" class="flex spacebetween  flexcenter pad050" >
                    <div class="flex" >
                        <el-tooltip  class="pad025" content="Add new tile" effect="light" placement="top-start" >
                        <v-btn plain small @click="addNewTile" >
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </v-btn>
                        </el-tooltip>
                        <div v-if="sessionHistoryCollection && sessionHistoryCollection.length" >
                            <el-tooltip  class="pad025" content="Undo" effect="light" placement="top-start" >
                                <v-btn :disabled="undoBtnIsDisabled" @click="undo" plain small >
                                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
                                    </svg>
                                </v-btn>
                            </el-tooltip>
                            <el-tooltip  class="pad025" content="Redo" effect="light" placement="top-start" >
                                <v-btn :disabled="redoBtnIsDisabled" @click="redo" plain small >
                                    <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
                                    </svg>
                                </v-btn>
                            </el-tooltip>
                        </div>
                    </div>
                    <v-btn plain @click="saveLayout" >
                        Save
                    </v-btn>
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
                        'grid-template-columns': `repeat(${maxCol}, 1fr)`
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
                    :key="item_index" 
                    class="wp-dash-grid-item flex flexcol pointer" 
                    :style="{
                        'grid-area':`${item.id}`,
                        'grid-row-start':item.rowStart,
                        'grid-row-end':item.rowEnd,
                        'grid-column-start':item.colStart,
                        'grid-column-end':item.colEnd,
                        'overflow':'auto',
                        background:'white',
                        ...item.customStyle,
                    }"
                    >
                        <div class="relative fullheight-percent" >
                            <div v-if="editMode" style="right:0;background: #f5f5f5;" class="flex flexcenter spacebetween pad025 tile-btn absolute" >
                                <input class="marginleft025" @change="(e) => {nodeSelect(e,item_index)}" v-model="item.selected" type="checkbox">
                                <!-- dropDown component is handled by options.js -->
                                <dropDown
                                    :svgTrigger="'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'"
                                    :options="options"
                                    :divideOptionsBefore="['Move down','Expand height','100% width']"
                                    :disabledOptions="disabledOptions"
                                    @command="(cmd) => {handleDropDownCommand(cmd,item_index,item,tiles)}"
                                />
                            </div>
                            <div class="fullheight-percent"  >
                                <!-- view content here -->
                                col:{{item.colStart}}-{{item.colEnd}} <br>
                                row:{{item.rowStart}}-{{item.rowEnd}}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="editMode" 
        style="max-width:350px; min-width:350px; background:#fbfbfb; font-family: 'Menlo'; overflow: auto; border-left: 1px solid #36363618;" 
        class="pad125 text-small" >
            <div v-if="nodeSelectedIndex != undefined" >
                <tile-setting-position/>
                    <v-divider />
                <tile-setting-size></tile-setting-size>
                    <v-divider />
                <tile-setting-z-index />
                    <v-divider />
                <tile-view />
                    <v-divider />
                <tile-custom-css />
            </div>
            <div v-else class="flex flexcol" >
                <span class="overline" >GRID SETTINGS</span>
                <span class="overline" >TILE CUSTOM STYLE</span>
                <span class="text-small" >Style to be applied on every tile</span>
                <span class="overline" >SERVICE SETTINGS</span>
            </div>
        </div>
    </main>
</template>

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

export default {
    mixins: [m,optionHandler,sessionHistory],
    components: {tileSettingPosition, tileSettingSize,tileSettingZIndex,tileView,gridGuides,
    tileCustomCss
    },
    data: () => ({
        tiles: [],
        maxRows: 4,
        maxCol: 6,
        nodeSelectedIndex: undefined,
        minTileWidth: '50px',
        minTileHeight: '50px',
        ready: true,
        editMode: true,
        currentUid: undefined,
        useGridGuides: false
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
                    console.log(this.tiles[index].colEnd, this.maxCol)
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
            if(this.nodeSelectedIndex != undefined) {
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
                    isAClone: this.tiles[tileIndex].id
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
                    customStyle: {}
                })
            }
            
            this.clearSelectedNode()
            setTimeout(() => {
                this.addSessionEntry(this.copy(this.tiles))
            },0)
        },
        saveLayout() {
            console.log('saving layout',this.tiles)
        },
        refresh() {
            this.ready = false
            setTimeout(() => {
                this.ready = true
            },100)
        }
    },
    created() {
        this.currentUid = this.uid()
    }
}
</script>

<style>
.wp-dash-grid {
    /* display: grid;
    grid-template-columns: ;
    grid-gap: 1em;
    grid-auto-rows: minmax(100px, auto) */
    display: grid;
    grid-gap: 5px;
    /* column-gap: 20px; */
    /* grid-template-columns: repeat(4, 1fr); */
    /* grid-template-rows: repeat(4, 100px); */
    /* grid-template-columns: repeat(10, 200px); */
    /* grid-auto-rows: minmax(50px, auto); */
    /* grid-template-areas: 
        'comp1 comp1 comp1'
    ; */
    padding: 10px;
    transition: 1s !important;
}
/* .wp-dash-grid-item:hover > div > .tile-btn {
    display: flex !important;
    transition: 0.3ms !important;
} */

.tile-item > button {
    padding: 0 !important;
}
.text-gray {
    color: #737373;
}
</style>
