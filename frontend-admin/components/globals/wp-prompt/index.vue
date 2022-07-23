<template>
    <div>
        <div class="body-1" >
            {{promptBody.prompt.desc}}
        </div>
        <!-- app -->
        <div v-if="promptBody.prompt.fieldType == 'app'" >

        </div>
        <!-- text -->
        <div v-if="promptBody.prompt.fieldType == 'text'" >
            <v-text-field
                v-model="inputValue"
            ></v-text-field>
        </div>
        <!-- number -->
        <div v-if="promptBody.prompt.fieldType == 'number'" >
            <v-text-field
                v-model="inputValue"
                type="number"
            ></v-text-field>
        </div>
        <!-- select -->
        <div v-if="promptBody.prompt.fieldType == 'select'" >

        </div>
        <!-- multi select -->
        <div v-if="promptBody.prompt.fieldType == 'multi-select'" >

        </div>
        <!-- array of strings -->
        <div v-if="promptBody.prompt.fieldType == 'array'" >

        </div>
        <!-- submit and cancel buttons -->
        <div class="flex flexend" >
            <wp-stop-go 
                @go="submit"
                @stop="cancel"
                ref="sg"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: ['promptBody'],
    data: () => ({
        inputValue: undefined
    }),
    methods: {
        submit() {
            this.$refs.sg.setLoading(true)
            // this.$refs.sh.disableBtn('go')

            webpod.dash.modal.setData({
                key: this.promptBody.key,
                data: this.inputValue
            })

            setTimeout(() => {
                webpod.dash.modal.hide()
            },500)
        },
        cancel() {

        }
    },
    mounted() {
        
        webpod.dash.modal.onClose(() => {
            webpod.dash.modal.setData({
                key: this.promptBody.key,
                data: 'wp-modal-close'
            })
        })


    }
}
</script>
