<template>
    <main class="flex fullwidth flexcol relative " >
        <!-- banner -->
        <div style="height: 400px; 
            background: linear-gradient(90deg, rgba(112,76,156,1) 0%, rgba(9,9,121,1) 100%)" 
        class="absolute fullwidth fullheight-percent rounded-xl" >
        </div>
        <!--  -->
        <div style="max-height:300px; z-index: 1; " class="pad125" >
           <div class="pad125" >
            <!-- title -->
             <div class="flex flexcenter flexstart margintop025" >
                <h4 class="merri-font marginright050" style="color:white; margin-bottom: 0; margin-top:0;">{{menuTitle}}</h4>
                <dropDown
                    @command="(item) => createInstance( (instance_types.filter(e => e.type == item))[0] )"
                    :options="instance_types.map(e => {return {title: e.type}})"
                >
                    <v-btn fab small >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </dropDown>
            </div>
            <div class="flex flexcenter flexstart" >
                <!-- <v-icon small color="white" class="marginright050" >mdi-account</v-icon>
                <span style="color:white;" >{{user}}</span> -->
                Schemas Collections
            </div>
            <!-- <div style="max-width: 500px;" >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta consequuntur veritatis beatae sunt animi iusto cumque sapiente et voluptate, ullam esse fuga nulla eum doloribus dolorem tempore unde saepe incidunt!</div> -->
           </div>
        </div>
        <v-card 
            :elevation="5" 
            class="rounded-xl pad125 flex flexcenter flexcol marginleft125 marginright125 marginbottom125" 
            style="background: white; max-width:1920px; "
        >
            <!-- RENAME MODAL -->
            <portal to="modal">
                <div v-if="renameData"  style="background: white;  min-width: 400px; height: 100%;" :class="['', renameError ? 'err_shake' : '']" >
                    <v-card-text class=" " style="padding:0;" >Give a new title name to <strong>"{{renameData.title}}"</strong>.</v-card-text>
                    <v-text-field :error="renameError != undefined" :error-messages="renameError" v-model="renameNewValue"  :disabled="renameOnProgress" ></v-text-field>
                    <div class="flex fullwidth flexend" >
                        <v-btn :ripple="false" :disabled="renameOnProgress"  @click="cancelRename" plain text  > cancel </v-btn>
                        <v-btn :ripple="false" :disabled="renameOnProgress" @click="renameStart" plain text  > {{renameOnProgress == true ? 'renaming ...' : 'rename'}} </v-btn>
                    </div>
                </div>
            </portal>
            <!-- FILTER BY DATE MODAL -->
            <portal to="modal">
                <div   v-if="lastModifiedModal" style="min-width: 400px;" class="pad125" >
                    <div class="pad125" >
                        <div>
                            <div class="flex spacebetween" >
                                <v-card-title style="padding-left:0" >
                                    Filter By Date
                                </v-card-title>
                            </div>
                            <v-card-subtitle style="padding-left:0" >Filtering app instances by a specific date range</v-card-subtitle>
                        </div>
                        <div>
                            <v-select
                            :items="lastModfiedYears"
                            menu-props="auto"
                            hide-details
                            label="Select Year"
                            v-model="selectedModifiedYear"
                            ></v-select>
                        </div>
                        <div class="margintop125" >
                            <v-select
                            :items="lastModfiedMonths"
                            menu-props="auto"
                            hide-details
                            label="Select Month"
                            v-model="selectedModifiedMonth"
                            :disabled="selectedModifiedYear == undefined"
                            ></v-select>
                        </div>
                        <div class="margintop125" >
                            <v-select
                            :items="lastModfiedDays"
                            menu-props="auto"
                            hide-details
                            label="Select Day"
                            v-model="selectedModifiedDay"
                            :disabled="selectedModifiedMonth == undefined"
                            ></v-select>
                        </div>
                        
                        <div class="flex fullwidth flexend margintop125 flexcenter" >
                            <v-card-actions>
                                <v-btn @click="showLastModifiedModal(false)" plain text > 
                                    CLEAR 
                                </v-btn>
                                <v-btn :disabled="filterByDateButtonIsDisable || dateFilterItemsFound == 0" @click="filterByDate" plain text > 
                                    FILTER
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                    
                </div>
            </portal>
            <!-- CREATE NEW INSTANCE MODAL -->
            <portal  to="modal" >
                <div v-if="promptForNewProjectTitle" style="background: white; min-width: 400px;" :class="['', newProjectError ? 'err_shake' : '']"  >
                    <v-card-text class=" " style="padding:0;" >Give a title name for this <strong><span class="text-uppercase" >{{selectedInstanceType}}</span></strong></v-card-text>
                    <v-text-field 
                        :error="newProjectError != undefined" 
                        :error-messages="newProjectError" 
                        v-model="newProjectTitle"  
                        :disabled="createNewProjectOnProgress"
                        persistent-hint
                    />
                </div>
            </portal>
            <!-- **** -->
            <v-expand-transition>
                <div v-if="loadProtocolIsDone" class="margintop125 fullwidth pad125" >
                    <!-- ON EMPTY -->
                    <v-expand-transition>
                        <div>
                            <emptyBox v-if="instances.length == 0 && loadProtocolIsDone" />
                            <!-- GO BACK BUTTON -->
                            <div  v-if="instances.length == 0 && instancesCopy.length != 0" class="flex flexcenter" >
                                <v-btn @click="resetQuery" text plain >
                                    go back
                                </v-btn>
                            </div>
                        </div>
                    </v-expand-transition>
                    <!-- SEARCH INSTANCES -->
                    <div v-if="instances.length != 0" class=" flex flexend" >
                        <div style="max-width:350px" class="flexcenter flex" >
                            <v-text-field v-model="searchQuery" :placeholder="`search title`" style="min-width:250px;" > </v-text-field>
                            <v-btn @click="searchByTitle" icon >
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="fullwidth" >
                        <!-- MODIFIED OPTIONS -->
                        <v-expand-transition>
                            <div v-if="instances.length > 0" style="border-bottom:3px solid whitesmoke;" class="flex pad050" >
                                <div class="fullwidth flex flexcenter flexstart" style="font-weight:500; margin-left:60px;" >
                                    <span class="body-2 text--secondary" >TITLE</span>
                                </div>
                                <!-- LAST MODIFIED-->
                                <div class="fullwidth flex flexcenter flexstart " style="font-weight:500;"  >
                                    <span class="body-2 text--secondary text-uppercase" >Last Modified</span>
                                    <v-btn @click="showLastModifiedModal(true)" plain text icon small :ripple="false" >
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </div>
                                <!-- MODIFIED BY -->
                                <div class="fullwidth flex flexcenter flexstart relative " style="font-weight:500;"  >
                                    <span class="body-2 text--secondary text-uppercase" >Modified By</span>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            small icon text plain
                                            v-bind="attrs"
                                            v-on="on"
                                            :ripple="false"
                                            >
                                            <v-btn plain text icon small :ripple="false" >
                                                <v-icon>mdi-chevron-down</v-icon>
                                            </v-btn>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item
                                            v-for="(item, index) in modifiedByAdminList"
                                            :key="uid(index)"
                                            link
                                            @click="filterByModified(item)"
                                            >   
                                                <v-list-item-title class="small-text" >{{ item }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>
                                <!-- ACTIONS -->
                                <div class="" style="font-weight:500;min-width:70px"  >
                                    <span class="body-2 text--secondary text-uppercase" >action</span>
                                </div>
                            </div>
                        </v-expand-transition>
                        <!-- INSTANCE LIST -->
                        <div style="border-bottom:1px solid whitesmoke;" 
                            :class="[disableAll ? 'not-allowed' : 'pointer']"
                            @click.once="disableAll ? () => {} : instanceSelect(instance)" 
                            v-for="instance in instances" :key="uid(instance)"
                        >                            
                            <!-- INSTANCE DATA TABLE-->
                            <v-hover v-slot="{ hover }" >
                                <v-card :disabled="disableAll" bottom style="background: none;" :elevation="hover ? 5 : 0" class="pad025 " >
                                    <!-- ENTRIES -->
                                    <div class="flex" >
                                        <div class="padtop025 padleft050 padbottom025 flex flexcenter flexstart" >
                                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                                <path fill="#1976d2" :d="instance.svg || 'M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'" />
                                            </svg>
                                        </div>
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart marginleft125" >{{instance.title}}</div>
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.modified_date}}</div>
                                        <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.modified_by}}</div>
                                        <div  class="padtop025 padbottom025 flex" >
                                            <v-btn @click.stop="instanceRemove(instance)" icon plain >
                                                <v-icon>
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                            <v-btn @click.stop="setRenameEnv(instance)" icon plain >
                                                <v-icon>
                                                    mdi-pencil
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-card>
                            </v-hover>
                        </div>
                        <!-- ITEMS FOUND-->
                        <div class="margintop125 flex spacebetween flexcenter" >
                            <span class="body-2 text--secondary text-uppercase" >{{instances.length}} item{{instances.length > 1 ? 's' : ''}} found</span>
                            <v-btn plain text  @click="resetQuery"  >reset</v-btn>
                        </div>
                    </div>
                </div>
            </v-expand-transition>
        </v-card>
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
        menuTitle: undefined,
        instance_types: [],
        instances: [],
        instancesCopy: [],
        clickedInstance: undefined,
        disableAllInstance: false,
        appName: undefined,
        loadProtocolIsDone: false,
        disableAll: false,
        // instance creation
        selectedInstanceType: undefined,
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
        newProjectService: undefined,
        // global filter condition
        filterConditions: [],
        // search query
        searchQuery: undefined,
        // modified by
        modifiedByAdminList: [],
        // modified by date
        lastModifiedModal: false,
        lastModfiedYears: [],
        lastModfiedMonths: [],
        lastModfiedDays: [],
        selectedModifiedYear: undefined,
        selectedModifiedMonth: undefined,
        selectedModifiedDay: undefined,
        filterByDateButtonIsDisable: true,
        isBeenFilteredOnce: false,
        dateFilterItemsFound: undefined,
        user: undefined
    }),
    watch: {
        renameNewValue() {
            this.renameError = undefined
        },
        newProjectTitle() {
            this.newProjectError = undefined
        },
        selectedModifiedYear(n) {
            if(this.selectedModifiedYear != undefined) {
                this.filterByDateButtonIsDisable = false
            }
        },
        selectedModifiedMonth() {
            if(this.selectedModifiedMonth != undefined) {
                
            }
        },
        selectedModifiedDay() {
            if(this.selectedModifiedDay != undefined) {
                
            }
        },
        filterConditions(conditions) {
            let currentFilteredResult = undefined
            
            const filterInstance = (conditionIndex) => {
                currentFilteredResult = (currentFilteredResult || this.instancesCopy).filter(instance_entry => 
                    conditions[conditionIndex](instance_entry) && instance_entry)
            }
       
            for(let i = 0; i < this.filterConditions.length; i++) {
                filterInstance(i)
                if(i === this.filterConditions.length - 1) {
                    this.instances = currentFilteredResult
                }
            }
        }
    },
    methods: {
        // instance CRUD
        fetchAppInstances() {
            console.log('fetching app instance', this.app_name)
            webpod.server.apps.fetchAppInstances({
                app_name: this.appName
            })
        },
        // create new project instance
        createInstance(n) {
            this.selectedInstanceType = n.type
            const service = this.myData.version_data.body
            service.viewData = n
            this.newProjectService = service

            const modalInstance = webpod.dash.modal.show({
                viewTrigger: (s) => {
                    this.promptForNewProjectTitle = s
                    if(s == false) { 
                        // this bit will exec on close only
                        this.newProjectError = undefined 
                        this.newProjectTitle = undefined
                        this.newProjectService = undefined
                        this.createNewProjectOnProgress = false
                    }
                },
                modalTitle: 'Create New Project',
                button: 'create',
            })

            modalInstance.on('btn-click', (btn) => {
                btn.disabled(true)
                btn.progress(true)

                this.createNewProjectOnProgress = true

                const validationResult = this.validateInstanceTitle(this.newProjectTitle)
                if(validationResult === 'passed') {
                    
                    this.newProjectService.paneConfig.title = `${this.newProjectService.paneConfig.title}:${this.newProjectTitle}`
                    this.newProjectService.viewData.title = this.newProjectTitle
                    
                    // create app instance in db
                    const app_name = this.appName
                    const instance_title = this.newProjectTitle

                    // REST api
                    webpod.server.apps.insertAppInstance({app_name,instance_title},(data) => {
                        if(data.message == 'OK') {
                            this.instanceSelect({title: this.newProjectTitle},() => {
                                webpod.dash.modal.hide()
                            })
                        }
                    })
                    // refetch all apps
                    // then locate the new instance in instances
                    // webpod.paneCollection.insertPaneCollectionItem(0)(this.newProjectService)
                } else {
                    this.newProjectError = validationResult
                    this.createNewProjectOnProgress = false
                    btn.disabled(false)
                    btn.progress(false)
                }

            })

        },
        instanceSelect(selected,cb) {
            console.log('instance_select', selected, this.app_name)
            this.clickedInstance = selected.title
            this.disableAll = true
            webpod.session.appInstanceOnFocus = selected.title

            webpod.server.apps.fetchAppInstance({
                app_name: this.appName,
                instance_title: selected.title
            }, (data) => {
                webpod.paneCollection.insertPaneCollectionItem(0)(data.instance_data.body)
                this.clickedInstance = undefined
                if(cb) cb()
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
            if(value == undefined || value.trim() == '' ) error = 'Field is required'
            if((value || '').length > 20) error = 'Max 20 characters'
            for(let x = 0; x < this.instances.length - 1; x++) {
               if(this.instances[x].title === value) {
                   error = `${value} already exist`
                   break
               }
            }
            return error || 'passed'
        },
        // rename methods
        setRenameEnv(selected) {
            webpod.dash.modal.show()
            webpod.dash.modal.onClose(() => {
                this.renameData = undefined
                this.renameError = undefined
                this.renameNewValue = undefined
                this.renameOnProgress = false
            })
            this.renameData = selected
        },
        cancelRename() {
            webpod.dash.modal.hide(() => {
                this.renameData = undefined
                this.renameError = undefined
                this.renameNewValue = undefined
                this.renameOnProgress = false
            })
            
        },
        renameStart() {
            this.renameOnProgress = false
            webpod.dash.modal.closeOnBlur(false)
            const validationResult = this.validateInstanceTitle(this.renameNewValue)

            if(validationResult === 'passed') {
                webpod.server.apps.renameAppInstanceTitle(this.renameNewValue,this.renameData,(data) => {
                    if(data.message == 'OK') {
                        for(let i = 0; i < this.instances.length; i++) {
                            webpod.dash.modal.closeOnBlur(true)
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
        },
        // data arrange and sorting
        filterByModified(admin) {
            if(admin == 'Show All') {
                this.instances = this.instancesCopy
            } else {
                if(this.isBeenFilteredOnce) {
                    this.instances =  this.instances.filter(item => item.modified_by === admin)
                } else {
                    this.instances = this.instancesCopy.filter(item => item.modified_by === admin)
                }

                const condition = (instance_entry) => instance_entry.modified_by === admin
                
                this.filterConditions.push(condition)
            }
            
        },
        showLastModifiedModal(state) {
            this.lastModifiedModal = state

            if(state) {
                webpod.dash.modal.show()
                webpod.dash.modal.onClose(() => this.lastModifiedModal = false)
            } else {
                webpod.dash.modal.hide(() => {
                    this.isBeenFilteredOnce = false
                    this.instances = this.instancesCopy
                    this.selectedModifiedYear = undefined
                    this.selectedModifiedMonth = undefined
                    this.selectedModifiedDay = undefined
                    this.lastModifiedModal = false
                })
            }
        },
        filterByDate() {
            webpod.dash.modal.hide(() => {
                if(this.selectedModifiedYear) {
                    const condition = (instance_entry) => {
                        const dateInfo = instance_entry.modified_date.split('/')
                        const year = dateInfo[2]
                        const day = dateInfo[1]
                        return this.selectedModifiedYear == year
                    }
                    this.filterConditions.push(condition)
                }

                if(this.selectedModifiedMonth) {
                     const condition = (instance_entry) => {
                        const dateInfo = instance_entry.modified_date.split('/')
                        const month = dateInfo[0]
                        return this.selectedModifiedMonth == month
                    }
                    this.filterConditions.push(condition)
                }

                if(this.selectedModifiedDay) {
                     const condition = (instance_entry) => {
                        const dateInfo = instance_entry.modified_date.split('/')
                        const day = dateInfo[1]
                        return this.selectedModifiedDay == day
                    }
                    this.filterConditions.push(condition)
                }
            })
        },
        resetQuery() {
            this.instances = this.instancesCopy
            this.filterConditions = []
            this.searchQuery = undefined
            this.selectedModifiedYear = undefined
            this.selectedModifiedMonth = undefined
            this.selectedModifiedDay = undefined
        },
        searchByTitle() {
            if(this.searchQuery) {
                const condition = (instance_entry) => {
                    return instance_entry.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                }
                this.filterConditions.push(condition)
            }
        }
    },

    created() {
        console.log(this.myData)
        this.user = webpod.dash.getUser().name
        const topAlert = webpod.dash.topAlert('loading...')

        if(this.myData.instancer.instance_types && this.myData.instancer.instance_types.length) {
            this.menuTitle = this.myData.title
            this.instance_types = this.myData.instancer.instance_types
        } else {
            this.instance_types.push({
                name: 'new project'
            })
        }

        if(!this.myData.version_data) {
            webpod.dash.alertError({
                message: 'Invalid version_data',
                reload: true
            })
        } else {
            this.appName = this.myData.instancer.app_name

            webpod.server.apps.fetchAppInstances(this.appName,(data) => {
                this.instances = data
                this.dateFilterItemsFound = this.instances.length
                this.loadProtocolIsDone = true

                this.instancesCopy = Object.seal(this.copy(this.instances))
                this.instances.map((e,i) => {
                    if(!this.modifiedByAdminList.includes(e.modified_by)) {
                        this.modifiedByAdminList.push(e.modified_by)
                    }
                    const dateInfo = e.modified_date.split('/')
                    const month = dateInfo[0]
                    const day = dateInfo[1]
                    const year = dateInfo[2]

                    if(!this.lastModfiedYears.includes(year)) this.lastModfiedYears.push(year)
                    if(!this.lastModfiedMonths.includes(month)) this.lastModfiedMonths.push(month)
                    if(!this.lastModfiedDays.includes(day)) this.lastModfiedDays.push(day)
                })
                this.modifiedByAdminList.push('Show All')
                topAlert.close()
            })
        }
    }
}
</script>

<style lang="scss" >

.mfp-zoom-in {
  
  /* start state */
  .mfp-with-anim {
    opacity: 0;
    -webkit-transition: all 0.2s ease-in-out; 
    transition: all 0.2s ease-in-out; 
    transform: scale(0.8); 
  }
  
  &.mfp-bg {
    opacity: 0;
	  transition: all 0.3s ease-out;
  }
  
  /* animate in */
  &.mfp-ready {
    .mfp-with-anim {
      opacity: 1;
      transform: scale(1); 
    }
    &.mfp-bg {
      opacity: 0.8;
    }
  }
}  

</style>