export default {
    data: () => ({
        // Editor data of a specific screen
        projectTitle: undefined,
        tiles: [],
        maxRows: 4,
        maxCol: 4,
        gridGap: 5,
        gridColumns: undefined,
        gridContainerStyle: {},
        gridContainerJustify: 'stretch',
        tiles_global_style: {},
        tile_inline_style: {},
        minTileWidth: '50px',
        minTileHeight: '50px',
        lastEdited: 'A minute ago',
        screens: {
            default: null
        }
    }),
    methods: {
        getEditorData() {
            return {
                projectTitle: this.projectTitle,
                tiles: this.tiles,
                maxRows: this.maxRows,
                maxCol: this.maxCol,
                gridGap: this.gridGap,
                gridColumns: this.gridColumns,
                gridContainerStyle: this.gridContainerStyle,
                gridContainerJustify: this.gridContainerJustify,
                tiles_global_style: this.tiles_global_style,
                tile_inline_style: this.tile_inline_style,
                nodeSelectedIndex: this.nodeSelectedIndex,
                minTileWidth: this.minTileWidth,
                minTileHeight: this.minTileHeight,
                screens: this.screens
            }
        },
        alterProjectTitle(val) {
            if(val && typeof val == 'string') {
                this.projectTitle = val
            }
        },
        alterTiles(val,cb) {
            if(val && val != undefined && Array.isArray(val)) {
                this.tiles = val
            }
        },
        alterMaxRows(val,cb) {
            if(val && typeof val == 'number') {
                this.maxRows = val
            }
        },
        alterMaxCol(val,cb) {
            if(val && typeof val == 'number') {
                this.maxCol = val
            }
        },
        alterGridGap(val,cb) {
            this.gridGap = val
        },
        alterGridContainerStyle(val,cb) {
            this.gridContainerStyle = val
        },
        alterMaxRows(val,cb) {
            this.maxRows = val
        },
        alterGridColumns(val,cb) {
            if(val) {
                this.gridColumns = val
            } else {
                console.error('Error while altering gridColumn')
                cb(true)
            }
        },
        alterGridContainerJustify(val) {
            if(val && typeof val == 'string') {
                this.gridContainerJustify = val
            }
        },
        alterTilesGlobalStyle(val) {
            if(val && typeof val == 'object') {
                this.tiles_global_style = val
            }
        },
        alterTilesInlineStyle(val) {
            if(val && typeof val == 'object') {
                this.tile_inline_style = val
            }
        },
        alterMinTileWidth(val) {
            if(val && typeof val == 'number') {
                this.minTileWidth = val
            }
        },
        alterMinTileHeight(val) {
            if(val && typeof val == 'number') {
                this.minTileHeight = val
            }
        },
        alterScreen(val) {
            if(val && typeof val == 'object') {
                this.screens = this.copy(val)
            }
        },
        dropScreenItem(val) {
            if(val && typeof val == 'string') {
                this.$delete(this.screens,val)
            }
        },
        alterScreenItem({key,val}) {
            if(this.screens[key] != undefined) {
                this.$set(this.screens,key,val)
            } else {
                console.error(`Error while altering screen item, key "${key}" returns undefined!`)
            }
        },
        alterLastEdited(val) {

        }
     },
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert
        webpod.session.allowOverflow = false

        const data = this.getTileContents()
        if(data) {
            let largestRowEnd = 0
            data.tiles.map(item => {
                item.selected = false
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
            this.alterProjectTitle(data.title)
            this.alterMaxCol(data.maxCol)
            this.alterGridGap(data.gridGap)
            this.alterGridContainerStyle(data.gridContainerStyle)
            this.alterMaxRows(largestRowEnd + 2)
            this.alterGridColumns(data.gridColumns, (err) => {
                if(err) {
                    let col = []
                    for(let i = 0; i < this.maxCol; i++) {
                        col.push(`1fr`)
                    }
                    this.alterGridColumns(col)
                }
            })
            this.alterScreen(this.copy(this.myData.screens))

        } else {
            _alert('Error: unitile data is undefined')
        }
    }
}