<template>
    <div style="z-index:100;" class="fullheight-percent flex flexenter" >
        <v-scale-transition>
            <div v-if="showModal" style="background: white;" :id="modalUid" class="pad050 borderRad4 paneShadow" 
                :style="{
                    zIndex:'200',
                    border: '1px solid rgba(54, 54, 54, 0.096)',
                    minWidth: modalConfig.width ? modalConfig.width : '', 
                    maxWidth: modalConfig.width ? modalConfig.width : '80%', 
                    marginTop: '-300px', 
                    opacity: 0
                }" >
                <!-- Close btn here -->
                <div v-if="modalConfig.isClosable" class="flex flexend" >
                    <svg @click="closeModal" class="pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#f56c6c" d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                    </svg>
                </div>
                <!-- View here -->
                <div style="color:#333333" :class="['margin050 borderRad4 relative flex flexcenter', view == 'loading' ? 'padright025 padleft025' : 'pad050']" >
                    <!-- loading -->
                    <Loading v-if="view === 'loading'" class="fullwidth" />
                    <!-- <div v-if="view === 'loading'" class="fullwidth" >
                        loading please wait
                    </div> -->

                    <!-- view -->
                    <div v-if="view != 'loading'" :is="view" :hooks="hooks" :config="viewConfig" :myData="viewData" @onEvent="modalEvent" class="fullwidth" ></div>
                </div>
            </div>
        </v-scale-transition>
    </div>
</template>
<script>
import util from '@/m'
import gsap from "gsap";

export default {
    mixins: [util],
    props: ['config','myData','hooks'],
    data: () => ({
        showModal: false,
        modalUid: undefined,
        view: undefined,
        viewConfig: undefined,
        modalConfig: undefined,
        viewData: undefined
    }),
    methods: {
        generateModalEventObject(name,payload) {
            return {
                name,
                payload,
                context: {
                    modalConfig: this.modalConfig,
                    viewConfig: this.viewConfig,
                    view: this.view
                }
            }
        },
        executeEventFunction(eventName, eventPayload) {
            const paneModalEventHandler = this.$parent.paneModalEventHandler
            const o = this.generateModalEventObject(eventName,eventPayload)
            paneModalEventHandler( o, this.$parent.viewData)
        },
        closeModal() {
            const el = document.getElementById(this.modalUid);
            gsap.fromTo(
                el,
                0.1,
                { opacity: 1, marginTop: "-300px", ease: "power3.inOut" },
                { opacity: 0, marginTop: "-350px", ease: "power3.inOut" }
            );

            this.$parent.closeModal(true)
            this.executeEventFunction('closeModal', undefined)            
        },
        openModal() {
            const el = document.getElementById(this.modalUid);
            gsap.fromTo(
                el,
                0.1,
                { opacity: 0, marginTop: "-350px", ease: "power3.inOut" },
                { opacity: 1, marginTop: "-300px", ease: "power3.inOut" }
            )

            this.executeEventFunction('openModal', undefined)            
        },
        modalEvent({eventName,context}) {
            this.executeEventFunction(eventName, context)            
        }
    },
    mounted() {
        this.modalUid = this.uid()
        this.showModal = true
        
        setTimeout(() => {
            this.openModal()
        },50)

        const { viewConfig, view, modalConfig, viewData } = this.config 
        this.view = view || 'div'
        this.viewConfig = viewConfig || {}
        this.modalConfig = modalConfig || {}
        this.viewData = viewData || {}
    }
}
</script>