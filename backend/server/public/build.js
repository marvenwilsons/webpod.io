const html_builder = (object_html) => {
  const head_contents = () => {
    return object_html.head.meta.map(meta => {
      const x = []
      Object.keys(meta).map(e => {
        x.push(`${e}="${meta[e]}"`)
      })
      const m = `<meta ${x.join(' ')} ></meta> \n    `
      return m
    })
  }

  // console.log(head_contents().join(' '))
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    ${head_contents().join('')}
  </head>
  <body>
    <h1> this is about</h1>
  </body>
  </html>`
}

const p =  {
  head: {
    meta:[
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  liks: [],
  scripts: []
}

console.log(html_builder(p))
// html_builder(p)