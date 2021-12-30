<template>
<!-- PANE -->
    <main v-if="ready"  class="fullheight-percent flex flexcol pane overflowhidden paneShadow" >
        <section :style="{background: 'transparent'}" class="flex spacebetween pad025 padleft050 padright025" >
            <div class="paneTextColor merri-font padleft125 padtop125 padright025  fullwidth" style="z-index:100" >
                <!-- pane title -->
                <paneTitle  :paneCollection="paneCollection" :paneIndex="paneIndex" ></paneTitle>
                <!-- service ribbon here -->
                <section role="service ribbon" class="margintop050 marginbottom025 flex" >
                    <paneRibbon :onRibbonClick="viewHooks.onRibbonClick" :ribbons="paneCollection[paneIndex].viewConfig.ribbons" ></paneRibbon>
                </section>
                <div class="" style="border-bottom: 1px solid lightgray;" ></div>
            </div>
            <!-- CLOSE -->
            <div class="" style="z-index:100" >
                <div class="flex" >
                    <div @click="$emit('onInsertPaneCollectionItem',paneIndex)" class="flex flexcenter pointer" >
                        <!-- <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="orange" d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                        </svg> -->
                    </div>
                    <!-- _ECEE-1-html: purpose is to remove a pane from the paneCollection array -->
                    <div v-if="typeof paneCollection[paneIndex].paneConfig.isClosable == 'boolean' ? paneCollection[paneIndex].paneConfig.isClosable : true" 
                        @click="onRemovePaneCollectionItem" class="flex flexcenter pointer flat_action" >
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
        <!-- BODY -->
        <section 
            :style="{zIndex:1, overflow: paneModalisActive ? '':'auto'}" 
            class="fullheight-percent relative" >
            <section role="content" class="absolute fullwidth pad050" >
                <!-- component use here should be registered globally  -->
                <!-- <div class="pad025 margin025 borderRad4" style="max-height:300px; overflow-y: auto; " >
                    <code>
                        {{this.paneCollection[this.paneIndex]}}
                    </code>
                </div> -->
                <div
                    class="fullheight-percent borderRad4  pad125" 
                    :is="this.paneCollection[this.paneIndex].view"
                    :myData="this.paneCollection[this.paneIndex].viewData" 
                    :config="this.paneCollection[this.paneIndex].viewConfig"
                    :hooks="viewHooks"
                    :hookArgs="viewHooksArgs"
                    @onEvent="viewEvent" 
                >
                </div>
            </section>
            <!-- pane modal -->
            <PaneModal 
                ref="paneModal" 
                v-if="paneModalisActive" 
                :config="paneModalConfig" 
                class="flex flexcenter fullwidth fullheight-percent"
                :hooks="viewHooks"
                :hookArgs="viewHooksArgs"
            />
        </section>
    </main>
</template>

