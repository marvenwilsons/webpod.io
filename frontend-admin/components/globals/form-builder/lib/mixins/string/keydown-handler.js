export default {
  methods: {
    keydown(e) {
      // document.getElementById(this.currentId).blur()
      const autocomplete = this.$refs[this._key+this.currentId]
      
      if(autocomplete) {
        const dataLength = autocomplete.autocompleteDataSet.length

        if(e.code == 'ArrowUp' && autocomplete.showState && dataLength != 0) {
            if(autocomplete.selected == undefined || autocomplete.selected == 0) {
              autocomplete.selected = dataLength - 1
            } else {
              autocomplete.selected = autocomplete.selected - 1
            }
        } else if(e.code == 'ArrowDown' && autocomplete.showState && dataLength != 0) {
          if(autocomplete.selected == undefined || autocomplete.selected == dataLength - 1) {
            autocomplete.selected = 0
          } else {
            autocomplete.selected = autocomplete.selected + 1
          }
        } else if(e.code == 'Enter' || e.code == 'NumpadEnter') {
          /**
           * This block of code will execute when the user presses enter,
           * the main function of this block of code is to
           * 1. mutate the text_input_model property resulting into an autocomplete effect
           * 2. opens the autocomplete ui if its its not open (happens on input mount and the user hits enter key)
           */
          
          if(autocomplete.showState == false) {
            autocomplete.selected = undefined
            autocomplete.refresh()
            this.data.autocompleteData.map(e => {
              if(typeof e == 'object') {
                autocomplete.push(e.name,e.title)
              } else {
                autocomplete.push(e)
              }
            })
            autocomplete.filter(this.text_input_model) // filter the autocomplete dataSet
            autocomplete.show(true)
          } else if(autocomplete.showState && autocomplete.selected == undefined) {
            autocomplete.show(false)
          } else if(autocomplete.selected != undefined) {
            let selected = autocomplete.autocompleteDataSet[autocomplete.selected]
            
            if(selected) {
              if(typeof selected == 'object') {
                this.text_input_model = selected.name.toLowerCase()
              } else {
                this.text_input_model = selected
              }
              
              setTimeout(() => {
                autocomplete.show(false)
                autocomplete.selected = undefined
              }, 0)
            } else {
              autocomplete.show(false)
              autocomplete.selected = undefined
            }
          }
        }
      }
    },
  }
}