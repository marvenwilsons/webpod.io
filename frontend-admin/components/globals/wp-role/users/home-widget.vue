<template>
    <v-card elevation="0" outlined class="rounded-lg" >
        <!-- <div>
            <v-icon color="#6a489a" style="transform: rotate(90deg);" >mdi-triangle</v-icon>
        </div> -->
        <div style="min-width: 120px; min-height: 100px;" 
        class="body-1 pad125 flex flexcenter flexcol " >
            <h5 style="margin:0; font-weight: 300;" >
                {{data}}
            </h5>
            <div class="caption margintop050 grey--text darken-1 text-uppercase" >
                {{title}}
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['title','data']
}
</script>