<template>
    <v-card elevation="3" class="rounded-lg" >
        <div style="min-width: 120px; min-height: 100px;" 
        class="body-1 pad125 flex flexcenter flexcol " >
            <h5 style="margin:0; font-weight: 300;" >
                {{data}}
            </h5>
            <div class="caption margintop025 grey--text darken-1" >
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