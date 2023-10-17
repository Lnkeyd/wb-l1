// Если при проверке ВАЖНЫ спец. знаки и их порядок
// например palindromeOne(“0_0 || ^-^ || 0_0”) => true
// palindromeOne("0_0 (: /-\ :) 0_0") => false
// palindromeOne("A man, a plan, a canal. Panama") => false
function palindromeOne(value) {
  const palArr = value
    // Переводим в нижний регистр
    .toLowerCase()
    // Убираем единичные пробелы
    .replace(/\s/g, "")
    // разделяем посимвольно
    .split("")
    // инвертируем массив
    .reverse()
    // склеиваем всё в одну строку
    .join("");

  // Убираем из заданной в параметрах ф-ции пробелы,
  // переводим в нижний регистр и сравниваем
  return palArr === value.toLowerCase().replace(/\s/g, "");
}

// Если при проверке НЕ важны спец. знаки и их порядок
// например palindromeTwo(“&&& <><><> \\/\// ><><>< @@@”) => true
// palindromeTwo("A man, a plan, a canal. Panama") => true
// palindromeTwo("А ман, а план, а канал. Панама") => true
function charIsLetter(char) {
  if (typeof char !== "string") {
    return false;
  }

  // Буква не равна сама себе в верхнем регистре
  // Следовательно, так мы можем отсеить все другие вхождения
  return char.toLowerCase() !== char.toUpperCase();
}

function palindromeTwo(value) {
  // Переводим в нижний регистр
  const palArr = value
    .toLowerCase()
    // разделяем посимвольно
    .split("")
    // Убираем всё кроме букв
    .filter((char) => charIsLetter(char))
    // инвертируем массив
    .reverse()
    // склеиваем всё в одну строку
    .join("");

  return (
    palArr ===
    value
      // переводим строку из параметров ф-ции в нижний регистр
      .toLowerCase()
      // разбиваем посимвольно
      .split("")
      // оставляем только буквы
      .filter((char) => charIsLetter(char))
      // потом склеиваем в строку и сравниваем
      .join("")
  );
}