<template>
    <section class="" >
        <div class="marginbottom125" >
            <div>
                <span class="caption">Filter by role</span>
            </div>
            <div style="gap: 8px; max-width: 350px;" class="flex margintop050 flexwrap">
                <v-chip 
                @click="setFilterRole(role)" 
                :class="['pointer', selectedRole == role ? 'blue lighten--2 white--text' : '']" 
                v-for="role in userRoles" :key="role" 
                >
                    {{role}}
                </v-chip>
            </div>
        </div>
        <div class="marginbottom025" >
            <span class="caption">Other filters</span>
        </div>
        <v-radio-group v-model="radioGroup" >
            <v-radio
                v-for="n in radioOptions.length - 1"
                :key="n"
                :label="radioOptions[n]"
                :value="n"
            ></v-radio>
        </v-radio-group>
        <div class="flex flexend" >
            <v-btn @click="$emit('apply', selectedRole ? `${selectedFilter}/${selectedRole}` : selectedFilter)" color="primary" >
                apply
            </v-btn>
        </div>
    </section>
</template>

<script>
export default {
    props: ['roles','defaultRole'],
    data: () => ({
        userRoles: [],
        filter: {
            role: undefined
        },
        selectedFilter: 'firstName',
        selectedRole: undefined,
        radioGroup: undefined,
        radioOptions: ['username','lastName','firstName','email']
    }),
    watch: {
        radioGroup() {
            this.selectedFilter = this.radioOptions[this.radioGroup]
            // console.log('sadf', this.radioOptions[this.radioGroup])
        }
    },
    mounted() {
        // this.userRoles = this.roles
        this.userRoles = ['Admin1','Admin2','Admin3', 'Admin4', 'Admin5']

        this.radioGroup = this.radioOptions.indexOf('firstName')
        this.selectedRole = this.defaultRole
        console.log('filter option mounted', this.selectedRole)

    },
    methods: {
        setFilterRole(value) {
            this.selectedRole = value
        }
    }
}
</script>