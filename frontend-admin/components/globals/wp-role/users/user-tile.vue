<template>
    <div @click="$emit('selectUser',user)" >
        <v-banner
        elevation="2" v-ripple class=" pointer margintop050 grey lighten-4" >
            <div class="flex flexcenter flexstart" >
                <v-icon outlined class="marginright050" >mdi-account</v-icon>
                <span class="" >
                    ey {{user.firstName}} {{user.lastName}}
                </span>
            </div>
        </v-banner>
    </div>
</template>
<script>
export default { 
    props: ['user'],
    methods: {
        c() {
            console.log('ey')
        }
    }
}
</script>