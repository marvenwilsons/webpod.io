<template>
    <div>
        <slot :ready="ready" ></slot>
    </div>
</template>

<script>
export default {
    data: () => ({
        ready: true
    }),
    method: {
        refresh() {
            this.ready = false
            setTimeout(() => {
                this.ready = true
            }, 100)
        }
    }
}
</script>