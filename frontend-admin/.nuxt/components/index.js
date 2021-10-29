export { default as DashboardPaneSystem } from '../../components/dashboard/pane-system/index.vue'
export { default as DashboardSideBar } from '../../components/dashboard/side-bar/index.vue'
export { default as DashboardSideBarNavigator } from '../../components/dashboard/side-bar/navigator.vue'
export { default as DashboardServicesEmpty } from '../../components/dashboard/services/empty.js'
export { default as DashboardServices } from '../../components/dashboard/services/index.js'
export { default as DashboardServicesObjectifySample } from '../../components/dashboard/services/objectify-sample.js'
export { default as DashboardServicesServiceMaker } from '../../components/dashboard/services/service-maker.js'
export { default as DashboardServicesServiceSample } from '../../components/dashboard/services/service-sample.js'
export { default as DashboardServicesTableSample } from '../../components/dashboard/services/table-sample.js'
export { default as DashboardServicesTodo } from '../../components/dashboard/services/todo.js'
export { default as DashboardServicesUniview } from '../../components/dashboard/services/uniview.js'
export { default as GlobalsDoc } from '../../components/globals/doc/index.vue'
export { default as GlobalsError } from '../../components/globals/error/index.vue'
export { default as GlobalsInfo } from '../../components/globals/info/index.vue'
export { default as GlobalsSimpleNavs } from '../../components/globals/simpleNavs/index.vue'
export { default as GlobalsSimpleNavsItem } from '../../components/globals/simpleNavs/item.vue'
export { default as GlobalsSimpleNavsItemAdditionalContent } from '../../components/globals/simpleNavs/itemAdditionalContent.vue'
export { default as GlobalsSimpleNavsLoader } from '../../components/globals/simpleNavs/loader.vue'
export { default as GlobalsUniview } from '../../components/globals/uniview/index.vue'
export { default as GlobalsWarning } from '../../components/globals/warning/index.vue'
export { default as DashboardPaneSystemPane } from '../../components/dashboard/pane-system/pane/index.vue'
export { default as DashboardPaneModal } from '../../components/dashboard/pane-system/pane/pane-modal.vue'
export { default as DashboardPaneSystemPaneManager } from '../../components/dashboard/pane-system/pane-manager/index.vue'
export { default as DashboardPaneActivator } from '../../components/dashboard/pane-system/pane-manager/pane-activator.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
