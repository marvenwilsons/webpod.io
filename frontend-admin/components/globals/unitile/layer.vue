<template>
    <section 
        v-show="show != undefined ? show : true" 
        class="fullwidth fullheight-percent absolute" 
        :style="{backgroundColor, opacity}"
    >
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: ['backgroundColor', 'opacity' , 'show']
}
</script>