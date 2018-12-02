const express = require('express')
const Kuroshiro = require("kuroshiro")

const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji")
const kuroshiro = new Kuroshiro()

const app = express()
const port = 3000

async function init() {
  await kuroshiro.init(new KuromojiAnalyzer())
  app.get('/:text', handleRequest)
  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

async function handleRequest(request, response) {
  let text = request.params.text
  let method = request.query.method || 'hiragana'
  const result = await kuroshiro.convert(text, {
    to: method,
    mode: 'spaced',
    romajiSystem: 'hepburn'
  })
  response.send(JSON.stringify({
    result: result
  }))
}

init()
