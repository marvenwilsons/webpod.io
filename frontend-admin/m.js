import gsap from "gsap";
import { io } from "socket.io-client"; 
export default {
    data: () => ({
      loaded: [],
      ready: false,
      isauth: false,
      socket: undefined,
      mode: undefined,
      authorization: undefined
    }),
    mounted() {
      // every axios request requires authorization headers
      this.authorization = {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      }

      this.isauth = this.$store.state.isauth
      this.socket = io()
      console.log('socket', this.socket)

      setTimeout(() => {
        console.log('sending test')
        this.socket.emit('req', {
          name: 'test',
          payload: 'hellworld'
        })
        this.socket.on('notification', ({method_name, payload}) => {
          console.log('method name', method_name)
          console.log('payload', payload)
        })
      }, 1000)

      

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
      }
    }
}