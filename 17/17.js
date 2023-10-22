// 17.	Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны
// отображаться в выпадающем списке, из которого можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

// Справочный ресурс: http://xandeadx.ru/blog/javascript/956

const query = "";
const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "5136a88e464800df94052879ac19b76e501764b5";

const options = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Token " + token,
  },
  body: JSON.stringify({ query: query }),
};
// debounce запускает функцию один раз после периода «бездействия».
// Подходит для обработки конечного результата.
function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// throttle запускает функцию не чаще, чем указанное время ms.
// Подходит для регулярных обновлений, которые не должны быть слишком частыми.
function throttle(fn, delay) {
  let run = true;
  return (...args) => {
    if (run) {
      fn(...args);
      run = false;
      setTimeout(() => {
        run = true;
      }, delay);
    }
  };
}

const select = document.querySelector("select");
select.onchange = (e) => {
    input.value = e.target.value
    select.style.display = 'none'
}
select.style.display = select.children.length > 0 ? "block" : "none";

const addSelect = (arr) => {
  console.log(arr);
  arr.map((item) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${item.value}</option>`;
    select.appendChild(option);
  });
};

const useFetch = async (url, options, query) => {
  if (query === "") return;
  options.body = JSON.stringify({ query: query });

  const res = await fetch(url, options);
  const data = await res.json();

  addSelect(data?.suggestions);
  select.style.display = select.children.length > 0 ? "block" : "none";
  return data;
};

const input = document.querySelector("#input");

input.oninput = debounce((e) => useFetch(url, options, e.target.value), 1000);

// input.oninput = throttle((e) => useFetch(url, options, e.target.value), 1000)
