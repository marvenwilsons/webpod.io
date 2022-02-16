<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;"  >
        <v-main  style="background: #1565c0a8;" class="relative" >
            <main v-if="showInitForms" style="z-index: 1999">
                <init ref="wp-init" @completedForm="handleInitForm" />
            </main>
            <main  v-if="!showInitForms" >
                <v-fade-transition>
                    <div @click.self="closeModal" v-if="showModal" class="absolute fullwidth fullheight-percent flex flexcenter modal-wrapper"  >
                        <draggable ref="draggable" v-if="showModal" >
                            <portal-target  @change="portalTargetChanged" :class="[shakeModal ? 'err_shake' : '']" name="modal" />
                        </draggable>
                    </div>
                </v-fade-transition>   
                <!-- loading -->
                <v-fade-transition>
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
                </v-fade-transition>
                <!-- Alert -->
                <v-fade-transition>
                    <div v-if="alertMsg && !loading" class="modal-wrapper absolute fullwidth fullheight-percent flex flexcenter paneShadow" >
                        <v-card class="pad125 borderRad4 margin125" 
                            style="background:white; color: #3f444a; min-width: 400px; max-width: 1080px;" >
                            <div style="max-height:500px; overflow-x: auto;" >
                                <div v-html="alertMsg" ></div>
                            </div>
                            <div class="margintop125 flex flexend">
                                <v-btn  @click="closeAlert" text plain >Close</v-btn>
                            </div>
                        </v-card>
                    </div>
                </v-fade-transition>
                <!-- Editors -->
                <v-fade-transition>
                    <div v-if="editor" class="modal-wrapper absolute fullwidth fullheight-percent flex flexcenter" >
                        <div style="background:#f5f5f5;" class="fullwidth fullheight-percent relative" >
                            <div @click="() => {editor = undefined}" class="absolute pointer" style="right:0;" >x</div>
                        </div>
                    </div>
                </v-fade-transition>
            </main>
            <main v-show="showDashboard" class="flex fullheight-percent " style="background:#7fccff;" >
                <!-- BACKGROUND -->
                <accent-bg/>
                <!-- menubar -->
                <section style="z-index:2" class="pane" >
                    <v-card dark style="z-index:800; min-width:220px;" class="flexcol margin050" >
                        <menubar  ref="menubar" />
                    </v-card>
                </section>
                <!-- CONTENT -->
                <section class="fullwidth flex pane" style="z-index:2" >
                    <section class="flex fullwidth" >
                        <nuxt ref="pane" />
                    </section>
                    <div  style="z-index: 1900; right: 0; bottom: 0; max-width: 5%;" class="absolute flex flexend" >
                        <div class="marginright125 marginbottom125 flex flexcol" >
                            <v-scale-transition origin="center">
                                <v-btn
                                    v-if="historyBtnIsShowing"
                                    @click="historyBtnDirection == 'right' ? nextPane() : prevPane()"
                                    class="mx-2 marginbottom050"
                                    fab
                                    dark
                                >
                                    <v-icon dark>
                                        mdi-arrow-{{historyBtnDirection}}-bold
                                    </v-icon>
                                </v-btn>
                            </v-scale-transition>
                            <v-scale-transition origin="center">
                                <v-btn
                                    v-if="showAccountBtn"
                                    @click="sidebarWindowIsOpen = !sidebarWindowIsOpen, showModal = true"
                                    class="mx-2"
                                    fab
                                    dark
                                >
                                    <v-icon dark>
                                        mdi-account
                                    </v-icon>
                                </v-btn>
                            </v-scale-transition>

                        </div>
                    </div>
                </section>
                <v-slide-x-reverse-transition>
                    <section v-if="sidebarWindowIsOpen" style="z-index:9000; background: #e5f1fa; width:450px; right:0;" class="absolute fullheight-percent paneShadow" >
                        <!-- <img src="@/static/leaves.jpeg" alt=""> -->
                        <!-- <audio src="@/static/webpod_notification_sound.mp3" type="audio/mpeg" autoplay >
                        </audio> -->
                        <sidebar style="z-index:9000;" :user="user" ref="sidebar" @close="sidebarWindowIsOpen = false, showModal = false">
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
import sidebar from '@/components/dashboard/side-bar/index.vue'
import notification from '@/components/dashboard/side-bar/notification.vue'
import accentBg from '@/components/dashboard/accent-bg/index.vue'
import init from '@/components/dashboard/init/index.vue'

