<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;"  >
        <v-main  style="background: #1565c0a8;" class="relative" >
            <main v-if="showInitForms" style="z-index: 1999">
                <init ref="wp-init" @completedForm="handleInitForm" />
            </main>
            <main  v-if="!showInitForms" >
                    <v-scale-transition  >
                        <div @click.self="closeModal" v-if="showModal" class="padleft125 padright125 absolute fullwidth fullheight-percent flex flexcenter modal-wrapper"  >
                            <draggable :class="[shakeModal ? 'err_shake' : '',]" :modalTitle="modalTitle" v-if="showModal" >
                                <div v-if="modalError"  class="error margin025 pad050 flex flexcenter flexstart" >
                                    <v-icon >mdi-alert-circle</v-icon>
                                    <strong class="marginleft025" >
                                        {{modalError}}
                                    </strong>
                                </div>
                                <div class="" style="max-height:500px;" >
                                    <portal-target style="min-width: 300px; height: 100%"  @change="portalTargetChanged"  name="modal" />
                                    <!-- modal button -->
                                    <div class="flex flexend"  v-if="modalButton.show" >
                                        <v-btn 
                                            ref="modalButton" 
                                            plain text 
                                            @click="modalButtonClick"
                                            :disabled="modalButton.disabled"
                                            :loading="modalButton.loading"
                                        > 
                                            {{modalButton.text}} 
                                        </v-btn>
                                    </div>
                                    <!-- play -->
                                    <div v-if="modalIsPlayable" class="flex flexend" >
                                        <v-btn :loading="modalIsPlaying" @click="modalPlay" :ripple="false" fab icon small >
                                            <v-icon>mdi-play</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                    </v-scale-transition>
                    
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
                    <div  style="z-index: 1900; right: 0; bottom: 0; max-width: 5%; min-width:92px; margin-right:12px;" 
                    class="absolute flex flexcol spacebetween " >
                        <div class="flex flexcenter" >
                            <v-scale-transition origin="center" >
                                <v-btn
                                    v-if="cog.show"
                                    class="mx-2 marginbottom050"
                                    dark fab color="black"
                                    @click="cog.click()"
                                >
                                    <v-icon dark>
                                        mdi-cog-outline
                                    </v-icon>
                                </v-btn>
                            </v-scale-transition>
                        </div>
                        <div class=" flex flexcenter"  >
                            <v-scale-transition origin="center">
                                <v-btn
                                    v-if="currentPaneIsClosable"
                                    class="mx-2 marginbottom050"
                                    dark fab color="black"
                                    @click="closePane"
                                >
                                    <v-icon dark>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </v-scale-transition>
                        </div>
                        <div class="marginbottom125 flex flexcol flexcenter" >
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
import dashboard from '@/components/dashboard/dashboard.js'

import menubar from '@/components/dashboard/menu-bar/index' 
import service from '@/components/dashboard/services/index'
import sidebar from '@/components/dashboard/side-bar/index.vue'
import notification from '@/components/dashboard/side-bar/notification.vue'
import accentBg from '@/components/dashboard/accent-bg/index.vue'
import init from '@/components/dashboard/init/index.vue'

