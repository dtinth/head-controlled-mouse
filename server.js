var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const robotjs = require('robotjs')
server.listen(8008, err => {
  if (err) throw err
  console.log('Now listening on', server.address())
})

app.use(require('express').static('static'))

const d2r = d => (d / 180) * Math.PI
const toScreen = (v, size) =>
  Math.round(Math.min(1, Math.max(0, v * 0.5 + 0.5)) * size)

io.on('connection', function(socket) {
  socket.on('sensor', function(data) {
    const { alpha, beta, gamma } = data
    const x = toScreen(-Math.sin(d2r(alpha)) * 4, 1280)
    const y = toScreen(-Math.sin(d2r(beta)) * 7, 720)
    robotjs.moveMouse(x, y)
  })
})
