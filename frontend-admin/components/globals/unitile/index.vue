<template>
    <main :class="['flex spacebetween fullheight-percent borderRad4', editMode ? '' : '']" >
        <div :class="['flex flexcol']" 
            :style="{'max-width': !editMode && '1920px', 
                'border': editMode ? '1px solid #d3d3d3' : '',
                overflow: 'hidden',
                borderRadius: '5px'
            }" 
        >
            <!-- header -->
            <u-header
            @HeaderCommand="handleHeaderCommand"
            @renameTitle="headerTitleClick"
            ></u-header>
            <div>
                <div class="flex flexcol" >
                    <div
                    id="unitile-ribbon"
                    :style="{'min-height':'45px', 'z-index': 1, 'overflow':'hidden', }" 
                    class="grey lighten-3 padtop025 padbottom025 padleft050 padright050 flex  elevation-5 relative" 
                    >
                        <div v-if="!select_multiple_mode" style="right:0px; z-index:3" class="margintop025 relative" >
                            <div 
                            style="right: 50px;
                            min-height: 45px;
                            -webkit-box-shadow: 50px 1px 15px 19px #EEEEEE; 
                            box-shadow: 50px 1px 15px 19px #EEEEEE;"
                            class="absolute fullheight-percent " >
                            </div>
                            <v-btn @click="ribbonScrollTo('start')" fab x-small text >
                                <v-icon>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                        </div>
                        <!-- GRID SETTINGS -->
                        <div 
                            v-if="nodeSelectedIndex == undefined && !select_multiple_mode"  
                            style="gap:5px; overflow:hidden;" 
                            class="marginleft050 marginright050 flex spacebetween borderRad4 fullwidth"
                            >
                                <div id="start" ></div>

                                <opt-container
                                    :highlighted="highlighted_option" 
                                    title="Grid Gap" >
                                    <grid-gap @change="applyGridGap, highlighted_option = 'Grid Gap'" :gap="gridGap" class="marginright025" />
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Grid Columns" >
                                    <div @click="highlighted_option = 'Grid Columns'" v-ripple class="borderRad4 paneBorder ribbon-item" >
                                        <dropDown
                                            class="padleft025 padright025"
                                            @command="(cmd) => {handleRibbonContainerCmd('grid-columns',cmd)}"
                                            :options="[
                                                {title: 1},
                                                {title: 2},
                                                {title: 3},
                                                {title: 4},
                                                {title: 5},
                                                {title: 6},
                                                {title: 7},
                                                {title: 8},
                                                {title: 9},
                                                {title: 10},
                                                {title: 11},
                                                {title: 12}
                                            ]"
                                            :selected="maxCol"
                                        >
                                            {{maxCol}}
                                        </dropDown>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option"  title="Column Size" >
                                    <div v-ripple @click="openColumnEditor(), highlighted_option = 'Column Size'" 
                                    style="white-space: nowrap;"
                                    class="caption paneBorder padleft025 padright025 borderRad4 ribbon-item" >
                                        <code>{{gridColumns.join(' ')}} - ({{gridColumns.length}})</code>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Grid Container Custom CSS" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-container-custom-css'), highlighted_option = 'Grid Container Custom CSS'"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Tiles Global Style" >
                                    <div 
                                    v-ripple
                                    @click="handleRibbonContainerCmd('grid-tile-custom-css'), highlighted_option = 'Tiles Global Style'"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Globaly Position Items" >
                                    <div @click="highlighted_option = 'Globaly Position Items'" class="borderRad4 padleft025 padright025" >
                                        <container-justify-items @change="containerJustifyItems" />
                                    </div>
                                </opt-container>
                                
                                <div id="end" ></div>
                        </div>
                        <!-- INDIVIDUAL SETTINGS -->
                        <div v-if="nodeSelectedIndex != undefined && !select_multiple_mode" style="gap:5px; overflow:hidden;" 
                            class="marginleft050 marginright050 flex spacebetween borderRad4 fullwidth"
                            >
                                <div id="start" ></div>

                                <opt-container :highlighted="highlighted_option" title="Position" >
                                    C:
                                    <div @click="move('top',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-up-thick</v-icon>
                                    </div>
                                    <div @click="move('bottom',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-down-thick</v-icon>
                                    </div>
                                    <span class="marginleft050" >
                                        R:
                                    </span>
                                    <div @click="move('left',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-left-thick</v-icon>
                                    </div>
                                    <div @click="move('right',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-arrow-right-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Horizontal Span" >
                                    <div @click="width('minus',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div @click="width('add',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Vertical Span" >
                                    <div @click="height('minus',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div @click="height('add',null,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Tile View" >
                                    <div @click="showTileViewModal" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-cog</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Tile Inline Style" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('tile-custom-css')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Tile CSS Classes" >
                                    <div
                                    v-ripple
                                    @click="handleRibbonContainerCmd('tile-classes')"
                                    class="borderRad4 paneBorder padleft025 padright025 ribbon-item" >
                                        <v-icon small >mdi-language-css3</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Z-Index" >
                                    <div class="borderRad4 paneBorder padleft025 padright025 marginright025">
                                        {{tiles[nodeSelectedIndex].zIndex || 0}}
                                    </div>
                                    <div @click="handleRibbonContainerCmd('tile-z-index','minus')" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-minus-thick</v-icon>
                                    </div>
                                    <div @click="handleRibbonContainerCmd('tile-z-index','add')"  v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                        <v-icon small >mdi-plus-thick</v-icon>
                                    </div>
                                </opt-container>

                                <opt-container :highlighted="highlighted_option" title="Align Self" >
                                    <div v-ripple class="borderRad4 padleft025 padright025" >
                                        <container-justify-items @change="(v) => handleRibbonContainerCmd('tile-align-self',v)" />
                                    </div>
                                </opt-container>

                                <div id="end" class="borderred" ></div>
                        </div>
                        <!-- MULTIPLE -->
                        <div class="flex" v-if="select_multiple_mode" >
                            <opt-container :highlighted="highlighted_option" title="Position" >
                                C:
                                <div @click="move('top',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-arrow-up-thick</v-icon>
                                </div>
                                <div @click="move('bottom',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-arrow-down-thick</v-icon>
                                </div>
                                <span class="marginleft050" >
                                    R:
                                </span>
                                <div @click="move('left',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-arrow-left-thick</v-icon>
                                </div>
                                <div @click="move('right',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-arrow-right-thick</v-icon>
                                </div>
                            </opt-container>
                            <opt-container :highlighted="highlighted_option" title="Horizontal Span" >
                                <div @click="width('minus',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-minus-thick</v-icon>
                                </div>
                                <div @click="width('add',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-plus-thick</v-icon>
                                </div>
                            </opt-container>
                            <opt-container :highlighted="highlighted_option" title="Vertical Span" >
                                <div @click="height('minus',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-minus-thick</v-icon>
                                </div>
                                <div @click="height('add',true,nodeSelectedIndex)" v-ripple class="borderRad4 paneBorder padleft025 padright025 ribbon-item">
                                    <v-icon small >mdi-plus-thick</v-icon>
                                </div>
                            </opt-container>
                        </div>
                        <!-- SCROLL TO RIGHT -->
                        <div v-if="!select_multiple_mode" style="z-index:3" class="margintop025 relative flex flexcenter" >
                            <div 
                            style="left: 30px;
                            min-height: 45px;
                            -webkit-box-shadow: -28px  1px 15px 19px #EEEEEE; 
                            box-shadow: -28px  1px 15px 19px #EEEEEE;"
                            class="absolute fullheight-percent" >
                            </div>
                            <v-btn @click="ribbonScrollTo('right')" fab x-small text >
                                <v-icon>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                            <dropDown
                                v-if="nodeSelectedIndex != undefined"
                                :options="ribbons[1].map(e => {return {title: e}})"
                                @command="(v) => jumpToRibbon(v)"
                            >
                                <v-btn fab x-small text >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </dropDown>
                            <dropDown
                                v-if="nodeSelectedIndex == undefined"
                                :options="ribbons[0].map(e => {return {title: e}})"
                                @command="(v) => jumpToRibbon(v)"
                            >
                                <v-btn x-small fab text >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </dropDown>
                            <v-expand-x-transition>
                                <dropDown
                                    v-if="nodeSelectedIndex != undefined"
                                    :options="options"
                                    :divideOptionsBefore="['Move down','Expand height','100% width', 'Clone']"
                                    :disabledOptions="disabledOptions"
                                    @command="(cmd) => {handleDropDownCommand(cmd,nodeSelectedIndex,tiles[nodeSelectedIndex],tiles)}"
                                >
                                    <v-btn x-small fab text >
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </dropDown>
                            </v-expand-x-transition>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tile presentation -->
            <section id="tile-presentation" style="overflow:auto; " class="flex1 grey lighten-5" >
                <div
                    v-if="ready"
                    class="wp-dash-grid relative " 
                    @keydown="keydown"
                    :id="`grid-${currentUid}`"
                    :style="{
                        ...gridContainerStyle,
                        'justify-items': gridContainerJustify,
                        'grid-template-rows': `repeat(${maxRows}, ${minTileHeight})`,
                        'min-width': `${minTileWidth}`,
                        'grid-template-columns': `${gridColumns.join(' ')}`,
                        'grid-gap': `${gridGap}px`

                    }"
                >
                    <grid-guides
                     v-if="useGridGuides"
                     :maxRows="maxRows"
                     :maxCol="maxCol"
                     :minTileWidth="minTileWidth"
                     :minTileHeight="minTileHeight"
                    ></grid-guides>
                    <div v-for="(item,item_index) in tiles" 
                    :key="item.id" 
                    :id="`${item.id}-${item_index}`"
                    :class="['selectable-nodes wp-dash-grid-item flex flexcol pointer tile-item', editMode ? 'paneBorder': '']" 
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
                        border: item_index == nodeSelectedIndex ? '1px solid #1870f0' : '',
                        boxShadow: item_index == nodeSelectedIndex ?'0px 0px 2px #1870f0' : ''
                    }"
                    >
                        <div 
                        
                        class="relative fullheight-percent " 
                        >
                            <!-- dropDown component is handled by options.js -->
                            <div 
                            v-if="!select_multiple_mode && item_index === nodeSelectedIndex" 
                            style="right:0;" 
                            class="flex flexcenter spacebetween pad025 tile-btn absolute" 
                            >
                                <!-- <input @change="(ev) => {nodeSelect(ev,item_index)}" v-model="item.selected" type="checkbox"> -->
                                <dropDown
                                    v-if="nodeSelectedIndex != undefined"
                                    :options="options"
                                    :divideOptionsBefore="['Move down','Expand height','100% width', 'Clone']"
                                    :disabledOptions="disabledOptions"
                                    @command="(cmd) => {handleDropDownCommand(cmd,nodeSelectedIndex,tiles[nodeSelectedIndex],tiles)}"
                                >
                                    <v-btn :ripple="false" small text icon tile >
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </dropDown>
                            </div>
                            <!-- multiple select mode -->
                            <div
                            style="right:0;background: #f5f5f5;" 
                            class="flex flexcenter spacebetween pad025 tile-btn absolute"  
                            v-if="select_multiple_mode" 
                            >
                                <input @change="(ev) => {registerNodeForMultipleMove(ev,item_index)}" type="checkbox">
                                <v-btn x-small >

                                </v-btn>
                            </div>
                            <!--  -->
                            <div
                            @click="tileClick(item_index)" 
                            :class="[...item.customClasses,'fullheight-percent', 'fullwidth']"
                            :style="{...item.customStyle,...tiles_global_style,}" 
                            >
                                <!-- view content here -->
                                <tile-view
                                v-if="item.blocks.length > 0"
                                :blocks="item.blocks"
                                ></tile-view>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <wp-modal v-if="modals.grid_settings == 'show'" class=" borderred">
            <div  v-if="editMode && !controlls.preview == 'on'" 
                style="background:white; font-family: 'Menlo'; overflow: auto; max-width:500px;" 
                class="pad125 text-small " 
            >
                <!-- TILE SETTINGS -->
                <div v-if="nodeSelectedIndex != undefined" >
                    <tile-setting-position/>
                        <v-divider />
                    <tile-setting-size></tile-setting-size>
                        <v-divider />
                    <tile-setting-z-index />
                        <v-divider />
                    <align-self ref="tileCustomCssTextEditor" @change="tileALignChange"  />
                        <v-divider />
                    <tile-view />
                        <v-divider />
                    <span class="overline" > TILE CUSTOM STYLE </span> <br>
                    <span class="marginbottom125 caption" >
                        Custom CSS Style to be applied for this selected tile only.
                    </span>
                    <custom-css v-if="ready" 
                        @change="tileCustomStyle" 
                        :cssObject="tiles[nodeSelectedIndex].customStyle"
                        :el_id="tiles[nodeSelectedIndex].id" 
                    />
                        <v-divider />
                    <custom-classes />
                </div>
                <!-- CONTAINER SETINGS -->
                <div v-else class="flex flexcol" >
                    <!-- GRID GAP -->
                    <grid-gap @change="applyGridGap" :gap="gridGap" />
                    <v-divider />
                    <!-- COLUMN SIZE -->
                    <div role="global style for all tiles">
                        <span class="overline" >GRID COLUMNS </span> <br>
                        <span class="marginbottom125 " >
                            Define how many columns for the grid container to have.
                        </span>
                        <br> <br>
                        <v-btn 
                            @click="changeGridColumn(i)"  
                            elavation="0" 
                            fab 
                            :plain="maxCol != i" tile  v-for="i in 12" :key="uid(i)" 
                        >{{i}}</v-btn>
                    </div>
                    <v-divider />
                    <!-- COLUMN SIZE -->
                    <div role="grid column size">
                        <span class="overline" >GRID COLUMN SIZE </span> <br>
                        <span class="marginbottom125 " >
                            Define the size of each columns.
                        </span>
                        <br> <br>
                        <div class="flex flexcenter paneBorder marginbottom025 pad025" >
                            <code>{{gridColumns.join(' ')}} - ({{gridColumns.length}})</code>
                        </div>
                        <v-btn block plain @click="openColumnEditor" >OPEN COLUMN EDITOR</v-btn>
                    </div>
                    <v-divider />
                    <!-- CUSTOM CSS CONTAINER -->
                    <div role="global style for all tiles">
                        <span class="overline" >GRID TILE's CUSTOM CSS * </span> <br>
                        <span class="marginbottom125 " >
                            Custom CSS Style to be applied for each tile
                        </span>
                        <br> <br>
                        <custom-css v-if="ready" @change="containerCustomStyle" />
                    </div>
                    <v-divider />
                    <!-- CUSTOM CSS TILES -->
                    <div role="grid container style">
                        <span class="overline" > GRID CONTAINER INLINE STYLE </span> <br>
                        <span class="marginbottom125 " >
                            Custom CSS Style to be applied for the grid container
                        </span>
                        <br> <br>
                        <custom-css v-if="ready" @change="containerCustomStyle" />
                    </div>
                    <v-divider />
                    <container-justify-items @change="containerJustifyItems" />
                </div>
            </div>
        </wp-modal>
        <!-- modal column editor -->
        <wp-modal v-if="modals.column_editor == 'show'">
            <div class="fullheight-percent fullwidth padbottom125"   >
                {{maxCol}} Columns 
                <columnEditor ref="colEditor" :maxCol="maxCol" :gridColumns="copy(gridColumns)" />
            </div>
        </wp-modal>
        <!-- modal grid container custom css -->
        <wp-modal v-if="modals.grid_container_inline_style == 'show'">
            <custom-css 
            :cssObject="gridContainerStyle"
            :el_id="'#grid-container-inline-style'" 
            style="min-width:400px;" >
            </custom-css>
        </wp-modal>
        <!-- inline style for all tiles in the grid -->
        <wp-modal v-if="modals.tiles_global_inline_style == 'show'">
            <custom-css
            ref="tiles_global_style"
            :cssObject="tiles_global_style"
            :el_id="'#inline-style-for-all-tiles'" 
            style="min-width:400px;" >
            </custom-css>
        </wp-modal>
        <!-- rename title -->
        <wp-modal v-if="modals.rename_title == 'show'"   >
            <div >
                <v-text-field v-model="project_title" ></v-text-field>
                <div @click="validateAndRenameProjectTitle" class="flex flexend" >
                    <v-btn>
                        Save
                    </v-btn>
                </div>
            </div>
        </wp-modal>
        <!-- tile view -->
        <wp-modal v-if="modals.tile_view == 'show'" >
            <v-select
            :items="apps.all"
            label="Apps"
            v-model="apps.app_selected"
            ></v-select>

            <v-select
            v-if="apps.app_selected != undefined"
            :items="apps.instances_title"
            :label="`${apps.selected} instances / data`"
            v-model="apps.instance_selected"
            :loading="apps.instances_title.length == 0"
            :disabled="apps.instances_title.length == 0"
            ></v-select>

            <v-expand-transition>
                <div v-if="apps.instance_selected_info != undefined" class="caption" >
                    modified_date: {{apps.instance_selected_info.modified_date}} <br>
                    modified_by: {{apps.instance_selected_info.modified_by}} <br>
                    instance_from: {{apps.instance_selected_info.instance_from}}
                </div>
            </v-expand-transition>
            
            <div class="fullwidth flex flexend">
                <v-expand-transition>
                    <v-btn @click="applyTileView" v-if="apps.instance_selected != undefined" >
                        Apply
                    </v-btn>
                </v-expand-transition>
            </div>
        </wp-modal>
        <!-- tile inline style modal -->
        <wp-modal v-if="modals.tile_css == 'show'" >
            <custom-css
            ref="tile_inline_style"
            :cssObject="tile_inline_style"
            :el_id="'#tile-inline-css'" 
            style="min-width:400px;" >
            </custom-css>
        </wp-modal>
        <!-- tile css classes modal -->
        <wp-modal v-if="modals.tile_classes == 'show'" >
            <custom-classes
            ref="tileCustomClassEditor"
            />
        </wp-modal>
        <!-- view project -->
        <wp-modal v-if="modals.view_project == 'show'" >
            <div v-if="gridColumns != undefined"  >
                <project-preview
                :gridColumns="gridColumns"
                :gridContainerJustify="gridContainerJustify"
                :maxRows="maxRows"
                :minTileHeight="minTileHeight"
                :minTileWidth="minTileWidth"
                :gridGap="gridGap"
                :gridContainerStyle="gridContainerStyle"
                :tiles="tiles"
                :tiles_global_style="tiles_global_style"
                />
            </div>
        </wp-modal>
    </main>
