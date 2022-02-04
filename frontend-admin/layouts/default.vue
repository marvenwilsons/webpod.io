<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;"  >
        <v-main style="background: #1565c0a8;" class="relative" >
            <v-fade-transition>
                <main>
                    <!-- loading -->
                    <div v-if="loading" class="absolute fullwidth fullheight-percent flex flexcenter modal-wrapper" >
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
                    <!-- Alert -->
                    <div v-if="alertMsg && !loading" class="modal-wrapper absolute fullwidth fullheight-percent flex flexcenter paneShadow" >
                        <div class="pad125 borderRad4 margin125" 
                            style="background:white; color: #3f444a; min-width: 400px; max-width: 1080px;" >
                            <div style="max-height:500px; overflow-x: auto;" >
                                <div v-html="alertMsg" ></div>
                            </div>
                            <div class="margintop125 flex flexend">
                                <el-button @click="closeAlert" size="small" >Close</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- Editors -->
                    <div v-if="editor" class="modal-wrapper absolute fullwidth fullheight-percent flex flexcenter" >
                        <div style="background:#f5f5f5;" class="fullwidth fullheight-percent relative" >
                            <div @click="() => {editor = undefined}" class="absolute pointer" style="right:0;" >x</div>
                        </div>
                    </div>
                </main>
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
                        <topbar :notificationLength="notifications.length" :user="user" @openNotificationWindow="sidebarWindowIsOpen = !sidebarWindowIsOpen" ref="topbar" />
                        <div>
                            <history @historyClick="historyClick" ref="history" />
                        </div>
                    </div>
                    <section class="flex fullwidth" >
                        <nuxt ref="pane" />
                    </section>
                </section>
                <v-slide-x-reverse-transition>
                    <section v-if="sidebarWindowIsOpen" style="z-index:100; background: #e5f1fa; width:450px; right:0;" class="absolute fullheight-percent paneShadow" >
                        <!-- <img src="@/static/leaves.jpeg" alt=""> -->
                        <!-- <audio src="@/static/webpod_notification_sound.mp3" type="audio/mpeg" autoplay >
                        </audio> -->
                        <sidebar :user="user" ref="sidebar" @close="sidebarWindowIsOpen = false">
                            <notification :notifications="notifications" ref="notification" />
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
import history from '@/components/dashboard/topbar/history.vue'
import sidebar from '@/components/dashboard/side-bar/index.vue'
import notification from '@/components/dashboard/side-bar/notification.vue'

import m from '@/m'
export default {
    mixins: [m],
    components: {menubar, topbar, sidebar, history, notification},
    data: () => ({
        panes: [],
        showModal: false,
        editor: false,
        loading: true,
        showDashboard: false,
        sidebarWindowIsOpen: false,
        user: false,
        notifications: [],
        alertMsg: undefined,
        alertFunctionToBeExecutedOnClose: undefined,
        menuMappingRole: {}, // role manefist file, does not hold any app data, values here is just like a map
        serviceMappingRole: {}
    }),
    created() {
        service.getAllServices(this)
        this.use_socket = true
        // console.log(`${location.href}${process.env.API_URL}`)
    },
    methods: {
        historyClick(i) {
            console.log('history click',i)
            try {
                const el = document.getElementById(`pane${i}`)
                el.scrollIntoView({behavior: webpod.dashSettings['Slide on history click'] == 'yes' ? 'smooth' : 'auto', block: "center", inline: "center"})
            } catch(err) {}
        },
        closeAlert() {
            this.alertMsg = ''

            if(this.alertFunctionToBeExecutedOnClose != undefined) {
                this.alertFunctionToBeExecutedOnClose()
            }
        },
        constructDashboardServices(services) {
            services.map(({service_id,instancer,version_data,version_id, version_name}) => {
                this.serviceMappingRole[service_id][version_name] = {
                    instancer,
                    version_data,
                    version_name
                }
            })
        },
        addMenuMappingRole(role) {
            this.menuMappingRole[role.menu_id] = {
                primary_version: role.primary_version,
                service_id: role.service_id,
                versions: role.versions
            }
        },
        addServiceMappingRole(role) {
            this.serviceMappingRole[role.service_id] = {}

            role.versions.map(ver => {
                this.serviceMappingRole[role.service_id][ver] = undefined
            })
        },
    },
    mounted() {
        try {
             // component references
            const menu = this.$refs.menubar
            const paneCollection = this.$refs.pane.$children[0].$children[0]
            const topbar =  {
                ...this.$refs.topbar,
                history: this.$refs.history
            }
            const sidebar = {
                open: () => this.sidebarWindowIsOpen = true,
                close: () => this.sidebarWindowIsOpen = false,
                pushNotification: (notificationItem) => {
                    this.notifications.push(notificationItem)
                }
            }
            const dash = {
                loading: (state) => this.loading = state,
                showDashboard: (state) => this.showDashboard = state,
                setUser: (o) => this.user = o,
                alert: (msg) => this.alertMsg = msg,
                alertError: (data) => {
                    this.alertMsg = data.message

                    if(data.reload && data.reload == true) {
                        this.alertFunctionToBeExecutedOnClose = () => {
                            location.reload()
                        }
                    }

                    if(data.onClose) {
                        this.alertFunctionToBeExecutedOnClose = data.onClose
                    }
                },
                constructDashboardServices: (s) => this.constructDashboardServices(s),
                addMenuMappingRole: (role) => this.addMenuMappingRole(role),
                addServiceMappingRole: (role) => this.addServiceMappingRole(role),
                setServices: (s) => this.setService(s),
                menuMappingRole: this.menuMappingRole,
                serviceMappingRole: this.serviceMappingRole,
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
.modal-wrapper {
    background: #1565c0a8;
    z-index: 900;
}
html {
    overflow: hidden !important;
}
</style>