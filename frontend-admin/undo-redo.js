export default {
    data: () => ({
        sessionHistoryCollection: [],
        sessionHistoryPointer: 0,
        overwriteMode: false,
        sdata: undefined,
        session: {
            onUndoRedo: () => {}
        }
    }),
    watch: {
        sessionHistoryPointer() {
            if(this.sessionHistoryPointer != this.sessionHistoryCollection.length - 1) {
                this.overwriteMode = true
            } else {
                this.overwriteMode = false
            }
        }
    },
    methods: {
        addSessionEntry() {
            const uid = this.uid()

            if(this.overwriteMode == false) {
                this.sessionHistoryCollection.push(uid)
                if(this.sessionHistoryCollection.length > 0) {
                    this.sessionHistoryPointer = this.sessionHistoryCollection.length - 1
                    this.sessionData((d) => {
                        window.sessionStorage.setItem(`${uid}`, JSON.stringify(d));
                    })
                }
            } else {
                this.sessionHistoryCollection.splice(this.sessionHistoryPointer + 1)
                this.sessionHistoryCollection.push(uid)
                this.sessionData((d) => {
                    window.sessionStorage.setItem(`${uid}`, JSON.stringify(d));
                })
                this.sessionHistoryPointer = this.sessionHistoryCollection.length - 1
            }
        },
        Undo() {
            if(this.sessionHistoryPointer != 0) {
                const decrement = (cb) => {
                    this.sessionHistoryPointer = this.sessionHistoryPointer - 1
                    cb()
                }

                decrement(() => {
                    this.session.onUndoRedo(JSON.parse(sessionStorage.getItem(this.sessionHistoryCollection[this.sessionHistoryPointer])))
                })
            }
        },
        Redo() {
            if(this.sessionHistoryPointer != this.sessionHistoryCollection.length - 1) {
                const increment = (cb) => {
                    this.sessionHistoryPointer = this.sessionHistoryPointer + 1
                    cb()
                }

                increment(() => {
                    this.session.onUndoRedo(JSON.parse(sessionStorage.getItem(this.sessionHistoryCollection[this.sessionHistoryPointer])))
                })
            }
        },
        sessionData(cb) {
            cb(this.copy(this.sdata()))
        },
        setSessionTrackData(o) {
            if(typeof o != 'function') {
                const msg = 'Invalid setSessionTrackData value, it should be a function returning the property you want to track.'
                alert(msg)
                console.error(msg)
            } else {
                this.sdata = o
                setTimeout(() => {
                    this.addSessionEntry()
                },0)
            }
            
        }
    }
}