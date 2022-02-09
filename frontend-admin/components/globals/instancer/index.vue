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
                                    <span class="" style="font-weight:500; font-size: 105%; color: #4e6795;">CREATE {{type.type}}</span> 
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
             <v-progress-linear
                v-if="loadProtocolIsDone == false"
                :active="true"
                :indeterminate="true"
                bottom
                color="primary"
            ></v-progress-linear>
            <!-- instance list here -->
            <!-- <v-expand-transition>
                <v-tabs v-if="instances.length > 0 && loadProtocolIsDone" color="#4e6795">
                    <v-tab>ALL</v-tab>
                    <v-tab>RECENT</v-tab>
                    <v-tab>PINNED</v-tab>
                </v-tabs>
            </v-expand-transition> -->
            <!-- Modals -->
            <portal to="modal">
                    <v-card v-if="renameData" tile  style="background: white; max-width:400px; min-width: 400px;" :class="['pad125', renameError ? 'err_shake' : '']" >
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
                            <v-btn :ripple="false" :disabled="renameOnProgress"  @click="cancelRename" plain text  > cancel </v-btn>
                            <v-btn :ripple="false" :disabled="renameOnProgress" @click="renameStart" plain text  > {{renameOnProgress == true ? 'renaming ...' : 'rename'}} </v-btn>
                        </div>
                    </v-card>
            </portal>
            <portal to="modal">
                <v-card   v-if="lastModifiedModal" tile style="min-width: 400px;" class="pad125" >
                    <div class="pad125" >
                        <div>
                            <div class="flex spacebetween" >
                                <v-card-title style="padding-left:0" >
                                    Filter By Date
                                </v-card-title>
                                <div style="margin-top:10px;" class="text--secondary" >
                                    <v-chip>{{dateFilterItemsFound}} {{dateFilterItemsFound > 1 ? 'items' : 'item'}} found</v-chip>
                                </div> 
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
                                <v-btn :disabled="filterByDateButtonIsDisable" @click="filterByDate" plain text > 
                                    FILTER
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                    
                </v-card>
            </portal>
            <portal  to="modal" >
                <v-card tile v-if="promptForNewProjectTitle" style="background: white; max-width:400px; min-width: 400px;" :class="['pad125', newProjectError ? 'err_shake' : '']"  >
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
                        <v-btn v-if="createNewProjectOnProgress == false" :disabled="createNewProjectOnProgress"  @click="cancelNewProjectInstanceCreation" plain text > cancel </v-btn>
                        <v-btn :disabled="createNewProjectOnProgress" @click="startCreation" plain text > {{createNewProjectOnProgress ? 'creating ...' : 'create'}} </v-btn>
                    </div>
                </v-card>
            </portal>
            <!-- Modal end -->
            <v-expand-transition>
                <div v-if="loadProtocolIsDone" class="margintop125 fullwidth" >
                    <v-expand-transition>
                        <div>
                            <emptyBox v-if="instances.length == 0 && loadProtocolIsDone" />
                            <div  v-if="instances.length == 0 && instancesCopy.length != 0" class="flex flexcenter" >
                                <v-btn @click="instances = instancesCopy" text tile >
                                    <svg class="marginright025" style="width:20px;height:20px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                                    </svg>
                                    go back
                                </v-btn>
                            </div>
                        </div>
                    </v-expand-transition>
                    <div v-if="instances.length != 0" class=" flex  flexend" >
                        <div class="flexcenter" >
                            <v-text-field v-model="searchQuery" :placeholder="`search title against ${instances.length} items`" style="min-width:250px;" > </v-text-field>
                        </div>
                    </div>
                    <div class="fullwidth" >
                        <v-expand-transition>
                            <div v-if="instances.length > 0" style="border-bottom:3px solid whitesmoke;;" class="flex pad050" >
                                <div class="fullwidth " style="font-weight:500; margin-left:60px;" >Title</div>
                                <!-- Last Modified -->
                                <div class="fullwidth flex flexcenter flexstart " style="font-weight:500;"  >
                                    Last Modified
                                    <v-btn @click="showLastModifiedModal(true)" plain text icon small :ripple="false" >
                                        <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                        </svg>
                                    </v-btn>
                                </div>
                                <!-- Modified By Dropdown -->
                                <div class="fullwidth flex flexcenter flexstart relative " style="font-weight:500;"  >
                                    <span class="" >Modified By</span>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                            small icon text plain
                                            v-bind="attrs"
                                            v-on="on"
                                            :ripple="false"
                                            >
                                            <svg class="pointer" style="width:20px;height:20px" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                            </svg>
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
                                <!-- Actions -->
                                <div class="padright125 " style="font-weight:500;"  >Action</div>
                            </div>
                        </v-expand-transition>
                        <!-- instance list -->
                        <div style="border-bottom:1px solid whitesmoke;" 
                            :class="[disableAll ? 'not-allowed' : 'pointer']"
                            @click.once="disableAll ? () => {} : instanceSelect(instance)" 
                            v-for="instance in instances" :key="uid(instance)"
                        >
                            
                            <!-- instance data table -->
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
                        <!-- items found -->
                        <div class="margintop125 flex flexend" >
                            {{instances.length}} item{{instances.length > 1 ? 's' : ''}} found
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
        instancesCopy: [],
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
        newProjectService: undefined,
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
        dateFilterItemsFound: undefined
        
    }),
    watch: {
        renameNewValue() {
            this.renameError = undefined
        },
        newProjectTitle() {
            this.newProjectError = undefined
        },
        searchQuery() {
            if(this.searchQuery) {
                this.instances = this.instances.filter(item => {
                    return item.title.includes(this.searchQuery)
                })
            } else {
                this.instances = this.instancesCopy
            }
        },
        selectedModifiedYear() {
            if(this.selectedModifiedYear != undefined) {
                this.filterByDateButtonIsDisable = false
                
                const filtered =  this.instancesCopy.filter(e => {
                    const dateInfo = e.modified_date.split('/')
                    const year = dateInfo[2]
                    return this.selectedModifiedYear == year
                })
                this.dateFilterItemsFound = filtered.length
            }
        },
        selectedModifiedMonth() {
            if(this.selectedModifiedMonth != undefined) {
                
                const filtered =  this.instances.filter(e => {
                    const dateInfo = e.modified_date.split('/')
                    const month = dateInfo[0]
                    return this.selectedModifiedMonth == month
                })
                this.dateFilterItemsFound = filtered.length
            }
        },
        selectedModifiedDay() {
            if(this.selectedModifiedDay != undefined) {
                
                const filtered =  this.instances.filter(e => {
                    const dateInfo = e.modified_date.split('/')
                    const day = dateInfo[1]
                    return this.selectedModifiedDay == day
                })
                this.dateFilterItemsFound = filtered.length
            }
        }
    },
    methods: {
        // instance CRUD
        fetchAppInstances() {
            webpod.server.apps.fetchAppInstances({
                app_name: this.appName
            })
        },
        // create new project instance
        createInstance(n) {
            const service = this.myData.version_data.body
            service.viewData = n
            this.promptForNewProjectTitle = true
            webpod.dash.modal.show()
            webpod.dash.modal.closeOnBlur(false)
            this.newProjectService = service
        },
        instanceSelect(selected,cb) {
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
        cancelNewProjectInstanceCreation() {
            this.promptForNewProjectTitle = false
            webpod.dash.modal.hide(() => {
                this.newProjectError = undefined
                this.newProjectTitle = undefined
                this.newProjectService = undefined
                this.createNewProjectOnProgress = false
            })
            
        },
        startCreation() {
            const validationResult = this.validateInstanceTitle(this.newProjectTitle)
            if(validationResult === 'passed') {
                this.createNewProjectOnProgress = true
                this.newProjectService.paneConfig.title = `${this.newProjectService.paneConfig.title}:${this.newProjectTitle}`
                this.newProjectService.viewData.title = this.newProjectTitle

                // create app instance in db
                const app_name = this.appName
                const instance_title = this.newProjectTitle
                webpod.server.apps.insertAppInstance({app_name,instance_title},(data) => {
                    if(data.message == 'OK') {
                        this.instanceSelect({title: this.newProjectTitle},() => {
                            this.cancelNewProjectInstanceCreation()
                        })
                    }
                })
                // refetch all apps
                // then locate the new instance in instances
                // webpod.paneCollection.insertPaneCollectionItem(0)(this.newProjectService)
            } else {
                this.newProjectError = validationResult
            }
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
            }
            
        },
        showLastModifiedModal(state) {
            this.lastModifiedModal = state
            if(state) {
                webpod.dash.modal.show()
                webpod.dash.modal.onClose(() => {
                    if(!this.isBeenFilteredOnce) {
                        this.selectedModifiedYear = undefined
                        this.selectedModifiedMonth = undefined
                        this.selectedModifiedDay = undefined
                    }
                    
                })
            } else {
                webpod.dash.modal.hide(() => {
                    this.isBeenFilteredOnce = false
                    this.instances = this.instancesCopy
                })
            }
        },
        filterByDate() {
            webpod.dash.modal.hide(() => {
                if(this.selectedModifiedYear) {
                    this.isBeenFilteredOnce = true
                    const filtered =  this.instancesCopy.filter(e => {
                        const dateInfo = e.modified_date.split('/')
                        const year = dateInfo[2]
                        const month = dateInfo[0]
                        const day = dateInfo[1]


                        if(!this.selectedModifiedMonth) {
                            return this.selectedModifiedYear == year
                        } else {
                            if(this.selectedModifiedDay) {
                                return this.selectedModifiedMonth == month && this.selectedModifiedYear == year && this.selectedModifiedDay == day
                            } else {
                                return this.selectedModifiedMonth == month && this.selectedModifiedYear == year
                            }   
                        }
                    })
                    if(filtered.length == 0) {
                        this.isBeenFilteredOnce = false
                    }
                    this.instances = filtered
                }
            })
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
            webpod.dash.alertError({
                message: 'Invalid version_data',
                reload: true
            })
        } else {
            this.appName = this.myData.version_data.body.view

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