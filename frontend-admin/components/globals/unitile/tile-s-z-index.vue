<template>
    <div>
        <span class="overline" > ARANGE </span>
        <div @click="moveToFront" class="paneBorder  flex flexcenter " >
            <v-btn tile plain block >Move to front  </v-btn>
        </div>
        <div @click="moveToBack" class="paneBorder margintop025  flex flexcenter " >
            <v-btn tile plain block >Move to back</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        count: 0
    }),
    methods: {
        moveToFront() {
            this.count = this.count + 1
            
            const parent = this.$parent
            parent.tiles[parent.nodeSelectedIndex].customStyle.zIndex = this.count
            parent.refresh()
        },
        moveToBack() {
            this.count = this.count - 1
            const parent = this.$parent
            parent.tiles[parent.nodeSelectedIndex].customStyle.zIndex = this.count
            parent.refresh()
        }
    },
    mounted() {
        const parent = this.$parent
        const zIndex = parent.tiles[parent.nodeSelectedIndex].customStyle.zIndex
        if(zIndex != undefined) {
            this.count = parent.tiles[parent.nodeSelectedIndex].customStyle.zIndex
        } else {
            // parent.tiles[parent.nodeSelectedIndex].customStyle.zIndex = 1
        }
    }
}
</script>