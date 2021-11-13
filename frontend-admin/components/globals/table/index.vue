<template>
    <div class="relative" >
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
            <v-expand-transition>
                <div v-if="selection" class="marginbottom025 flex flexcol" style="height: 200px; overflow-y:hidden; background: #fafafa" >
                    <div>
                        <v-tabs
                        height="30px"
                        background-color="#f8fafc"
                        v-model="tab"
                        :ripple="false"
                    >
                        <v-tab @click="tab = 'Cell'">
                            Cell
                        </v-tab>
                        <v-tab @click="tab = 'Update Cell'" >
                            Update Cell
                        </v-tab>
                         <v-tab @click="tab = 'Row'" >
                            Row
                        </v-tab>
                        </v-tabs>
                    </div>
                    <div style="overflow-y: auto;" class="fullheight-percent pad125" >
                        <div v-if="tab == 0" >{{selection}}</div>
                        <div v-if="tab == 1" > update enterface </div>
                        <div v-if="tab == 2" >
                            <div class="flex paneBorder" v-for="(r,i) in selectedRow" :key="uid(r)" >
                                <div class="flex1">{{i}}:</div>
                                <div class="flex4" >{{r}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-expand-transition>
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
            return str.length > 5 ? `${str.slice(0,15)} ... ` : str
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
                    class={['text-small']} 
                    id={column.key+row._key} domPropsInnerText={this.minimizeStr(row[field])}
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
                    grade: Math.floor(Math.random() * 100),
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