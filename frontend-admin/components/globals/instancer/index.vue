<template>
    <main class="flex fullwidth flexcol" >
        <div class="marginbottom125 text-uppercase " >
            <span style="font-weight:500; color: #424242;" >Get Started</span>
        </div>
        <div style="gap:5px;" class="flex  flexwrap marginbottom125 " >
            <div 
                style="background: white; max-width:450px; min-width:450px;" 
                class=" instances_box  paneBorder pointer  flex" 
                v-for="type in instance_types" :key="uid(type)" 
                @click="createInstance(type)"
            >
                <v-hover v-slot="{ hover }" >
                     <v-card shaped :disabled="false" :loading="false" :elevation="hover ? 12 : 1" v-ripple  plain block tile class=" fullheight-percent fullwidth" >
                        <main class="pad125" >
                            <div class="padtop125 flex fullwidth" >
                            <div style="max-width:35px;" class="flex bordrred" >
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="#1976d2" :d="type.svg || 'M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'" />
                                </svg>
                            </div>
                            <div class="flex flexcol marginleft050 " >
                                <div class="text-uppercase flex flexstart" > 
                                    <span class="" style="font-weight:500; font-size: 105%; color: #4e6795;">CREATE {{type.name}}</span> 
                                </div>
                                <div class="caption text--secondary text-uppercase flex flexstart flexwrap" >
                                    {{type.desc || 'No available description'}}
                                </div>
                            </div>
                        </div>
                        </main>
                    </v-card>
                </v-hover>
            </div>
        </div>
        <div class="marginbottom125 text-uppercase" >
            <span style="font-weight:500; color: #424242;" >Existing Projects</span>
        </div>
        <div :elevation="0" class="pad125 fullheight-percent flex flexcenter flexcol" style="background: white; max-width:1920px; ">
            <div v-if="loadProtocolIsDone == false" class="fullheight-percent fullwidth text-center" >
                <v-progress-circular
                    :active="true"
                    :indeterminate="true"
                    :size="40"
                    center
                    color="primary"
                ></v-progress-circular>
            </div>
            <!-- instance list here -->
            <!-- <v-expand-transition>
                <v-tabs v-if="instances.length > 0 && loadProtocolIsDone" color="#4e6795">
                    <v-tab>ALL</v-tab>
                    <v-tab>RECENT</v-tab>
                    <v-tab>PINNED</v-tab>
                </v-tabs>
            </v-expand-transition> -->
            <portal v-if="renameData" to="modal">
                <v-card style="background: white; max-width:400px; min-width: 400px;" :class="['pad125', renameError ? 'err_shake' : '']" >
                    <v-progress-linear
                        :active="renameOnProgress"
                        :indeterminate="renameOnProgress"
                        absolute
                        bottom
                        color="primary"
                    ></v-progress-linear>
                    <v-card-text class=" " style="padding:0;" >Give a new title name to <strong>"{{renameData.title}}"</strong>.</v-card-text>
                    <v-text-field :error="renameError != undefined" :error-messages="renameError" v-model="renameNewValue"  :disabled="renameOnProgress" ></v-text-field>
           
                    <div class="flex fullwidth flexend" >
                        <v-btn :disabled="renameOnProgress"  @click="cancelRename" plain > cancel </v-btn>
                        <v-btn :disabled="renameOnProgress" @click="renameStart" plain > rename </v-btn>
                    </div>
                </v-card>
            </portal>
            <portal v-if="true" to="modal" >
                <v-card style="background: white; max-width:400px; min-width: 400px;" :class="['pad125', newProjectError ? 'err_shake' : '']"  >
                    <v-progress-linear
                        :active="createNewProjectOnProgress"
                        :indeterminate="createNewProjectOnProgress"
                        absolute
                        bottom
                        color="primary"
                    ></v-progress-linear>
                    <v-card-text class=" " style="padding:0;" >Give a title name for this project</v-card-text>
                    <v-text-field 
                        :error="newProjectError != undefined" 
                        :error-messages="newProjectError" 
                        v-model="newProjectTitle"  
                        :disabled="createNewProjectOnProgress" 
                    />
                    <div class="flex fullwidth flexend" >
                        <v-btn :disabled="createNewProjectOnProgress"  @click="cancelNewProjectInstanceCreation" plain > cancel </v-btn>
                        <v-btn :disabled="createNewProjectOnProgress" @click="startCreation" plain > create </v-btn>
                    </div>
                </v-card>
            </portal>
            <v-expand-transition>
                <div v-if="loadProtocolIsDone" class="margintop125 fullwidth" >
                    <v-expand-transition>
                        <emptyBox v-if="instances.length == 0 && loadProtocolIsDone" />
                    </v-expand-transition>
                    <div class="fullwidth" >
                        <v-expand-transition>
                            <div v-if="instances.length > 0" style="border-bottom:3px solid whitesmoke;;" class="flex pad050" >
                                <div class="fullwidth" style="font-weight:500;" >Title</div>
                                <div class="fullwidth" style="font-weight:500;"  >Last Modified</div>
                                <div class="fullwidth" style="font-weight:500;"  >Modified By</div>
                                <div class="padright125" style="font-weight:500;"  >Action</div>
                            </div>
                        </v-expand-transition>
                        <div style="border-bottom:1px solid whitesmoke;" 
                            :class="[disableAll ? 'not-allowed' : 'pointer']"
                            @click.once="disableAll ? () => {} : instanceSelect(instance)" 
                            v-for="instance in instances" :key="uid(instance)"
                        >
                            <v-hover v-slot="{ hover }" >
                                <v-card :disabled="disableAll" bottom style="background: none;" :elevation="hover ? 5 : 0" tile class="pad025 " >
                                    <v-progress-linear
                                        :active="clickedInstance == instance.title"
                                        :indeterminate="clickedInstance == instance.title"
                                        absolute
                                        bottom
                                        color="primary"
                                    ></v-progress-linear>
                                    <div class="flex" >
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.title}}</div>
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.modified}}</div>
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.modified_by}}</div>
                                        <div  class="padtop025 padbottom025 flex" >
                                            <v-btn @click.stop="instanceRemove(instance)" icon plain >
                                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                                                </svg>
                                            </v-btn>
                                            <v-btn @click.stop="setRenameEnv(instance)" icon plain >
                                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                                </svg>
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-card>
                            </v-hover>
                        </div>
                    </div>
                </div>
            </v-expand-transition>
        </div>
    </main>
