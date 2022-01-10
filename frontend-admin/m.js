import gsap from "gsap";
import { io } from "socket.io-client"; 
export default {
    data: () => ({
      loaded: [],
      ready: false,
      isauth: false,
      socket: undefined,
      mode: undefined,
      authorization: undefined,
      use_socket: false
    }),
    mounted() {
      // every axios request requires authorization headers
      this.authorization = {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      }

      this.isauth = this.$store.state.isauth
      if(this.use_socket) {
        // wrap in if statment because this file is used in multiple vue components
        // only components that will use the socket will activates the socket connection
        this.socket = io()
      }
    },
    methods: {
      signout() {
        console.log('signing out')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        location.reload()
      },
      socketVerify(cb) {
        const token = localStorage.getItem('token')
        this.socket.emit('verify_token', token)
        this.socket.on('verify_token_response',(resp) => {
          if(resp === 'unauthorized') {
            cb('unauthorized',undefined)
          } else {
            cb(undefined,true)
          }
        })
      },
      axiosVerify(cb) {
        const token = localStorage.getItem('token')
        console.log('axios verify')
        this.$axios.get('/auth/verify', {
          headers: {
            authorization: token
          }
        }).then(res => {
          cb(undefined,res)
        }).catch(e => {
          cb(e,undefined)
        })
      },
      onView(id) {
        if (!this.loaded.includes(id)) {
          this.loaded.push(id);
          const el = document.getElementById(id);
          gsap.fromTo(
            el,
            0.7,
            { opacity: 0, marginTop: "50px", ease: "power3.inOut" },
            { opacity: 1, marginTop: "0px", ease: "power3.inOut" }
          );
        }
      },
      uid() {
          function makeid(length) {
            var result           = [];
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result.push(characters.charAt(Math.floor(Math.random() * 
          charactersLength)));
            }
            return result.join('');
          }
          return makeid(10)
      },
      scrollParentToChild(parent, child) {
        // Where is the parent on page
        var parentRect = parent.getBoundingClientRect();
        // What can you see?
        var parentViewableArea = {
            height: parent.clientHeight,
            width: parent.clientWidth
        };

        // Where is the child
        var childRect = child.getBoundingClientRect();
        // Is the child viewable?
        var isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);

        // if you can't see the child try to scroll parent
        if (!isViewable) {
                // Should we scroll using top or bottom? Find the smaller ABS adjustment
                const scrollTop = childRect.top - parentRect.top;
                const scrollBot = childRect.bottom - parentRect.bottom;
                if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
                    // we're near the top of the list
                    parent.scrollTop += scrollTop;
                } else {
                    // we're near the bottom of the list
                    parent.scrollTop += scrollBot;
                }
        }

      }
    }
}