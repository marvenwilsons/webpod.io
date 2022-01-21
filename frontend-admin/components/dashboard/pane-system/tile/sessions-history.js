export default {
    data: () => ({
        sessionHistoryCollection: [],
        undoPointer: 0,
        undoBtnIsDisabled: true,
        redoBtnIsDisabled: true,
    }),
    watch: {
        sessionHistoryCollection(sessionHistory) {
            if(sessionHistory.length > 0) {
                this.undoBtnIsDisabled = false
                this.redoBtnIsDisabled = false
            } else {
                this.undoBtnIsDisabled = true
                this.redoBtnIsDisabled = true
            }
        },
        undoPointer(point) {
            if(point === -1) {
                this.undoBtnIsDisabled = true
            }
        }
    },
    methods: {
        addSessionEntry(tileSet) {
            this.sessionHistoryCollection.push(this.copy(tileSet))
            this.undoPointer = this.sessionHistoryCollection.length - 1
        },
        undo() {
            console.log(this.undoPointer)

            this.tiles = this.sessionHistoryCollection[this.undoPointer]
            console.log(this.sessionHistoryCollection[this.undoPointer])
            this.undoPointer--

            // console.log(this.undoPointer)
        },
        redo() {

        },
        replacePartsOfSessionHistoryCollection(sessionIndex) {

        }
    },
    mounted() {
        // this.undoPointer = this.sessionHistoryCollection.length + 1
    } 
}