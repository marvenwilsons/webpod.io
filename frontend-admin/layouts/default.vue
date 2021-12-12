<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;"  >
        <v-main style="background: #1565c0a8;" class="relative" >
            <v-fade-transition>
                <!-- loading -->
                <div v-if="loading" style="z-index:900; background: #1565c0a8;" class="absolute fullwidth fullheight-percent flex flexcenter" >
                    <div  class="pad125 modalShadow flexcenter" >
                        <div class="flex flexcol relative" >
                            <span class="absolute fullwidth fullheight-percent flex flexcenter" >
                                <h1 class="merri-font" style="font-size:120px; color: #e6f2fa; margin:0;" >W</h1>
                            </span>
                            <v-progress-circular
                            :size="200"
                            :width="1"
                            color="white"
                            indeterminate
                            ></v-progress-circular>
                        </div>
                    </div>
                </div>
                <!--  -->
            </v-fade-transition>
            <main v-show="showDashboard" class="flex fullheight-percent" style="background:#7fccff;" >

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
                <!-- menubar -->
                <section style="z-index:100; min-width:220px; background:#232729;color:white;" class="flexcol" >
                    <menubar ref="menubar" />
                </section>
                <!-- CONTENT -->
                <section class="fullwidth flex flexcol" style="z-index:2" >
                    <div style="background: #232729; color: #009aff;"  class="pad025" >
                        <topbar :user="user" @openNotificationWindow="sidebarWindowIsOpen = !sidebarWindowIsOpen" ref="topbar" />
                    </div>
                    <section class="flex fullwidth" >
                        <nuxt ref="pane" />
                    </section>
                </section>
                <v-slide-x-reverse-transition>
                    <section v-if="sidebarWindowIsOpen" style="z-index:100; background: #e5f1fa; width:450px; right:0;" class="absolute fullheight-percent paneShadow" >
                        <sidebar :user="user" ref="sidebar" @close="sidebarWindowIsOpen = false">
                        </sidebar>
                    </section>
                </v-slide-x-reverse-transition>
            </main>
        </v-main>
    </v-app>
</template>

<script>
import menubar from '@/components/dashboard/menu-bar/index' 
import service from '@/components/dashboard/services/index'
import dashboard from '@/components/dashboard/dashboard.js'
import topbar from '@/components/dashboard/topbar/index.vue'
import sidebar from '@/components/dashboard/side-bar/index.vue'
import m from '@/m'
export default {
    mixins: [m],
    components: {menubar, topbar, sidebar},
    data: () => ({
        panes: [],
        loading: true,
        showDashboard: false,
        sidebarWindowIsOpen: false,
        user: false
    }),
    created() {
        service.getAllServices(this)
    },
    mounted() {
        try {
             // component references
            const menu = this.$refs.menubar
            const paneCollection = this.$refs.pane.$children[0].$children[0]
            const topbar =  this.$refs.topbar
            const sidebar = {
                open: () => this.sidebarWindowIsOpen = true,
                close: () => this.sidebarWindowIsOpen = false,
                profile: this.$refs.sidebar
            }
            const dash = {
                loading: (state) => {
                    this.loading = state
                },
                showDashboard: (state) => {
                    this.showDashboard = state
                },
                setUser: (o) => {
                    this.user = o
                },
                alert: (msg) => {

                }
            }

            dashboard(paneCollection,menu, topbar, service, dash, sidebar, this.socket)
        }catch(err) {
            alert(err)
            console.log(err)
        }

       
    }
}
</script>

<style>
.merri-font {
    font-family: 'Merriweather', serif !important;
}
</style>