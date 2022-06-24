<template>
    <div style="gap: 15px" class="flex " >
        <homeWidget
            :title="'Total Users'"
            :data="allUsers"
        />
        <homeWidget
            :title="'Admin'"
            :data="5"
        />
        <homeWidget
            :title="'Copy Writters'"
            :data="3"
        />
    </div>
</template>

<script>
import homeWidget from './home-widget.vue'
export default {
    components: {homeWidget},
    data:() => ({
        allUsers: 99
    })
}
</script>