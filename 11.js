const outerFunc = () => {
  let x = 10;
  return function innerFunc() {
    return x;
  };
};

const myNewFunc = outerFunc();

myNewFunc(); // 10

// console.log(myNewFunc())