</template>
// https://github.com/ThibaultJanBeyer/DragSelect
// https://github.com/ThibaultJanBeyer/dragNdrop
<script>
import m from '@/m'
import optionHandler from './mixins/options.js'
import undoRedo from '@/undo-redo.js'
import gridGuides from './grid-guides.vue'

import gridGap from './c-grid-gap.vue'
import containerJustifyItems from './c-justify-items.vue'
import columnEditor from './column-editor.vue'

import customCss from './custom-css.vue'
import customClasses from './cutom-classes.vue'
import alignSelf from './self-align.vue'
import optContainer from './opt-container.vue'

import uHeader from './header/layout.vue'
import tileView from './tile-view.vue'
import projectPreview from './preview.vue'

export default {
    name: 'unitile',
    mixins: [m,optionHandler,undoRedo],
    components: {projectPreview, tileView,gridGuides, customCss,customClasses,alignSelf,gridGap, containerJustifyItems, columnEditor, optContainer, uHeader},
    props: ['myData','config', 'paneIndex', 'hooks',],
    data: () => ({
        project_title: undefined,
        tiles: [],
        maxRows: 4,
        maxCol: 4,
        gridGap: 5,
        gridColumns: undefined,
        gridContainerStyle: {},
        gridContainerJustify: 'stretch',
        tiles_global_style: {},
        tile_inline_style: {},
        nodeSelectedIndex: undefined,
        minTileWidth: '50px',
        minTileHeight: '50px',
        ready: true,
        editMode: true,
        select_multiple_mode: false,
        selected_multiple_nodes: [],
        currentUid: undefined,
        useGridGuides: false,
        selectedNodesBySelectionTool: [],
        highlighted_option: undefined,
        highlighted_option_index: undefined,
        ribbons: [
            [
                'Grid Gap',
                'Grid Columns',
                'Column Size',
                'Grid Container Custom CSS',
                'Tiles Global Style',
                'Globaly Position Items'
            ],
            [
                'Position',
                'Horizontal Span',
                'Vertical Span',
                'Tile View',
                'Tile Inline Style',
                'Tile CSS Classes',
                'Z-Index',
                'Align Self'
            ]
        ],
        apps: {
            all: [],
            app_selected: undefined,
            instances_title: [],
            instances_info: [],
            instance_selected: undefined,
            instance_selected_info: undefined,
        },
        app_instances: [],
        controlls: {
            preview: 'off',
            use_grid_guides: 'off',
            selection_tool: 'off'
        },
        modals: {
            grid_container_inline_style: 'hide',
            tiles_global_inline_style: 'hide',
            column_editor: 'hide',
            grid_settings: 'hide',
            rename_title: 'hide',
            tile_view: 'hide',
            tile_css: 'hide',
            tile_classes: 'hide',
            tile_z_index: 'hide',
            tile_align_item: 'hide',
            view_project: 'hide'
        },
    }),
    watch: {
        'apps.app_selected'(appName) {
            // get all instaces of the selected app then populate the instance array
            this.selectApp(appName)
        },
        'apps.instance_selected'(title) {
            this.selectAppInstance(title)
        },
        nodeSelectedIndex(v) {
            if(this.nodeSelectedIndex != undefined) {
                this.highlighted_option = this.ribbons[1][0]
                setTimeout(() => {
                    const el =  document.getElementById(this.highlighted_option)
                    el.scrollIntoView({
                        behavior: 'smooth'
                    })
                },0)
            } else {
                this.highlighted_option = this.ribbons[0][0]
                setTimeout(() => {
                    const el =  document.getElementById(this.highlighted_option)
                    el.scrollIntoView({
                        behavior: 'smooth'
                    })
                },0)
            }
        }
    },
    methods: {
        removeUnwantedRows() {
            // get the lowest or the most bottom element in the layout
            let maxRowEnd = 0
            const rowEnds = this.tiles.map(tile => {
                // console.log('s',this.maxRows,tile.rowEnd)
                // console.log(this.maxRows - tile.rowEnd)
                if(maxRowEnd < tile.rowEnd) {
                    maxRowEnd = tile.rowEnd
                }
            })

            if(maxRowEnd + 1 != this.maxRows) {
                if(this.maxRows != 4) {
                    if(maxRowEnd - 1 != this.maxRows) {
                        this.maxRows-- // remove rows
                    }
                }
            }
        },  
        move(moveDirection,multiple,index) {

            if(moveDirection == 'right') {
                const moveRight = (i) => {
                    if(this.tiles[i].colEnd != this.maxCol + 1) {
                        this.tiles[i].colStart = this.tiles[i].colStart + 1
                        this.tiles[i].colEnd = this.tiles[i].colEnd + 1
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveRight(index)
                    })
                } else {
                    moveRight(index)
                }
            }
            if(moveDirection == 'left') {
                const moveLeft = (i) => {
                    if(this.tiles[i].colStart + 1 != 2 ) {
                        this.tiles[i].colStart = this.tiles[i].colStart - 1
                        this.tiles[i].colEnd = this.tiles[i].colEnd - 1
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveLeft(index)
                    })
                } else {
                    moveLeft(index)
                }
            }
            if(moveDirection == 'top') {
                const moveTop = (i) => {
                    if(this.tiles[i].rowStart + 1 != 2 ) {
                        this.tiles[i].rowStart = this.tiles[i].rowStart - 1
                        this.tiles[i].rowEnd = this.tiles[i].rowEnd - 1
                        this.removeUnwantedRows()
                    } 
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveTop(index)
                    })
                } else {
                    moveTop(index)
                }
            }
            if(moveDirection == 'bottom') {
                const moveBottom = (i) => {
                    this.tiles[i].rowStart = this.tiles[i].rowStart + 1

                    const newRowEndVal = this.tiles[i].rowEnd + 1
                    this.tiles[i].rowEnd = newRowEndVal

                    this.tiles[i].rowEnd = newRowEndVal
                    if(newRowEndVal - 1 == this.maxRows) {
                        this.maxRows = this.maxRows + 1
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(index => {
                        moveBottom(index)
                    })
                } else {
                    moveBottom(index)
                }
            }
            setTimeout(() => {
                this.addSessionEntry()
            }, 0)
        },
        height(mode,multiple,index) {
            this.addSessionEntry(this.tiles)
            if(mode == 'add') {
                const add = (i) => {
                    const newRowEndVal = this.tiles[i].rowEnd + 1
                    this.tiles[i].rowEnd = newRowEndVal
                    if(newRowEndVal == this.maxRows) {
                        this.maxRows = this.maxRows + 1
                    } else {
                        if(newRowEndVal > this.maxRows) {
                            this.maxRows = newRowEndVal + 1
                        }
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(n => add(n))
                } else {
                    add(index)
                }
                
            }
            if(mode == 'minus') {
                const minus = (i) => {
                    if(this.tiles[i].rowStart + 1 != this.tiles[i].rowEnd) {
                        this.tiles[i].rowEnd = this.tiles[i].rowEnd - 1
                        this.removeUnwantedRows()
                    } else {
                        webpod.dash.bottomAlert('Minimum vertical span reached!')
                    }
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(n => minus(n))
                } else {
                    minus(index)
                }

            }
        },
        width(mode,multiple,index) {
            if(mode == 'add') {
                const add = (i) => {
                    if(this.tiles[i].colEnd != this.maxCol + 1) {
                        this.tiles[i].colEnd = this.tiles[i].colEnd + 1
                    } else {
                        webpod.dash.bottomAlert('Maximum horizonal span reached!')
                    }  
                }
                if(multiple) {
                    this.selected_multiple_nodes.map(n => add(n))
                } else {
                    add(index)
                }
            }
            if(mode == 'minus') {
                const minus = (i) => {
                    if(this.tiles[i].colEnd != 2) {
                        this.tiles[i].colEnd = this.tiles[i].colEnd - 1
                    }  else {
                        webpod.dash.bottomAlert('Minimum horizonal span reached!')
                    } 
                }

                if(multiple) {
                    this.selected_multiple_nodes.map(n => minus(n))
                } else {
                    minus(index)
                }

            }
            setTimeout(() => {
                this.addSessionEntry()
            },0)
        },
        nodeSelect(e,index) {
            if(e.target.checked) {
                this.tiles[index].selected = true
                this.tiles.map((tile,tile_index) => {
                    if(tile.selected) {
                        if(tile_index != index) {
                            this.tiles[tile_index].selected = false
                        }
                    }
                })

                this.nodeSelectedIndex = undefined
                setTimeout(() => {
                    this.nodeSelectedIndex = index
                },10)
            } else {
                this.nodeSelectedIndex = undefined
                this.tiles[index].selected = false
            }
        },
        tileClick(index,multiple) {
            this.tiles[index].selected = !this.tiles[index].selected
            this.tiles.map((tile,tile_index) => {
                if(tile.selected) {
                    if(tile_index != index) {
                        this.tiles[tile_index].selected = false
                    }
                }
            })

            if(this.tiles[index].selected == false) {
                this.nodeSelectedIndex = undefined
            } else {
                this.nodeSelectedIndex = index
            }


        },
        keydown(e) {
            if(this.nodeSelectedIndex != undefined && this.controlls.selection_tool == 'off') {
                if(e.key == 'ArrowRight') {
                    this.move('right',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowLeft') {
                    this.move('left',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowDown') {
                    this.move('bottom',null,this.nodeSelectedIndex)
                }
                if(e.key == 'ArrowUp') {
                    this.move('top',null,this.nodeSelectedIndex)
                }
            }
        },
        clearSelectedNode() {
            if(this.nodeSelectedIndex != undefined) {
                this.tiles[this.nodeSelectedIndex].selected = false
                this.nodeSelectedIndex = undefined
            }
        },
        addNewTile(isClone,tileIndex) {
            if(isClone == true) {
                this.tiles.push({
                    name: undefined, 
                    id:this.uid(), 
                    rowStart: this.tiles[tileIndex].rowStart, 
                    rowEnd: this.tiles[tileIndex].rowEnd, 
                    colStart: this.tiles[tileIndex].colStart, 
                    colEnd: this.tiles[tileIndex].colEnd, 
                    selected: false,
                    customStyle: this.tiles[tileIndex].customStyle,
                    customClasses: [],
                    isAClone: this.tiles[tileIndex].id,
                    blocks: [],
                    align: 'stretch',
                    zIndex: 1,
                })
            } else {
                this.tiles.push({
                    name: undefined, 
                    id:this.uid(), 
                    rowStart: 1, 
                    rowEnd: 2, 
                    colStart: 1, 
                    colEnd: 2, 
                    selected: false,
                    customClasses: [],
                    customStyle: {},
                    align: 'stretch',
                    blocks: [],
                    zIndex: 1,
                })
            }
            
            this.clearSelectedNode()
            setTimeout(() => {
                this.addSessionEntry(this.copy(this.tiles))
            },0)
        },
        saveLayout() {
            const data = {
                title: this.project_title,
                tiles: this.tiles,
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles_global_style: this.tiles_global_style,
                gridColumns: this.gridColumns,
                gridContainerJustify: this.gridContainerJustify
            }
            // this.hooks.onSaveLayout(data)
            console.log(JSON.stringify(data))
            webpod.server.apps.update(data, (response) => {
                if(response.message == 'success') {
                    // saving is successfull
                }
            })
        },
        refresh() {
            this.ready = false
            this.selected_multiple_nodes = []
            this.tiles.map((n,i) => {
                this.tiles[i].selected = false
            })
            setTimeout(() => {
                this.ready = true
            },0)
        },
        activateSelectionTool(value) {
            let ds = undefined
            let selectedTiles = []
            this.$set(this.controlls,'selection_tool',value ? 'on' : 'off')

            if(value == true) {
                const area = document.getElementById('tile-presentation')
                area.style.cursor = 'crosshair'
                ds = new this.$DragSelect({
                    selectables: document.querySelectorAll('.selectable-nodes'),
                    area: area
                });

                ds.subscribe('callback', ({ items, event }) => {
                    if(items.length > 0) {
                        items.map(item => {
                            if(!this.selectedNodesBySelectionTool.includes(item.id)) {
                                this.selectedNodesBySelectionTool.push(item.id)
                                item.style.border = '1px dashed #d3d3d3'
                            } else {
                                this.selectedNodesBySelectionTool.splice(this.selectedNodesBySelectionTool.indexOf(item.id), 1)
                                item.style.border  = 'none'
                            }
                        })
                    } else {
                        this.selectedNodesBySelectionTool.map(item => {
                            const el = document.getElementById(item)
                            el.style.border = 'none'
                            this.selectedNodesBySelectionTool = []
                        })
                    }
                })

                
            }

            if(value == false) {
                const area = document.getElementById('tile-presentation')
                area.style.cursor = 'auto'
                const selectorArea = document.querySelectorAll('.ds-selector-area')
                for (var i = 0; i < selectorArea.length; i++) {
                    selectorArea[i].remove()
                }
                this.refresh()
            }
        },
        preview(state) {
            this.$set(this.controlls,'preview',state ? 'on' : 'off')
        },
        tileALignChange(value) {
            this.tiles[this.nodeSelectedIndex].align = value
        },
        containerCustomStyle(value) {
            console.log('container custom style', value)
        },
        containerJustifyItems(value) {
            this.gridContainerJustify = value
            this.addSessionEntry()
        },
        tileCustomStyle(cssObject) {
            this.tiles[this.nodeSelectedIndex].customStyle = cssObject
        },
        applyGridGap(value) {
            this.gridGap = value
            this.addSessionEntry()
        },
        changeGridColumn(value) {
            this.maxCol = value

            // populate gridColumns with 1fr 
            for(let i = 0; i < value; i++) {
                if(i > this.gridColumns.length - 1) {
                    this.gridColumns.push('1fr')
                }
            }

            // when the selected value is lower than the past value
            const t = this.gridColumns.length - value
            if(this.gridColumns.length > value) {
                for(let i = 0; i <  t; i++) {
                    this.gridColumns.pop()
                }
            }
        },
        openColumnEditor() {
            const columnEditor = webpod.dash.modal.show({
                modalTitle: 'COLUMN EDITOR',
                isPlayable: true,
                viewTrigger: (v) => this.$set(this.modals,'column_editor',v ? 'show' : 'hide')
            })

            columnEditor.on('play', () => {
                this.gridColumns = this.$refs.colEditor.frs
                this.addSessionEntry()
                webpod.dash.modal.hide()
            })
        },
        handleRibbonContainerCmd(cmd,val) {
            if(cmd === 'grid-container-custom-css') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'GRID CONTAINER INLINE STYLE',
                    viewTrigger: (v) => this.$set(this.modals,'grid_container_inline_style',v ? 'show' : 'hide')
                })

                modal.on('data', (data) => {
                    this.gridContainerStyle = data
                })
            }

            if(cmd === 'grid-tile-custom-css') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'GRID TILES GLOBAL INLINE STYLE',
                    viewTrigger: (v) => this.$set(this.modals,'tiles_global_inline_style',v ? 'show' : 'hide')
                })

                modal.on('data', (data) => {
                    this.tiles_global_style = data
                })

                modal.on('show', () => {
                    this.$refs.tiles_global_style.onError = (err) => {
                        modal.emit('error', err)
                    }
                })
            }

            if(cmd === 'tile-custom-css') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'Tile Custom Style',
                    viewTrigger: (v) => {
                        this.$set(this.modals,'tile_css',v ? 'show' : 'hide')
                        if(v == false) {
                            this.tile_inline_style = {}
                        } else {
                            this.tile_inline_style = this.tiles[this.nodeSelectedIndex].customStyle
                        }
                    }
                })

                modal.on('data', (data) => {
                    this.tiles[this.nodeSelectedIndex].customStyle = data
                    this.addSessionEntry()
                })

                modal.on('show', () => {
                    
                    this.$refs.tile_inline_style.onError = (err) => {
                        modal.emit('error', err)
                    }
                })
            }

            if(cmd === 'grid-columns') {
                this.changeGridColumn(val)
                this.addSessionEntry()
            }

            if(cmd == 'tile-classes') {
                const tileClassesModal = webpod.dash.modal.show({
                    modalTitle: 'Tile Classes',
                    viewTrigger: (v) => this.$set(this.modals,'tile_classes',v ? 'show' : 'hide')
                })

                tileClassesModal.on('show', () => {
                    this.$refs.tileCustomClassEditor.setClasses(this.tiles[this.nodeSelectedIndex].customClasses)

                    this.$refs.tileCustomClassEditor.onData = (classesArray) => {
                        this.tiles[this.nodeSelectedIndex].customClasses = classesArray
                        webpod.dash.bottomAlert('Successfully applied css classes!')
                        this.addSessionEntry()
                        webpod.dash.modal.hide()
                    }
                })
            }

            if(cmd == 'tile-align-self') {
                this.tiles[this.nodeSelectedIndex].align = val
            }

            if(cmd == 'tile-z-index') {
                 const z = parseInt(this.tiles[this.nodeSelectedIndex].zIndex)
                if(val == 'add') {
                    console.log('add')
                    if(typeof z == 'number') {
                        this.tiles[this.nodeSelectedIndex].zIndex = z + 1
                    } else {
                        this.tiles[this.nodeSelectedIndex].zIndex = 0
                    }
                } else if(val == 'minus') {
                    if(typeof z == 'number') {
                        this.tiles[this.nodeSelectedIndex].zIndex = z - 1
                    } else {
                        this.tiles[this.nodeSelectedIndex].zIndex = 0
                    }
                }

                setTimeout(() => {
                    this.addSessionEntry()
                },0)
            }
        },
        ribbonScrollTo(e) {
            let opt = this.nodeSelectedIndex == undefined ? 0 : 1
            let highlighted_option = (this.ribbons[opt]).indexOf(this.highlighted_option)
            this.highlighted_option_index = highlighted_option

            if(e == 'right') {
                if(this.highlighted_option) {
                    this.highlighted_option_index ++
                    this.highlighted_option = this.ribbons[opt][this.highlighted_option_index]
                    const el =  document.getElementById(this.highlighted_option)
                    if(el) {
                        el.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        this.highlighted_option = this.ribbons[opt][0]
                        document.getElementById(this.highlighted_option).scrollIntoView({
                            behavior: 'smooth'
                        });
                        webpod.dash.bottomAlert('Maximum scroll to right reached!')
                    }
                } else {
                    this.highlighted_option = this.ribbons[opt][0]
                }
            } else {
                if(this.highlighted_option) {
                    this.highlighted_option_index --
                    this.highlighted_option = this.ribbons[opt][this.highlighted_option_index]
                    const el =  document.getElementById(this.highlighted_option)
                    if(el) {
                        el.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        this.highlighted_option = this.ribbons[opt][this.ribbons[opt].length - 1]
                        document.getElementById(this.highlighted_option).scrollIntoView({
                            behavior: 'smooth'
                        });
                        webpod.dash.bottomAlert('Maximum scroll to left reached!')
                    }
                } else {
                    this.highlighted_option = this.ribbons[opt][this.ribbons[opt].length - 1]
                }
            }
           
        },
        jumpToRibbon(v) {
            this.highlighted_option = v
            document.getElementById(this.highlighted_option).scrollIntoView({
                behavior: 'smooth'
            });
        },
        headerTitleClick() {
            const w = webpod.dash.modal.show({
                modalTitle: 'Rename Title',
                viewTrigger: (v) => this.$set(this.modals, 'rename_title', v ? 'show' : 'hide')
            })
            
            w.on('data', (data) => {
                if(data.trim(' ') != '' && data != undefined) {
                    if( this.validator.hasSpecialCharacters(data)) {
                        w.emit('error', 'Title should not have special characters')
                    } else {
                        const rename_info = {
                            instance_from: 'unitile',
                            title: this.myData.title
                        }
                        webpod.server.apps.renameAppInstanceTitle(data,rename_info,(data) => {
                            if(data.message == 'OK') {
                                webpod.dash.modal.hide()
                            } else {
                                w.emit('error', data.message)
                            }
                        })
                    }
                } else {
                    w.emit('error', 'Title is required')
                }
            })

        },
        validateAndRenameProjectTitle() {
            // pass data on the modal instance
            webpod.dash.modal.setData(this.project_title)
        },
        handleHeaderCommand(command) {
            if(command == 'Refresh') {
                this.refresh()
            }
            if(command == 'Redo') {
                this.Redo()
            }
            if(command == 'Undo') {
                this.Undo()
            }
            if(command == 'addNewTile') {
                this.addNewTile()
            }
            if(command == 'SaveLayout') {
                this.saveLayout()
            }
            if(command == 'multiple-select-on') {
                this.select_multiple_mode = true
            }
            if(command == 'multiple-select-off') {
                this.select_multiple_mode = false
            }
            if(command == 'view-project') {
                const modal = webpod.dash.modal.show({
                    modalTitle: 'Output layout',
                    fullscreen: true,
                    viewTrigger: (v) => this.$set(this.modals,'view_project', v ? 'show' : 'hide')
                })

                modal.on('show', () => {
                    const wh = window.innerHeight
                    const ww = window.innerWidth
                    this.$set(this.view_project_modal,'minHeight', `${wh}px`)
                    this.$set(this.view_project_modal,'minWidth', `${ww - 100}px`)
                })
                
            }
        },
        showTileViewModal() {
            const tileModal = webpod.dash.modal.show({
                modalTitle: 'Tile View',
                viewTrigger: (v) => {
                    this.$set(this.modals,'tile_view', v ? 'show' : 'hide')
                },
            })
        },
        applyTileView() {
            webpod.dash.modal.hide()
            // locate the tile and update its view and viewData
            console.log('apply tile view', this.tiles[this.nodeSelectedIndex])
            this.tiles[this.nodeSelectedIndex].view = this.apps.app_selected
        },
        selectApp(appName) {
            webpod.server.apps.fetchAppInstances({app: appName}, (data) => {
               const titles = data.map(e => e.title)
                setTimeout(() => {
                    this.$set(this.apps,'instances_title',titles)
                    this.$set(this.apps,'instances_info',data)
                },1000)
            })
        },
        selectAppInstance(title) {
            this.$set(this.apps,'instance_selected_info',(this.apps.instances_info.filter(e => e.title == title && e))[0] )
            webpod.dash.modal.setData({
                app: this.apps.app_selected,
                instance_selected: title
            })
        },
        registerNodeForMultipleMove(ev,n_index) {
            if(ev.target.checked) {
                this.selected_multiple_nodes.push(n_index)
            } else {
                this.selected_multiple_nodes.splice(this.selected_multiple_nodes.indexOf(n_index),1)
            }
        }
    },
    mounted() {
        // bottom alert
        const welcomMsg = webpod.dash.bottomAlert('Welcome to Unitile v-0.1', 'learn more')
        welcomMsg.on('btn-click', () => {
            // show documentation in modal
        })

        // sidebar cog
        const cog = webpod.dash.cog.show()
        cog.on('click', () => {
            webpod.dash.modal.show({
                modalTitle: 'GRID SETTINGS',
                viewTrigger: (v) => this.$set(this.modals,'grid_settings',v ? 'show' : 'hide')
            })
        })
        
        // when toggling pane hide the cog
        webpod.session.onPaneToggle = (currentIndex) => {
            if(this.paneIndex != currentIndex) {
                webpod.dash.cog.hide()
            } else {
                setTimeout(() => {
                    const x = webpod.dash.cog.show()
                    x.on('click', () => {
                        webpod.dash.modal.show({
                            modalTitle: 'GRID SETTINGS',
                        })
                    })
                }, 100)
            }
        }

        // for undo and redo manager
        this.setSessionTrackData(() => {
            return {
                title: this.project_title,
                tiles: this.tiles,
                gridGap: this.gridGap,
                maxCol: this.maxCol,
                gridContainerStyle: this.gridContainerStyle,
                tiles_global_style: this.tiles_global_style,
                gridColumns: this.gridColumns,
                gridContainerJustify: this.gridContainerJustify
            }
        })

        // update the specified properties when undo or redo is triggered
        this.session.onUndoRedo = ({tiles, gridGap, maxCol, title, gridColumns, gridContainerStyle, tiles_global_style, gridContainerJustify}) => {
            // data contains the tracked content
            this.changeGridColumn(maxCol)
            this.project_title = title
            this.tiles = tiles
            this.gridGap = gridGap
            this.gridContainerStyle = gridContainerStyle
            this.tiles_global_style = tiles_global_style
            this.gridColumns = gridColumns
            this.gridContainerJustify = gridContainerJustify
        }

        // undo redo on msg
        this.session.onMsg = (msg) => {
            webpod.dash.bottomAlert(msg)
        }

        // get all installed apps TODO
        this.apps.all = ['Unitile','Form builder','Simple Slider']

        // default ribbon highlighted option
        this.highlighted_option = this.ribbons[0][0]
        setTimeout(() => {
            const el =  document.getElementById(this.highlighted_option)
            el.scrollIntoView({
                behavior: 'smooth'
            })
        },0)
    },
    beforeDestroy() {
        webpod.dash.cog.hide()
        this.nodeSelectedIndex = undefined
        this.tiles = []
        this.refresh()

        // clear undoRedo session
        this.clearSession()
    },
    created() {
        this.currentUid = this.uid()
        const _alert = webpod.dash.alert
        webpod.session.allowOverflow = false

        if(this.myData) {
            this.project_title = this.myData.title

            if(Object.keys(this.config).includes('editable')) {
                this.editMode = this.config.editable
            } else {
                _alert('Error: Cannot find editable property in viewConfig, defaulting to read only mode.')
                this.editMode = false
            }

            let largestRowEnd = 0
            this.myData.tiles.map(item => {
                item.selected = false
                if(typeof item != 'object') {
                    alert(`Found invalid type inside unitile's viewData it should be an array of objects`)
                    location.reload()
                } else {
                    if(largestRowEnd < item.rowEnd) {
                        largestRowEnd = item.rowEnd
                    }   
                    
                    this.tiles.push(item)
                }
            })

            // default grid settings
            if(this.myData.maxCol) { this.maxCol = this.myData.maxCol }
            if(this.myData.gridGap) { this.gridGap = this.myData.gridGap }
            if(this.myData.gridContainerStyle) { this.gridContainerStyle = this.myData.gridContainerStyle }
            this.maxRows = largestRowEnd + 2

            if(this.myData.gridColumns != undefined) {
                this.gridColumns = this.myData.gridColumns
            } else {
                let col = []
                for(let i = 0; i < this.maxCol; i++) {
                    col.push(`1fr`)
                }
                this.gridColumns = col
            }
            

        } else {
            _alert('Error: unitile data is undefined')
        }
    }
}
</script>

<style>
.wp-dash-grid {
    display: grid;
    padding: 10px;
    transition: 1s !important;
}

.tile-item > button {
    padding: 0 !important;
}
.text-gray {
    color: #737373;
}
.ribbon-item:hover {
    color: black;
    background: #F5F5F5;
    cursor: pointer;
    transition: 0.2s;
}
.tile-item:hover {
    border: 1px solid #1870f0;
    box-shadow: 0px 0px 2px #1870f0
}
</style>
