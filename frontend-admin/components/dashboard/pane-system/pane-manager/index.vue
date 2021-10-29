<template>
<!-- PANE MANAGER -->
    <main v-if="ready" class="fullheight-percent flex relative" style="z-index: 900; overflow-x: auto; overflow-y: hidden;" >
        <!-- each prop that is passed in the slot can be access in pane-system/index.vue component, which is the pane item component -->
        <!-- the <slot /> component represents the pane component -->
        <div id="paneManager" class="absolute flex fullheight-percent fullwidth" >
            <slot
                v-for="(item,index) in getLatestPaneCollection"
                :paneIndex="index"
                :data="item"
                :paneCollection="getLatestPaneCollection"
            ></slot>
        </div>
    </main>
</template>
<script>
import pane from '../pane/index'
export default {
    components: {pane},
    props: ['paneCollection'],
    data: () => ({
        ready: true
    }),
    computed: {
        getLatestPaneCollection() {
            return this.paneCollection
        }
    }
}
</script>

<style>
#paneManager {
    will-change: transform;
}
</style>