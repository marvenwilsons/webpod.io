import Vue from "vue";

// info
import Info from '@/components/globals/info/index.vue'
Vue.component("info", Info)

// warning
import Warning from '@/components/globals/warning/index.vue'
Vue.component("warning", Warning)

// error
import Err from '@/components/globals/error/index.vue'
Vue.component("error", Err)

// simple navs
import SimpleNavs from '@/components/globals/simpleNavs/index.vue'
Vue.component("simpleNavs",SimpleNavs)


// uniview
import uniview from '@/components/globals/uniview/index.vue'
Vue.component("uniview",uniview)

// doc
import doc from '@/components/globals/doc/index.vue'
Vue.component("doc", doc)

// code-mirror
import codeMirror from '@/components/globals/code-mirror/index.vue'
Vue.component("codeEditor", codeMirror)

// ribbon
import ribbon from '@/components/globals/ribbon/index.vue'
Vue.component("ribbon", ribbon)

// loading
import Loading from '@/components/globals/loading/index.vue'
Vue.component("Loading", Loading)

// table
import table from '@/components/globals/table/index.vue'
Vue.component("dtable", table)

// form builder
import formBuilder from '@/components/globals/form-builder/index.vue'
Vue.component("formBuilder", formBuilder)

// vue easy
import "vue-easytable/libs/theme-default/index.css"; // import style
import { VeTable, VePagination, VeIcon, VeLoading, VeLocale } from "vue-easytable";
Vue.use(VeTable);
Vue.component("ve-table", VeTable)

// dropdown
import dropDown from '@/components/globals/dropdown/index.vue'
Vue.component("dropDown", dropDown)

// unitile
import unitile from '@/components/globals/unitile/index.vue'
Vue.component("unitile",unitile)

// instancer
import instancer from '@/components/globals/instancer/index.vue'
Vue.component("instancer",instancer)

// pane debugger
import pd from '@/components/globals/pane-debugger/index.vue'
Vue.component("pd",pd)


// CodeMirror CSS Essentials
import "./codemirror/addon/hint/show-hint.css"
import "./codemirror/addon/lint/lint.css"
import "./codemirror/addon/fold/foldgutter.css"



export default async ({ app }, inject) => {
    await import ('./codemirror/addon/edit/closebrackets')
    await import ('./codemirror/addon/edit/closetag')
    await import ('./codemirror/addon/edit/continuelist')
    await import ('./codemirror/addon/edit/matchbrackets')
    await import ('./codemirror/addon/edit/matchtags')
    await import ('./codemirror/addon/edit/trailingspace')
    await import ('./codemirror/addon/fold/brace-fold')
    await import ('./codemirror/addon/fold/comment-fold')
    await import ('./codemirror/addon/fold/foldcode')
    await import ('./codemirror/addon/fold/foldgutter')
    await import ('./codemirror/addon/fold/indent-fold')
    await import ('./codemirror/addon/fold/markdown-fold')
    await import ('./codemirror/addon/fold/xml-fold')
    await import ('./codemirror/addon/lint/css-lint')
    await import ('./codemirror/addon/lint/javascript-lint')
    await import ('./codemirror/addon/lint/json-lint')
    await import ('./codemirror/addon/lint/lint')
    await import ('./codemirror/addon/display/autorefresh')
    await import ('./codemirror/mode/css/css.js')
    await import ('./codemirror/mode/xml/xml.js')
    await import ('./codemirror/mode/javascript/javascript.js')

    await import ('./codemirror/addon/hint/show-hint.js')
    await import ('./codemirror/addon/hint/javascript-hint.js')
    await import ('./codemirror/addon/hint/xml-hint.js')
    await import ('./codemirror/addon/hint/css-hint.js')
    await import ('./codemirror/addon/hint/html-hint.js')
    await import ('./codemirror/addon/hint/sql-hint.js')
    await import ('./codemirror/addon/hint/anyword-hint.js')

    const DragSelect = await import('dragselect')
    inject('DragSelect', DragSelect.default)
    
    const CodeMirror = await import ('./codemirror/lib/codemirror')
    inject('CodeMirror', CodeMirror)
}


// import lazy from './components/lazy'
// import objectify from '@/components/globals/objectify/index.vue'
// import ContentRect from './components/resize-container.vue'

// import textField from '@/components/globals/textField/index.vue'
// import field from '@/components/globals/field/index.vue'
// import heading from '@/components/globals/heading/index.vue'
// import todoList from '@/components/globals/todo-list/index.vue'

// Vue.component("lazy", lazy)
// Vue.component("Objectify", objectify)
// Vue.component("rezcon", ContentRect)
// Vue.component("textField", textField)
// Vue.component("field", field)
// Vue.component("heading", heading)
// Vue.component("todoList", todoList)
// Vue.component("dtable", table)

