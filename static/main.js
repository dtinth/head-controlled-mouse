var socket = io.connect()
let alpha, beta, gamma
let alpha0, beta0, gamma0
function setStatus(text) {
  document.querySelector('#status').textContent = String(text)
}
function calibrate() {
  setStatus('Gonna calibrate in 5 seconds')
  setTimeout(() => {
    alpha0 = alpha
    beta0 = beta
    gamma0 = gamma
    setStatus(`Calibrated:
alpha=${alpha}
beta=${beta}
gamma=${gamma}`)
  }, 5000)
}
window.addEventListener('deviceorientation', function(event) {
  ;({ alpha, beta, gamma } = event)
  socket.emit('sensor', {
    alpha: alpha - alpha0,
    beta: beta - beta0,
    gamma: gamma - gamma0
  })
})
