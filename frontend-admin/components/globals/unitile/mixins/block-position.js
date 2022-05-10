export default {
    methods: {
        move(moveDirection,multiple,index) {

            if(moveDirection == 'right') {
                const moveRight = (i) => {
                    if(this.tiles[i].colEnd != this.maxCol + 1) {
                        this.tiles[i].colStart = this.tiles[i].colStart + 1
                        this.tiles[i].colEnd = this.tiles[i].colEnd + 1
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveRight(index)
                    })
                } else {
                    moveRight(index)
                }
            }
            if(moveDirection == 'left') {
                const moveLeft = (i) => {
                    if(this.tiles[i].colStart + 1 != 2 ) {
                        this.tiles[i].colStart = this.tiles[i].colStart - 1
                        this.tiles[i].colEnd = this.tiles[i].colEnd - 1
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveLeft(index)
                    })
                } else {
                    moveLeft(index)
                }
            }
            if(moveDirection == 'top') {
                const moveTop = (i) => {
                    if(this.tiles[i].rowStart + 1 != 2 ) {
                        this.tiles[i].rowStart = this.tiles[i].rowStart - 1
                        this.tiles[i].rowEnd = this.tiles[i].rowEnd - 1
                        this.removeUnwantedRows()
                    } 
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveTop(index)
                    })
                } else {
                    moveTop(index)
                }
            }
            if(moveDirection == 'bottom') {
                const moveBottom = (i) => {
                    
                    this.tiles[i].rowStart = this.tiles[i].rowStart + 1

                    const newRowEndVal = this.tiles[i].rowEnd + 1
                    this.tiles[i].rowEnd = newRowEndVal

                    this.tiles[i].rowEnd = newRowEndVal
                    this.$nextTick(() => {
                        if((newRowEndVal - 1) >  this.maxRows) {
                            this.maxRows++
                        }
                    })
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveBottom(index)
                    })
                } else {
                    moveBottom(index)
                }
            }
            this.$nextTick(() => {
                this.addSessionEntry()
            })
        },
    }
}