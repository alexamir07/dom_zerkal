// Получаем все элементы
const draggableElems = document.querySelectorAll('.draggable-elem')
let correctCount = 0 // Счетчик правильных элементов
const totalElements = draggableElems.length // Общее количество элементов

// Функция для инициализации элемента
const initDraggable = (elem) => {
  let initialX = 0,
    initialY = 0
  let moveElement = false
  let isFixed = false // Флаг, чтобы блокировать перемещение

  // Объект событий
  const events = {
    mouse: { down: 'mousedown', move: 'mousemove', up: 'mouseup' },
    touch: { down: 'touchstart', move: 'touchmove', up: 'touchend' }
  }

  // Сохраняем целевые координаты из data-атрибутов
  const targetTop = parseInt(elem.dataset.targetTop)
  const targetLeft = parseInt(elem.dataset.targetLeft)

  let deviceType = ''
  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent')
      deviceType = 'touch'
      return true
    } catch (e) {
      deviceType = 'mouse'
      return false
    }
  }
  isTouchDevice()

  // Функция для изменения курсора
  const setCursor = (cursor) => {
    elem.style.cursor = cursor
  }

  // Функция для фиксации элемента
  const fixElement = () => {
    elem.style.top = targetTop + 'px'
    elem.style.left = targetLeft + 'px'
    elem.classList.add('fixed')
    isFixed = true

    correctCount++ // Увеличиваем счетчик
    if (correctCount === totalElements) {
      // Если все элементы на месте
      const container = document.querySelector('.puzzle-frame-container')

      // 1. Плавно скрываем контейнер (opacity: 0)
      container.style.opacity = '0'

      // 2. Через время анимации (500ms) удаляем старые элементы и добавляем новый
      setTimeout(() => {
        // Удаляем все дочерние элементы
        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }

        // Создаем финальную картинку
        const finalImg = document.createElement('img')
        finalImg.src = './images/sobrano.svg'
        finalImg.className = 'final-image'
        container.appendChild(finalImg)

        // Возвращаем opacity для финальной картинки
        container.style.opacity = '1'
      }, 200) // 500ms = 0.5s (соответствует времени transition)
    }
  }

  // Функция проверки позиции
  const checkPosition = () => {
    const currentTop = parseInt(elem.style.top) || 0
    const currentLeft = parseInt(elem.style.left) || 0
    const tolerance = 100 // допуск в пикселях

    // Проверяем, находится ли элемент в допустимой зоне
    const isCorrect =
      Math.abs(currentTop - targetTop) <= tolerance &&
      Math.abs(currentLeft - targetLeft) <= tolerance

    elem.classList.toggle('correct', isCorrect)
    return isCorrect
  }

  // Обработчик начала перетаскивания
  const handleStart = (e) => {
    e.preventDefault()
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY
    moveElement = true
    setCursor('url(./images/kursor3.svg) 0 0, auto')
  }

  // Обработчик перемещения
  const handleMove = (e) => {
    if (moveElement && !isFixed) {
      // Добавлено условие isFixed
      e.preventDefault()
      let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX
      let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY
      elem.style.top = elem.offsetTop - (initialY - newY) + 'px'
      elem.style.left = elem.offsetLeft - (initialX - newX) + 'px'
      elem.style.zIndex = '10' // Поднимаю пазл над другими
      initialX = newX
      initialY = newY
    }
  }

  // Обработчик окончания перетаскивания
  const handleEnd = () => {
    moveElement = false
    setCursor('')
    elem.style.zIndex = '1' // Возвращаю на прошлый уровень

    // Проверка текущего элемента
    const isCorrect = checkPosition()
    if (isCorrect && !isFixed) {
      fixElement()
    }
  }

  // Привязываем события к элементу
  elem.addEventListener(events[deviceType].down, handleStart)
  elem.addEventListener(events[deviceType].move, handleMove)
  elem.addEventListener(events[deviceType].up, handleEnd)
  elem.addEventListener('mouseleave', handleEnd)
}

// Инициализируем все элементы
draggableElems.forEach((elem) => initDraggable(elem))
