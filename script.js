const ADDITEMS = document.querySelector(".add-items");
const LISTING = document.querySelector(".listing");

const ITEMS = JSON.parse(localStorage.getItem("items")) || [];

let idNum = localStorage.getItem("idNum") || 0;

// leaving off 7/7. Got some stuff working but it feels like a mess. Also, now when I click on literally anything it is targeted and triggers the deleteItem function?????

//Going to delete alot right now, go to github if I want to get anything back

const LISTTEMPLATE = ITEMS.map((item) => {
  return `<li id="${item.idNum}"><a href="${item.LINK}" title="${item.DESC}">${
    item.DESC ? item.DESC : item.LINK
  }</a><button class="delete-btn">Delete</button></li>`;
});

function populateItems() {
  LISTING.innerHTML = ITEMS.map((item) => {
    return `<li id="${item.idNum}"><a href="${item.LINK}" title="${
      item.DESC
    }">${
      item.DESC ? item.DESC : item.LINK
    }</a><button class="delete-btn">Delete</button></li>`;
  }).join("");
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

  //Had to put this here too, so that the delete button works after adding items

  const DELETEBTN = document.querySelectorAll(".delete-btn");

  DELETEBTN.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}

//Need to delete in two places? The live list and local storage? I figured out how to do the idnumber thing, let's see if that's helpful

function deleteItem() {
  localStorage.setItem("items", JSON.stringify(ITEMS));

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

  const DELETEBTN = document.querySelectorAll(".delete-btn");

  DELETEBTN.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}

populateItems();

ADDITEMS.addEventListener("submit", addItem);

window.onload = function () {
  const DELETEBTN = document.querySelectorAll(".delete-btn");

  DELETEBTN.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
};
