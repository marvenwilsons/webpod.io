<template>
    <div>
        <v-card class="pad125" >
            myData
            {{myData}}
        </v-card>
        <v-card class="pad125 margintop125" >
            paneIndex
            {{paneIndex}}
        </v-card>
        <v-card class="pad125 margintop125" >
            hooks
            {{hooks}}
        </v-card>
        <v-card class="pad125 margintop125" >
            config
            {{config}}
        </v-card>
    </div>
</template>
<script>
export default {
    props: ['myData','config', 'paneIndex', 'hooks']
}
</script>