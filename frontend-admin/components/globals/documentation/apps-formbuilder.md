```js
[input label] : { type properties and options }
```
## All types properties
- hoverInfo - String
- value - String
- description - String
- appendBefore - String
- appendAfter - String
- operation - String | 'rw', 'w', 'r'
- hooks - Object of methods
    - method - onMount: fn(fields)
    - method - onInput: fn(fields)
    - method - onError: fn(fields)
    - method - onBlur: fn(fields)
    - method - onUpdate: fn(cb) {
        cb.done()
    }
    ** The fields callback holds methods to manipulate the existing fields ** 

- renderCondition : {
    controllers: ["field key 1", "field key 2"],
    method: function(schema) {
        if(schema[key field].value) {
            // manipulate here
        }
    }
}

## String type properties
- minChar - Boolean
- maxChar - Boolean
- allowSpecialChars - Boolean
- allowWhiteSpace - Boolean
- mode - ?
- useAutoComplete - Boolean
- autocompleteData - Array of Objects
    - {name:String, title:String}


## Number type properties
type: 'number'
- min
- max
- step
- value

## Select type properties
type: 'select'
- options - Array of 'string' - the options
- value - String

## Multiselect type properties
type: 'multiselect'
- options - Array of 'string' - the options
- value - Array of Strings that existed in options array

## Tags type properties
type: 'tags'
- value 0 Array of Strings

## Minmax type properties
type: 'minmax'
options: {
    min: 1,
    max: 15
},
value: {
    min: 1,
    max: 10
},

## Password type properties
```js
type: "string",
mode: 'password',
rules: {
    includeSpecialCharacters: 2,
    includeUpperCaseLetters: 3,
    includeLowerCaseLetters: 3,
    includeNumericCharacters: 2
}
```

## Textarea type properties
type: 'textarea'
value - String
maxlength - Number

## Checkbox type properties
type: 'checkbox'
value - Boolean
content - String

## Text Editor type properties
```js
type: 'text-editor',
value: "function onLoad(input) {\n\twebpod.alert('hello world')\n}\n",
lang: 'javascript', // js phyton scss only
readOnly: false,
playable: true,
hoverInfo: 'test',
height: '200px',
useCmdLine: false,

 hooks: {
    onPlay: stringify(function(n) {
        n.log()
    }),
    onCmd: stringify(function(p) {
          if(p.cmd.split(' ')[0] == 'alert') {
            p.dash.alert(p.cmd.replace('alert',''))
          }
        })
    }
```
