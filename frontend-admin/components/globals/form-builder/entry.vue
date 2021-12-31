<template>
  <!-- @Objectify html -->
  <div id="dq-objectify" v-if="ready" class="relative borderRad4">
    <!-- <debug :data="{entries_with_render_conditions,final_model,final_vanilla,hidden_entries,raw_data_set}"></debug> -->
    <!-- view start here -->
    <div class="pad050 borderRad4" :style="{background: 'white'}" >
      <span>
        <span class="text-secondary merri-font" >{{config.globalConfig.title}}</span>
      </span>
      <p
        v-if="config.sub_title_description_text"
        :style="{color: appearance.sub_title_description_text_color}"
      >{{config.globalConfig.sub_title_description_text}}</p>
    </div>
    <!-- container -->
    <div :style="{border: `1px solid ${appearance.wrap_around_border_color}`, background: 'white'}">
      <div class="margin125">
        <div
          class="flex flexcol"
          style="border-bottom: 1px solid #eceff1;"
          v-for="(obj_key,obj_index) in final_model"
          :key="`-o-${obj_index}`"
        >
          <div v-if="renderPaused != obj_index" class=" flex pad050">
            <!-- keys -->
            <!-- <div
              :id="`objectify-${obj_index}`"
              role="display object index"
              :class="['borderred flex3 pointer flexwrap flex', editMode.includes(obj_index) ? 'padtop125 margintop025' : 'padtop125 margintop025']"
              :style="{...get_keys_style, minWidth: '150px', maxWidth: '300px'}"
              :title="obj_key.hoverInfo"
            >
                <span class="" style="color: #232729; font-weight:600;" >
                    {{obj_index}}
                </span>
            </div> -->
            <!-- value -->
            <div :style="{...get_value_style}" role="display object value" class="flex flex1 relative pad050 fullwidth">
              <div v-if="disable_all_fields" id="disabler" class="absolute fullheight-percent fullwidth" style="z-index:100" ></div>
              <div
                :style="{color: get_value_style.color}"
                class=" padleft025 flex spacebetween"
                v-if="config.operation === 'r'"
              >
                <div v-if="!Array.isArray(obj_key)" class="flex1" >{{ obj_key }}</div>
                <div v-if="Array.isArray(obj_key)" class="flex" >
                  <div 
                    :style="{border: `1px solid ${appearance.select_chip_border_color}`, background:appearance.select_chip_bg_color}"
                    class="s_opts padright025 padleft025 borderRad4" 
                    v-for="(item,i) in obj_key" :key="item + i" > 
                    {{item}}   
                  </div>
                </div>
                <div
                  @click="removeProp(obj_index)"
                  v-if="config.allowRemoveProp"
                  style="max-width:20px;"
                  class="padleft025 pointer borderRad4 flex flexcenter"
                  >
                  <div 
                  class="flex flexcenter marginright025  relative"
                  :style="{background: appearance.divider_border_color, maxWidth:'17px', maxHeight:'10px', borderRadius: '100px'}"
                  >
                    <small style="margin-top:2px" >&#10134;</small>
                  </div>
                </div>
              </div>
              <!-- **************************** string -->
              <inputWrapper 
                :data="obj_key" 
                v-if="obj_key.type == 'string' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :ref="`${currentId}_${obj_index}`"
                :inputKey="obj_index"
                :loading="false"
                :formData="final_vanilla"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
                >
                  <template v-slot={onInput,allowMutationOnInput} >
                    <div
                      class="fullwidth"
                      @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                      @onFucos="onInputFucos"
                      :_key="obj_index"
                      :data="obj_key"
                      :key_index="obj_key.tab_index"
                      :is="'str'"
                      :color="get_value_style"
                      :disabled="disabled_field == obj_index"
                      :appearance="{
                        color: appearance.values_text_color,
                        background_selected: appearance.background_selected,
                        select_option_hover_bg: appearance.select_option_hover_bg,
                        select_option_border_color: appearance.select_option_border_color,
                        select_option_bg: appearance.select_option_bg,
                        select_chip_border_color: appearance.select_chip_border_color,
                      }"
                    ></div>
                  </template>
              </inputWrapper>
              <!-- **************************** number -->
              <inputWrapper 
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'number' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput} >
                  <div
                    class="fullwidth "
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    @onFucos="onInputFucos"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                    :is="'num'"
                    :color="get_value_style"
                    :disabled="disabled_field == obj_index"
                  ></div>
                </template>
              </inputWrapper>
              <!-- **************************** minmax -->
              <inputWrapper 
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'minmax' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput} >
                  <div
                    class="fullwidth pad025"
                    @onFucos="onInputFucos"
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                    :appearance="appearance"
                    :is="'MinMax'"
                    :color="get_value_style"
                    :disabled="disabled_field == obj_index"
                  ></div>
                </template>
              </inputWrapper>
              <!-- **************************** select usage -->
              <inputWrapper 
                :data="obj_key"
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'select' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput} >
                  <div
                    class="fullwidth"
                    @onFucos="onInputFucos"
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                    :disabled="disabled_field == obj_index"
                    :appearance="{
                      background: appearance.values_bg_color,
                      color: appearance.values_text_color,
                      background_selected: appearance.background_selected,
                      select_arrow_down_color: appearance.select_arrow_down_color,
                      chip_close: appearance.select_arrow_down_color,
                      select_option_hover_bg: appearance.select_option_hover_bg,
                      select_option_border_color: appearance.select_option_border_color,
                      select_chip_bg_color: appearance.select_chip_bg_color,
                      select_chip_hover_bg_color: appearance.select_chip_hover_bg_color,
                      select_chip_border_color: appearance.select_chip_border_color,
                      select_chip_text_color: appearance.select_chip_text_color,
                      select_option_bg: appearance.select_option_bg
                    }"
                    :is="'sel'"
                  ></div>
                </template>
              </inputWrapper>
              <!-- **************************** multiselect -->
              <inputWrapper 
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`"
                v-if="obj_key.type == 'multiselect' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput} >
                  <multiselect
                    @onFucos="onInputFucos"
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                    :disabled="disabled_field == obj_index"
                    :appearance="{
                      background: appearance.values_bg_color,
                      color: appearance.values_text_color,
                      background_selected: appearance.background_selected,
                      select_arrow_down_color: appearance.select_arrow_down_color,
                      chip_close: appearance.select_arrow_down_color,
                      select_option_hover_bg: appearance.select_option_hover_bg,
                      select_option_border_color: appearance.select_option_border_color,
                      select_chip_bg_color: appearance.select_chip_bg_color,
                      select_chip_hover_bg_color: appearance.select_chip_hover_bg_color,
                      select_chip_border_color: appearance.select_chip_border_color,
                      select_chip_text_color: appearance.select_chip_text_color,
                      select_option_bg: appearance.select_option_bg
                    }"
                  />
                </template>
              </inputWrapper>
              <!-- **************************** tags -->
              <inputWrapper
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'tags' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput}>
                  <tags
                    @onFucos="onInputFucos"
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :style="{background: appearance.input_bg_color}"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                    :disabled="disabled_field == obj_index"
                    :appearance="{
                      background: appearance.values_bg_color,
                      color: appearance.values_text_color,
                      background_selected: appearance.background_selected,
                      select_arrow_down_color: appearance.select_arrow_down_color,
                      chip_close: appearance.select_arrow_down_color,
                      select_option_hover_bg: appearance.select_option_hover_bg,
                      select_option_border_color: appearance.select_option_border_color,
                      select_chip_bg_color: appearance.select_chip_bg_color,
                      select_chip_hover_bg_color: appearance.select_chip_hover_bg_color,
                      select_chip_border_color: appearance.select_chip_border_color,
                      select_chip_text_color: appearance.select_chip_text_color,
                      select_option_bg: appearance.select_option_bg
                    }"
                  />
                </template>
                
              </inputWrapper>
              <!-- **************************** tags -->
              <inputWrapper
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'textarea' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput}>
                  <txtarea
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                  ></txtarea>
                </template>
              </inputWrapper>
              <!-- **************************** checkbox -->
              <inputWrapper
                :data="obj_key" 
                :inputKey="obj_index" 
                :ref="`${currentId}_${obj_index}`" 
                v-if="obj_key.type == 'checkbox' && config.operation === 'rw'" 
                :errState="err_key == obj_index" :errMsg="err" :errKey="err_key" 
                :formData="final_vanilla"
                :loading="false"
                :original_data="config.data"
                @updateInputValue="(e) => {$emit('updateInputValue',e)}"
              >
                <template v-slot={onInput,allowMutationOnInput}>
                  <chbox
                    @onChange="(arg) => { onInput(arg), allowMutationOnInput ? data_change(arg) : null }"
                    :_key="obj_index"
                    :data="obj_key"
                    :key_index="obj_key.tab_index"
                  ></chbox>
                </template>
              </inputWrapper>
            </div>
          </div>
          <!-- end -->
        </div>
      </div>
    </div>
    <div v-if="btn_visibility" class="margintop050 flex flexend">
      <button @blur="btnFucos(false)" @focus="btnFucos(true)" id="obj-btn" :tabindex="get_btn_index()" :disabled="btn_is_disabled" :style="get_button_style" @click="submit" class="dq-button borderRad4">
        <small v-if="!btn_is_loading" >{{config.submit_button}}</small>
        <div v-if="btn_is_loading" class="spinning flex flexcenter" style="width:20px; height:20px;" > 
          ⟲
        </div>
      </button>
    </div>
  </div>
</template>

<script>
// @Objectify JS

import num from "./fields/number.vue";
import str from "./fields/string.vue";
import sel from "./fields/select.vue";
import MinMax from "./fields/min-max"
import multiselect from './fields/multi-select'
import tags from './fields/tags.vue'
import miftm from './lib/multiInputField_tabIndex_mapping_system'
import themeManager from './themes/index'
import inputWrapper from './input-wrapper.vue'
import txtarea  from './fields/text-area.vue'
import chbox from './fields/check-box.vue'
import m from './lib/m'
import sysywg from './fields/sysywig.vue'
import cal from './fields/calendar.vue'
import textEditor from './fields/text-editor.vue'

export default {
  props: ["config", "theme" , "hooks"],
  mixins: [m],
  components: { num, str, sel, MinMax, multiselect, tags, inputWrapper, txtarea, chbox, sysywg, cal, textEditor },
  computed: {
    /**
     * return type Object
     * convert the schema into vanilla object
     */
    normalize_data_set() {
      return this.raw_data_set;
    },
    /**
     * return type Array
     * Scans the schema with render condition and returns an array of keys
     */
    entries_with_render_conditions() {
      let arr = [];

      for (let key in this.raw_data_set) {
        if (this.raw_data_set[key]["renderCondition"]) {
          arr.push(key);
        }
      }

      return arr;
    },
    /**
     * returns an array
     * scans the schema, returns an array of keys of entries that should be hidden
     */
    hidden_entries() {
      let r = [];

      this.entries_with_render_conditions.map(keys => {
        if(typeof this.normalize_data_set[keys].renderCondition.method == 'undefined') {
          this.ready = false
          console.error('Objectify Render Error: Invalid renderCondition, method property missing')
        }

        if(typeof this.normalize_data_set[keys].renderCondition.method != 'function') {
          console.error(`Objectify Error: Invalid renderCondition method found in "${keys}", renderCondition method should be a function `)
        } else {
          const condition_result = this.normalize_data_set[keys].renderCondition.method(this.normalize_data_set);
        
          if (!condition_result) {
            r.push(keys);
          }
        }
      });

      return r;
    },

    // final model
    final_model() {
      let r = {};
      // dont include entries that is included in the hidden entries
      for (let key in this.normalize_data_set) {
        if (!this.hidden_entries.includes(key)) {
          r[key] = this.normalize_data_set[key];
        }
      }

      return r;
    },
    // final vanilla
    final_vanilla() {
      let f = {};
      for (let key in this.final_model) {
        const t = this.final_model[key].type;
        if (t == "string" || t == "number" || t == 'minmax' || t == 'multiselect' || t == 'textarea' || t == 'checkbox') {
          f[key] = this.final_model[key].value;
        } else if (t == "select") {
          f[key] = this.final_model[key].options[this.final_model[key].value];
        }
      }

      return f;
    },

    // button style
    get_button_style() {
      return {
        background: this.appearance.button_bg_color,
        color: this.appearance.button_text_color
      };
    },

    // keys style
    get_keys_style() {
      return {
        // borderBottom: `1px solid ${this.appearance.divider_border_color}`,
        // minWidth: "140px",
        background: 'transparent',
        color: this.appearance.keys_text_color
      };
    },

    // value style
    get_value_style() {
      return {
        // borderBottom: `1px solid ${this.appearance.divider_border_color}`,
        background: 'transparent',
        color: this.appearance.values_text_color
      };
    }
  },
  data: () => ({
    ready: false,
    appearance: undefined,
    raw_data_set: undefined,
    has_initial_input: false,
    err: undefined,
    info: undefined,
    err_key: undefined,
    info_key: undefined,
    postErrorMode: false,
    change_occurs: false,
    btn_visibility: false,
    btn_is_disabled: false,
    btn_is_loading: false,
    disable_all_fields: false,
    data_keys: [],
    tab_index_mapping: [],
    tab_index_len: 0,
    fields: {},
    form: {},
    disabled_field: undefined,
    renderPaused: undefined,
    isFucosed: undefined,
    currentId: undefined,
    editMode: [ ]
  }),
  watch: {
    "config.data": function() {
      this.init()
    },
    final_vanilla(current, prev) {
      if(Object.keys(prev).length != 0) {
        this.$emit("onChange", {
          data: current,
          btn: {
            visibility: this.set_btn_visibility,
            disable: this.set_btn_disable,
            
          },
          fields: this.fields,
          form: this.form
        });
      }
    },
  },
  methods: {
    onInputFucos(el) {
      this.isFucosed = el
    },
    set_btn_visibility(val) {
      this.btn_visibility = val
    },
    set_btn_disable(val) {
      this.btn_is_disabled = val
    },
    get_btn_index(keyname) {
      let l = this.tab_index_mapping[this.tab_index_mapping.length -1]
      if(l.includes(',')) {
        return parseInt(l.split(',')[1]) + 1
      }
    },
    btnFucos(val) {
      const el = document.getElementById("obj-btn")
      if(val) {
        el.style.border = `2px solid #629af4`
      } else {
        el.style.border = `none`
      }
    }, 
    find_key_controllers_on_entries(key, data_set) {
      let entry = [];
      let _key = key;

      for (let key in data_set) {
        if (data_set[key].renderCondition) {
          if (_key) {
            if (data_set[key].renderCondition.controllers.includes(_key)) {
              entry.push(key);
            }
          }
        }
      }

      return entry;
    },
    copy(o) {
      if (o === null) return null;

        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
          v = o[key];
          output[key] = typeof v === "object" ? this.copy(v) : v;
        }

        return output;
    },
    data_change({ err, value, key }) {
      if(value == undefined) {
        console.error(key, 'is undefined')
      }

      if (!this.change_occurs) {
        this.change_occurs = true;
      }
      
      const targetInputWrapper = this.$refs[`${this.currentId}_${key}`][0]
      if (!err) {
        targetInputWrapper.pushError([])
        // change default value to final model
        this.final_model[key].value = value;
        //
        if (!this.has_initial_input) {
          this.has_initial_input = true;
        }

        //
        this.err = undefined;
        this.err_key = undefined;

        // emit object changes
        this.$emit("onData", this.final_vanilla);

        // document.getElementById(`objectify-${key}`).classList.remove("err");
        // document
        //   .getElementById(`objectify-${key}`)
        //   .classList.remove("backgrounderr");
      } else {
        // show err
        targetInputWrapper.pushError(err)

        if (this.has_initial_input) {
          // document.getElementById(`objectify-${key}`).classList.add("err");
          // document
          //   .getElementById(`objectify-${key}`)
          //   .classList.add("backgrounderr");

          // triggers the real time error infomation to show the error
          this.err = err;
          this.err_key = key;


          // emit on error event
          this.$emit("onError", {
            err,
            key,
            value
          });
        }
      }
    },
    submit() {
      this.$emit("onSubmit", this.final_vanilla);
      this.set_btn_disable(true)
      this.btn_is_loading = true
      this.disable_all_fields = true
    },
    removeProp(prop_name) {
      const nc = this.copy(this.raw_data_set)

      this.$delete(nc,prop_name)
      if(Object.keys(nc).length == 0){
        this.$emit('onEmpty')
      }

      this.$emit('onRemoveProp',nc)
    },
    init() {
       // set theme if set by user
      if(this.$colorMode && this.$colorMode.preference && this.config.useColorMode) {
        this.appearance = themeManager[this.$colorMode.preference]
      } else {
        if(this.config.theme) {
          if(typeof this.config.theme == 'string') {
            this.appearance = themeManager[this.config.theme]
          } else {
            this.appearance = this.config.theme 
          }

        } else if(!this.config.appearance) {
          this.appearance = themeManager.light
        } else if(this.config.theme == undefined) {
          this.appearance = themeManager.light
        } else {
          this.appearance = this.config.appearance
        }
      }

      if(this.config.data) {
        if(typeof this.config.data != 'object') {
          console.error(`Objectify Error: Invalid "config.data" value type, it should an object but got ${typeof this.config.data}`)
          alert(`Objectify Error: Invalid "config.data" value type, it should an object but got ${typeof this.config.data}`)
          return
        } else {
          // Add type here, Add new type
          const validTypes = ['string','number','select','multiselect','number','minmax', 'tags', 'textarea', 'checkbox']
          // validate each item
          const validationResult = Object.entries(this.config.data) // retunrs an array of array presenting the object by formating ['key', value]
          .map((e,i) => {
            const item = e[1]
            // start validating
            if(item.type) {
              if(item.renderCondition && item.renderCondition.method) {
                item.renderCondition.method = new Function(`return ${item.renderCondition.method}`)()
              }

              if(item.hooks) {
                for(const key in item.hooks) {
                  item.hooks[key] = new Function(`return ${item.hooks[key]}`)()
                }
              }

              const scanForMissingProps = (requiredProps,_item,c) => {
                return requiredProps.map(prop => {
                  if(Object.keys(_item).includes(prop) == false) {
                    console.error(`Objectify Error: item "${e[0]}" is missing "${c ? c + '.' + prop : prop}" property`)
                    console.log('')
                    return true
                  } 
                })
              }
              // all items should have type property on it
              if(!validTypes.includes(item.type)) {
                alert(`Objectify Error: Invalid type "${item.type}"`)
              } 
              // String type validation
              else if(item.type == 'string')  {
                
                // value should be present in
                if(!Object.keys(item).includes('value')) {
                  alert('Objectify Error: An item with a type of string found without a value property on it')
                }

                // add the rest of properties that is required here
                const requiredProps = ['type','allowWhiteSpace','allowSpecialChars','mode','maxChar','minChar','hoverInfo']

                // scan item and find out if there are missing properties if a missing property is detected return true
                const itemsThatHasMissingProps = scanForMissingProps(requiredProps,item)
                return itemsThatHasMissingProps.includes(true)


              } 
              // number type validation
              else if(item.type == 'number') {
                const requiredProps = ['min','max','step','step','value','hoverInfo']

                // scan item and find out if there are missing properties if a missing property is detected return true
                const itemsThatHasMissingProps = scanForMissingProps(requiredProps,item)
                return itemsThatHasMissingProps.includes(true)
              } 
              // select & multiselect type validation
              else if(item.type == 'select' || item.type == 'multiselect') {
                const requiredProps = ['options','value','hoverInfo']

                // scan item and find out if there are missing properties if a missing property is detected return true
                const itemsThatHasMissingProps = scanForMissingProps(requiredProps,item)
                return itemsThatHasMissingProps.includes(true)

              } 
              // minmax type validation
              else if(item.type == 'minmax') {
                const requiredProps = ['options','value','hoverInfo']
                const itemsThatHasMissingProps = scanForMissingProps(requiredProps,item)
                return itemsThatHasMissingProps.includes(true) || 
                scanForMissingProps(['min','max'],item.options,'options') ||
                scanForMissingProps(['min','max'],item.value,'value') ||
                scanForMissingProps(['min','max'],item.max)
              } else {
                this.ready = true
              }
            } else {  
              alert(`Objectify Error: Found Invalid item "${e[0]}" type property is missing`)
            }

          })

          if(validationResult.includes(true)) {
            alert(`Objectify Rendering Error: Found Invalid items, check the console logs for more info`)
          } else {
            this.ready = true
          }
        }
      } else {
        alert('Objectify Error: config.data property is undefined')
      }


      // set data
      this.raw_data_set = this.copy(this.config.data);
      this.$emit('onMount',this.raw_data_set)

      

      // register multiple input fields
      const multipleInputFields = ['minmax','string']

      // assigning correct tab index
      if(this.config.operation == 'rw') {
        let dobuleTabIndexes = []
        this.data_keys = Object.keys(this.raw_data_set)
        this.data_keys.map((keys, index) => {
          const type = this.raw_data_set[keys].type
          if(multipleInputFields.includes(type)) {
            // multiple digit, a multiple input field
            this.tab_index_mapping.push(`${index},${index+1}`)
            this.tab_index_len = this.tab_index_mapping.length
            dobuleTabIndexes.push(index)
          } else {
            // single digit, a one input field
            this.tab_index_mapping.push(`${index}`)
          }
        })

        this.tab_index_mapping = miftm(this.tab_index_mapping)
        this.data_keys.map((k,ki) => {
          this.raw_data_set[k].tab_index = this.tab_index_mapping[ki]
          this.raw_data_set[k].render = true
        })

        const _ = this
        this.data_keys.map(key => {
          this.fields[key] = {
            // display's an error msg to selected input field
            postError(msg) {
              _.err = msg
              _.err_key = key
            },
            removeError() {
              _.err = undefined
              _.err_key = undefined
            },
            postInfoMsg(msg) {
              _.info_key = key
              _.info = msg
            },
            removeInfoMsg() {
              _.info = undefined
              _.info_key = undefined
            },
            pauseRender(cbCondition) {
              _.renderPaused = key
              cbCondition(() => {
                _.renderPaused = false
              }) 
            },
            // disable's input change
            lock() {
              _.disabled_field = key
            }
          }
        })

        this.form = {
          getCurrentFucos() {
            return _.isFucosed
          }
        }
      }
    }
  },
  mounted() {
    this.init()
    this.currentId = this.uid()
  }
};
</script>

<style scoped >
.debugwin {
  overflow: auto;
  max-width: 300px;
}
.dq-button:disabled{
  background: gray !important;
  color: #333 !important;
  cursor: not-allowed;
}

@keyframes spin {
    from {
        transform:rotate(360deg);
    }
    to {
        transform:rotate(0deg);
    }
}
.spinning {
  animation-name: spin;
  animation-duration: 800ms; /* How long lasts 1 turn */
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
#disabler{
  background: rgba(77, 77, 77, 0.295);
  cursor: not-allowed;
}
div:focus {
  border: 1px solid rgba(211, 211, 211, 0.048);
}
</style>