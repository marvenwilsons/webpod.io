,<template>
    <div>
        <slot :ready="ready" ></slot>
    </div>
</template>

<script>
export default {
    data: () => ({
        ready: false
    }),
    methods: {
        deactivate(cb) {
            this.ready = false
            setTimeout(() => {
                cb()
            },200)
        }
    },
    mounted() {
        setTimeout(() => {
            this.ready = true
        },100)
    }
}
</script>