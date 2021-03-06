export default {
    data: () => ({
        sessionHistoryCollection: [],
        sessionHistoryPointer: 0,
        overwriteMode: false,
        sdata: undefined,
        session: {
            onUndoRedo: () => {},
            onMsg: () => {}
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
            const uid = 'undoRedo_' + this.uid() + this.uid()

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
            } else {
                if(this.sessionHistoryCollection.length == 1) {
                    this.session.onMsg('Session is currently empty, nothing to undo')
                } else {
                    this.session.onMsg('Maximum Undo Reached!')
                }   
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
            } else {
                if(this.sessionHistoryCollection.length == 1) {
                    this.session.onMsg('Session is currently empty, nothing to redo')
                } else {
                    this.session.onMsg('Maximum Redo Reached!')
                }
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
            
        },
        clearSession() {
            this.sdata = undefined
            this.overwriteMode = false
            this.sessionHistoryPointer = 0
            this.sessionHistoryCollection = []
            this.$set(this.session,'onUndoRedo', () => {})
            window.sessionStorage.clear()
        }
    }
}