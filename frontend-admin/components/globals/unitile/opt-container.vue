<template>
    <v-sheet :id="title" 
        :style="{
            height:'40px', 
            border: highlighted == title ? '1px solid #448AFF' : '1px solid #CFD8DC', 
            background: highlighted == title ? '#E3F2FD' : ''
        }" 
        elevation="0" class="pad050 borderRad4" >
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
    props: ['title','highlighted'],
    data: () => ({
        highlighted_title: undefined,
    }),
    methods: {
        highlightOpt(title) {
            this.highlighted_title = title
        },
        optClick(title) {
            this.highlightOpt(title)
        }
    }
}
</script>