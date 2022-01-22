<template>
    <div class="absolute fullwidth fullheight-percent padleft050 padbottom050" 
    style="padding: 0.6em 0.6em; z-index: -1;" >
        <div style="gap: 5px;" class=" flex spacearound " >
            <div class="borderred fullwidth" :style="{height: minTileHeight}" v-for="t in maxCol" :key="t" ></div>
        </div>
    </div>
</template>

<script>
export default{
    props: ['maxRows','maxCol', 'minTileHeight', 'minTileWidth']
}
</script>
