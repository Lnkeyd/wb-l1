// Справочный ресурс по теме:
// https://dev.to/tttaaannnggg/writing-a-json-parser-in-js-pt-1-primitives-h72

function JSONParse(JSONString) {
  if (typeof JSONString !== "string" || JSONString?.length <= 0)
    throw new Error("Недопустимый входной тип данных");

  let index = 0;

  function parseObject() {
    // Парсим значения в object
    const obj = {};
    index++;
    while (JSONString[index] !== "}") {
      const key = parseString();
      // Пропускаем двоеточие, разделяющее ключ и значение
      index++;
      const value = parseValue();
      obj[key] = value;
      JSONString[index] === "," ? index++ : "";
    }
    // Пропускаем закрывающую фигурную скобку
    JSONString[index] === "}" ? index++ : "";
    return obj;
  }

  function parseArray() {
    // Парсим значения в array
    const arr = [];
    index++;
    while (JSONString[index] !== "]") {
      // Парсим каждый элемент массива
      const value = parseValue();
      arr.push(value);
      if (JSONString[index] === ",") {
        index++;
      }
    }
    // Пропускаем закрывающую квадратную скобку
    JSONString[index] === "]" ? index++ : "";
    return arr;
  }

  function parseString() {
    // Парсим значения в typeof string
    let str = "";
    index++; // Пропускаем начальную двойную кавычку
    while (JSONString[index] !== '"') {
      str += JSONString[index];
      index++;
    }
    index++; // Пропускаем закрывающую двойную кавычку
    return str;
  }

  function parseNumber() {
    // Справочный ресурс по теме:
    // https://stackoverflow.com/questions/38523118/javascript-regex-optional-minus
    // Парсим значения в typeof number
    const reg = new RegExp("[-+0-9.eE]");
    const start = index;
    // Проходим все символы, которые нам нужны для парсинга числа
    while (reg.test(JSONString[index])) {
      index++;
    }
    // Как только не находим нужных, останавливаем цикл
    const num = parseFloat(JSONString.slice(start, index));
    if (isNaN(num)) throw new Error("Недопустимое значение (number)");
    return num;
  }

  function parseBoolean() {
    // Парсим true/false значения
    if (
      JSONString[index] === "t" &&
      JSONString.slice(index, index + 4) === "true"
    ) {
      index += 4;
      return true;
    } else if (
      JSONString[index] === "f" &&
      JSONString.slice(index, index + 5) === "false"
    ) {
      index += 5;
      return false;
    } else throw new Error("Недопустимое значение (boolean type)");
  }

  function parseNull() {
    // Парсим значения в null
    if (
      JSONString[index] === "n" &&
      JSONString.slice(index, index + 4) === "null"
    ) {
      index += 4;
      return null;
    } else throw new Error("Недопустимое значение (null type)");
  }

  function parseUndefined() {
    // Парсим значения в typeof undefined
    if (
      JSONString[index] === "u" &&
      JSONString.slice(index, index + 9) === "undefined"
    ) {
      index += 9;
      return undefined;
    } else throw new Error("Недопустимое значение (undefined type)");
    // Примечание: если есть свойство, со значением undefined,
    // то оно в конечном счёте не запишется в объект
  }

  function parseValue() {
    const currentChar = JSONString[index];
    switch (currentChar) {
      case " " || "\n" || "\r" || "\t" || "\b" || "\f":
        index++;
      case "{":
        return parseObject();
      case "[":
        return parseArray();
      case '"':
        return parseString();
      case "-":
      case "+":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return parseNumber();
      case "t":
      case "f":
        return parseBoolean();
      case "n":
        return parseNull();
      case "u":
        return parseUndefined();
      default:
        throw new Error("Недопустимый тип данных в структуре");
    }
  }

  return parseValue();
}
// ["a", "b", {}]

// const jsonArr = ["mama", "papa", false, ["lol", "kek", true, 42]];
// const jsonArr = [
//   "mama",
//   "papa",
//   { name: "John", age: 42, grades: [12, 14.5, 20] },
// ];

// const jsonArr = {
//   a: 12,
//   b: [1, 2, 3, { c: false }, [[[]]]],
//   d: { hi: undefined },
//   e: { f: [{}, {}, {}] },
//   g: "g",
// };

const jsonArr = [
  "Mary waved, then said hello",
  "John waved, then said goodbye",
];

const string = JSON.stringify(jsonArr);
// console.log(string);
console.log(JSONParse(string));
console.log(JSON.parse(string));