import m from '@/m'
import EventEmitter from '@/EventEmitter'
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
        showInitForms: false,
        currentPaneIsClosable: false,
        // MODAL PROPERTIES
        modalEvent: undefined,
        modalError: undefined,
        modalIsPlayable: false,
        modalIsPlaying: false,
        modalViewTrigger: undefined,
        modalTitle: undefined,
        cog: {
            show: false,
            click: () => {}
        },
        modalButton: {
            show: false,
            text: undefined,
            loading: false,
            disabled: false
        }
    }),
    created() {
        service.getAllServices(this)
        this.use_socket = true
        // console.log(`${location.href}${process.env.API_URL}`)
        
    },
    methods: {
        historyClick(i) {
            console.log('history click')
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
            this.currentPaneIsClosable = webpod.session.closablePanes[i]
            webpod.session.onPaneToggle(i)
            webpod.session.events.emit('pane-toggle',i)
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
        portalTargetChanged(n) {
            // this.$refs.draggable.ready = true
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
            .then(({message}) => {
                if(message === 'OK') {
                    setTimeout(() => {
                        location.href = '/login'
                    },1000)
                }
            }).catch(err => {
                webpod.dash.alertError({
                    message: `<span>An error occured while inserting app instances for app: <strong>"${app_name}"</strong> target instance title:  <strong>"${instance_title}"</strong> <br> server says: <strong >"${err.message}"</strong> </span>`,
                    reload: true
                })
            })
        },
        modalPlay() {
            this.modalIsPlaying = true
            this.modalEvent.emit('play')
        },
        modalButtonClick() {
            this.modalEvent.emit('btn-click', {
                disabled: (v) => {
                    this.$set(this.modalButton,'disabled',v)
                },
                loading: (v) => {
                    this.$set(this.modalButton,'loading', v)
                },
                progress: (v) => {
                    this.$refs.draggable.progress = v
                },
                text: (v) => {
                    this.$set(this.modalButton,'text', v)
                }
            })
        },
        setPaneIsClosable(isClosable) {
            this.currentPaneIsClosable = isClosable
        },
        closePane() {
            this.$refs.pane.$children[0].$children[0].removePaneCollectionItem(webpod.session.paneOnFocus)()
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
                    show: (conf,cb) => {
                       
                        if(this.modalEvent != undefined) {
                            // when modal overlap happens
                            // when modal is spawn without closing the prev modal
                            // prev modal needs to be closed
                            dash.modal.hide()    
                        }

                        // show and render the modal
                        this.showModal = true
                        
                        // if conf is a type of object assign modal title
                        // modal is playable
                        // viewTrigger executes and passes true on modal show
                        if(typeof conf == 'object' && this.showModal == true) {
                            this.modalTitle = conf.modalTitle
                            this.modalIsPlayable = conf.isPlayable || false
                            this.viewTrigger = conf.viewTrigger
                            if(conf.viewTrigger != undefined) {
                                conf.viewTrigger(true)
                            }
                            if(conf.button) {
                                this.$set(this.modalButton,'show',true)
                                this.$set(this.modalButton,'text',conf.button)
                            }
                        } else if(typeof conf === 'string' && this.showModal == true ) {
                            this.modalTitle = conf
                        }

                        // if a callback function is passed execute on show
                        if(cb) cb()
                        
                        // initialized event emitter
                        const modalEvent = new EventEmitter()
                        this.modalEvent = modalEvent

                        modalEvent.on('error', (msg) => {
                            this.modalError = msg
                            this.modalIsPlaying = false
                        })

                        modalEvent.on('stop-playing', () => {
                            this.modalIsPlaying = false
                        })

                        modalEvent.emit('show')

                        return modalEvent
                    },
                    hide: cb => {
                        let abort = false

                        if(this.modalEvent != undefined) {
                            this.modalEvent.emit('close', (s) => {
                                abort = s
                            })
                        }
                        

                        if(abort == false || this.modalEvent == undefined) {
                            this.showModal = false
                            this.modalEvent = undefined
                            this.modalError = undefined
                            this.modalIsPlayable = false
                            this.modalIsPlaying = false
                            this.modalButton = {
                                show: false,
                                text: undefined,
                                loading: false,
                                disabled: false
                            }
                            
                            if(typeof this.viewTrigger == 'function') {
                                this.viewTrigger(false)
                                setTimeout(() => {
                                    this.viewTrigger = undefined
                                },0)
                            }

                            if(cb) cb()
                            if(typeof this.modalOnClose == 'function') {
                                this.modalOnClose()
                                this.modalOnClose = undefined
                            }
                        } else {
                            this.shakeModal = true
                            setTimeout(() => {
                                this.shakeModal = false
                            },2000)
                        }
                    },
                    closeOnBlur: (v = false) => {
                        if(typeof v === 'boolean') this.modalIsClosableWhenClickedOutside = v
                    },
                    onClose: (cb) => {
                        this.modalOnClose = cb
                    },
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
                    this.showInitForms = s
                    if(s == true) {
                        setTimeout(() => {
                            this.$refs['wp-init'].generated_db_info = generated_db_info
                        },0)
                    }
                },
                setIfPaneIsClosable: (isClosable) => this.currentPaneIsClosable = isClosable,
                cog: {
                    show: () => {
                        setTimeout(() => {
                            this.$set(this.cog,'show',true)
                        },500)

                        const cogEvents = new EventEmitter()
                        this.cog.click = () => {
                            cogEvents.emit('click')
                        }

                        return cogEvents
                    },
                    hide: () => {
                        this.$set(this.cog,'show',false)
                    }
                }
            }

            dashboard(paneCollection,menu, service, dash, sidebar, this.socket)
        }catch(err) {
            alert(err)
            console.log(err)
        }

        window.onresize = (n) => {
            try {
                const el = document.getElementById(`pane${webpod.session.paneOnFocus}`)
                el.scrollIntoView()
            } catch(err) {}
        }
       
    }
}
</script>

<style>
.merri-font {
    font-family: 'Merriweather', serif !important;
}
.modal-wrapper {
    /* background: #1565c03a; */
    z-index: 500;
}
html {
    overflow: hidden !important;
}
.v-menu__content {
    z-index: 1000 !important;
}
</style>