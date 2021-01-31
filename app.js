/**
/* Stores the list of kittens
 * type {Kitten[]}
 */
// #region  KITTENS ARRAY & KITTEN DATA
let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kittenName = form.name.value

  document.getElementById("clear-kittens").classList.remove("hidden");

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }
  let currentKitten = {}
  currentKitten = kittens.find(kitten => kitten.name == kittenName)
  if(!currentKitten){
    currenKitten = {name: kittenName}
    kittens.push(kitten);
    saveKittens();
  }else{ alert("Name in use, please choose another name")}
  form.reset();
  drawKitten();
}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"));
  if (kittensData) {
    kittens = kittensData
  }
}

//#endregion
//#region DRAW and PET/CATNIP KITTEN
/**
 * 
 * Draw all of the kittens to the kittens element
 */
function drawKitten() {
  loadKittens()
  let kittenListElement = document.getElementById("kitten-list");
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
      <div class="kitten-card bg-dark text-light p-2 align-items-center kitten ${kitten.mood}">
                <p class="kitten-font">MOODY KITTEN!</p>
                <img class="space-around kitten " src="https://robohash.org/<${kitten.name}>?set=set4" alt="Kitten Envy?">
          <span id="tolerCat" class="mt-1">
            <p>Name: ${kitten.name}</p>
            <p>Mood: ${kitten.mood}</p>
            <p>Affection: ${kitten.affection}</p>
          </span>
          <span id="goneCat"s class="kitten-font mt-2 hidden">
            <p>Fair Thee Well</p>
            <p>${kitten.name}!</p>
            </span>
         
       <div id="buttons" class="align-center d-flex space-around">
            <label  class="button" for="pet"></label>
            <button type="button" onclick="pet('${kitten.id}')">PET</button>
           <label class="button align-center" for="catnip"></label>
            <button type="button" onclick="catnip('${kitten.id}')">CATNIP</button>
        </div> 
    </div>
    `

  });
  kittenListElement.innerHTML = kittensTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id  
 * return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);

}
/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id 
 */

function pet(id) {
  let kitten = findKittenById(id)
  let x = Math.random()
  if (x >= .7) { kitten.affection++ }
  else { kitten.affection-- };
  setKittenMood(kitten);
  saveKittens();
  loadKittens();
  drawKitten();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  kitten.mood = "tolerant"
  saveKittens()
  drawKitten()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood = "happy";
  }
  if (kitten.affection <= 5) {
    kitten.mood = "tolerant";
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry";
  }
  if (kitten.affection <= 0) {
    kitten.mood = "gone";
    }
}

//#endregion

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kitten-list").classList.remove("hidden")
}
/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
*/
let kitten = {
  id: generateId(),
  name: "name",
  mood: "Tolerant",
  affection: 5
}

/** 
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
} 


function clearKittens() {
  document.getElementById("kitten-list").classList.add("hidden");
for(let i= 0; i <kittens.length; i++){
  kittens.pop(kitten[i])
  document.getElementById("clear-kittens").classList.add("hidden")
  alert("Please refresh the page")
}
}
saveKittens()
loadKittens() 
drawKitten()