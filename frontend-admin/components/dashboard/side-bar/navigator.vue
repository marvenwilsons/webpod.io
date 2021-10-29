<template>
    <div class="flex flexend" >
        <div>
            <!-- <div class="flex" >
                <div @click="goPrev" class="pointer flex flexcenter" >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#f5f7fa" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M18,11H9.5L13,7.5L11.58,6.08L5.66,12L11.58,17.92L13,16.5L9.5,13H18V11Z" />
                    </svg>
                </div>
                <div @click="goNext" class="pointer flex flexcenter " >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#f5f7fa" d="M5,21A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5M6,13H14.5L11,16.5L12.42,17.92L18.34,12L12.42,6.08L11,7.5L14.5,11H6V13Z" />
                    </svg>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        count: 0
    }),
    methods: {
        goNext() {
            const paneCount = document.getElementById('paneManager').childElementCount

            if(this.count != paneCount - 1){
                this.count ++
                try {
                    const el = document.getElementById(`pane${this.count}`)
                    el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
                } catch(err) {}
            }
        },
        goPrev() {
            if(this.count != 0){
                this.count --
                try {
                    const el = document.getElementById(`pane${this.count}`)
                    el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
                } catch(err) {}
            }
        }
    }
}
</script>