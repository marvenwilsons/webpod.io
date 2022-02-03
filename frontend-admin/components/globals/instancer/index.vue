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
        <div  class="pad125" style="background: white; max-width:1920px; ">
            <!-- instance list here -->
            <v-tabs color="#4e6795">
                <v-tab>ALL</v-tab>
                <v-tab>RECENT</v-tab>
                <v-tab>PINNED</v-tab>
            </v-tabs>
            <div class="margintop125" >
                <emptyBox v-if="instances.length == 0" />
                <div>
                    <div style="border-bottom:3px solid whitesmoke;;" class="flex pad050" >
                        <div class="fullwidth" style="font-weight:500;" >Name</div>
                        <div class="fullwidth" style="font-weight:500;"  >Modified</div>
                    </div>
                    <div style="border-bottom:1px solid whitesmoke;" class="pointer " @click="instanceSelect" v-for="instance in instances" :key="uid(instance)">
                        <v-hover v-slot="{ hover }" >
                            <v-card v-ripple style="background: none;" :elevation="hover ? 5 : 0" tile class="pad025 " >
                                <div class="flex" >
                                    <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.title}}</div>
                                    <div class="padtop025 padleft050 padbottom025 fullwidth flex flexcenter flexstart" >{{instance.title}}</div>
                                    <div class="padtop025 padbottom025 " >
                                        <v-btn icon plain >
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
        instances: [{title: 'VID D23 23GDS'},{title: 'GFOADHF SDV'},{title: 'BD 3 DF'}]
    }),
    methods: {
        createInstance(n) {
            this.hooks.onCreateInstance(n,this.myData)
        },
        instanceSelect(n) {

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
        }
    }
}
</script>