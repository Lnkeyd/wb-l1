// 23.	Анализатор сложности пароля: создайте функцию, которая оценивает сложность
// введенного пользователем пароля. Необходимо анализировать длину пароля, использование
// различных символов, наличие чисел и букв в разных регистрах. Выведите пользователю оценку
// сложности пароля и предложите улучшения, если пароль слишком слабый.

// https://www.section.io/engineering-education/password-strength-checker-javascript/

// The password is at least 8 characters long (?=.{8,}).

// The password has at least one uppercase letter (?=.*[A-Z]).

// The password has at least one lowercase letter (?=.*[a-z]).

// The password has at least one digit (?=.*[0-9]).

// The password has at least one special character ([^A-Za-z0-9]).

const check = {
  lengthSix: false,
  lengthEight: false,
  upper: false,
  lower: false,
  digit: false,
  special: false,
  totalGood: 0,
};

function random(min, max) {
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const regulars = {
  // has at least one lowercase letter (?=.*[a-z]), one uppercase letter (?=.*[A-Z]),
  // one digit (?=.*[0-9]), one special character (?=.*[^A-Za-z0-9]),
  // and is at least eight characters long(?=.{8,}).
  lengthSix: new RegExp("(?=.{6,})"),
  lengthEight: new RegExp("(?=.{8,})"),
  upper: new RegExp("(?=.*[A-Z])"),
  lower: new RegExp("(?=.*[a-z])"),
  digit: new RegExp("(?=.*[0-9])"),
  special: new RegExp("([^A-Za-z0-9])"),
};

const suggestion = {
  special: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(""),
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  lower: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(""),
  digit: "0123456789".split(""),
};

const helpWeak = (inputStr) => {
  const suggestKeys = Object.keys(suggestion);
  let res = inputStr;
  const resArr = [];

  //   Всего 3 улучшения
  for (let j = 0; j < 3; j++) {
    const checkCopy = { ...check };
    delete checkCopy.totalGood;
    for (key in checkCopy) {
      if (!checkCopy[key]) {
        if (key === "lengthSix" || key === "lengthEight") {
          // Если встретили недобор по длине, добиваем рандомным символом в конец
          // Также, если встретим потом ещё какой-нибудь ключ в false -
          // Это поможет генерировать пароли различной длины
          // Потому что сперва добиваем до 8, а потом ещё сплайсим недост. символы поверх того
          for (let i = res.length; i < 8; i++) {
            const suggestKey = suggestKeys[random(0, suggestKeys.length - 1)];
            const suggestChar =
              suggestion[suggestKey][
                random(0, suggestion[suggestKey].length - 1)
              ];

            res = res + suggestChar;
          }
          checkCopy.lengthEight = true;
          checkCopy.lengthSix = true;
        } else {
          const suggestChar =
            suggestion[key][random(0, suggestion[key].length - 1)];

          const randIndex = random(0, res.length - 1);
          const resArr = res.split("");
          resArr.splice(randIndex, 0, suggestChar);
          res = resArr.join("");
        }
      }
    }
    resArr.push(res);
    res = inputStr;
  }

  console.log("Слабый пароль, можете использовать один из вариантов ниже:");
  resArr.map((item) => console.log(item));

  return {
    name: "Слабый пароль",
    suggestions: resArr,
  };
};

// Основная функция
const computePwdLvl = (inputStr) => {
  for (key in regulars) {
    check[key] = regulars[key].test(inputStr) ? true : false;

    check.totalGood += check[key] ? 1 : 0;
  }
  if (check.totalGood === 6) {
    console.log("Сильный пароль");
    return {
      name: "Сильный пароль",
    };
  } else if (check.totalGood >= 4) {
    console.log("Средний пароль");
    return {
      name: "Средний пароль",
    };
  } else return helpWeak(inputStr);
};

// console.log(computePwdLvl("aabba"));
