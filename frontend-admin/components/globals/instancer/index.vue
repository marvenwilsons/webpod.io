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
                                <div class="" style="font-weight:500;"  >Action</div>
                            </div>
                        </v-expand-transition>
                        <div style="border-bottom:1px solid whitesmoke;" 
                            :class="[clickedInstance == instance.title ? 'not-allowed' : 'pointer']"
                            @click.once=" clickedInstance == instance.title ? () => {} : instanceSelect(instance)" 
                            v-for="instance in instances" :key="uid(instance)"
                        >
                            <v-hover v-slot="{ hover }" >
                                <v-card :disabled="clickedInstance == instance.title" bottom style="background: none;" :elevation="hover ? 5 : 0" tile class="pad025 " >
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
                                        <div @click.stop="instanceRemove(instance)" class="padtop025 padbottom025 " >
                                            <v-btn  icon plain >
                                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
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
        loadProtocolIsDone: false
    }),
    methods: {
        fetchAppInstances() {
            webpod.server.apps.fetchAppInstances({
                app_name: this.appName
            })
        },
        createInstance(n) {
            const service = this.myData.version_data.body
            service.viewData = n
            webpod.paneCollection.insertPaneCollectionItem(0)(service)
        },
        instanceSelect(selected) {
            this.clickedInstance = selected.title

            webpod.server.apps.fetchAppInstance({
                app_name: this.appName,
                instance_title: selected.title
            }, (data) => {
                this.clickedInstance = undefined
            })
        },
        instanceRemove(selected) {
            this.clickedInstance = selected.title

            webpod.server.apps.removeAppInstance({
                app_name: this.appName,
                instance_title: selected.title
            }, (data) => {
                this.clickedInstance = undefined
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