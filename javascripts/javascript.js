document.addEventListener('DOMContentLoaded', () => {
  mouseMoveEyes()
})

function mouseMoveEyes() {
  let moveArea = document.querySelector('.move-area')

  moveArea.addEventListener('mousemove', () => {
    let eyes = document.querySelectorAll('.eye')

    eyes.forEach((eye) => {
      let x = eye.offsetLeft + eye.offsetWidth / 2
      let y = eye.offsetTop + eye.offsetHeight / 2
      let rad = Math.atan2(event.pageX - x, event.pageY - y)
      let rot = rad * (180 / Math.PI) * -1

      eye.slyle = `transform: rotate(${rot}deg);`
    })
  })
}
