import layoutUtil from './layouts'
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
            console.log('***     ALTER SCREEN')
            if(val && typeof val == 'object') {
                this.screens = this.copy(val)
            }
        },
        dropScreenItem(rangeStringToBeDropped) {
            /**
             * This function performs:
             * 1. Delete one property from screens object in a reactive way
             * 2. Produce new keys for the screens object
             * 
             * After every deletion from screens object, the remaining property from screens object
             * needs to be adjusted or renamed because the keys represents a range of widths 
             * 
             * for example we have this ranges ['700-Infinity','700-300','300-1']
             * each item of this ranges represents widths for example '700-Infinity' means from 700px to Infinity
             * or from 700px width to 300px width.
             * 
             * the input of the function is a range string, example '700-300'
             * lets say we delete '700-300' to the current ranges,
             * the ranges will now look like this --> ['700-Infinity','300-1']
             * the problem now is the range '700-300' is blank we need to readjust the ranges so that there
             * will be no blanks.
             * 
             * the target output after perfoming the re-adjustments is ['300-Infinity','300-1']
             */
            
            let val = rangeStringToBeDropped

            if(val && typeof val == 'string') {
                if(this.screens[val] == undefined) {
                    /**
                     * Display error if the key is not found in the screens object
                     */
                    webpod.dash.bottomAlert(`There is no such "${layoutUtil.flipLayoutRange(val)}" range in screens array! `)
                } else {
                    /**
                     * val sample input --> '100-500' --> format is 'min-max'
                     * this code extracts the max value then converts it to number because it currently string
                     */
                    const targetMax = parseFloat(val.split('-')[1])

                    /**
                     * get the max values of the screens object
                     * the screens object sample input: {'300-Infinity': {...}, '700-1': {...}}
                     * sample output of getLayoutKeys(this.screens).max function is: [Infinity,300]
                     */
                    const ranges = layoutUtil.getLayoutKeys(this.screens).max

                    /**
                     * remove one the target range
                     * sample input: ranges an array of number  --> ['Infinity','700','100']
                     * sample input: targetMax a number         --> 700
                     * sample output: [Infinity,100] the value 700 is now removed
                     */
                    ranges.splice(ranges.indexOf(targetMax),1)
                    
                    /**
                     * sample input of ranges: ['Infinity','700','100']
                     * sample output of layoutUtil.constructLayoutRange(ranges).minMax function
                     * ['700-Infinity','700-100','100-1'] <-- newRangeSet
                     */
                    const newRangeSet = layoutUtil.constructLayoutRange(ranges).minMax
                    
                    /**
                     * Removing the screen property
                     * I am using the vue's $delete function for reactivity, UI needs to update
                     */
                    this.$delete(this.screens,val)


                    const temp = {}

                    newRangeSet.map((rangeString,rangeIndex) => {
                        /**
                         * 1. Assign the new range or key
                         * 2. Assign the new value to the new range object
                         * 3. save to temp object
                         */
                        temp[Object.entries(this.screens)[0] = rangeString] = 
                        Object.entries(this.screens)[rangeIndex][1]
                    })
                    

                    /**
                     * update the scrrens object width sorted keys
                     */
                    this.screens = this.sortScreenObjectKeysMaxToMin(temp)
                }
            }
        },
        alterScreenItem({key,val}) {
            console.log('*** ALTER SCREEN ITEM')
            if(this.screens[key] != undefined) {
                this.$set(this.screens,key,val)
            } else {
                console.error(`Error while altering screen item, key "${key}" returns undefined!`)
            }
        },
        sortScreenObjectKeysMaxToMin(screensObject) {
            // sort, you cant see it on console.log(obj)
            // you can also see it in Object.entries
            const f = {}

            const layoutKeys = layoutUtil.getLayoutKeys(screensObject).max.sort((a,b) => b-a)

            layoutKeys.map(e => {
                Object.entries(screensObject).map(entries => {
                    const k = entries[0].split('-')[1]
                    if(k && (`${e}`).includes(k) ) {
                        f[entries[0]] = entries[1]
                    }
                })
            })

            return f
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

            const screens = this.sortScreenObjectKeysMaxToMin(this.copy(this.myData.screens))
            this.alterScreen(screens)

        } else {
            _alert('Error: unitile data is undefined')
        }
    }
}