</template>

<script>
import emptyBox from './empty-box.vue'
import m from '@/m'
export default {
    mixins: [m],
    components: {emptyBox},
    props: ['myData', 'hooks'],
    data: () => ({
        instance_types: [],
        instances: [],
        clickedInstance: undefined,
        disableAllInstance: false,
        appName: undefined,
        loadProtocolIsDone: false,
        disableAll: false,
        // rename data properties
        renameData: false,
        renameNewValue: '',
        renameOnProgress: false,
        renameError: undefined,
        // new project data properties
        promptForNewProjectTitle: false,
        createNewProjectOnProgress: false,
        newProjectTitle: undefined,
        newProjectError: undefined,
        newProjectService: undefined
    }),
    watch: {
        renameNewValue() {
            this.renameError = undefined
        },
        newProjectTitle() {
            this.newProjectError = undefined
        }
    },
    methods: {
        // instance CRUD
        fetchAppInstances() {
            webpod.server.apps.fetchAppInstances({
                app_name: this.appName
            })
        },
        createInstance(n) {
            console.log('this is',n)
            const service = this.myData.version_data.body
            service.viewData = n
            this.promptForNewProjectTitle = true
            webpod.dashboardMethods.setModalState.show()
            this.newProjectService = service
            // webpod.paneCollection.insertPaneCollectionItem(0)(service)
        },
        instanceSelect(selected) {
            this.clickedInstance = selected.title
            this.disableAll = true
            webpod.session.appInstanceOnFocus = selected.title

            webpod.server.apps.fetchAppInstance({
                app_name: this.appName,
                instance_title: selected.title
            }, (data) => {
                webpod.paneCollection.insertPaneCollectionItem(0)(data.instance_data.body)
                this.clickedInstance = undefined
                setTimeout(() => {
                    this.disableAll = false
                }, 1000)
            })
        },
        instanceRemove(selected) {
            this.clickedInstance = selected.title
            this.disableAll = true

            webpod.server.apps.removeAppInstance({
                app_name: this.appName,
                instance_title: selected.title
            }, (data) => {
                this.clickedInstance = undefined
                this.instances = data
                this.disableAll = false
            })
        },
        validateInstanceTitle(value) {
            let error = undefined
            if(value == undefined || value.trim() == '' ) error = 'this field is required'
            if((value || '').length > 20) error = 'Max 20 characters'
            for(let x = 0; x < this.instances.length - 1; x++) {
               if(this.instances[x].title === value) {
                   error = `${value} already exist`
                   break
               }
            }
            return error || 'passed'
        },
        // create new project instance
        cancelNewProjectInstanceCreation() {
            this.promptForNewProjectTitle = false
            webpod.dashboardMethods.setModalState.hide()
            this.newProjectError = undefined
            this.newProjectTitle = undefined
            this.newProjectService = undefined
            this.createNewProjectOnProgress = false
        },
        startCreation() {
            const validationResult = this.validateInstanceTitle(this.newProjectTitle)
            if(validationResult === 'passed') {
                this.createNewProjectOnProgress = true
                this.newProjectService.paneConfig.title = `${this.newProjectService.paneConfig.title}:${this.newProjectTitle}` 
                webpod.paneCollection.insertPaneCollectionItem(0)(this.newProjectService)
                this.cancelNewProjectInstanceCreation()
            } else {
                this.newProjectError = validationResult
            }
        },
        // rename methods
        setRenameEnv(selected) {
            webpod.dashboardMethods.setModalState.show()
            this.renameData = selected
        },
        cancelRename() {
            webpod.dashboardMethods.setModalState.hide()
            this.renameData = undefined
            this.renameError = undefined
            this.renameNewValue = undefined
            this.renameOnProgress = false
        },
        renameStart() {
            const validationResult = this.validateInstanceTitle(this.renameNewValue)

            if(validationResult === 'passed') {
                webpod.server.apps.renameAppInstanceTitle(this.renameNewValue,this.renameData,(data) => {
                    if(data.message == 'OK') {
                        for(let i = 0; i < this.instances.length - 1; i++) {
                            if(this.instances[i].title === this.renameData.title) {
                                this.instances[i].title = data.new_title
                                setTimeout(() => {
                                    this.cancelRename()
                                },10)
                                break
                            }
                        }
                    }
                })
                this.renameOnProgress = true
                this.renameError = undefined
            } else {
                this.renameError = validationResult
            }
            
        }
    },
    created() {
        if(this.myData.instancer.instance_types && this.myData.instancer.instance_types.length) {
            this.instance_types = this.myData.instancer.instance_types
        } else {
            this.instance_types.push({
                name: 'new project'
            })
        }

        if(!this.myData.version_data) {
            webpod.dashboardMethods.alertError({
                message: 'Invalid version_data',
                reload: true
            })
        } else {
            this.appName = this.myData.version_data.body.view

            webpod.server.apps.fetchAppInstances(this.appName,(data) => {
                this.instances = data
                this.loadProtocolIsDone = true
            })
        }
    }
}
</script>