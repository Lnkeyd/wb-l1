export const sortColumn = (arr, target) => {
  // Если кликнута сортировка по старому столбцу
  if (target.classList.contains("active")) {
    return arr.reverse();
  }
  //   Если кликнута сортировка по новому столбцу
  //   Убираем у всех активный класс
  document
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("active"));
  // Ставим активный класс на новый столбец
  target.classList.add("active");
  const textContent = target.textContent;
  if (
    textContent === "tel" ||
    textContent === "address" ||
    textContent === "zip" ||
    textContent === "id"
  ) {
    return arr.sort(
      (a, b) =>
        // Кастим к числу и убираем все символы, кроме цифр
        Number(String(a[`${textContent}`]).replace(/[^0-9]/g, "")) -
        Number(String(b[`${textContent}`]).replace(/[^0-9]/g, ""))
    );
  } else {
    return arr.sort((a, b) => {
      const nameA = a[`${textContent}`].toUpperCase();
      const nameB = b[`${textContent}`].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // Одинаковые
      return 0;
    });
  }
};
