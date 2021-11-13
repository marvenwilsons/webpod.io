<template>
    <div class="relative borderRad4" style="background: white;" >
        <ve-table
            fixed-header
            :max-height="500"
            :virtual-scroll-option="virtualScrollOption"
            :cell-selection-option="cellSelectionOption"
            :expand-option="expandOption"
            :columns="columns"
            :table-data="tableData"
            :row-style-option="rowStyleOption"
            row-key-field-name="index"
            border-y
            :eventCustomOption="eventCustomOption"
        />
        <div >
                <div v-if="selection" class="marginbottom025 flex flexcol paneBorder" style="height: 200px; overflow-y:hidden; background: #fafafa" >
                    <div>
                        <v-tabs
                        height="30px"
                        background-color="#f8fafc"
                        v-model="tab"
                    >
                            <v-tab :ripple="false" @click="tab = 'Cell'">
                                <span class="text-small">Cell</span>
                            </v-tab>
                            <v-tab :ripple="false" @click="tab = 'Update Cell'" >
                                <span class="text-small" >Update Cell</span>
                            </v-tab>
                            <v-tab :ripple="false" @click="tab = 'Row'" >
                                <span class="text-small" >Row</span>
                            </v-tab>
                        </v-tabs>
                    </div>
                    <div style="overflow-y: auto;" class="fullheight-percent pad125" >
                        <div v-if="tab == 0" class="text-small" >{{selection}}</div>
                        <div v-if="tab == 1" > 
                            <!-- <span class="warning pad050 borderRad4 text-small" >
                                update enterface not found! will default to textarea
                            </span> -->
                            <div class="flex flexcol" >
                                <span class="text-small2" >Update enterface not found, will default to textarea</span>
                                <textarea 
                                    class="fullwidth paneBorder pad050" 
                                    style="background:whitesmoke" 
                                    cols="10" rows="5"
                                    :value="selection"
                                >
                                </textarea>
                                <div class="flex flexend margintop050" >
                                    <v-btn small color="primary" :ripple="false" >Update</v-btn>
                                </div>
                            </div>
                        </div>
                        <div v-if="tab == 2" >
                            <div class="flex pad050 margin050 borderRad4" 
                            style="background: #e0f3ff;"
                             v-for="(r,i) in selectedRow" :key="uid(r)" >
                                <div style="color: gray" class="flex1 text-small">{{i}}:</div>
                                <div style="color: #0c8ee7;" class="flex4 text-small" >{{r}}</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import m from '@/m'
import watcher from './watch'
export default {
    mixins: [m,watcher],
    data() {
        return {
            // selection
            selection: undefined,
            selectedCellSelectionFn: () => {},
            selectedCellSelectionFnRemove: () => {},
            cellSelectionUpdateMode: false,
            cellTarget: undefined,
            selectedRow: undefined,
            // tab options
            tab: 'Cell',
            // table options
            virtualScrollOption: {
                enable: true,
                minRowHeight:55,
                scrolling: ({startRowIndex,visibleStartIndex,visibleEndIndex,visibleAboveCount,visibleBelowCount}) => {
                    const ct = document.getElementById(this.cellTarget)
                    if(ct && this.cellSelectionUpdateMode) {
                        ct.parentElement.classList.add('ve-table-cell-update-bg')
                    }
                }
            },
            cellSelectionOption: {
                enable: true
            },
            rowStyleOption: {
                stripe: true,
            },
            eventCustomOption: {
                bodyCellEvents: ({ row, column, rowIndex }) => ({
                    click: (event) => {
                            this.selection = row[column.field]
                            this.cellTarget = column.key+row._key
                            this.selectedRow = row
                    },
                    dblclick: (event) => {
                    },
                    contextmenu(event) {
                        console.log('context menu')
                    }
                })
            },
            expandOption: {
                enable: false,
                render: ({ row, column, rowIndex }, h) => {
                    console.log(h)
                    return (
                        <div style="background: whitesmoke" class="pad050 margin050" >
                            <el-button size="mini" >test</el-button>
                        </div>
                    );
                },
            },
            columns: [],
            tableData: [],
        };
    },
    methods: {
        cellClick(str) {
            console.log(str)
        }, 
        minimizeStr(str) {
            return str.length > 5 ? `${str.slice(0,5)}...` : str
        },
        generateCellItem(field,title) {
            const requiredProps = {
                key: this.uid(),
                field,
                title,
                align: 'center',
                renderBodyCell: ({ row, column, rowIndex }, h) => {
                    // column --> align, field, key, renderBodyCell, title
                    return <span 
                    class={['text-small2','pointer']} 
                    id={column.key+row._key} 
                    domPropsInnerText={this.minimizeStr(row[field])}
                    >
                    </span>;
                },
            }
            
            return requiredProps
        },
        initData() {
            let data = [];
            for (let i = 0; i < 100; i++) {
                data.push({
                    _key: this.uid(),
                    index: i + 1,
                    name: `name${i}`,
                    hobby: `hobby${i}`,
                    address: `address${i}`,
                    address2: `address${i}`,
 
                    grade: Math.floor(Math.random() * 100),
                    // grade1: Math.floor(Math.random() * 100),
                    // grade2: Math.floor(Math.random() * 100),
                    // grade3: Math.floor(Math.random() * 100),
                    insp:  Math.floor(Math.random() * 2),
                    clean:  Math.floor(Math.random() * 2),
                    notes:  Math.floor(Math.random() * 2) ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                    tenetur error, harum nesciunt ipsum debitis q` : `Provident similique accusantium nemo autem. Veritatis
                    obcaecati tenetur iure eius earum ut molestia`,
                });
            }
            this.tableData = data;
        },
        start() {
            // 1. get raw data
            this.initData()
            
            // 2. generate collumn configurations and populate the columns array
            let columnItemConfigurationArray = []
            Object.keys(this.tableData[0]).map(e => {
                if(e != '_key') {
                    const o = this.generateCellItem(e,e.charAt(0).toUpperCase() + e.slice(1))
                    columnItemConfigurationArray.push(o)
                }
            })
            this.columns = columnItemConfigurationArray
        },
    },
    created() {
        this.start()
    },
};
</script>

<style>
.ve-table-expand-td-content{
    padding: 0px !important;
}
.ve-table-cell-update-bg{
    background: #42A5F5 !important;
}
</style>