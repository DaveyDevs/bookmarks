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

//Need to delete in two places? The live list and local storage? I figured out how to do the idnumber thing, let's see if that's helpful

function deleteItem() {
  console.log(LISTING);
  // console.log(this.parentNode);
  console.log(ITEMS); //local storage
  // console.log([...LISTING.childNodes]); //live list

  //Need to use childnodes to get to array of <li>s and [...LISTING.childNodes] to make it into an array we can work with

  let filterList = [...LISTING.childNodes].filter((item) => {
    return item !== this.parentNode;
  });

  localStorage.setItem("items", JSON.stringify(ITEMS));
  console.log(filterList);

  // console.log(this.parentNode.id);

  // localStorage.setItem("items", JSON.stringify(filterList));

  console.log(JSON.parse(localStorage.getItem("items")));
}

function populateItems() {
  // console.log(LISTTEMPLATE.join(""));
  // console.log(localStorage.items);
  // console.log(ITEMS);
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
  // console.log(ITEMS);

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

populateItems();

ADDITEMS.addEventListener("submit", addItem);

window.onload = function () {
  const DELETEBTN = document.querySelectorAll(".delete-btn");

  DELETEBTN.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
};
