<template>
  <div
    id="fb-input-wrapper"
    v-if="ready"
    :style="{ background: showUpdateControls ? '#eceff1' : 'none' }"
    :class="[
      'fullwidth pad050 borderRad4',
      showUpdateControls ? 'paneBorder bg-update borderRad4' : '',
    ]"
  >
    <!-- key -->
    <div class="marginbottom050 marginleft025">
      <strong>
        {{ inputKey }}
      </strong>
    </div>
    <!-- input -->
    <div class="flex spacebetween fullwidth flex">
      <div class="flex fullwidth">
        <!-- Input -->
        <div class="flex flexcol fullwidth">
          <div
            :class="[
              'fullwidth flex relative borderRad4 relative',
              errors.length != 0 ? 'borderRad4 overflowhidden' : '',
              operation == 'w' ? 'paneBorder' : '',
              isActive ? 'paneShadow' : '',
            ]"
            :style="{ background: 'white' }"
          >
            <div
              v-if="loading || xloading"
              style="z-index: 999; background: #f5f7fabe; cursor: not-allowed"
              class="absolute fullwidth fullheight-percent"
            ></div>
            <div
              :style="{ border: inputBorderColor }"
              class="fullwidth borderRad4"
            >
              <!-- input mode -->
              <v-expand-transition>
                <slot
                  v-if="showInput"
                  :onInput="onInput"
                  :allowMutationOnInput="allowMutationOnInput"
                ></slot>
              </v-expand-transition>
              <!-- read mode -->
              <div
                @click="updateMode(true)"
                v-if="!showInput"
                id="input-read-mode"
                class="pad050 pointer text-regular"
              >
                <div style="max-height: 100px;" v-if="typeof getLatestDataValue == 'string' && !data.mode">
                  <div v-if="data.type == 'text-editor'" >Open Code Editor</div>
                  <div v-if="data.type != 'text-editor'" >
                    {{ getLatestDataValue }}
                  </div>
                </div>
                <div
                  v-if="typeof getLatestDataValue == 'number' && data.type == 'number'"
                >
                  {{ getLatestDataValue}}
                </div>
                <div v-if="data.type == 'select' || data.type == 'multiselect'">
                  {{ data.options[getLatestDataValue] }}
                </div>
                <div v-if="data.type == 'checkbox'">
                  {{ getLatestDataValue ? "Confirmed" : "Not Confirmed" }}
                </div>
                <div v-if="data.type == 'string' && data.mode == 'password' && getLatestDataValue">
                  ********
                </div>
                <div v-if="data.type == 'minmax'">
                  <div class="flex flexcenter flexstart" v-for="(minmaxVal, key) in getLatestDataValue" :key="uid(minmaxVal)">
                    <span class="text-secondary text-small flex1">
                      {{ key }}
                    </span>
                    <span class="flex9">{{ minmaxVal }}</span>
                  </div>
                </div>
                <div v-if="Array.isArray(getLatestDataValue)">
                  <v-chip
                    class="marginright025"
                    v-for="item in getLatestDataValue"
                    :key="uid() + item"
                    >{{ item }}</v-chip
                  >
                </div>
                <div v-if="getLatestDataValue == undefined">Not Available</div>
              </div>
              <!-- end of read mode -->
            </div>
            <div
              id="edit-trigger"
              @click="updateMode(true)"
              v-if="operation == 'rw'"
              class="marginleft050 pointer clickable-span flex flexcenter"
            >
              <svg
                id="pencil-filled"
                style="width: 24px; height: 24px; display: none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                />
              </svg>
              <svg
                id="pencil-unfilled"
                style="width: 24px; height: 24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- input state indicators -->
        <div
          v-if="operation == 'w'"
          :class="['flex flex1  flexend flexcol', updating ? '' : '']"
          :style="{ minHeight: '100%', width: showCheck ? '50px' : '' }"
        >
          <!-- loading -->
          <!-- check mark showCheck-->
          <div
            v-if="showCheck || loading || xloading"
            class="margin025 fullheight-percent flexcenter flex"
          >
            <div class="flex fullwidth">
                <!-- <loading class="" v-if="loading || xloading" /> -->
                <checkAnimation v-if="showCheck" :check="showCheck" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Description text -->
    <div v-if="data.headDescription && showUpdateControls" class="padleft025">
      <span class="text-small">
        {{ data.headDescription }}
      </span>
    </div>
    <!-- desc -->
    <div v-if="data && description && operation == 'w'" class="pad025 flex">
      <div class="padtop025 padright050">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="#4a4f55"
            d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z"
          />
        </svg>
      </div>
      <!-- desc rendering -->
      <div style="max-width: 382px" class="padtop025">
        <!-- if data.description is a string -->
        <div
          :id="`${currentId}_${inputKey}`"
          class="text-secondary text-small"
          v-if="typeof description == 'string'"
        >
          {{ description }}
        </div>
        <!-- if data.description is an object -->
        <div v-if="typeof description == 'object'">
          <!-- if data.descrtion is an array -->
          <div v-if="Array.isArray(description)">
            <div
              class="flex flexcenter flexstart"
              v-for="descItem in description"
              :key="uid(descItem)"
            >
              <svg
                class=""
                style="width: 24px; height: 24px"
                viewBox="0 0 24 24"
              >
                <path fill="#4a4f55 " d="M10,14V10H14V14H10Z" />
              </svg>
              <span class="text-secondary text-small">
                {{ descItem }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- err 2 -->
    <div
      v-if="errors.length != 0"
      class="pad050 flex borderRad4 margintop050"
      style="background: #ffebee; border: 1px solid #ef9a9a"
    >
      <!-- <div class="padtop025 padright050">
        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path fill="#C62828" d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
        </svg>
      </div> -->
      <div style="max-width: 382px" class="flex flexcol">
        <!-- <span style="color: #c62828"> <strong>Error</strong> </span> -->
        <div
          class="flex margintop025"
          v-for="errmsg in errors"
          :key="uid(errmsg)"
        >
          <svg style="min-width: 24px; height: 24px" viewBox="0 0 24 24">
            <path fill="#C62828" d="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z" />
          </svg>
          <div v-html="errmsg" style="color: #c62828"></div>
        </div>
      </div>
    </div>
    <!-- Update Trigger -->
    <div
      v-if="showUpdateControls"
      class="flex flexend pointer padtop025 margintop125"
    >
      <!-- <div class="flex flexcol" >
        <div>showCheck:{{showCheck}}</div>
        <div>updateOnProgress:{{updateOnProgress}}</div>
        <div>showUpdateBtn:{{showUpdateBtn}}</div>
      </div> -->
      <!-- To cancel or close the update mode -->
      <v-btn
        elevation="1"
        outlined
        :disabled="updateOnProgress != false"
        class=" marginright050 primary--text"
        fab small
        @click="cancel"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <!-- Begin update process -->
      <v-btn
        outlined
        elevation="1"
        :disabled="showCheck || updateOnProgress || !showUpdateBtn"
        :loading="updateOnProgress"
        class=" marginright050 primary--text"
        fab small
        @click="update"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <!-- Cacel Trigger -->
    <div class="flex flexend pointer padtop025">
      <span
        v-if="showCancelUpdateDueServerError"
        @click="cancelUpdateDueServerError"
        class="clickable-span flat_action"
      >
        <strong>Close</strong>
      </span>
    </div>
  </div>
</template>

<script>
import m from "./lib/m";
import updateMixin from "./lib/mixins/input-wrapper/update-mixin";
import checkAnimation from "./check-ani.vue";
export default {
  mixins: [m, updateMixin],
  components: { checkAnimation },
  props: [
    "data",
    "inputKey",
    "loading",
    "formData",
  ],
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
    isUpdateAllowed: false,
    $value: undefined
  }),
  computed: {
    inputBorderColor() {
      return this.errors.length != 0
        ? `1px solid #C62828`
        : `${this.isActive ? "2px" : "1px"} solid ${
            this.isActive ? "#1a76d2" : "#ECEFF1"
          }`;
    },
    getLatestDataValue() {
      return this.data.value
    },
    formatedReadModeData() {
      if (this.data.value) {
        if (typeof this.data.value === "string") {
          return this.data.value;
        } else if (Array.isArray(typeof this.data.value)) {
          return this.data.value.join;
        }
      } else {
        return "Not Available";
      }
    },
  },
  watch: {
    // 'data.value'(e) {
    //   console.log('changed!',e)
    // },
    errors() {
      /** Execute the onError hook function from the input object data property */
      if (this.currentHooks.includes("onError") && this.errors.length != 0) {
        this.data.hooks.onError(this.errors);
        this.setLoading(false);
        this.setCheck(false);

        if (this.updateOnProgress) {
          this.showCancelUpdateDueServerError = true;
        }
      }
    },
    showUpdateControls() {
      if (this.showUpdateControls == false) {
        this.isUpdateAllowed = false;
      }
    },
  },
  methods: {
    onInput(input) {
      if(this.data.value.trim() == input.value.trim()) {
        this.showUpdateBtn = false
      }
      /** executes the onInput hook function from the input object data property,
      this method runs every time an input is changed */
      if (
        this.data.value !=
        input.value /** it means the user changed the input value */
      ) {
        this.isUpdateAllowed = true;
        this.showCheck = false;

        this.inputObject = input;

        if (input.autoCompleteHooks != undefined) {
          this.hookMethods.autocomplete = input.autoCompleteHooks;
        }

        const executeHookFunction = () => {
          if (this.currentHooks.includes("onInput")) {
            this.data.hooks.onInput({
              value: input.data,
              ...this.hookMethods,
            });
          }
        };

        executeHookFunction();

        this.$value = input
      }
    },
    pushError(err) {
      /** Push new string to the errors array */
      if (Array.isArray(err)) {
        this.errors = err;
      } else if (typeof err == "string") {
        if (this.errors.includes(err) == false) {
          this.errors.push(err);
        }
      }

      this.showCheck = false;
    },
    setError(err) {
      /** empties the errors array then push a new string to the errors array */
      if (typeof err == "string") {
        this.errors = [];
        this.errors.push(err);
      }

      this.showCheck = false;
    },
    setDescription(desc) {
      this.description = desc;
    },
    setDescriptionHtml(html) {
      setTimeout(() => {
        document.getElementById(
          `${this.currentId}_${this.inputKey}`
        ).innerHTML = html;
      }, 100);
    },
    setLoading(e) {
      if (typeof e == "boolean") {
        this.xloading = e;
        this.showCheck = !e;
      }
    },
    setCheck(e) {
      this.showCheck = e;
    },
  },
  mounted() {
    // set id
    this.currentId = this.uid();
    // set defaults
    // if (this.data && this.data.description != undefined) {
    //   this.description = this.data.description;
    // }
    // save hook methods
    this.hookMethods = {
      setDescription: this.setDescription,
      setDescriptionHtml: this.setDescriptionHtml,
      loading: this.setLoading,
      formData: this.data,
      check: this.setCheck,
      error: {
        push: this.pushError,
        set: this.setError,
      },
    };
  },

  /**
   * what is allowMutationOnInput do?
   * - this property is only used for 'rw' operation
   * - in 'rw' operation the user has the ability to cancel the update by pressing the close button
   * - when the user cancel's the update, the input that the user writes should be discarded and should not affect the initial value of the input
   * - allowMutationOnInput protects the initial input from being mutated by a discarded input data
   * 
   * when does allowMutationOnInput mutates the input data?
   * - when the user presses the save button 
   * - it means the user is ready to replace the old data with the new data
   */
};
</script>

<style>
.clickable-span {
  color: #1e88e5;
}
.bg-update,
#input-read-mode:hover {
  background: #eceff1;
  transition: 0.3ms;
}
#edit-trigger:hover > #pencil-unfilled {
  display: none;
}
#edit-trigger:hover > #pencil-filled {
  display: block !important;
}
#fb-input-wrapper {
  transition: 0.3ms !important;
}
</style>
