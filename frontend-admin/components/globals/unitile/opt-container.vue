<template>
    <v-sheet style="height:40px; border: 1px solid #BDBDBD;" elevation="0" class="pad050 borderRad4" >
        <div class="flex flexcenter fullheight-percent" >
            <div style="white-space: nowrap;" class=" marginright050  text-caption" >
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