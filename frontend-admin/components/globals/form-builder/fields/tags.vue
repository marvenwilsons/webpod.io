<template>
  <div class="fullwidth flex padleft050 flexwrap padbottom025"  @keydown="keydown" >
    <div 
        :class="[`${currentId}_s_opts`, 'borderRad4 padleft025 s_opts pointer ']" 
        v-for="(so,si) in selected_opts" :key="`${so}-${si}`"
        >
        <v-chip class="margintop025" >
          <span style="white-space: nowrap; color: #2c3234;" > {{so}}</span> 
          <!-- close btn -->
            <div 
            @click.prevent="removeSelection(so)" 
            :class="[`${currentId}_s_opts_close`, 'marginleft025 padleft025 padright025 flex flexcenter s_opts_close pointer']" 
            >
                <span  >
                    <svg style="width:11px;height:11px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </span>
            </div>
        </v-chip>
    </div>
    <!-- input and add button -->
    <div class="flex marginright025" style="padding-right:2px;" >
      <input :id="currentId" v-model="text" onkeypress="this.style.width = ((this.value.length + 1) * 9) + 'px';" 
        class="marginleft025 pad025 invisible-input fullwidth" :tabindex="parseInt(key_index)"  type="text"
        style="min-width:100%;"
        @blur="inputIsSelected = false" @focus="inputIsSelected = true"
      >
    </div>
  </div>
</template>

<script>
import m from '../lib/m'
export default {
  mixins: [m],
  props: ["data", "_key", "appearance", "key_index", "disabled"],
  data: () => ({
    inputIsSelected: false,
    selected_opts: [],
    text: undefined,
    currentId: undefined,
    errors: [],
    string_validation: {
      minChar(val, arg, err) {
        if (val.length > arg.minChar) {
          return {
            status: true
          };
        } else {
          err({
            Msg: `Character length is lesser than the defined minimum of ${arg.minChar} characters required`,
            App: "objectfySingle",
            onMethod: "change"
          });
          return {
            status: false,
            msg: `Character length is lesser than the defined minimum of ${arg.minChar} characters required`
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
        if (arg.allowSpecialChars == false) {
          const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
          if (regex.exec(val) != null) {
            err({
              Msg: `Special character(s) not allowed`,
              App: "objectfySingle",
              onMethod: "change",
              err: true
            });
          } else {
            err({
              Msg: `Special character(s) not allowed`,
              App: "objectfySingle",
              onMethod: "change",
              err: false
            });
          }
        }
      },
      allowWhiteSpace(val, arg, err) {
        if (!arg.allowWhiteSpace) {
          if (val && val.indexOf(" ") != -1) {
            err({
              Msg: `White space(s) not allowed`,
              App: "objectfySingle",
              onMethod: "change",
              err: true
            });
          } else {
            err({
              Msg: `White space(s) not allowed`,
              App: "objectfySingle",
              onMethod: "change",
              err: false
            });
          }
        }
      }
    }
  }),
  mounted() {
    this.currentId = this.uid()
    setTimeout(() => {
      // document.getElementById(this.currentId).focus()
    },100)

    if(this.data.value) {
      this.data.value.map(e => {
        if(!this.selected_opts.includes(e)) {
          this.selected_opts.push(e)
        }
      })
    }
    
  },
  watch: {
    errors() {
      this.$parent.errors = this.errors
    },
    text() {
      // white space
      if(this.data.allowWhiteSpace == false) {
        this.string_validation.allowWhiteSpace(this.text,this.data,err => {
            this.$emit("onError", err)
            
            if(this.errors.includes(err.Msg) == false && err.Msg != null && err.err) {
              this.errors.push(err.Msg)
            } else if(err.err == false) {
              if(this.errors.includes(err.Msg)) {
                this.errors.splice(this.errors.indexOf(err.Msg),1)
              }
            }
          })
      }

      // special characters
      if(this.data.allowSpecialChars == false) {
        this.string_validation.allowSpecialChars(this.text,this.data,err => {
            this.$emit("onError", err)

            if(this.errors.includes(err.Msg) == false && err.Msg != null && err.err) {
              this.errors.push(err.Msg)
            } else if(err.err == false) {
              if(this.errors.includes(err.Msg)) {
                this.errors.splice(this.errors.indexOf(err.Msg),1)
              }
            }
          })
      }

      // handle errors
      if(this.errors.length == 2) {
        this.$emit("onChange", {
          err: this.errors.join(' & '),
          value: null,
          key: this._key
        })
      } else if(this.errors.length == 1) {
        this.$emit("onChange", {
          err: this.errors[0],
          value: null,
          key: this._key
        })

        if(this.errors[0].includes('exist')) {
          this.errors = []
          this.$parent.errors = []
        }
      }


    },
    inputIsSelected(n) {
      // console.log(this._key,n)
      this.$parent.isActive = n

      if(!n) {
        if(this.text) {
          if(this.errors.length == 0) {
            this.updateTags()
          }
        }
      }
    },
    selected_opts() {
      if(this.errors.length == 0) {
        this.$emit("onChange", {
          err: null,
          value: this.selected_opts,
          key: this._key
        })
      }
    }
  },
  methods: {
    updateTags() {
      if(!this.selected_opts.includes(this.text) && this.text && this.text.trim() != '') {
        this.selected_opts.push(this.text)
        this.text = undefined
        document.getElementById(this.currentId).focus()

      } else {
        this.errors.push(`"${this.text}" already exist.`)
      }
    },
    onhover(state,index,el_class) {
      this.hovered = state
      switch(el_class) {
          case `${this.currentId}_s_opts`:
              if(state) {
                  document.getElementsByClassName(el_class)[index].style.background = 
                  this.appearance.select_chip_hover_bg_color
                  document.getElementsByClassName(el_class)[index].style.border = 
                  `1px solid ${this.appearance.color}`
              } else {
                  document.getElementsByClassName(el_class)[index].style.background = 
                  this.appearance.select_chip_bg_color
                  document.getElementsByClassName(el_class)[index].style.border = 
                  `1px solid ${this.appearance.select_chip_border_color}`
              }
          break;
          case `${this.currentId}_s_opts_close`:
              if(state) {
                  document.getElementsByClassName(el_class)[index].style.border = 
                  `1px solid ${this.appearance.color}`
              } else {
                  document.getElementsByClassName(el_class)[index].style.border = 
                  `1px solid ${this.appearance.select_chip_border_color}`
              }
          break
      }
    },
    removeSelection(el) {
        const elIndex = this.selected_opts.indexOf(el)
        this.selected_opts.splice(elIndex,1)
        this.hovered = false
        document.getElementById(this.currentId).focus()
    },
    keydown(e) {
      if(e.key == 'Enter') {
        if(this.errors.length == 0) {
          this.updateTags()
        }
      }
    }
  },
  
}
</script>

<style >
.invisible-input:focus, .invisible-input:active {
  outline: none !important;
}
</style>