import m from '@/m'
export default {
    mixins: [m],
    components: {menubar, sidebar, notification, accentBg, init},
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
        serviceMappingRole: {},
        modalIsClosableWhenClickedOutside: true,
        modalOnClose: undefined,
        shakeModal:false,
        historyBtnIsShowing: false,
        historyBtnDirection: 'left',
        showAccountBtn: false,
        showInitForms: true
    }),
    created() {
        service.getAllServices(this)
        this.use_socket = true
        // console.log(`${location.href}${process.env.API_URL}`)
    },
    methods: {
        historyClick(i) {
            webpod.session.paneOnFocus = i
            try {
                const el = document.getElementById(`pane${i}`)
                el.scrollIntoView({behavior: webpod.dashSettings['Slide on history click'] == 'yes' ? 'smooth' : 'auto', block: "center", inline: "center"})
            } catch(err) {}
            
            if(webpod.session.paneCollection.length - 1 > i) {
                this.prevBtnIsShowing = false
                this.nextBtnIsShowing = true
                this.historyBtnDirection = 'right'

            } else if(webpod.session.paneCollection.length - 1 < i || webpod.session.paneCollection.length - 1 == i) {
                this.prevBtnIsShowing = true
                this.nextBtnIsShowing = false
                this.historyBtnDirection = 'left'
            }
        },
        prevPane() {
            this.historyClick(webpod.session.paneOnFocus - 1)
        },
        nextPane() {
            this.historyClick(webpod.session.paneOnFocus + 1)

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
        closeModal() {
            if(this.modalIsClosableWhenClickedOutside) {
                webpod.dash.modal.hide()
                setTimeout(() => {
                    this.sidebarWindowIsOpen = false
                },100)
            } else {
                this.shakeModal = true
                setTimeout(() => {
                    this.shakeModal = false
                },2000)
            }
        },
        portalTargetChanged() {
            this.$refs.draggable.ready = true
        },
        handleInitForm(formData) {
            const url = `${process.env.API_URL}/init`
            const request_options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch(url, request_options)
            .then(response => response.json())
            .then(data => {
                
            }).catch(err => {
                webpod.dash.alertError({
                    message: `<span>An error occured while inserting app instances for app: <strong>"${app_name}"</strong> target instance title:  <strong>"${instance_title}"</strong> <br> server says: <strong >"${err.message}"</strong> </span>`,
                    reload: true
                })
            })
        }
    },
    mounted() {
        try {
             // component references
            const menu = this.$refs.menubar
            const paneCollection = this.$refs.pane.$children[0].$children[0]
            const sidebar = {
                open: () => this.sidebarWindowIsOpen = true,
                close: () => this.sidebarWindowIsOpen = false,
                pushNotification: (notificationItem) => {
                    this.notifications.push(notificationItem)
                }
            }
            const dash = {
                modal: {
                    show: (isClosableWhenClickedOutside,cb) => {
                        this.showModal = true
                        
                        if(cb) cb()
                    },
                    hide: cb => {
                        this.showModal = false
                        if(cb) cb()
                        if(typeof this.modalOnClose == 'function') {
                            this.modalOnClose()
                            this.modalOnClose = undefined
                        }
                    },
                    closeOnBlur: (v = false) => {
                        if(typeof v === 'boolean') this.modalIsClosableWhenClickedOutside = v
                    },
                    onClose: (cb) => {
                        this.modalOnClose = cb
                    }
                },
                history: {
                    historyBtn: {
                        hide: () => this.historyBtnIsShowing = false,
                        show: () => {
                            this.historyBtnIsShowing = true
                            this.historyBtnDirection = 'left'
                        }
                    },
                },
                accountBtn: {
                    show: () => this.showAccountBtn = true,
                    hide: () => this.showAccountBtn = false
                },
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
                showInitForms: (s,generated_db_info) => {
                    this.appIsInitialized = s
                    this.$refs['wp-init'].generated_db_info = generated_db_info
                }
            }

            dashboard(paneCollection,menu, service, dash, sidebar, this.socket)
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
    background: #1565c03a;
    z-index: 900;
}
html {
    overflow: hidden !important;
}
</style>