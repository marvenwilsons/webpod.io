<template>
    <div>
        <v-card class="pad125 flex flexcol" >
            <div>myData</div>
            <codeEditor
                lang="javascript"
                :code="d"
            ></codeEditor>
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
    props: ['myData','config', 'paneIndex', 'hooks'],
    data: () => ({
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        d: undefined
    }),
    methods: {
        handleNodeClick() {

        }
    },
    mounted() {
        this.d  = JSON.stringify(this.myData,null,4)
    }
}
</script>