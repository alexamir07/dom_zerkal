document.addEventListener('DOMContentLoaded', () => {
  mouseMoveEyes()
  cursor()
})

// анимация глаз
function mouseMoveEyes() {
  // let moveArea = document.querySelector('.move-area')

  document.addEventListener('mousemove', (event) => {
    let eyes = document.querySelectorAll('.eye')

    eyes.forEach((eye) => {
      let x = eye.offsetLeft + eye.offsetWidth / 2
      let y = eye.offsetTop + eye.offsetHeight / 2
      let rad = Math.atan2(event.pageX - x, event.pageY - y)
      let rot = rad * (180 / Math.PI) * -1

      eye.style = `transform: rotate(${rot}deg);`
    })
  })
}

// курсор
function cursor() {
  document.addEventListener('mousedown', function () {
    document.body.classList.add('clicked')
  })

  document.addEventListener('mouseup', function () {
    document.body.classList.remove('clicked')
  })
}
