## About
- A mixin for vue component that offers an undo and redo feature
## Methods
- `setSessionTrackData(<function>)`
    - Runs everytime `addSessionEntry()` executes.
    - should return a value and it will be stored for undo and redo feature
- `addSessionEntry(void)`
    - Creates a new session entry to be use later for undo and redo purposes
- `undo()`
- `redo()`
- `sessionClear()`
## Events
- `this.session.onUndoRedo = (data) => {do something to the data here}`
    - data argument returns the selected entry

## Sample Code
```html
<template>
    <div>
        <button @click="undo" >
            undo
        </button>

        <button @click="redo" >
            redo
        </button>

        <button @click="count++" >
            increment count
        </button>
    </div>
</template>

<script>
import undoRedo from '@/undo-redo.js'
import m from '@/m' // undoRedo.js uses some of the methods in this mixin
export default {
    mixins: [undoRedo,m],
    data: () => ({
        count: 0
    }),
    watch: {
        count(n) {
            // everytime count increments a new session entry is added
            this.addSessionEntry()
        }
    },
    methods: {
        redo() {
            this.redo()
        },
        undo() {
            this.undo()
        }
    },
    beforeDestroy() {
        // avoid cluterring your disk space, session entries are saved in sessionStorage
        // it is important to clear session everytime you are not using the undoRedo feature
        this.clearSession()
    }
    mounted() {
        // setting up usage for undoRedo.js

        // assign onUndoRedo event handler
        this.session.onUndoRedo = (data) => {
            // everytime undo or redo function is called this function
            // will execute, and data argument holds the requested data
            this.count = data
        }

        // REQUIRED! wont work without this
        this.setSessionTrackData(() => {
            // essentially you are telling undoRedo.js that
            // everytime the addSessionEntry function is called
            // execute this function to get the data to be saved for keeping.
            return this.count
        })
    }
}
</script>
```