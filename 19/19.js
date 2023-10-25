// Давай скажем что нужен текст, дата, кто запомтил, фотка, лайки, коменты

// Флоу:: Подгрузка в LocalStorage
//

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

// **** Конец утилитарных ф-ций
const posts = document.querySelector(".posts");
posts.addEventListener("scroll", throttle(checkPosition, 250));
posts.addEventListener("resize", throttle(checkPosition, 250));

const params = {
  client_id: 51778161,
  redirect_uri: "http://127.0.0.1:5500/19/auth.html",
  token_uri: "https://oauth.vk.com/blank.html",
  owner_id: -45407805,
};

const ACCESS_TOKEN = localStorage.getItem("vk-app-access");
// Если поставить большее значение, то выдаст Too Many Requests Per Second
const COUNT = 3;
// Убираем пост в закрепе, т.к. это статья от самого сообщества
let OFFSET = localStorage.getItem("vk-app-offset") || 1;
let MAX_POSTS = 100;

if (!ACCESS_TOKEN) authUser();
function authUser() {
  window.location = `https://oauth.vk.com/authorize?client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&display=popup&response_type=token&scope=offline&v=5.154`;
}

function fetchPosts() {
  const LS_POSTS = localStorage.getItem("vk-app-posts");
  //   Если есть уже посты, то подгружаем их
  if (LS_POSTS) {
    return;
  }
  var script = document.createElement("SCRIPT");
  script.src = `https://api.vk.com/method/wall.get?v=5.154&access_token=${ACCESS_TOKEN}&owner_id=${params.owner_id}&count=${COUNT}&offset=${OFFSET}&callback=createPosts`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Здесь к колбэк скрипта передаёт ф-ю createPosts, скрипт запустит её через JSONP
fetchPosts();

async function createPosts(result) {
  MAX_POSTS = result.response?.count;

  if (OFFSET + COUNT >= MAX_POSTS) return;

  OFFSET += COUNT;

  // Флоу такой:
  // 1) Находим Имя + Фамилия по id, эта функция запускает колбэк getUsername
  // 2) Наш поток не ждёт её (не нашёл такой возможности) и запускает сразу же ф-ю postCreator
  // 3) Как только postCreator отработала, после неё (гарантированно в колстэке) запустится ф-я getUsername
  // 4) Ф-я getUsername добавляет текст контент создателя свежесозданного скриптом postCreator поста
  await result.response?.items.forEach((element) => {
    postCreator(element);
    utilScriptResults(element.signer_id);
  });
}

function utilScriptResults(param) {
  var script = document.createElement("SCRIPT");
  script.id = `util-script-${param}`;
  script.src = `https://api.vk.com/method/users.get?v=5.154&access_token=${ACCESS_TOKEN}&user_ids=${param}&callback=getUsername`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

async function getUsername(result) {
  const user = result?.response[0];
  try {
    document.getElementById(`user-${user.id}`).textContent =
      user.first_name + " " + user.last_name;
    document.getElementById(`util-script-${user.id}`).remove();
    // Если грузим новый чанк, то сеттим его в LS
    // ...
  } catch (e) {
    console.error(e);
    console.error(
      "getUserName" +
        " " +
        user.id +
        " " +
        user.first_name +
        " " +
        user.last_name
    );
  }
}

function postCreator(post) {
  const postEl = document.createElement("div");
  postEl.classList.add("post-item");
  postEl.innerHTML = `
        <div class="post-item__username" id="user-${post.signer_id}"></div>
        <div class="post-item__date">${convertTime(post.date)}</div>
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

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = posts.scrollTop;
  console.log(scrolled);

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — за 2 поста до конца страницы:
  const threshold = screenHeight - height * 2;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled;

  if (position >= threshold) {
    if (OFFSET + COUNT >= MAX_POSTS) return;
    // Если мы пересекли полосу-порог, вызываем нужное действие.
    fetchPosts();
  }
}
