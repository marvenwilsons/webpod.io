import util from '@/utils'
export default {
  watch: {
    textfield_is_active(newState,oldState) {
      // validate on blur
      if(oldState == true && newState == false) {
        if(this.data.mode == 'password') {
          this.validate()
          const el = document.getElementById(this.currentId+'p')

          if(el) {
            if(this.$parent.errors.length != 0) {
              el.disabled = true
            } else {
              el.disabled = false
            }
          }
        }
      }
    }
  },
  methods: {
    validate() {
      const {includeLowerCaseLetters, includeNumericCharacters, includeSpecialCharacters, includeUpperCaseLetters} = this.data.rules
      const {strCount, isUndef} = util.stringValidator

      const str = this.text_input_model
      if(isUndef(str) == false) {
        const {number, lowerCase, upperCase, specialChars} = strCount(str)

        this.$parent.errors = []

        if(lowerCase < includeLowerCaseLetters) {
          this.$parent.pushError(`password must contain at least ${includeLowerCaseLetters} lowercase characters`)
        }

        if(upperCase < includeUpperCaseLetters) {
          this.$parent.pushError(`password must contain at least ${includeUpperCaseLetters} uppercase characters`)
        }

        if(specialChars < includeSpecialCharacters) {
          this.$parent.pushError(`password must contain at least ${includeSpecialCharacters} special characters`)
        }

        if(number < includeNumericCharacters) {
          this.$parent.pushError(`password must contain at least ${includeNumericCharacters} numeric characters`)
        }
      }
    }
  }
}