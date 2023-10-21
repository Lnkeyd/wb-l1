const insertTemplate = () => {
  const template = document.createElement("template");
  const wrap = document.createElement("div");
  const content = document.createElement("div");

  content.innerHTML = `
      <style>
          p {color: green;}
      </style>
      <p>Привет, Мир!</p>
    `;

  template.content.append(content);
  wrap.append(template.content);
  document.body.appendChild(content);
};

// document.querySelector("button").addEventListener("click", insertTemplate);
