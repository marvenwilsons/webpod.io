export default function () {
  let registeredEvents = {}
  let registeredEventListeners = {}
  return {
    emit: function (...args) {
      // get the arguments passed from the .emit parameter
      let argsArray = []
      for(let i = 0; i < ([...args]).length; i++ ) {
        if(i != 0) {
          // 
          argsArray.push(args[i])
        }
      }

      try {
        registeredEvents[args[0]].callbacks.map(ev_fns => {
          ev_fns.apply(null, argsArray)
        })
      } catch(err) {}

    },
    on: function (eventName, cb) {
      console.log('.on', eventName)

      if(registeredEvents[eventName] != undefined) {
        // push the new callback into its callbacks array
        registeredEvents[eventName].callbacks.push(cb)
      } else {
        registeredEvents[eventName] = {
          callbacks: [cb],
        }
      }
      // end
    }
  }
}

// register first
// then exute by emit