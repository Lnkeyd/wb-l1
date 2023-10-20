// TODO:
// 1) Ивенты на сортировку
// 2) Пагинация
import { sortColumn } from "./sort.js";

const tBody = document.querySelector("tbody");
let pageIndex = 1;
let PAGE_ARRAY = [];

const prevButton = document.querySelector("#pag-prev");
const nextButton = document.querySelector("#pag-next");

const checkDisabled = () => {
  prevButton.disabled = pageIndex === 1 ? true : false;
  nextButton.disabled = pageIndex === 20 ? true : false;
};

const checkActiveButton = () => {
  document.querySelectorAll(".page-number").forEach((item) => {
    if (Number(item.textContent) === pageIndex) {
      item.style = "background-color: #333;color: #fff;";
    } else {
      item.style = "";
    }
  });
};

const goToPage = (array, startIndex) => {
  pageIndex = startIndex;
  checkDisabled();
  checkActiveButton();
  tBody.innerHTML = "";

  const newPageArr = array.slice(
    (startIndex - 1) * 50,
    (startIndex - 1) * 50 + 50
  );

  newPageArr.map((item) => {
    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
          <tr>
              <td>${item.id + 1}</td>
              <td>${item.fname}</td>
              <td>${item.lname}</td>
              <td>${item.tel}</td>
              <td>${item.address}</td>
              <td>${item.city}</td>
              <td>${item.state}</td>
              <td>${item.zip}</td>
          </tr>
        `;
    tBody.append(rowEl);
  });
};

async function fetchData() {
  const data = await fetch(
    "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true"
  );
  let res = await data.json();
  await res.forEach((item, index) => {
    item.id = index;
  });
  PAGE_ARRAY = [...res];

  for (let i = 0; i < res.length / 50; i++) {
    const pagButton = document.createElement("button");
    pagButton.classList.add("page-number");
    pagButton.textContent = i + 1;
    document.querySelector(".pag-buttons").append(pagButton);

    pagButton.onclick = (e) => {
      e.preventDefault();
      goToPage(PAGE_ARRAY, Number(e.target.textContent));
    };
  }
  goToPage(PAGE_ARRAY, 1);

  prevButton.onclick = (e) => {
    e.preventDefault();
    goToPage(PAGE_ARRAY, pageIndex - 1);
  };
  nextButton.onclick = (e) => {
    e.preventDefault();
    goToPage(PAGE_ARRAY, pageIndex + 1);
  };

  document.querySelectorAll("th").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      //   Затираем предыдущий активный селектор
      PAGE_ARRAY = sortColumn(PAGE_ARRAY, e.target);
      goToPage(PAGE_ARRAY, pageIndex);
    });
  });
}

fetchData();
