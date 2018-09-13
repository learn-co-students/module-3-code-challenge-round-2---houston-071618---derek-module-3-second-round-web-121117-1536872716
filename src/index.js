let beerLis;

//URLs
const URL = `http://localhost:3000/beers`;

//Event Listeners
document.addEventListener("DOMContentLoaded", getBeers);

//UI Elements
const $beerList = document.getElementById("list-group");
const $beerDetail = document.getElementById("beer-detail");

function getBeers() {
  fetch(URL)
    .then(res => res.json())
    .then(beerObjs => displayBeers(beerObjs));
}

function displayBeers(beerObjs) {
  beerObjs.forEach(beerObj => {
    $beerList.innerHTML += `<li id="${beerObj.id}" class="list-group-item">${
      beerObj.name
    }</li>`;
  });
  beerLis = document.querySelectorAll(".list-group-item");
  beerLis.forEach(beerLi => {
    beerLi.addEventListener("click", getBeer);
  });
}

function getBeer(e) {
  fetch(`http://localhost:3000/beers/${e.target.id}`)
    .then(res => res.json())
    .then(beerObj => showBeer(beerObj));
}

function showBeer(beerObj) {
  $beerDetail.innerHTML = `<h1>${beerObj.name}</h1>
	<img src="${beerObj.image_url}">
	<h3>${beerObj.tagline}</h3>
	<textarea id="description-${beerObj.id}">${beerObj.description}</textarea>
	<button id="edit-beer" class="btn btn-info">
		Save
	</button>
	`;
  document
    .getElementById("edit-beer")
    .addEventListener("click", e => updateBeer(beerObj));
}

function updateBeer(beerObj) {
  let des = document.getElementById(`description-${beerObj.id}`);
  beerObj.description = des.value;
  fetch(`http://localhost:3000/beers/${beerObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(beerObj)
  });
}
