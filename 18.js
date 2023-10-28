function maxLocalStorage() {
  let size = "a";
  try {
    // Сетим свойство в LS и бесконечно увеличиваем его значение, а следовательно, и память на его хранение
    while (true) {
      localStorage.setItem("a", size);
      size += size;
    }
  } catch (e) {
    // Если выбьет ошибку при переполнении, то выводим размер
    // * 2, потому что данные хранятся в `utf-16`, который занимает 2 байта на символ
    return ((size.length * 2) / (1024 * 1024)).toFixed(2) + " MB";
  }
}

const maxLS = maxLocalStorage();
console.log(maxLS);

// Chrome - 16 MB