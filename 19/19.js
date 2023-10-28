// Давай скажем что нужен текст, дата, кто запомтил, фотка, лайки, коменты

// *** Глобальное состояние
const MAX_LS = maxLocalStorage();
const ACCESS_TOKEN = localStorage.getItem("vk-app-access");
// Если поставить большее значение, то выдаст Too Many Requests Per Second
const COUNT = 3;
// Убираем пост в закрепе, т.к. это статья от самого сообщества
let OFFSET = 1;
let SCROLL_Y = 0;
let MAX_POSTS = 100;
const SAFE_RANGE = 0.05;

if (!!JSON.parse(localStorage.getItem("vk-app-offset"))) {
  OFFSET = JSON.parse(localStorage.getItem("vk-app-offset"));
}

if (!!JSON.parse(localStorage.getItem("vk-app-max-posts"))) {
  MAX_POSTS = Number(JSON.parse(localStorage.getItem("vk-app-max-posts")));
}

if (!!localStorage.getItem("vk-app-scrolly") === true) {
  SCROLL_Y = Number(JSON.parse(localStorage.getItem("vk-app-scrolly")));
}

// *** Глобальное состояние

// [{element: 'outerHTML', date: date<number>}]
// Сортируем массив каждый раз, т.к. невозможно установить правильную очерёдность сразу
function pushToLS(object) {
  const prevArr = JSON.parse(localStorage.getItem("vk-app-posts"));

  if (prevArr) {
    localStorage.setItem(
      "vk-app-posts",
      JSON.stringify([...prevArr, object].sort((a, b) => b.date - a.date))
    );
  } else {
    localStorage.setItem("vk-app-posts", JSON.stringify([object]));
  }
}

async function getFromLS(posts) {
  await posts.map((item) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post-item");
    postEl.innerHTML = item.element;
    document.querySelector(".posts").append(postEl);
  });
  document.querySelector(".posts").scrollTop = SCROLL_Y;
}

function sliceLS() {
  const lsArr = JSON.parse(localStorage.getItem("vk-app-posts"));
  const newLSArr = lsArr.slice(3);
  localStorage.setItem("vk-app-posts", JSON.stringify(newLSArr));
}

// **** Утилитарные ф-ции
function convertTime(ms) {
  const date = new Date(ms * 1000);

  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  // Время в формате 10:30:23
  const formattedTime =
    date.toLocaleDateString() + " " + hours + ":" + minutes.substr(-2);

  return formattedTime;
}

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

function maxLocalStorage() {
  let size = "⛳";
  try {
    // Сетим свойство в LS и бесконечно увеличиваем его значение, а следовательно, и память на его хранение
    while (true) {
      localStorage.setItem("a", size);
      size += size;
    }
  } catch (e) {
    // Если выбьет ошибку при переполнении, то выводим размер
    // Дважды делим на 1024, потому что данные хранятся в `utf-16`, который занимает 2 байта на символ
    // Узнаём размер в МБ

    localStorage.removeItem("a");
    return (size.length * 2) / (1024 * 1024);
  }
}

function sizeLocalStorage() {
  const lsContent = localStorage.getItem("vk-app-posts");
  return (lsContent.length * 2) / (1024 * 1024);
}

// **** Конец утилитарных ф-ций

const posts = document.querySelector(".posts");
posts.addEventListener("scroll", throttle(checkPosition, 300));
posts.addEventListener("resize", throttle(checkPosition, 300));

const params = {
  client_id: 51778161,
  redirect_uri: "http://127.0.0.1:5500/19/auth.html",
  token_uri: "https://oauth.vk.com/blank.html",
  owner_id: -45407805,
};

if (!ACCESS_TOKEN) authUser();
function authUser() {
  window.location = `https://oauth.vk.com/authorize?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&display=popup&response_type=token&scope=offline&v=5.154`;
}

const LS_POSTS = localStorage.getItem("vk-app-posts");
//   Если есть уже посты, то подгружаем их
if (LS_POSTS) {
  getFromLS(JSON.parse(LS_POSTS));
} else {
  // Здесь к колбэк скрипта передаёт ф-ю createPosts, скрипт запустит её через JSONP
  fetchPosts();
}

