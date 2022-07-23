<template>
    <div>hey!

        {{promptBody}}
    </div>
</template>

<script>
export default {
    props: ['promptBody'],
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
