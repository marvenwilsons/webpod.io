<template>
    <div style="padding:0;" class="flex relative fullheight-percent" >
       <section :style="{minWidth: '230px', maxWidth: '300px'}" 
       class="flex flex1 flexcol relative fullheight-percent pad125" >
         <div class=" marginbottom050  flexcenter" >
            <div class="flex">
                <v-text-field dense hide-details outlined  class="" label="Search Name" ></v-text-field>
                <v-btn @click="showFilterModal" outlined class="marginleft050 rounded" v-ripple="false" small tile dense icon text fab >
                    <v-icon  class=" pointer" >mdi-filter</v-icon>
                </v-btn>
            </div>
        </div>
        <div :style="{overflow: 'auto'}" class="flex1  relative" >
            <div style="overflow:auto;" class="  absolute fullwidth padright050" >
                <div class=" fullwidth fullheight-percent ">
                    <user-tile 
                        v-for="user in allUsers" :key="uid(user)" 
                        :user="user"
                    ></user-tile>
                </div>
            </div>
        </div>
       </section>
        <!-- -->
        <div v-if="!selectedUser" class="flex3  relative " style="z-index: 100;" >
            <div class="absolute fullwidth">
                <div elevation="3" style="top:-55px; overflow: hidden; height: 70px;" 
                class="absolute  fullwidth rounded-tl-xl rounded-tr-xl" >
                    <div style="height: 55px; " 
                    class="grey lighten-4 pad050 flex flexcenter spacebetween " >
                        <div class="padleft050" >
                            <span v-if="!selectedUser" class="body-1 grey--text darken-4" >
                                User Methods
                            </span>
                        </div>
                        <div>
                            <v-btn v-if="selectedUser"  class=""  fab small >
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
 
            <div
            elevation="0"
            style="-webkit-box-shadow: -6px 15px 24px 0px #757575; 
                box-shadow: -6px 15px 24px 0px #757575;"
            class="pad125  fullheight-percent fullwidth rounded-br-xl rounded-bl-xl" >
                 <div class="" >
                    <v-tabs v-if="!selectedUser"  >
                        <v-tab>Extend User</v-tab>
                        <v-tab>Messages</v-tab>
                        <v-tab>Tools</v-tab>
                    </v-tabs>
                    <v-tabs v-if="selectedUser" >
                        <v-tab>General Info</v-tab>
                        <v-tab>Activity Logs</v-tab>
                        <v-tab>Task</v-tab>
                        <v-tab>Messages</v-tab>
                    </v-tabs>
                </div>
            </div>
        </div>
        <!-- modal -->
        <wp-modal v-if="filterModal" >
            <div style="min-width:400px; min-height:300px" >

            </div>
        </wp-modal>
    </div>
</template>

<script>
import userTile from './users/user-tile.vue'
import m from '@/m'
export default {
    components: {userTile},
    mixins: [m],
    data: () => ({
        selectedUser: undefined,
        allUsers: [],
        filterModal: false
    }),
    methods: {
        showFilterModal() {
            const modal = webpod.dash.modal.show({
                modalTitle: 'Filter Users Options',
                viewTrigger: (v) => this.filterModal = v
            })
        }
    },
    mounted() {
        setTimeout(() => {
            for(let i = 0; i < 20; i++) {
                this.allUsers.push({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'jdoe@smail.com',
                    username: 'jdoe123',
                    password: ''
                })
            }
             // this.selectedUser = 'hey'
        }, 1000)
    }
}
</script>