<script>
import PaneModal from './pane-modal'
import service from '../../services/index'
import paneTitle from './pane-title.vue'
import paneRibbon from './pane-ribbon.vue'
export default {
    components: {PaneModal, paneTitle, paneRibbon},
    props: ['data','paneIndex','paneCollection'],
    data: () => ({
        paneWidth: '100%',
        paneView: undefined,
        paneViewConfig: undefined,
        paneViewEventHandler: undefined,
        // modal related properties
        paneModalisActive: false,
        paneModalConfig: undefined,
        paneModalQueue: [],
        paneModalEventHandler: undefined,
        viewHooks: undefined,
        viewHooksArgs: undefined,
        ready: false
    }),
    watch: {
        paneModalisActive() {
            setTimeout(() => {
                if(this.paneModalisActive == false) {
                    if(this.paneModalQueue.length != 0) {
                        this.spawnModal({
                            ...this.paneModalQueue[0]
                        })

                        setTimeout(() => {
                            this.paneModalQueue.splice(0,1)
                        },0)
                    }
                }
            },100)
        }
    },
    methods: {
        onRemovePaneCollectionItem() {
            // _ECEE-2-js locates the most parent component and executes removePaneCollectionItem from that component
            // paneIndex is the current position of the object in the array in paneCollection
            this.$parent.$parent.$parent.removePaneCollectionItem(this.paneIndex)()
            this.ready = false

            setTimeout(() => {
                this.ready = true
            }, 0);
        },
        /** Pane direct related methods */
        setPaneData(url,cb) {
            this.setPaneLoading(true)
            this.$axios.get(url).then((response) => {
                this.$parent.$parent.$parent.setPaneData(cb(response),this.paneIndex)
                if(this.paneCollection[this.paneIndex].viewData == undefined) {
                    alert('Error! setPaneData is executed but paneData is still undefined')
                } else {
                    console.log('no undef')
                    this.setPaneLoading(false)
                }
            })
        },
        setPaneTitle(v) {
            // reference to pane-system/index.vue
            this.$parent.$parent.$parent.setPaneTitle(v,this.paneIndex)
        },
        updatePaneData(v) {
            this.viewData = v
        },
        setPaneLoading(v) {
            if(v == true) {
                this.spawnModal({
                    view: 'loading',
                    modalConfig: {
                        isClosable: false,
                        resetWidth: true
                    }
                })
            } else if(v == false) {
                setTimeout(() => {
                    this.closeModal()
                },1000)
            } else if(!v) {
                alert('Error: setPaneLoading is called without boolean arguments')
            }
        },
        removePaneItem(v) {
            this.$parent.$parent.$parent.removePaneCollectionItem(this.paneIndex)
        },
        /** View related methods */
        setView(v) {
            this.$parent.$parent.$parent.setView(v,this.paneIndex)
        },
        setViewConfig(v) {
            this.$parent.$parent.$parent.setViewConfig(v,this.paneIndex)
        },
        /** Pane modal related methods */
        spawnModal(v) {
            if(this.paneModalisActive == true && this.paneModalConfig != undefined) {
                // if the modal is currently active we have to wait for the current modal to be closed
                // in the main time we have to push this new modal config, and use it after the current modal is closed
                this.paneModalQueue.push(v)
            } else {
                this.paneModalisActive = true
                this.paneModalConfig = v
            }
        },
        closeModal(isFromModal) {

            // closeModal is also being called in the modal component, to avoild infinite loop we have
            // to check if the call is from the modal or not
            if(!isFromModal) {
                try {
                    this.$refs.paneModal.closeModal() // this function call closes the modal with animation
                } catch(err) {
                    alert("Error closing modal, make sure a modal is spawned first before calling pane.closeModal")
                }
            }

            setTimeout(() => {
                // clearing the paneModal state, resetting them back to its defaults
                this.paneModalisActive = false
                this.paneModalConfig = undefined
            },180)
        },
        viewEvent({eventName, context, methods}) {
            // this.$parent.paneViewEventHandler(e,this.$parent.paneData)
            // console.log('executing view event', eventName, context)
            // console.log(this.paneViewEventHandler)
            // console.log('keys',Object.keys(context))
            // executing onViewEvent
            this.paneViewEventHandler(
                {
                    eventName,
                    context,
                    methods
                },
                this.viewData
            )
        },
        getService(viewName) {
            return new Promise((resolve,_) => {
                resolve(service.getService(viewName))
            })
        },
        spawnView(viewName, activator) {
            console.log('spawing view')
        }
    },
    mounted() {
        // Assigning defaults
        const {paneWidth,paneTitle} = this.paneCollection[this.paneIndex].paneConfig
        this.paneWidth = paneWidth || '700px'
        this.paneTitle = paneTitle || 'untitled'

        // extracting paneHooks
        const paneHooks = this.paneCollection[this.paneIndex].paneHooks

        // extracting viewHooks
        const viewHooks = this.paneCollection[this.paneIndex].viewHooks

        try {
            // pane methods
            const paneObjectMethods = {
                setPaneData: this.setPaneData,
                setPaneTitle: this.setPaneTitle,
                spawnModal: this.spawnModal,
                updatePaneData: this.updatePaneData,
                setPaneLoading: this.setPaneLoading,
                closeModal: this.closeModal,
                data: this.paneCollection[this.paneIndex].viewData,
                activator: this.paneCollection[this.paneIndex].activator,
                getService: this.getService,
            }

            // view methods
            const paneView = {
                setView: this.setView,
                setViewConfig: this.setViewConfig,
                getView: this.getView
            }
            // get pane collection object
            const paneCollectionComponent = this.$parent.$parent.$parent

            // pane collection methods
            const paneCollectionMethods = {
                insert: paneCollectionComponent.insertPaneCollectionItem(this.paneIndex),
                remove: paneCollectionComponent.removePaneCollectionItem(this.paneIndex),
                copyAndInsertPane: paneCollectionComponent.copyAndInsertPane(this.paneIndex),
            }

            this.viewHooksArgs = {
                paneCollectionMethods,
                paneObjectMethods,
                paneView,
                paneIndex: this.paneIndex
            }

            // Extracting the actions, a string that will be converted to a function
            const paneMethods = new Function(`return ${paneHooks}`)()(paneCollectionMethods,paneObjectMethods,paneView,this.paneIndex)
            
            // execute onMount items
            if(paneMethods && paneMethods.onMount) {
                paneMethods.onMount()
            }

            // execute modal event
            if(paneMethods && paneMethods.onModalEvent) {
                this.paneModalEventHandler = paneMethods.onModalEvent
            } else {
                this.paneModalEventHandler = function () {}
            }

            // execute view event
            if(paneMethods && paneMethods.onViewEvent) {
                this.paneViewEventHandler = paneMethods.onViewEvent
            } else {
                this.paneViewEventHandler = function () {}
            }

            // viewhooks
            this.viewHooks = new Function(`return ${viewHooks}`)()(paneCollectionMethods,paneObjectMethods,paneView,this.paneIndex)
            
            this.ready = true
        } catch(err) {
            console.log('ERROR: ', err)
        }

        try {
            setTimeout(() => {
                const el = document.getElementById(`pane${this.paneIndex}`)
                el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
            },300)
        } catch(err) {}
    }
}
</script>

<style>
.pane {
    background: inherit;
    position: relative;
    background-color: rgba(248, 247, 247, 0.884);  
    /* backdrop-filter: blur(15px); */
}
.pane:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.884);
    filter: blur(10px);
    
}
.paneShadow{
  box-shadow: 0px 0px 30px -18px rgba(54,54,54,1);
  border-bottom: 1px solid rgba(54, 54, 54, 0.096);
}
.paneItemBg{
    background: #f5f7fab9 !important;
}
.paneBorder{
    border:1px solid rgba(54, 54, 54, 0.096)
}
.paneTextColor{
    color: #333333 !important;
}
.hideOnLoad{
    opacity: 0;
}
</style>