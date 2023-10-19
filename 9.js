// 9.	Реализовать функцию конвертации JSON в строку

const myJSONStringify = (jsonObj) => {
  // Проверка на примитивы
  if (typeof jsonObj === "string") {
    return `${jsonObj}`;
  } else if (
    typeof jsonObj === "number" ||
    typeof jsonObj === "boolean" ||
    !jsonObj
  ) {
    // Кастим к строке
    return String(jsonObj);
  } else if (Array.isArray(jsonObj)) {
    // Применяем рекурсивно ф-цию к каждому элементу (вдруг внутри ещё один массив или объект)
    // И пушим результат в newArr
    const newArr = [];
    for (item of jsonObj) {
      newArr.push(myJSONStringify(item));
    }
    // Объединяем элементы newArr, делая из массива строку
    return `[${newArr.join(", ")}]`;
  } else if (typeof jsonObj === "object") {
    // Применяем рекурсивно ф-цию к каждому элементу (вдруг внутри ещё один массив или объект)
    // И пушим результат в newProps
    const newProps = [];
    for (key in jsonObj) {
      newProps.push(`"${key}": ${myJSONStringify(jsonObj[key])}`);
    }

    // Объединяем элементы newProps, делая из массива со свойствами строку
    return `{${newProps.join(", ")}}`;
  } else return;
};

// const testJSON = {
//   firstName: "Иван",
//   lastName: "Иванов",
//   address: {
//     streetAddress: "Московское ш., 101, кв.101",
//     city: "Ленинград",
//     postalCode: 101101,
//   },
//   phoneNumbers: ["812 123-1234", "916 123-4567"],
// };

// console.log(typeof myJSONStringify(testJSON)); //string
// console.log(myJSONStringify(testJSON));
