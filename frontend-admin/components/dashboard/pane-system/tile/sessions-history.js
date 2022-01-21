export default {
    data: () => ({
        sessionHistoryCollection: [],
        sessionHistoryPointer: 0,
        undoBtnIsDisabled: false,
        redoBtnIsDisabled: false,
        initialTileSetIsEmpty: false
    }),
    methods: {
        addSessionEntry(tileSet) {
            this.sessionHistoryCollection.push(tileSet)
            this.sessionHistoryPointer = this.sessionHistoryCollection.length - 1
        },
        undo() {
            this.sessionHistoryPointer --
            const pointer = this.sessionHistoryPointer

            if(pointer == 0) {
                this.undoBtnIsDisabled = true
                if(this.initialTileSetIsEmpty == true) {
                    this.tiles = []
                    this.refresh()
                } else {
                    this.tiles = this.sessionHistoryCollection[pointer]
                }
            } else {
                this.tiles = this.sessionHistoryCollection[pointer]
                this.undoBtnIsDisabled = false
                this.redoBtnIsDisabled = false
            }
        },
        redo() {
            this.sessionHistoryPointer ++
            const pointer = this.sessionHistoryPointer

            if(pointer == this.sessionHistoryCollection.length - 1) {
                this.redoBtnIsDisabled = true
            } else {
                this.redoBtnIsDisabled = false
                this.undoBtnIsDisabled = false
            }

            this.tiles = this.sessionHistoryCollection[pointer]
        }
    },
    mounted() {
        if(this.tiles.length == 0) {
            this.sessionHistoryCollection.push('empty')
            this.initialTileSetIsEmpty = true
        } else {
            this.sessionHistoryCollection.push(this.tiles)
        }
    }
}