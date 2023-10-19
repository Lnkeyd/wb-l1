const objToList = (jsonArr) => {
  const arr = JSON.parse(jsonArr);
  if (!arr.length) return;

  let res = Object.assign({next: null}, arr[arr.length - 1]);

  for (let i = arr.length - 2; i >= 0; i--) {
    console.log(arr[i])
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