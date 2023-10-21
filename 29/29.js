function propsAsString(obj) {
  return Object.keys(obj)
    .map((k) => k + ": " + obj[k])
    .join("\n");
}

const handleForm = async (e) => {
  e.preventDefault();
  const elements = document.forms[0].elements;

  const data = {
    name: "",
    age: "",
    birthday: "",
    music: "",
    agree: false,
    films: "",
  };

  for (key in data) {
    if (elements[key].type === "checkbox") data[key] = elements[key].checked;
    else data[key] = elements[key].value;
  }

  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const jsonData = await res.json();

  // Если бы св-ва повторяли данные на сервере,
  // то сервер бы вернул совпадающие с его моделью поля,
  // с нашими значениями
  console.log(jsonData);

  alert(propsAsString(data));
};

document.querySelector("form").addEventListener("submit", (e) => handleForm(e));
