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
                         :defaultRole="roleMode"
                         @apply="(v) => {close(), setFilterMode(v)}"
                         />
                    </template>
                 </wp-dropdown-one>
            </div>
            <div class="margintop025" v-if="roleMode" >
                <v-chip small style="padding-right:0" >
                    {{roleMode}} 
                    <v-icon 
                        class="pointer marginright025 marginleft025" 
                        small
                        @click="setFilterMode(filterMode)"
                    >
                        mdi-close-circle
                    </v-icon> 
                </v-chip>
            </div>
        </div>
        <div :style="{overflow: 'auto'}" class="flex1  relative" >
            <div style="overflow:auto;" class="  absolute fullwidth padright050" >
                <div class=" fullwidth fullheight-percent padbottom125">
                    <user-tile
                        @selectUser="selectUser"
                        v-for="(user,index) in displayedUsers" :key="uid(user)" 
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
                box-shadow: -6px 15px 24px 0px #757575;
                overflow: auto;
            "
            class="pad125 fullheight-percent fullwidth rounded-br-xl rounded-bl-xl relative" >
                 <div class="absolute pad125" style="" >
                    <userHome v-if="!selectedUser" />
                    <userGeneralInfo v-if="selectedUser" :user="selectedUser" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userTile from './users/user-tile.vue'
import userHome from './users/home.vue'
import userFilter from './users/filter-options.vue'
import userGeneralInfo from './users/user-general.vue'
import m from '@/m'
export default {
    components: {userTile, userHome, userFilter, userGeneralInfo},
    mixins: [m],
    data: () => ({
        selectedUser: undefined,
        allUsers: [],
        displayedUsers: [],
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
        filterMode: 'firstName',
        roleMode: undefined,
        searchQuery: undefined
    }),
    watch: {
        searchQuery(n,o) {
            this.displayedUsers = this.allUsers

            if(n) {
                this.displayedUsers = this.displayedUsers.filter((u) => {
                    if(this.roleMode) {
                        if(u[this.filterMode].toLowerCase().includes(n.toLowerCase()) && u.role == this.roleMode) {
                            console.log('rolemode', u.role)

                            return u
                        } 
                    } else {
                        if(u[this.filterMode].toLowerCase().includes(n.toLowerCase())) {
                            return u
                        }
                    }
                })
            }
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
            this.selectedUser = undefined
            this.$nextTick(() => {
                this.selectedUser = user
            })
        },
        setFilterMode(val) {
            console.log('setting filter mode ', val)
            if(val.includes('/')) {
                this.displayedUsers = this.allUsers
                this.roleMode = val.split('/')[1]
                this.filterMode = val.split('/')[0]

                this.$nextTick(() => {
                    this.displayedUsers = this.displayedUsers.filter(u => u.role == this.roleMode)
                })
            } else {
                this.filterMode = val
                this.roleMode = undefined
            }


            this.searchQuery = undefined
        }
    },
    mounted() {
        const firstNames = ['Marven','Johny','Hannah','Chris','Eugine','Kwenten','Jun','Maverick','Ricky']
        const lastName = ['Jefersons','Wilsons','Dov','Vanny', 'golley','Xavier','Yowoming','Kent','Niner']
        setTimeout(() => {
            for(let i = 0; i < firstNames.length - 1; i++) {
                this.allUsers.push({
                    firstName: firstNames[i],
                    lastName: lastName[i],
                    email: `${lastName[i]}${firstNames[i]}@smail.com`,
                    username: `${firstNames[i]}${i * 89}`,
                    password: 'jaghalsjdieklrwlke',
                    role: i > 3 ? 'Admin1' : i > 6 ? 'Admin3' : 'Admin2' 
                })
            }
        }, 1000)

        this.$nextTick(() => {
            this.displayedUsers = this.allUsers
        })
    }
}
</script>