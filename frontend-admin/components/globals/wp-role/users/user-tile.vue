<template>
    <v-banner elevation="2" v-ripple class=" pointer margintop050 grey lighten-4" >
        <div class="flex flexcenter flexstart" >
            <v-icon outlined class="marginright050" >mdi-account</v-icon>
            <span class="" >
                {{user.firstName}} {{user.lastName}}
            </span>
        </div>
    </v-banner>
</template>
<script>
export default { 
    props: ['user']
}
</script>