
## About
- An alert dialog will appear at the bottom of the screen, and will automatically closed after 4 seconds
## Method
- `webpod.dash.bottomAlert(<msg:String>,<buttonText:String>)`
    - Returns an event object, that can be acess using `.on(<event-name>)` method
## Events
- `btn-click`
    - Event is emitted when bottom alert button is clicked
- `close`
    - Event is emitted when the alert is closed
## Sample Code
```js
const msg = 'Hello World'
const buttonText = 'OK'

const alert = webpod.dash.bottomAlert(msg,buttonText)

alert.on('btn-click',function() {
    // do something
})

alert.on('close', function() {
    // do something
})
```