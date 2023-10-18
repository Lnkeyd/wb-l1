// Задача о замыканиях: напишите функцию, которая будет принимать массив функций
//  и возвращать новую функцию, которая вызывает каждую функцию в этом
// массиве и возвращает массив результатов, полученных после вызова каждой функции.

function allCalls(funcs) {
  return function innerCalls() {
    const arr = [];

    funcs.map((item) => arr.push(item(...arguments)));

    return arr;
  };
}

// const myCalls = allCalls([
//     (x = 3) => x++,
//     () => 2,
//     (x = 2, y = 1, z = 5) => x + y + z
// ])

// console.log(myCalls()) // [3, 2, 8]
