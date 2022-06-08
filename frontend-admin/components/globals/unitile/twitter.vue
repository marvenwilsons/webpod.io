<template>
    <div v-html="code" ></div>
</template>

<script>
export default {
    props: ['embedCode'],
    data:() => ({
        code: undefined
    }),
    mounted() {
        this.code = this.embedCode
        this.$nextTick(() => {
            window.twttr.widgets.load()
        })
    }
}
</script>