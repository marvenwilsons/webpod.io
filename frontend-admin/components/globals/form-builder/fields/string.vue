<template>
  <div 
    @keydown="keydown"
   class="relative" >
    <div class="pad025 flex flexcenter" >
      <!-- main input -->
      <div v-if="data.appendBefore" style="color: #616161" class="marginleft025" >{{data.appendBefore}}</div>
      <input
        autocomplete="off"
        @focus="$emit('onFucos',_key), textfield_is_active = true"
        @blur="textfield_is_active = false"
        :disabled="disabled"
        :tabindex="parseInt(parseInt(key_index.split(',')[0]))"
        :style="{border:'none',outline:'none', color:color.color}"
        v-model="text_input_model"
        :class="['fullwidth dq-inp-objtfy pad025 padleft050 padright050', text_placehoder != undefined && text_input_model == undefined ? 'text-placeholder' : '']"
        :type="data.mode ? data.mode == 'password' && password_peaking == true ? 'text' : 'password' : 'text'"
        :placeholder="text_placehoder"
        :id="currentId"
      />
      <div v-if="data.appendAfter" style="color: #616161" class="marginright050" >{{data.appendAfter}}</div>

      <!-- password peaking on button -->
      <svg v-if="data.mode == 'password' && password_peaking == false" @click="password_peaking = true" class="marginright025 pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path v-if="password_peaking == false" fill="#606266" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
      </svg>
      <!-- password peaking off button -->
      <svg v-if="data.mode == 'password' && password_peaking == true" @click="password_peaking = false" class="marginright025 pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#909399" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
      </svg>
    </div>
    <!-- autocomplete box -->
    <!-- && text_input_model && text_input_model.length > 1 -->
    <div v-if="data.useAutoComplete && text_input_model && text_input_model.length > 1 " class="fullwidth" style="z-index: 100;" >
      <stringAutoComplete :ref="_key+currentId" :appearance="appearance" ></stringAutoComplete>
    </div>
    <!-- confirm password box -->
    <div style="border-top: 1px solid #E0E0E0;" v-if="show_confirm_password_field" class="marginleft050 marginright050 pad025" >
        <input
          autocomplete="off" 
          :tabindex="parseInt(parseInt(key_index.split(',')[1]))" 
          class="padtop025 padbottom025 fullwidth" placeholder="confirm password" 
          v-model="confirm_password_value" type="password"
          @focus="confirm_password_field_is_active = true" 
          :id="currentId + 'p'"
        >
    </div>
  </div>
</template>

