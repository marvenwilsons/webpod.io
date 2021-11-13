export default {
  methods: {
    get_autocomp_component_methods() {
      const autoCompleteComp = this.$refs[this._key+this.currentId]
      return this.data.useAutoComplete == true && autoCompleteComp != undefined ? {
        set: autoCompleteComp.set,
        refresh: autoCompleteComp.refresh,
        push: autoCompleteComp.push,
        show: autoCompleteComp.show,
        loading: autoCompleteComp.loading,
        onNoMatch: autoCompleteComp.onNoMatch,
        init: autoCompleteComp.init
      } : this.autoCompleteHooks_empty
    }
  }
}