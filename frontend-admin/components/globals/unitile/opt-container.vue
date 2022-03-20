<template>
    <v-sheet style="height:40px; border: 1px solid #BDBDBD;" elevation="0" class="pad050 borderRad4" >
        <div class="flex flexcenter fullheight-percent" >
            <div 
            style="white-space: nowrap; font-weight: 400;" 
            class="marginright050 body-2 grey--text text--darken-3"
            >
                {{title}}
            </div>
            <div class="flex flexcenter" >
                <slot></slot>
            </div>
        </div>
    </v-sheet>
</template>
<script>
export default {
    props: ['title']
}
</script>