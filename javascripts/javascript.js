document.addEventListener('mousedown', function () {
  document.body.classList.add('clicked')
})

document.addEventListener('mouseup', function () {
  document.body.classList.remove('clicked')
})
