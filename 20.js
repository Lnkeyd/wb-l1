
// Справочный ресурс по теме:
// https://stackoverflow.com/questions/50767241/observe-localstorage-changes-in-js
function LocalStorageSetListener() {
  const localStore = localStorage.setItem;

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
      localStorage.removeItem("a");
      return ((size.length * 2) / (1024 * 1024)).toFixed(2) + " MB";
    }
  }

  localStorage.setItem = function (key, value) {
    const event = new Event("localUpdated");
    event.key = key;
    event.value = value;

    document.dispatchEvent(event);
    localStore.apply(this, arguments);
  };

  const localStoreHandler = function (e) {
    const LS_CONTENT = localStorage.getItem(e.key);
    const LS_CURRENT_SIZE =
      ((LS_CONTENT.length * 2) / (1024 * 1024)).toFixed(2) + " MB";
    console.log(
      `Объём занятой памяти: ${LS_CURRENT_SIZE} / Максимальный размер хранилища: ${maxLocalStorage()}`
    );
  };

  document.addEventListener("localUpdated", localStoreHandler, false);
}
