function addEl(tag, selector, style) {
  // Создаём элемент по заданному тегу
  const newEl = document.createElement(tag);
  // Выбираем элемент, внутрь которого поместим элемент выше
  const selectedEl = document.querySelector(selector);
  // Добавляем стили
  newEl.style = style;
  // Помещаем элемент
  selectedEl.append(newEl);
}

addEl("div", "body", "width: 50px; height: 50px; background-color: red;");
