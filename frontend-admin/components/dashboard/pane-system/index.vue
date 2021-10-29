<template>
    <!-- GLUE: PANE & PANE MANAGER  -->
    <main class="fullheight-percent fullwidth" >
        <!-- 
            The purpose of teh PaneManager component are:
                1. Display the individual panes, by looping through the paneCollection data
                2. Pass the data to each pane component
        -->
        <PaneManager
            :paneCollection="getPaneCollection /** here we pass the paneCollection array, then the PaneManager will output a list from that array */ "
        >
            <!-- The distructured properties you see in <template #manager="{...}", is data from the PaneManager component's paneCollection -->
            <template v-slot="{data,paneIndex}" >
                <!-- 
                    This here represents each items of paneCollection,
                    we pass the data and paneIndex to the PaneComponent.

                    The Function of the Pane component are:
                        1. Display the passed data
                        2. Mutate the paneCollection by emitting events
                        3. Execute Pane methods passed from the paneCollection item
                -->
                <PaneActivator 
                    ref="paneActivator" v-slot="{ready}" 
                    :style="{minWidth:data.paneConfig.width || '600px',maxWidth:data.paneConfig.width || '600px', paddingLeft:'5px', paddingRight:'5px'}" 
                    class="padtop025 padbottom025" >
                    <v-slide-x-transition mode="in-out" >
                        <Pane
                            v-if="ready"
                            :id="`pane${paneIndex}`"
                            @onRemovePaneCollectionItem="removePaneCollectionItem"
                            @onInsertPaneCollectionItem="insertPaneCollectionItem"
                            :data="data"
                            :paneIndex="paneIndex"
                            :paneCollection="getPaneCollection"
                        />
                    </v-slide-x-transition>
                </PaneActivator>
            </template>
        </PaneManager>
    </main>
</template>

<script>
import Pane from './pane/index'
import PaneManager from './pane-manager/index'
import PaneActivator from './pane-manager/pane-activator'

export default {
    components: {Pane,PaneManager,PaneActivator},
    data: () => ({
        paneCollection: [],
    }),
    computed: {
        getPaneCollection() {
            return this.paneCollection
        }
    },
    watch: {
        paneCollection() {
            if(this.paneCollection.length == 0) {
                // back to dashboard
            }
        }
    },
    methods: {
        setPaneTitle(value,paneIndex) {
            this.paneCollection[paneIndex].paneConfig.title = value
        },
        setPaneData(value,paneIndex) {
            this.paneCollection[paneIndex].viewData = value
        },
        setView(value,paneIndex) {
            this.paneCollection[paneIndex].view = value
        },
        setViewConfig(value,paneIndex) {
            this.paneCollection[paneIndex].viewConfig = value
        },
        copyAndInsertPane(paneIndex) {
            return () => {
                this.insertPaneCollectionItem(paneIndex,this.paneCollection[paneIndex])
            }
        },
        removePaneCollectionItem(paneIndex) /** Splice an item from pane collection arary */ {
            // the deactivate method is executed first to animate the close of the pane
            // this.$refs.paneActivator.deactivate(() => {
            //     this.paneCollection.splice(paneIndex,1)
            // })
            return () => {
                this.paneCollection.splice(paneIndex,1)
            }

        },
        insertPaneCollectionItem(paneIndexOrigin) /** Push item to pane collection array */  {
            return (paneItemObject, activator) => {
                if(!Object.keys(paneItemObject).includes('view') || !Object.keys(paneItemObject).includes('paneConfig')) {
                    alert('Error: Cannot continue, Invalid pane item object, make sure the object has paneConfig or view property on it, if you are using getView, make sure to access the .body of the fetched view')
                    location.reload()
                } else {
                    // assign activator
                    if(activator) {
                        paneItemObject.activator = activator
                    }
                    // slide to end effect
                    const slideToEnd = () => {
                        try {
                            setTimeout(() => {
                            const el = document.getElementById(`pane${paneIndexOrigin + 1}`)
                                // el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
                            },100)
                        } catch(err) {}
                    }
                    // pane toggle
                    if(this.paneCollection.length - 1 == paneIndexOrigin){
                        this.paneCollection.push(paneItemObject)
                    } else {
                        // non zero index pane case
                        if(this.paneCollection.length - 1 > paneIndexOrigin) {
                            // replace existing pane
                            
                            this.$refs.paneActivator.ready = false // to destroy the old pane

                            this.paneCollection.splice(paneIndexOrigin + 1, this.paneCollection.length - 1, paneItemObject)
                            setTimeout(() => {
                                this.$refs.paneActivator.ready = true // to re render a pane with a posibility of a new data
                                slideToEnd()
                            },0)
                        } else {
                            // add new pane
                            this.paneCollection.splice(paneIndexOrigin + 1, 0, paneItemObject)
                            slideToEnd()
                        }
                    }
                }
            }
        },
    }
}
</script>