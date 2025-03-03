document.addEventListener('DOMContentLoaded', () => {
  // cursor();
  document.addEventListener('mousemove', moveEyes)
  setupModals()
  setupBackgroundSwitcher() // Вызов новой функции
  clickFrames()
  handDrag()
  setupHandModal()
})

// анимация глаз
function moveEyes(e) {
  const eyes = document.querySelectorAll('.eye')
  eyes.forEach((eye) => {
    const pupil = eye.querySelector('.pupil')
    const eyeRect = eye.getBoundingClientRect()

    // Центр глаза
    const eyeX = eyeRect.left + eyeRect.width / 2
    const eyeY = eyeRect.top + eyeRect.height / 2

    // Позиция курсора
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Разница между курсором и центром глаза
    const deltaX = mouseX - eyeX
    const deltaY = mouseY - eyeY

    // Угол направления
    const angle = Math.atan2(deltaY, deltaX)

    // Максимальное смещение зрачка
    const maxDistance = Math.min(
      eyeRect.width / 3 - pupil.offsetWidth,
      eyeRect.height / 3 - pupil.offsetHeight
    )

    // Новые координаты
    const pupilX = Math.cos(angle) * maxDistance
    const pupilY = Math.sin(angle) * maxDistance

    // Применяем трансформацию
    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
  })
}

// курсор
// function cursor() {
//   document.addEventListener('mousedown', function () {
//     document.body.classList.add('clicked')
//   })

//   document.addEventListener('mouseup', function () {
//     document.body.classList.remove('clicked')
//   })
// }

// Функция для работы модальных окон
function setupModals() {
  const questionIcons = document.querySelectorAll('.question-icon')
  const modals = document.querySelectorAll('.modal')

  questionIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation()
      const modalId = icon.getAttribute('data-modal')
      document.getElementById(modalId).style.display = 'flex'
    })
  })

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('modal') ||
        event.target.classList.contains('close')
      ) {
        modal.style.display = 'none'
      }
    })
  })
}

// Переключение фона по клику
function setupBackgroundSwitcher() {
  const firstBackground = document.querySelector('.first-background')
  const backgrounds = [
    'url(images/fon1block1.svg)',
    'url(images/fon2block1.svg)',
    'url(images/fon3block1.svg)'
  ]

  let currentBackgroundIndex = 0

  firstBackground.addEventListener('click', () => {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length
    firstBackground.style.backgroundImage = backgrounds[currentBackgroundIndex]
  })
}

function clickFrames() {
  const paintings = document.querySelectorAll(
    '.painting-1, .painting-2, .painting-3'
  )

  const images = {
    'painting-1': ['zerkalo1f1.svg', 'zerkalo1f2.svg', 'zerkalo1f3.svg'],
    'painting-2': ['zerkalo2f1.svg', 'zerkalo2f2.svg', 'zerkalo2f3.svg'],
    'painting-3': ['zerkalo3f1.svg', 'zerkalo3f2.svg', 'zerkalo3f3.svg']
  }

  const clickCounts = {
    'painting-1': 0,
    'painting-2': 0,
    'painting-3': 0
  }

  paintings.forEach((painting) => {
    painting.addEventListener('click', () => {
      const paintingClass = painting.classList[0] // например, "painting-1"
      if (clickCounts[paintingClass] >= 2) return // больше 2 раз нельзя

      painting.classList.add('shake') // запускаем тряску

      setTimeout(() => {
        painting.classList.remove('shake') // убираем класс после анимации

        clickCounts[paintingClass]++

        const newImage = `url(images/${
          images[paintingClass][clickCounts[paintingClass]]
        })`
        painting.style.backgroundImage = newImage
      }, 400) // длительность совпадает с CSS-анимацией
    })
  })
}

function handDrag() {
  const leftHand = document.querySelector('.left-hand')

  let offsetX = 0
  let isDragging = false

  leftHand.addEventListener('mousedown', (e) => {
    isDragging = true
    offsetX = e.clientX - leftHand.getBoundingClientRect().left

    leftHand.classList.add('dragging')
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return

    const containerWidth =
      document.querySelector('.third-background').offsetWidth

    let newLeft = e.clientX - offsetX

    // Ограничения, чтобы рука не выходила за пределы экрана
    if (newLeft < -1000) newLeft = -1000
    if (newLeft + leftHand.offsetWidth > containerWidth / 1.5) {
      newLeft = containerWidth / 1.5 - leftHand.offsetWidth
    }

    leftHand.style.position = 'absolute'
    leftHand.style.left = `${newLeft}px`
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
    leftHand.classList.remove('dragging')
  })
}
function setupHandModal() {
  const handButton = document.querySelector('.hand-button')
  const handModal = document.getElementById('hand-modal')

  handButton.addEventListener('click', () => {
    handModal.style.display = 'flex'
  })

  handModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      handModal.style.display = 'none'
    }
  })
}
