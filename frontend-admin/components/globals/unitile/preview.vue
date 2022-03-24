<template>
    <main>
        <div
        :style="{
            display: 'grid',
            ...gridContainerStyle,
            'justify-items': gridContainerJustify,
            'grid-template-rows': `repeat(${maxRows}, ${minTileHeight})`,
            'min-width': `${minTileWidth}`,
            'grid-template-columns': `${gridColumns.join(' ')}`,
            'grid-gap': `${gridGap}px`
        }"
        >
            <div
             v-for="(item,item_index) in tiles" 
            :key="item.id + 'preview'" 
            :id="`${item.id}-${item_index}-preview`"
            :class="['selectable-nodes wp-dash-grid-item flex flexcol pointer', editMode ? 'paneBorder': '']" 
            :style="{
                'grid-area':`${item.id}`,
                'grid-row-start':item.rowStart,
                'grid-row-end':item.rowEnd,
                'grid-column-start':item.colStart,
                'grid-column-end':item.colEnd,
                'overflow':'auto',
                'min-width': '50px',
                justifySelf: item.align,
                zIndex: item.zIndex,
                background:'white',
                ...tiles_global_style,
                ...item.customStyle,
            }"
            >
            <tile-view
            v-if="item.view"
            :view="item.view"
            :myData="item.viewData"
            ></tile-view>
            </div>
        </div>
    </main>
</template>

<script>
import tileView from './tile-view.vue'
export default {
    components: {tileView},
    props:[
        'gridColumns',
        'gridContainerJustify',
        'maxRows',
        'minTileHeight',
        'minTileWidth',
        'gridGap',
        'gridContainerStyle',
        'tiles',
        'tiles_global_style'
    ]
}
</script>