<template>
    <div>
<!-- justify items | start | end | center | stretch-->
        <div>
            <align @change="(n) => {$emit('change',n)}" />
        </div>
    </div>
</template>

<script>
import align from './self-align.vue'
export default {
    components: {align}
}
</script>