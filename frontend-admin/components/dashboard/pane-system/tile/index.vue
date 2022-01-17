<template>
    <div>
        <v-btn @click="addNewTile" >
            Add New Tile
        </v-btn>
        <div
            class="wp-dash-grid" 
            :style="{'grid-template-rows': `repeat(${maxRows}, 100px)`,}"
            @keydown="keydown"
            >
            <div v-for="(item,item_index) in tiles" 
            :key="item_index" 
            class="wp-dash-grid-item flex flexcol paneBorder borderRad4 pointer" 
            :style="{
                'grid-area':`${item.id}`,
                'grid-row-start':item.rowStart,
                'grid-row-end':item.rowEnd,
                'grid-column-start':item.colStart,
                'grid-column-end':item.colEnd,
                'overflow':'auto'
            }"
            >
                <div>
                    <!-- <h6 style="margin:0;" >{{item.name}} : {{item.id}}</h6> -->
                    <div>
                        <input @change="(e) => {nodeSelect(e,item_index)}" v-model="item.selected" type="checkbox">
                    </div>
                    <!-- <div class="pad025 paneBorder margin050 flex flexcol" >
                        <strong>row ⇅</strong>
                        <div>start: <input v-model="item.rowStart" type="number"></div>
                        <div>end: <input v-model="item.rowEnd" type="number"></div>
                    </div>
                    <div class="pad025 paneBorder margin050 flex flexcol" >
                        <strong>column ⭤ </strong>
                        <div>start: <input v-model="item.colStart" type="number"></div>
                        <div>end: <input v-model="item.colEnd" type="number"></div>
                    </div> -->
                    <div class="pad025 paneBorder margin050 flex flexcol" >
                        <strong>move {{maxRows}}</strong>
                        <div class="flex spacearound" >
                            <v-btn @click="move('left',item.id,item_index)" small >
                                left {{item.colStart}} | {{item.colEnd}}
                            </v-btn>
                            <v-btn @click="move('right',item.id,item_index)" small >
                                right {{item.colStart}} | {{item.colEnd}}
                            </v-btn>
                        </div>
                        <div class="flex spacearound margintop050" >
                            <v-btn @click="move('top',item.id,item_index)" small >
                                top {{item.rowStart}} | {{item.rowEnd}}
                            </v-btn>
                            <v-btn @click="move('bottom',item.id,item_index)" small >
                                bottom {{item.rowStart}} | {{item.rowEnd}}
                            </v-btn>
                        </div>
                        <hr>
                        <div class="flex flexcol spacearound paneBorder margin050" >
                            <v-btn @click="height('add',item.id,item_index)" small >
                                add height
                            </v-btn>
                            <v-btn @click="height('minus',item.id,item_index)" small >
                                minus height
                            </v-btn>
                        </div>
                        <div class="flex flexcol spacearound paneBorder margin050" >
                            <v-btn @click="width('add',item.id,item_index)" small >
                                add width
                            </v-btn>
                            <v-btn @click="width('minus',item.id,item_index)" small >
                                minus width
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * Requirement and features for drag n drop behaviour
 * Parent of draggable element
 *  - should contain all the child draggable elements
 *  - should show the grid tiles in background on edit mode
 * Child elemenet (draggable)
 *  - abilitiy to resize its width and height
 *  - should not colide to other draggable element
 * 
 *  rules of defining a layout in upParsedLayout
 *  - if define in one row
 */
import m from '@/m'
export default {
    mixins: [m],
    data: () => ({
        areaNames: ['one','two','three','four','five','six','seven','eight','nine','ten'],
        tiles: [
            {name: 'comp2', id:'comp2_a', rowStart: 1, rowEnd: 2, colStart: 1, colEnd: 2, selected: false},
            {name: 'comp22', id:'comp2_b', rowStart: 1, rowEnd: 2, colStart: 1, colEnd: 2, selected: false},
            // {name: 'comp1', id:'comp1_a', rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1},
            // {name: 'comp1', id:'comp1_b', rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1},
        ],
        maxRows: 4,
        nodeSelectedIndex: undefined
    }),
    watch: {
        nodeSelectedIndex(e) {
            console.log(e)
        }
    },
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

                console.log('maxRowEnd', maxRowEnd, 'maxRows', this.maxRows)
            }
        },  
        move(moveDirection,id,index) {
            if(moveDirection == 'right') {
                if(this.tiles[index].colStart - 1 != 3 ) {
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
        },
        height(mode,id,index) {
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
                if(this.tiles[index].colEnd != 5) {
                    this.tiles[index].colEnd = this.tiles[index].colEnd + 1
                }   
            }
            if(mode == 'minus') {
                if(this.tiles[index].colEnd != 2) {
                    this.tiles[index].colEnd = this.tiles[index].colEnd - 1
                }

            }
        },
        nodeSelect(e,index) {
            if(e.target.value == 'on') {
                this.tiles[index].selected = true
                this.tiles.map((tile,tile_index) => {
                    if(tile.selected) {
                        if(tile_index != index) {
                            this.tiles[tile_index].selected = false
                        }
                    }
                })
                this.nodeSelectedIndex = index
            } else {
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
        addNewTile() {
            this.tiles.push({name: 'comp22', id:this.uid(), rowStart: 1, rowEnd: 2, colStart: 1, colEnd: 2, selected: false})
        }
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
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(4, 100px); */
    /* grid-template-columns: repeat(10, 200px); */
    /* grid-auto-rows: minmax(50px, auto); */
    /* grid-template-areas: 
        'comp1 comp1 comp1'
    ; */
    padding: 10px;
    transition: 1s !important;
}
.wp-dash-grid-item {
    background: white !important;
}
</style>
