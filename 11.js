const outerFunc = () => {
  let x = 10;
  return function innerFunc() {
    // Внутренняя ф-ция, имеющая доступ к данным во внешней ф-ции
    // Она бы имела доступ к x, даже, если бы он был объявлен
    // Как параметр внешней ф-ции (const outerFunc = (x = 10) => ...)
    return x;
  };
};

const myNewFunc = outerFunc();

myNewFunc(); // 10

// console.log(myNewFunc())
