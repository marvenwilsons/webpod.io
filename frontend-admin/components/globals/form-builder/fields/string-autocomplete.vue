<template>
  <div 
    v-if="showState" 
    :style="{background: appearance.select_option_bg, maxHeight: '200px', overflow: 'auto'}" 
    class="fullwidth"
  >
    <div :style="{borderTop: `1px solid ${appearance.select_chip_border_color}`}" class="marginleft050 marginright050" ></div>
    <!-- autocomplete items -->
    <section v-if="loadingState == false && autocompleteDataSet.length != 0" >
      <div v-for="(item,item_index) in autocompleteDataSet" :key="typeof item == 'object' ? item.name + item_index : item + item_index"
        :class="[`${currentid}open`]"
        @mouseover="onhover(true,item_index,`${currentid}open`)"
        @mouseleave="onhover(false,item_index,`${currentid}open`)"
        
      >
        <div @click.stop="selectItem(item_index)" class="pad050 pointer flex flexcenter flexstart" >
          <svg style="width:20px;height:20px" viewBox="0 0 24 24">
              <path :fill="appearance.select_chip_border_color" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
          <!--  -->
          <span class="marginleft050 flex spacebetween" >
            <span v-if="typeof item == 'string'" v-html="getInputFormat(item)" ></span>
            <span v-if="typeof item == 'object'" v-html="getInputFormat(item.name)" ></span>
            <span v-if="item.label" class="padleft050 padright050 borderRad4" :style="{background: 'lightgray'}" >
              <small>{{item.label}}</small>
            </span>
          </span>
          <!--  -->
        </div>
      </div>
    </section>
    <!-- loading -->
    <div v-if="loadingState" class="pad050 pointer flex flexcenter" >
      <span >loading ...</span> 
    </div>
    <!-- no match found -->
    <div v-if="loadingState == false && autocompleteDataSet.length == 0" class="pad050 pointer flex flexcenter" >
      <span>no match found</span>
    </div>
  </div>
</template>

<script>

function err (arg) {
  console.error(arg)
  alert(arg)
}
import m from '../lib/m'
export default {
  mixins: [m],
  props: ['appearance'],
  data: () => ({
    autocompleteDataSet: [],
    initialDataSetCopy: [],
    loadingState: false,
    showState: false,
    userInput: undefined,
    acFilter: true,
    noMatchHandler: () => {},
    isNoMatch: false,
    hovered: undefined,
    currentid: undefined,
    selected: undefined // <-- mutation is from the parent component
  }),
  mounted() {
    this.currentid = this.uid()
    this.$emit('mount', {
      set: this.set,
      refresh: this.refresh,
      push: this.push
    })
  },
  watch: {
    selected(n,o) {
      this.onhover(true,n,`${this.currentid}open`)
      if(o != undefined) {
        this.onhover(false,o,`${this.currentid}open`)
      }
    },
    autocompleteDataSet(n) {
      if(n.length == 0) {
        this.noMatch()
      }
    }
  },
  methods: {
    selectItem(index) {
      // console.log('selecting', index)
      // to avoid the system issuing an error on blur
      this.$parent.textfield_is_active = true

      const selected = this.autocompleteDataSet[index]
      // console.log('click', selected)
      if(typeof selected == 'object') {
        this.$parent.text_input_model = selected.name
      } else if(typeof selected == 'string') {
        this.$parent.text_input_model = selected
      }

      setTimeout(() => {
        this.showState = false
        this.$parent.textfield_is_active = false
      },0)
    },
    getInputFormat(dataSetItemString) {
       // escaping upper and lower cases
      const regex = new RegExp(this.userInput,'ig')
      // item from autocompleteDataSet sliced to show only the user query
      const matchSliced = dataSetItemString /** <-- item from autocompleteDataSet array */
        .toLowerCase()
        .slice(
          dataSetItemString
          .toLowerCase()
          .indexOf(this.userInput.toLowerCase()) 
        )

      // a hack to manage the side effects of regex
      matchSliced.length == 1 && (this.autocompleteDataSet = [])
      // display as an autocomplete option
      return matchSliced.replace(regex, `<span style="background: #7986cb; color:white;" >${matchSliced.slice(0,this.userInput.length)}</span>`)
    },
    noMatch() {
      this.noMatchHandler()
      return true
    },
    onhover(state,index,el_class) {
      if(this.showState && this.autocompleteDataSet.length != 0) {
        this.hovered = state
        switch(el_class) {
          case `${this.currentid}open`:
              if(state) {
                  document.getElementsByClassName(el_class)[index].style.background = '#EEEEEE'
              } else {
                  document.getElementsByClassName(el_class)[index].style.background = ''
              }
          break;
        }
      }
    },
    // public methods
    set(dataSet = err('Error: autocomplete.set() method expected Array of string but got undefined') ) {
      if(Array.isArray(dataSet)) {
        this.autocompleteDataSet = dataSet
      }
    },
    refresh() {
      this.autocompleteDataSet = []
    },
    push(item = err('Error: autocomplete.push() method expected String but got undefined'), label) {
      if(label) {
        if(typeof label == 'string') {
          this.autocompleteDataSet.push({
            name: item,
            label: label
          })
        }
      } else {
        if(typeof item == 'string') {
          if(this.autocompleteDataSet.includes(item) == false) {
            this.autocompleteDataSet.push(item)
          }
        }
      }
    },
    init(d) {
      this.initialDataSetCopy = d

      if(typeof d[0] == 'object') {
        d.map(e => {
          this.push(e.name,e.label)
        })
      } else if(typeof d[0] == 'string'){
        d.map(e => {
          this.push(e)
        })
      }
    },  
    loading(loadingCondition = err('Error: autocomplete.loading() method expected Boolean but got undefined') ) {
      if(typeof loadingCondition == 'boolean') {
        this.loadingState = loadingCondition
      }
    },
    show(showCondition = err('Error: autocomplete.show() method expected Boolean but got undefined')) {
      if(typeof showCondition == 'boolean') {
        this.showState = showCondition
      }
    },
    onNoMatch(handler) {
      this.noMatchHandler = handler
    },
    filter(input) {
      if(this.acFilter && input.length) {
        // escaping backslash in user input
        const sanitizedInput = input.replace(/\\/g, "\\\\")
        this.userInput = sanitizedInput

        const isMatch = (e) => { 
          const r = e.match(new RegExp(sanitizedInput,'gmi'))
          if(r) {
            return true
          }
        }
        const isMatchNonSpace = (e) => {
          const r = e.replace(/ /g,"").match(new RegExp(sanitizedInput.replace(/ /g,""),'gmi'))
          if(r) {
            return true
          }
        }

        const nSet = this.autocompleteDataSet.filter(e => {
          const str = typeof e == 'object' ? e.name : e
          return isMatch(str) || isMatchNonSpace(str)
        })

        this.autocompleteDataSet = nSet
      }
      
    }
  }
}
</script>