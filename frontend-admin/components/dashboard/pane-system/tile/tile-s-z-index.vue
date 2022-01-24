<template>
    <div>
        <span class="overline" > Z-INDEX </span>
        <div @click="moveToFront" class="paneBorder  flex flexcenter flat_action" >
            <div>Move to front</div>
        </div>
        <div @click="moveToBack" class="paneBorder margintop025  flex flexcenter flat_action" >
            <div>Move to Back</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        moveToFront() {
            console.log('move to front')
        },
        moveToBack() {
            console.log('move to back')
        }
    }
}
</script>