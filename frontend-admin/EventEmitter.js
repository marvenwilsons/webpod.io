export default function () {
  let registeredEvents = {}
  let registeredEventListeners = {}
  return {
    emit: function (...args) {

      let argsArray = []

      for(let i = 0; i < ([...args]).length; i++ ) {
        if(i != 0) {
          // 
          argsArray.push(args[i])
        }
      }

      if(registeredEventListeners[args[0]] != undefined) {
        // if requested emit event exist  in the registered listeners object execute it
        registeredEventListeners[args[0]].apply(null,argsArray)
      } else {
        // if the requested emit event does not exist then register to registeredEvents
        // will be executed later

        registeredEvents[args[0]] = argsArray
      }
    },
    on: function (eventName, cb) {

      if(registeredEvents[eventName] != undefined) {
        // case when .emit is called first before .on
        if(typeof cb === 'function') {
          cb.apply(null,registeredEvents[eventName])
          
        } else {
          console.error(`Error at .on("${eventName}") EventEmitter's Callback should be a function but got a type of ${typeof cb} instead`)
        }
      } else {
        // case when .on is called first then .emit
        // save the callback then execute later on .emit
        if(registeredEventListeners[eventName] == undefined) {
          if(typeof cb === 'function') {
            registeredEventListeners[eventName] = cb
          } else {
            console.error(`Error at .on("${eventName}") EventEmitter's Callback should be a function but got a type of ${typeof cb} instead`)
          }
        } 
      }
    }
  }
}

// register first
// then exute by emit