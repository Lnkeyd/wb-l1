function useCase(n, forms) {
  // Получаем 2 последних цифры нашего числа
  const strN = String(n).slice(-2);

  // 1 сообщение или 21, 31, 41 сообщение
  if (
    strN === "1" ||
    (Number(strN) >= 21 && strN.charAt(strN.length - 1) === "1")
  )
    return forms[0];

  // 0, или 5, 6, 7, 8, 9, или 11, 12, 13, 14, .... сообщений
  if (
    strN.charAt(strN.length - 1) === "0" ||
    // на конце 5 ... 9
    (Number(strN.charAt(strN.length - 1)) >= 5 &&
      Number(strN.charAt(strN.length - 1)) <= 9) ||
    // на конце 11 ... 14
    (Number(strN) >= 11 && Number(strN) <= 14)
  )
    return forms[2];

  // 2, 3, 4 сообщения или 22, 32, 42 сообщения
  return forms[1];
}

const fs = require("fs");
const dir = "./";

fs.readdir(dir, (err, files) => {
  const filesCount = files.length - 3;
  const casesArr = ["задание", "задания", "заданий"];
  console.log(
    `Ты сделал ${filesCount} ${useCase(
      filesCount, casesArr
    )} (файлов). Молодчина! Осталось ${29 - filesCount}, Поднажми ещё!`
  );
});
