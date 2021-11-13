export default {
  data: () => ({
    updating: false,
    operation: undefined,
    showUpdateControls: false,
    updateOnProgress: false,
    showUpdateBtn: false,
    initialDataObject: undefined
  }),
  watch: {
    inputObject(n,o) {
      this.showUpdateBtn = true
    }
  },
  methods: {
    updateMode(state) {
      state ? this.$parent.editMode.push(this.inputKey) : this.$parent.editMode.splice(this.$parent.editMode.indexOf(this.inputKey),1)
      this.updating = state
      this.showInput = state
      this.showUpdateControls = state
      this.allowMutationOnInput = false

      this.setCheck(false)

      if(state) {
        this.operation = 'w'
      } else {
        this.operation = 'rw'
      }
    },
    updateSystemReset() {
      this.updating = false
      this.operation = this.data.operation
      this.showUpdateControls = false
      this.updateOnProgress = false
    },
    done() {
      // updates the data.value into its latest value
      if(this.inputObject != undefined) {
        this.$parent.data_change(this.inputObject/** data in the main component */) 
      }

      //
      this.setLoading(false)
      this.allowMutationOnInput = false
      this.updateOnProgress = false

      if(this.errors.length == 0) {
        this.setCheck(true)
      } else {
        this.setCheck(false)
        console.log('error handle')
      }
      
    },
    update() {
      if(this.data.hooks) {
        if(this.data.hooks.onUpdate && this.inputObject) {
          this.allowMutationOnInput = true
          this.setLoading(true)

          this.data.hooks.onUpdate({
            update: {
              done: this.done
            },
            value: this.inputObject.data,
            ...this.hookMethods
          })
          this.updateOnProgress = true
        }
      }
    },
    cancel() {
      this.onInput(this.initialDataObject)
      this.allowMutationOnInput = true
      this.updateMode(false)
      this.errors = []
    },
    cancelUpdateDueServerError() {
      this.updateMode(false)
      this.errors = []
      this.showCancelUpdateDueServerError = false
      this.updateSystemReset()
    }
  },
  mounted() {
    this.initialDataObject = this.copy(this.data)
    this.operation = this.data.operation

    if(this.data.operation == 'w') {
      this.showInput = true
      this.xLoading = false
      this.description = undefined
    }
  }
}