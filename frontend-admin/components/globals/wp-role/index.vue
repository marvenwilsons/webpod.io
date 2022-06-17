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
                <h4 class="merri-font marginright050" style="color:white; margin-bottom: 0; margin-top:0;">{{menuTitle}}/{{activeTab}}</h4>
                <!-- <dropDown
                    @command="(item) => createInstance( (instance_types.filter(e => e.type == item))[0] )"
                    :options="instance_types.map(e => {return {title: e.type}})"
                >
                    <v-btn fab small >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </dropDown> -->
                <v-btn @click="addNew()" fab small >
                        <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
            <div class="flex flexcenter flexstart" >
                <!-- <v-icon small color="white" class="marginright050" >mdi-account</v-icon>
                <span style="color:white;" >{{user}}</span> -->
                <span class="marginright050 pointer" 
                @click="activeTab = tab"
                :style="{color: 'white', borderBottom: activeTab == tab ? '2px solid white' : ''}" 
                v-for="tab in tabs" :key="tab" >
                    {{tab}}
                </span>
            </div>
           </div>
        </div>
        <!--  -->
        <v-card tile class="marginleft125 marginright125 marginbottom125 rounded-br-xl rounded-bl-lg rounded-tl-lg  flex " >
            <!-- <h6>{{activeTab}}</h6> -->
            <!-- <div class="flex flexcenter" >Fetching {{activeTab}} ...</div> -->
            <WpRole v-if="activeTab == 'Roles'" ></WpRole>
            <WpUsers v-if="activeTab == 'Users'" ></WpUsers>
        </v-card>
        <!-- modals -->
        <wp-modal   v-if="addNewUsersModalShow" >
            <div style=" width:400px;" >
                <v-text-field outlined label="First Name" autocomplete="off" ></v-text-field>
                <v-text-field outlined label="Last Name" autocomplete="off" ></v-text-field>
                <v-text-field outlined label="username" autocomplete="off" ></v-text-field>
                <v-text-field type="text" outlined label="email" onfocus="this.removeAttribute('readonly');" readonly ></v-text-field>
                <v-text-field outlined label="password" type="password" autocomplete="afsdgwerert" ></v-text-field>
                <v-select
                :items="['Admin']"
                label="Role"
                outlined
                ></v-select>
            </div>
            <div class="flex flexend " >
                <v-btn fab  style="background: linear-gradient(90deg, rgba(112,76,156,1) 0%, rgba(9,9,121,1) 100%); color: white;" >
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </div>
        </wp-modal>
    </main>
</template>

<script>
import emptyBox from './empty-box.vue'
import m from '@/m'
import WpRole from './roles.vue'
import WpUsers from './users.vue'
export default {
    mixins: [m],
    components: {emptyBox,WpRole,WpUsers},
    props: ['myData', 'hooks'],
    data: () => ({
        menuTitle: 'System Manager',
        tabs: ['Users','Roles','Services','Menus','Routing'],
        activeTab: 'Users',
        // Users
        addNewUsersModalShow: false
    }),
    watch: {

    },
    methods: {
        addNew() {
            if(this.activeTab === 'Users') {
                // add new user
                const modal = webpod.dash.modal.show({
                    modalTitle: `Add New ${this.activeTab}`,
                    viewTrigger: (v) => this.addNewUsersModalShow = v,
                })
            }
            if(this.activeTab === 'Roles') {
                // add new user
                const modal = webpod.dash.modal.show({
                    modalTitle: `Add New Role`
                })
            }
            if(this.activeTab === 'Services') {
                // add new user
                const modal = webpod.dash.modal.show({
                    modalTitle: `Add New ${this.activeTab}`
                })
            }
            if(this.activeTab === 'Menus') {
                // add new user
                const modal = webpod.dash.modal.show({
                    modalTitle: `Add New ${this.activeTab}`
                })
            }
             if(this.activeTab === 'Routing') {
                // add new user
                const modal = webpod.dash.modal.show({
                    modalTitle: `Add New ${this.activeTab}`
                })
            }
        }
    },

    created() {

    }
}
</script>

<style lang="scss" >

</style>