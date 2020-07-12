const ADDITEMS = document.querySelector(".add-items");
const LISTING = document.querySelector(".listing");

const ITEMS = JSON.parse(localStorage.getItem("items")) || [];

let idNum = localStorage.getItem("idNum") || 0;

function populateItems() {
  LISTING.innerHTML = ITEMS.map((item) => {
    return `<li class="list-item" id="${item.idNum}"><a href="${
      item.LINK
    }" title="${item.DESC}">${
      item.DESC ? item.DESC : item.LINK
    }</a><button class="delete-btn">Delete</button></li>`;
  }).join("");

  const DELETEBTN = document.querySelectorAll(".delete-btn");

  DELETEBTN.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}

function addItem(e) {
  e.preventDefault(); //Prevents it from refreshing

  const LINK = this.querySelector("[name=link]").value;
  const DESC = this.querySelector("[name=description]").value;

  idNum++;
  localStorage.setItem("idNum", idNum);

  ITEMS.unshift({
    LINK,
    DESC,
    idNum,
  });

  //should be setting the entire array
  localStorage.setItem("items", JSON.stringify(ITEMS));

  populateItems();

  this.reset(); //clears a form
}

function deleteItem() {
  let check = confirm("Are you sure?");
  if (check !== true) {
    return;
  } else {
    let filteredItem = ITEMS.filter((item) => {
      return item.idNum.toString() === this.parentNode.id;
    });

    console.log(filteredItem[0]);
    console.log(ITEMS);
    console.log(ITEMS.indexOf(filteredItem[0]));

    let deleteIndex = ITEMS.indexOf(filteredItem[0]);

    ITEMS.splice(deleteIndex, 1);

    localStorage.setItem("items", JSON.stringify(ITEMS));

    populateItems();
  }
}

populateItems();

ADDITEMS.addEventListener("submit", addItem);
