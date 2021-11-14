<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;"  >
        <v-main >
            <main class="flex fullheight-percent" style="background:#7fccff;" >

                <!-- BACKGROUND -->
                <div class="fullwidth" style="position:fixed;z-index:1" >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 1440 320"
                        >
                        <path 
                            fill="#0099ff" 
                            fill-opacity="1"
                            d="M0,320L48,304C96,288,192,256,288,229.3C384,203,480,181,576,186.7C672,192,768,224,864,208C960,192,1056,128,1152,138.7C1248,149,1344,235,1392,277.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                            </path>
                    </svg>
                </div>
                <!-- SIDEBAR -->
                <section style="z-index:100; min-width:220px; background:#232729;color:white;" class="flexcol" >
                    <sidebar ref="sidebar" />
                </section>
                <!-- CONTENT -->
                <section class="fullwidth flex flexcol" style="z-index:2" >
                    <div style="background: #464e52; color: #009aff;"  class="pad025" >
                        <main class="flex spacebetween flexcenter" >
                            <div class="fullwidth" >
                                <span class="pointer" >test > </span>
                                <span>test</span>
                            </div>
                            <div class="pointer padright025 flex flexcenter" >
                                <span class="marginright050 marginleft050" >
                                    marvenwilsons@gmail.com
                                </span>
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                </svg>
                            </div>
                        </main>
                    </div>
                    <section class="flex fullwidth" >
                        <nuxt ref="pane" />
                    </section>
                </section>
            </main>
        </v-main>
    </v-app>
</template>

<script>
import sidebar from '@/components/dashboard/side-bar/index' 
import service from '@/components/dashboard/services/index'
import m from '@/m'
export default {
    mixins: [m],
    components: {sidebar},
    data: () => ({
        panes: []
    }),
    created() {
        service.getAllServices(this)
    },
    mounted() {
        try {
            const paneCollection = this.$refs.pane.$children[0].$children[0]
            // console.log(paneCollection)
        }catch(err) {
            alert('Cannot access paneCollection methods, maybe it was moved or deleted, error in admin.vue')
        }

        // component references
        const sidebar = this.$refs.sidebar
        const pane = this.$refs.pane.$children[0].$children[0]

        // set default sidebar
        sidebar.setSelected('Dashboard')

        // fires everytime sidebar select property changes
        sidebar.onSelect = (selected) => {
            pane.paneCollection = []
            // get selected service view
            const selectedService = service.getService(selected)
            
            setTimeout(() => {
                try {
                    pane.insertPaneCollectionItem(0)(selectedService.body)
                }catch(err) {
                    location.reload()
                }
            }, 0)
        }
    }
}
</script>

<style>
.merri-font {
    font-family: 'Merriweather', serif !important;
}
</style>