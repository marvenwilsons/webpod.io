export default {
    data: () => ({
        sessionHistoryCollection: [],
        sessionHistoryPointer: 0,
        undoBtnIsDisabled: false,
        redoBtnIsDisabled: false,
        initialTileSetIsEmpty: false
    }),
    watch: {
        sessionHistoryPointer() {
            const pointer = this.sessionHistoryPointer
            this.undoBtnIsDisabled = pointer == 0
            this.redoBtnIsDisabled = pointer == this.sessionHistoryCollection.length - 1
        }
    },
    methods: {
        addSessionEntry(tileSet) {
            if(this.sessionHistoryPointer != this.sessionHistoryCollection.length - 1) {
                // overwriting history

                // remove all items in the array starting from the specified index
                this.sessionHistoryCollection.splice(this.sessionHistoryPointer)
                setTimeout(() => {
                    // push a new history entry
                    this.sessionHistoryCollection.push(tileSet)
                    this.sessionHistoryPointer = this.sessionHistoryCollection.length - 1
                },0)
            } else {
                this.sessionHistoryCollection.push(tileSet)
                this.sessionHistoryPointer = this.sessionHistoryCollection.length - 1
            }

        },
        undo() {
            this.sessionHistoryPointer --
            const pointer = this.sessionHistoryPointer

            if(pointer == 0) {
                if(this.initialTileSetIsEmpty == true) {
                    this.tiles = []
                    this.refresh()
                }
            }

            this.tiles = this.sessionHistoryCollection[pointer]

        },
        redo() {
            this.sessionHistoryPointer ++
            const pointer = this.sessionHistoryPointer
            this.tiles    = this.sessionHistoryCollection[pointer]
        }
    },
    mounted() {
        if(this.tiles.length == 0) {
            this.sessionHistoryCollection.push([])
            this.initialTileSetIsEmpty = true
        } else {
            this.sessionHistoryCollection.push(this.tiles)
        }
    }
}