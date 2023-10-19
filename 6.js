// Задача о сортировке объектов: у вас есть массив объектов
// вида { name: 'John', age: 25 }. Напишите код, который
// сортирует этот массив по возрастанию
// возраста, а при равных возрастах сортирует по алфавиту по полю name.

function compare(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }

  // Если равен возраст, сравниваем строки посимвольно
  // По сравнению строк 'A' < 'B' === true
  if (a.age === b.age && a.name < b.name) {
    // Кейс
    // {a.age: 21, a.name: 'A'}
    // {b.age: 21, b.name: 'B'}
    return -1;
  }
  if (a.age === b.age && a.name > b.name) {
    // Кейс
    // {a.age: 21, a.name: 'B'} !
    // {b.age: 21, b.name: 'A'} !
    // Здесь меняем порядок объектов
    return 1;
  }

  // a должно быть равным b по всем значениям свойств
  return 0;
}

function sortNameAge(array) {
  return array.sort(compare);
}

const arr = [
  { name: "John", age: 25 },
  { name: "Mark", age: 25 },
  { name: "Ann", age: 16 },
  { name: "Sam", age: 41 },
  { name: "Mark", age: 15 },
  { name: "Mary", age: 25 },
  { name: "Manny", age: 25 },
  { name: "Amy", age: 25 },
];

console.log(sortNameAge(arr));
// Вывод:
// [
//     { name: 'Mark', age: 15 },
//     { name: 'Ann', age: 16 },
//     { name: 'Amy', age: 25 },
//     { name: 'John', age: 25 },
//     { name: 'Manny', age: 25 },
//     { name: 'Mark', age: 25 },
//     { name: 'Mary', age: 25 },
//     { name: 'Sam', age: 41 }
// ]
