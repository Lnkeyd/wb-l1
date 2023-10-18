function addEl(tag, selector, style) {
  const newEl = document.createElement(tag);
  const selectedEl = document.querySelector(selector);
  newEl.style = style;
  selectedEl.append(newEl);
}

addEl("div", "body", "width: 50px; height: 50px; background-color: red;");
