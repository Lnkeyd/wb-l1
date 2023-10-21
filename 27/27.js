// 27.	Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию
//  для элемента на веб-странице, например, плавное изменение его положения или размера.

// Бесконечно двигаем элемент влево-вправо
const moveEl = (element, xpos = 0, forward = true) => {
    console.log(xpos)
    if ((xpos < 500 && forward === true) || (xpos < 0 && forward === false)) {
        xpos+=4
        element.style.transform = `translateX(${xpos}px)`
        requestAnimationFrame(() => moveEl(element, xpos, true))
    } else if ((xpos >= 500 && forward === true) || (xpos < 500 && forward === false)) {
        xpos-=4
        element.style.transform = `translateX(${xpos}px)`
        requestAnimationFrame(() => moveEl(element, xpos, false))
    }
}

// moveEl(document.querySelector('.one'))