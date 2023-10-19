const objToList = (jsonArr) => {
  const arr = JSON.parse(jsonArr);
  if (!arr.length) return;

  // Последний элемент списка имеет св-во next со значением null
  // Таким образом он не указывает ни на какой след. элемент
  // И является концом списка
  let res = Object.assign({next: null}, arr[arr.length - 1]);

  // Начинаем со второго с конца элемента, первый мы уже определили выше
  for (let i = arr.length - 2; i >= 0; i--) {
    console.log(arr[i])
    // Второй элемент таким образом указывает на начальный (т.е. последний в массиве jsonArr),
    // Третий с конца будет указывать на второй с конца
    // Т.о. Левый элемент будет указывать на правый и содержать нужные св-ва
    const newObj = Object.assign({next: res}, arr[i]);
    res = newObj;
  }

  return res;
};

// Проверка:
// const array = [
//   {
//     name: "Ivan",
//     year: "1245",
//   },
//   {
//     id: 431412,
//     city: 'Miami'
//   },
//   {
//     status: 'free',
//     likes: ['music', 'food', 'travel']
//   }
// ];

// const jsonArr = JSON.stringify(array)
// console.log(objToList(jsonArr))