<script>
import stringAutoComplete from './string-autocomplete.vue'
import passwordRulesMixin from '../lib/mixins/string/password-rules'
import keydownHandlerMixin from '../lib/mixins/string/keydown-handler'
import autocompleteHandlerMixin from '../lib/mixins/string/autocomplete-hanlder'
import m from '../lib/m'
export default {
  components: {stringAutoComplete},
  mixins: [m, passwordRulesMixin, keydownHandlerMixin, autocompleteHandlerMixin],
  props: ["data", "_key", "color", "key_index", "disabled", "appearance"],
  data: () => ({
    password_peaking: false,
    text_input_model: undefined,
    confirm_password_value: undefined,
    show_password_confirm: false,
    text_placehoder: undefined,
    textfield_is_active: false,
    confirm_password_field_is_active: false,
    value: undefined,
    autoCompleteHooks_empty: { // to avoid undefined errors
      set() {},
      refresh() {},
      push() {},
      show() {},
      loading() {},
      onNoMatch() {}
    },
    string_validation: {
      minChar(val, arg, err) {
        if (val.length >= arg.minChar) {
          return {
            status: true
          };
        } else {
          err({
            Msg: `Character length is lesser than the defined minimum of ${arg.minChar} character(s) required`,
            App: "objectfySingle",
            onMethod: "change"
          });
          return {
            status: false,
            msg: `Character length is lesser than the defined minimum of ${arg.minChar} character(s) required`
          };
        }
      },
      maxChar(val, arg, err) {
        if (val.length < arg.maxChar) {
          return {
            status: true
          };
        } else {
          err({
            Msg: `Character length is greater than the defined maximum character required`,
            App: "objectfySingle",
            onMethod: "change"
          });
          return {
            status: false,
            msg:
              "Character length is greater than the defined maximum character required"
          };
        }
      },
      allowSpecialChars(val, arg, err) {
        if (!arg.allowSpecialChars) {
          const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
          if (regex.exec(val) != null) {
            err({
              Msg: `Special character not allowed`,
              App: "objectfySingle",
              onMethod: "change"
            });
            return {
              status: false,
              msg: "Special character not allowed"
            };
          } else {
            return {
              status: true
            };
          }
        }
      },
      allowWhiteSpace(val, arg, err) {
        if (!arg.allowWhiteSpace) {
          if (val.indexOf(" ") != -1) {
            err({
              Msg: `White space detected`,
              App: "objectfySingle",
              onMethod: "change"
            });
            return {
              status: false,
              msg: "White space detected"
            };
          } else {
            return {
              status: true
            };
          }
        }
      }
    },
    currentId: undefined
  }),
  computed: {
    raw_data_set() {
      return this.data;
    },
    show_confirm_password_field() {
      if(this.data.mode == 'password' && this.text_input_model) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    text_input_model(current_string_being_input, prev_string_input) {
      // validation set
      const validationSet = new Set([
        "minChar",
        "maxChar",
        "allowSpecialChars",
        "allowWhiteSpace"
      ]);

      // perform string validation from the validation set
      const final = Object.keys(this.data).map(e => {
        if (validationSet.has(e)) {
          const exec = this.string_validation[e](
            current_string_being_input,
            this.data,
            err => this.$emit("onError", err)
          );

          if (exec) {
            if (!exec.status) {
              return (this.validation_err = exec.msg);
            }
          }
        }
      });
      // get errors from the validation set
      const errors = final.filter(error => error != undefined)

      // when autocomp is active
      // autocomplete component reference
      const autocomplete = this.$refs[this._key+this.currentId]
      
      // when there are no errors found
      if (errors.length == 0) {
        // when the main input is active
        if(this.textfield_is_active == true) {
          // emit an event containing the current value of the input
          this.$emit("onChange", {
            err: null,
            value: current_string_being_input,
            key: this._key,
            // when autocomplete is acitve it will return a set of methods from autocomplete component else it will return empty functions to avoid error in case executed
            autoCompleteHooks: this.get_autocomp_component_methods()
          })

          this.value = current_string_being_input

          if(autocomplete != undefined && autocomplete.show != undefined && this.data.useAutoComplete == true) {
            // autocomplete.init(this.data.autocompleteData) // initializing autocomplete
            autocomplete.refresh()
            this.data.autocompleteData.map(e => {
              if(typeof e == 'object') {
                autocomplete.push(e.name,e.title)
              } else {
                autocomplete.push(e)
              }
            })
            autocomplete.filter(this.text_input_model) // filter the autocomplete dataSet
            autocomplete.show(true) // display the result
          }
        }
      } else {
        // emit an event with errors
        this.$emit("onChange", {
          err: errors,
          value: null,
          autoCompleteHooks: this.autoCompleteHooks_empty,
          key: this._key
        })
      }
    },
    textfield_is_active() {
      if(this.textfield_is_active) {
        // console.log('string is avtive')
        this.$parent.isActive = true
      } else {
        // console.log('textfield is not active')
        const autocomplete = this.$refs[this._key+this.currentId]
        if(autocomplete != undefined) {
          setTimeout(() => {
            // autocomplete.show(false)
          }, 100)
        }
        this.$parent.isActive = false
        this.activateInputHooks(this.text_input_model,'onBlur', {
          key: 'autocomplete',
          value: this.get_autocomp_component_methods()
        })
      }
    },
    confirm_password_field_is_active(n) {
      if(!n) {
        this.$parent.errors = []
        if(this.text_input_model != this.confirm_password_value) {
          this.$parent.pushError('Password does not match')
          this.$emit("onChange", {
            err: ['password does not match'],
            value: null,
            autoCompleteHooks: this.autoCompleteHooks_empty,
            key: this._key
          })

        } else {
          this.$parent.setLoading(true)
          setTimeout(() => {
            this.$parent.setLoading(false)
            this.$parent.setCheck(true)
          }, 500)

          this.$emit("onChange", {
            err: null,
            value: this.text_input_model,
            key: this._key,
            // when autocomplete is acitve it will return a set of methods from autocomplete component else it will return empty functions to avoid error in case executed
            autoCompleteHooks: this.get_autocomp_component_methods()
          })
        }
      }
    }
  },
  mounted() {
    this.currentId = this.uid()

    setTimeout(() => {
      if(this.data.hooks) {
        if(this.data.hooks.onMount) {
          this.activateInputHooks(this.data.value,'onMount', {
            key: 'autocomplete',
            value: this.get_autocomp_component_methods()
          })
        }
      }
    },0)
    // console.log(this._key,this.data)
    
    if(!this.data.value){
      this.text_placehoder = this._key

      if(this.data.mode == 'password') {
        this.show_password_confirm = true
      }
    } else {
      this.text_input_model = this.data.value

      
    }
  }
};
</script>