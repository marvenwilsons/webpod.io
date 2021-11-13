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


// monaco-editor
import monacoEditor from '@/components/globals/monaco-editor/index.vue'
Vue.component("monacoEditor", monacoEditor)

// code editor
import codeEditor from '@/components/globals/vue-prism-editor/index.vue'
Vue.component("codeEditor", codeEditor)

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
// Vue.component("codeEditor",codeEditor)
// Vue.component("monacoEditor",monacoEditpr)
// Vue.component("ribbon", ribbon)
// Vue.component("textField", textField)
// Vue.component("field", field)
// Vue.component("heading", heading)
// Vue.component("todoList", todoList)
// Vue.component("dtable", table)

