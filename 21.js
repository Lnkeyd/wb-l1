// 21.	Вычислить размер коллстэка в основных браузерах:
// Chrome, Firefox, Opera и Safari (если есть возможность).

// Статья по теме: https://habr.com/ru/articles/550534/
// Размер Call Stack = Размер Execution Stack * Кол-во вызовов ф-ции
// На кол-во вызовов ф-ции обратно влияет кол-во переменных, используемых внутри неё

// кол-во вызовов без объявления переменных внутри ф-ции
let i = 0;

// кол-во вызовов c объявлением 1 переменной внутри ф-ции
let k = 0;

// Бесконечная рекурсивная функция без переменных
const func = () => {
  i++;
  func();
};

// Бесконечная рекурсивная функция с 1 переменной
const funcWithValue = () => {
  let a = i + 1;
  k++;
  funcWithValue();
};

try {
  func();
} catch (e) {
  console.log(i);
}

try {
  funcWithValue();
} catch (e) {
  console.log(k);
}

// Размер стека вызовов
const executonStack = (1 * 8 * k) / (i - k);

// Размер коллстека
const callStack = i * executonStack;

console.log(executonStack);
console.log(callStack);

// CALLSTACK_SIZE

// Chrome ~ 1001784 bytes
// Firefox ~ 1010384 bytes
// Opera ~ 1002088 bytes

// Везде примерно 1 Мбайт