function fetchPosts() {
  var script = document.createElement("SCRIPT");
  script.id = `fetch-script`;
  script.src = `https://api.vk.com/method/wall.get?v=5.154&access_token=${ACCESS_TOKEN}&owner_id=${params.owner_id}&count=${COUNT}&offset=${OFFSET}&callback=createPosts`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

async function createPosts(result) {
  document.getElementById(`fetch-script`).remove();
  localStorage.setItem("vk-app-max-posts", JSON.parse(result.response?.count));
  MAX_POSTS = result.response?.count;
  if (OFFSET + COUNT >= MAX_POSTS) return;

  OFFSET += COUNT;
  localStorage.setItem("vk-app-offset", JSON.stringify(OFFSET));

  // Флоу такой:
  // 1) Находим Имя + Фамилия по id, эта функция запускает колбэк getUsername
  // 2) Наш поток не ждёт её (не нашёл такой возможности) и запускает сразу же ф-ю postCreator
  // 3) Как только postCreator отработала, после неё (гарантированно в колстэке) запустится ф-я getUsername
  // 4) Ф-я getUsername добавляет текст контент создателя свежесозданного скриптом postCreator поста

  if (
    !!localStorage.getItem("vk-app-posts") &&
    sizeLocalStorage() + SAFE_RANGE >= 0.2 // Здесь можно поставить размер localStorage
  )
    sliceLS();

  await result.response?.items.forEach((element) => {
    postCreator(element);
    utilScriptResults(element.signer_id);
  });

  console.log(
    `Объём занятой памяти: ${sizeLocalStorage() + ' MB'} / Максимальный размер хранилища: ${maxLocalStorage() + ' MB'}`
  );
}

async function utilScriptResults(param) {
  var script = document.createElement("SCRIPT");
  script.id = `util-script-${param}`;
  script.src = `https://api.vk.com/method/users.get?v=5.154&access_token=${ACCESS_TOKEN}&user_ids=${param}&callback=getUsername`;

  document.getElementsByTagName("head")[0].appendChild(script);
}

async function getUsername(result) {
  try {
    const id = await result?.response[0].id;
    const user = await result?.response[0];
    // Достаём последний элемент в классе, потому что пользователь может постить
    // в паблик много постов
    const element = await Array.from(
      document.querySelectorAll(`.user-${id}`)
    ).pop();
    element.textContent = user.first_name + " " + user.last_name;

    //    Проверка на переполнение localStorage

    // Если грузим новый чанк, то сеттим его в LS
    // ...
    pushToLS({
      element: element.parentElement.innerHTML,
      date: Number(element.nextElementSibling.id),
    });
    document.getElementById(`util-script-${user.id}`).remove();
    // Каждый раз после пуша сортим массив, потому что нет гарантии, что мы будем иметь нужный порядок
    // (проверено тестами)
  } catch (e) {
    console.error(e);
    // console.error(
    //   "getUserName" +
    //     " " +
    //     user.id +
    //     " " +
    //     user.first_name +
    //     " " +
    //     user.last_name
    // );
  }
}

async function postCreator(post) {
  const postEl = document.createElement("div");
  postEl.classList.add("post-item");

  postEl.id = `post-${post.signer_id}`;
  postEl.innerHTML = `
        <div class="post-item__username user-${post.signer_id}"></div>
        <div id="${post.date}" class="post-item__date">${convertTime(
    post.date
  )}</div>
        <div class="post-item__text">${post.text}</div>
        <div class="post-item-photos">
        ${post.attachments
          .map((item) => `<img src="${item.photo.sizes[2].url}"/>`)
          .join("")}
        </div>
        <div class="post-item-info">
            <div class="post-item-info__likes">
            ❤️: <span class="likes__count">${post.likes.count}</span>
            </div>
            <div class="post-item-info__comments">
            💬: <span class="comments__count">${post.comments.count}</span>
            </div>
        </div>
    `;

  document.querySelector(".posts").append(postEl);
}

// Справочный ресурс по теме:
// https://doka.guide/js/infinite-scroll/
function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const posts = document.querySelector(".posts");

  //   max-height блока
  const height = posts.offsetHeight;
  //   Максимальная высота контента, если проскролить его до конца
  //   Она будет больше, т.к. стоит overflowY: scroll
  const screenHeight = posts.scrollHeight;
  SCROLL_Y = screenHeight;

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = posts.scrollTop;
  localStorage.setItem("vk-app-scrolly", JSON.stringify(scrolled));

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — за 2 поста до конца страницы:
  const threshold = screenHeight - height * 2 + 100;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled;

  if (position >= threshold) {
    // Если больше нет постов, то ничего не делаем
    if (OFFSET + COUNT >= MAX_POSTS) return;
    if (SCROLL_Y <= Number(JSON.parse(localStorage.getItem("vk-app-scrolly"))))
      return;
    // Если мы пересекли полосу-порог, вызываем нужное действие.
    fetchPosts();
  }
}
