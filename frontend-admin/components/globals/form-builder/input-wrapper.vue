<template>
  <div v-if="ready" style="max-width:600px; background: white;" :class="['fullwidth pad050 padright125 borderRad4', showUpdateControls ? 'paneBorder bg-update borderRad4' : '']" >
    <div v-if="data.headDescription && showUpdateControls" class="marginbottom050 padleft025 " >
      <span class="text-secondary" >
        {{data.headDescription}}
      </span>
    </div>
    <!-- input -->
    <div  class="flex spacebetween flexcenter fullwidth"  >
      <div :class="['fullwidth flex relative borderRad4 relative', errors.length != 0 ? 'borderRad4 overflowhidden' : '', operation == 'w' ? 'paneBorder' : '', isActive ? 'paneShadow' : '']" 
      :style="{background: 'white', border: inputBorderColor}" >
        <div  v-if="loading || xloading" style="z-index: 999; background: #f5f7fabe; cursor: not-allowed" class="absolute fullwidth fullheight-percent" ></div>
        <div class="fullwidth" > 
          <!-- input mode -->
          <slot v-if="showInput" :onInput="onInput" :allowMutationOnInput="allowMutationOnInput"  ></slot>
          <!-- read mode -->
          <div @click="updateMode(true)" v-if="!showInput" class="pad050 pointer text-regular" >
            <!-- <span v-html="formatedReadModeData" ></span> -->
            <div v-if="typeof data.value == 'string' && !data.mode" >{{data.value}}</div>
            <div v-if="typeof data.value == 'number' && data.type == 'number'" >{{data.value}}</div>
            <div v-if="data.type == 'select' || data.type == 'multiselect'" >{{data.options[data.value]}}</div>
            <div v-if="data.type == 'checkbox'" >{{data.value ? 'Confirmed' : 'Not Confirmed'}}</div>
            <div v-if="data.type == 'string' && data.mode == 'password' && data.value" >********</div>
            <div v-if="data.type == 'minmax'" >
              <div class="flex flexcenter flexstart" v-for="(minmaxVal,key) in data.value" :key="uid(minmaxVal)" >
                <span class="text-secondary text-small flex1" >{{key}}</span> <span class="flex9" >{{minmaxVal}}</span>
              </div>
            </div>
            <div v-if="Array.isArray(data.value)" > <v-chip small class="marginright025" v-for="item in data.value" :key="uid() + item" >{{item}}</v-chip> </div>
            <div v-if="data.value == undefined" >Not Available</div>
          </div>
        </div>
      </div>
      <div @click="updateMode(true)" v-if="operation == 'rw'" class="marginleft050 pointer clickable-span" >edit</div>

      <!-- input state indicators -->
      <div v-if="operation == 'w'" :class="['flex flexwrap flexend flexcenter', updating ? 'marginleft050' : '']" >
        <!-- loading -->
        <loading class="marginleft050" v-if="loading || xloading" />
        <!-- check mark -->
        <checkAnimation v-if="showCheck" :check="showCheck" />
        <!-- <svg v-if="showCheck" class="" style="width:24px;height:24px;" viewBox="0 0 20 24">
          <path fill="#67C23A" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg> -->
      </div>
    </div>

    <!-- desc -->
      <div v-if="data && description && operation == 'w'" class="pad025 flex" >
        <div class="padtop025 padright050" >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#4a4f55" d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z" />
            </svg>
        </div>
        <!-- desc rendering -->
        <div style="max-width: 382px;" class="padtop025" >
          <!-- if data.description is a string -->
          <div :id="`${currentId}_${inputKey}`" class="text-secondary text-small" v-if="typeof description == 'string'" >
            {{description}}
          </div>
          <!-- if data.description is an object -->
          <div v-if="typeof description == 'object'" >
            <!-- if data.descrtion is an array -->
            <div v-if="Array.isArray(description)" >
              <div class="flex flexcenter flexstart" v-for="descItem in description" :key="uid(descItem)" >
                <svg class="" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#4a4f55 " d="M10,14V10H14V14H10Z" />
                </svg>
                <span class="text-secondary text-small" >
                  {{descItem}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- err 2 -->
      <div v-if="errors.length != 0" class="pad025 flex borderRad4 margintop050" style="background: #FFEBEE; border: 1px solid #EF9A9A;" >
        <div class="padtop025 padright050" >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#C62828" d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
            </svg>
        </div>
        <div style="max-width: 382px;"  class="flex flexcol " >
          <span style="color:#C62828" > <strong>Error</strong> </span>
          <div class="flex margintop025" v-for="errmsg in errors" :key="uid(errmsg)" >
            <svg style="min-width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#C62828" d="M10,14V10H14V14H10Z" />
            </svg>
            <div v-html="errmsg" style="color:#C62828" >
            </div>
          </div>
        </div>
      </div>
    <!--  -->
    <div v-if="showUpdateControls" class="flex flexend pointer padtop025" >
      <span v-if="errors.length == 0 && showUpdateBtn"  @click="update" class="marginright050 clickable-span" >{{updateOnProgress ? 'updating ...' : 'update'}}</span>
      <span v-if="updateOnProgress == false" @click="cancel" class="clickable-span" >close</span>
    </div>
    <!--  -->
    <div class="flex flexend pointer padtop025" >
      <span v-if="showCancelUpdateDueServerError" @click="cancelUpdateDueServerError" class="clickable-span" >close</span>
    </div>
  </div>
</template>

<script>
import m from './lib/m'
import updateMixin from './lib/mixins/input-wrapper/update-mixin'
import checkAnimation from './check-ani.vue'
export default {
  mixins: [m, updateMixin],
  components: {checkAnimation},
  props: ['errState','errMsg','errKey','data', 'inputKey', 'loading', 'formData'],
  data: () => ({
    errors: [],
    description: undefined,
    currentId: undefined,
    currentHooks: [],
    hookMethods: undefined,
    xloading: false,
    showCheck: false,
    isActive: false,
    showInput: false,
    ready: true,
    allowMutationOnInput: true,
    inputObject: undefined,
    showCancelUpdateDueServerError: false,
  }),
  computed: {
    inputBorderColor() {
      return this.errors.length != 0 ? 
        `1px solid #C62828` : 
        `${this.isActive ? '2px' : '1px'} solid ${this.isActive ? '#7986CB' : '#ECEFF1'}`
    },
    formatedReadModeData() {
      if(this.data.value) {
        if(typeof this.data.value === 'string') {
          return this.data.value
        } else if(Array.isArray(typeof this.data.value)) {
          return this.data.value.join
        }
      } else {
        return 'Not Available'
      }
    }
  },
  watch: {
    errors() { /** Execute the onError hook function from the input object data property */
      if(this.currentHooks.includes('onError') && this.errors.length != 0) {
        this.data.hooks.onError(this.errors)
        this.setLoading(false)
        this.setCheck(false)

        if(this.updateOnProgress) {
          this.showCancelUpdateDueServerError = true
        }
      }
    }
  },
  methods: {
    onInput(input) { /** executes the onInput hook function from the input object data property,
      this method runs every time an input is changed */
      this.inputObject = input
      if(input.autoCompleteHooks != undefined) {
        this.hookMethods.autocomplete = input.autoCompleteHooks
      }

      const executeHookFunction = () => {
        if(this.currentHooks.includes('onInput')) {
          this.data.hooks.onInput({
            value: input.data,
            ...this.hookMethods
          })
        }
      }

      executeHookFunction() 
    },
    pushError(err) { /** Push new string to the errors array */
      if(Array.isArray(err)) {
        this.errors = err
      } else if(typeof err == 'string') {
        if(this.errors.includes(err) == false){
          this.errors.push(err)
        }
      }

      this.showCheck = false
    },
    setError(err) { /** empties the errors array then push a new string to the errors array */
      if(typeof err == 'string') {
        this.errors = []
        this.errors.push(err)
      }

      this.showCheck = false
    },
    setDescription(desc) {
      this.description = desc
    },
    setDescriptionHtml(html) {
      setTimeout(() => {
        document.getElementById(`${this.currentId}_${this.inputKey}`).innerHTML = html
      }, 100)
    },
    setLoading(e) {
      if(typeof e == 'boolean') {
        this.xloading = e
        this.showCheck = !e
      }
    },
    setCheck(e) {
      this.showCheck = e
    }
  },
  mounted() {
    // set id
    this.currentId = this.uid()
    // set defaults
    if(this.data && this.data.description != undefined) {
      this.description = this.data.description
    }
    // save hook methods
    this.hookMethods = {
      setDescription: this.setDescription,
      setDescriptionHtml: this.setDescriptionHtml,
      loading: this.setLoading,
      formData: this.formData,
      check: this.setCheck,
      error: {
        push: this.pushError,
        set: this.setError
      }
    }
    // hooks
    if(this.data && this.data.hooks) {
      this.currentHooks = Object.keys(this.data.hooks)
    }
    //
    if(this.data.operation == 'rw') {
      this.allowMutationOnInput = true
    }
  }
}
</script>

<style>
.clickable-span {
  color: #1E88E5;
}
.bg-update {
  background: #ECEFF1;
}
</style>