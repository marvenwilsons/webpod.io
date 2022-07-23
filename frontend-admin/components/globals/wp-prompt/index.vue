<template>
    <div>
        <div class="body-1" >
            {{promptBody.prompt.desc}}
        </div>
        <div>
            <v-text-field
                v-model="inputValue"
            ></v-text-field>
        </div>
        <div class="flex flexend" >
            <!-- <v-btn class="marginleft025" >cancel</v-btn>
            <v-btn>submit</v-btn> -->
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
