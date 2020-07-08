const ADDITEMS = document.querySelector(".add-items");
const LISTING = document.querySelector(".listing");

const ITEMS = JSON.parse(localStorage.getItem("items")) || [];

// leaving off 7/7. Got some stuff working but it feels like a mess. Also, now when I click on literally anything it is targeted and triggers the deleteItem function?????

// function filterItems(value, index, arr) {
//   console.log(arr);

//   return index;
// }

function deleteItem(e) {
  // let listTemplate = ITEMS.map((item) => {
  //   return `<li><a href="${item.LINK}" title="${item.DESC}">${item.DESC}</a><button class="delete-btn">Delete</button></li>`;
  // });
  // let toDelete = e.target;
  // console.log(toDelete);
  // console.log(toDelete.parentNode);
  // console.log(ITEMS.filter(filterItems));
  // localStorage.setItem(
  //   "items",
  //   JSON.stringify(ITEMS.filter(filterItems(this)))
  // );
  // LISTING.innerHTML = listTemplate.join("");
}

function appendItem(LINK, DESC) {
  let listTemplate = ITEMS.map((item) => {
    return `<li><a href="${item.LINK}" title="${item.DESC}">${item.DESC}</a><button class="delete-btn">Delete</button></li>`;
  });

  LISTING.innerHTML = listTemplate.join("");
  const DELETEBTN = document.querySelectorAll(".delete-btn");
  DELETEBTN.forEach((button) => {
    addEventListener("click", deleteItem);
  });
}

function addItem(e) {
  e.preventDefault(); //Prevents it from refreshing

  const LINK = this.querySelector("[name=link]").value;
  const DESC = this.querySelector("[name=description]").value;

  ITEMS.unshift({
    LINK,
    DESC,
  });
  // console.log(ITEMS);

  //should be setting the entire array
  localStorage.setItem("items", JSON.stringify(ITEMS));

  appendItem(LINK, DESC);

  // console.log(localStorage);
  this.reset(); //clears a form
}

ADDITEMS.addEventListener("submit", addItem);

appendItem();
