import DOMPurify from 'dompurify';
export default {
  methods: {
    clean(dirty) {
      return DOMPurify.sanitize(dirty)
    },
    uid() {
        function makeid(length) {
          var result           = [];
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789QWErtYUIKJhgfdERTYUJNbvCDWERTYUIknbvcddRTYHGFDRYRUGf43567898765463456';
          var charactersLength = characters.length;
          for ( var i = 0; i < length; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
          }
          return result.join('');
        }
        return makeid(10)
    },
    activateInputHooks(value,hookName,payload) {
      if(this.data.hooks != undefined) {
        if(this.data.hooks[hookName] != undefined) {
          const hookMethods = {
            setDescription: this.$parent.setDescription,
            setDescriptionHtml: this.$parent.setDescriptionHtml,
            loading: this.$parent.setLoading,
            formData: this.$parent.formData,
            check: this.$parent.setCheck,
            value,
            error: {
              push: this.$parent.pushError,
              set: this.$parent.setError
            },
          }

          if(payload) {
            hookMethods[payload.key] = payload.value
          }

          this.data.hooks[hookName](hookMethods)
        }
      }
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
    } 
  }
}