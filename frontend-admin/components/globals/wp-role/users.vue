<template>
    <div style="padding:0;" class="flex relative fullheight-percent" >
       <section :style="{minWidth: '230px', maxWidth: '300px'}" 
       class="flex flex1 flexcol relative fullheight-percent pad125" >
         <div class=" marginbottom050  flexcenter" >
            <div class="flex">
                <v-text-field 
                    v-model="searchQuery" 
                    dense hide-details outlined  
                    :label="`Search ${filterMode}`"
                    :disabled=" filterMode.includes('role')"
                />
                 <wp-dropdown-one>
                    <template  v-slot:trigger="{ on, attrs }" >
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                         outlined class="marginleft050 rounded" v-ripple="false" small tile dense icon text fab >
                            <v-icon  class=" pointer" >mdi-filter</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:content="{close}" >
                         <userFilter
                         @apply="(v) => {close(), setFilterMode(v)}"
                         />
                    </template>
                 </wp-dropdown-one>
            </div>
        </div>
        <div :style="{overflow: 'auto'}" class="flex1  relative" >
            <div style="overflow:auto;" class="  absolute fullwidth padright050" >
                <div class=" fullwidth fullheight-percent ">
                    <user-tile
                        @selectUser="selectUser"
                        v-for="(user,index) in allUsers" :key="uid(user)" 
                        :user="user"
                        :index="index"
                    ></user-tile>
                </div>
            </div>
        </div>
       </section>
        <!-- -->
        <div class="flex3  relative " style="z-index: 100;" >
            <div class="absolute fullwidth">
                <div elevation="3" style="top:-55px; overflow: hidden; height: 70px;" 
                class="absolute  fullwidth rounded-tl-xl rounded-tr-xl" >
                    <div style="height: 55px; " 
                    class="grey lighten-4 pad050 flex flexcenter spacebetween " >
                        <div class="padleft050" >
                            <span v-if="!selectedUser" class="body-1 grey--text darken-4" >
                                User Methods
                            </span>
                            <span v-if="selectedUser" class="body-1 grey--text darken-4" >
                                {{selectedUser.firstName}}
                                {{selectedUser.lastName}}
                            </span>
                        </div>
                        <div>
                            <dropDown
                                :options="selectedUser ? opt2 : opt1"
                            >
                                <v-btn   class=""  fab small icon >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </dropDown>
                            <v-btn v-if="selectedUser"  class=""  fab small icon >
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                             <v-btn @click="selectedUser = undefined" v-if="selectedUser"  class=""  fab small icon >
                                <v-icon>mdi-close-outline</v-icon>
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
                    <userHome v-if="!selectedUser" />
                </div>
            </div>
        </div>
        <!-- modal -->
        <wp-modal v-if="filterModal" >
            <div style="min-width:400px; min-height:300px" >
                <userFilter/>
            </div>
        </wp-modal>
    </div>
</template>

<script>
import userTile from './users/user-tile.vue'
import userHome from './users/home.vue'
import userFilter from './users/filter-options.vue'
import m from '@/m'
export default {
    components: {userTile, userHome, userFilter},
    mixins: [m],
    data: () => ({
        selectedUser: undefined,
        allUsers: [],
        filterModal: false,
        opt1: [
            {title: 'Home'},
            {title: 'Extend User Properties'},
            {title: 'Send Buld Messages'},
            {title: 'Tools'}
        ],
        opt2: [
            {title: 'User General Info'},
            {title: 'Activity Logs'},
            {title: 'Tasks'},
            {title: 'Chat'},
        ],
        usersFilter: [
            {title: 'First Name', },
            {title: 'Last Name',},
            {title: 'Email'},
            {title: 'Role', sub: [
                {title: 'Admin1'},
                {title: 'Admin2'}
            ]},
        ],
        filterMode: 'firstname',
        searchQuery: undefined
    }),
    watch: {
        searchQuery(n,o) {
            // TODO:
        }
    },
    methods: {
        showFilterModal() {
            const modal = webpod.dash.modal.show({
                modalTitle: 'Filter Users Options',
                viewTrigger: (v) => this.filterModal = v
            })
        },
        selectUser(user) {
            this.selectedUser = user
        },
        setFilterMode(val) {
            console.log(val)
            this.filterMode = val
            this.searchQuery = undefined
        }
    },
    mounted() {
        setTimeout(() => {
            for(let i = 0; i < 1; i++) {
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