let myLibrary = [{name: "OK Computer", artist: "Radiohead", year: 1997, genre: "Rock", type: "LP", rating: 9}];

//DOM

const toggleContainer = document.getElementById('toggle-container');
const toggleBtn = document.getElementById('toggle-btn');
const rootColor = document.querySelector(":root");
const container = document.querySelector('.library')
const createBtn = document.querySelector('#btn-create')
const popUp = document.querySelector('form')

// LOCAL STORAGE

// Check if local storage is available

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log("Yippee! We can use localStorage awesomeness")
  }
else {
    alert("How about you open me in Google Chrome or Firefox without Incognito mode :)")
}

// Fetch from local storage

if(typeof(Storage) !== "undefined" && Storage !== null ) {
    setStyles();
    fetchLibrary();
} else {
    populateStorage();
    updateLocLibrary();
}

function populateStorage() {
    localStorage.setItem('darkMode', toggleBtn.classList.contains("dark-mode"));
}


function setStyles() {
    let isDarkMode = localStorage.getItem("darkMode");
    if (isDarkMode == "true"){
        toggleBtn.classList.add("dark-mode");
        rootColor.style.setProperty('--main-bg-color', "black");
        rootColor.style.setProperty('--main-text-color', "white");
    }
}

function updateLocLibrary() {
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
}

function fetchLibrary() {
    if (localStorage.getItem("localLibrary") !== null) {
        myLibrary = JSON.parse(localStorage.getItem("localLibrary"));
    }
}

// ALBUM CREATE

if (myLibrary !== null) {
    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i] !== null) {
            createCard(myLibrary[i])
        }
    }
}

class Album {
    constructor (name, artist, year, genre, type, rating) {
        this.name = name;
        this.artist = artist;
        this.year = year;
        this.genre = genre; // make it an array so it accepts multiple values //
        this.type = type;
        this.rating = rating;
        // add mood
    }
}

function addAlbumToLibrary() {

    event.preventDefault();
    const radioTypes = document.querySelectorAll('input[name="type"]');
    let typeValue;
    for (const radio of radioTypes) { // target checked radio button
        if (radio.checked) {
            typeValue = radio.value;
            break;
        }
    }
    var newAlbum = new Album(document.getElementById("name").value, document.getElementById("artist").value,
    document.getElementById("year").value, document.getElementById("genre").value,
    typeValue, document.getElementById("rating").value);
    // Improvement --- prevent creation if name and artist are the same
    myLibrary.push(newAlbum);
    createCard(newAlbum);
    popUp.reset();
    updateLocLibrary();
}


function createCard(album) {
    const albumCard = document.createElement("div");
    albumCard.setAttribute('class', 'album-card');

    const name = document.createElement("div");
    const artist = document.createElement("div");
    const year = document.createElement("div");
    const genre = document.createElement("div");
    const type = document.createElement("div");
    const rating = document.createElement("div");
    const deleteBtn = document.createElement("button");

    name.setAttribute('class', 'name');
    artist.setAttribute('class', 'artist');
    year.setAttribute('class', 'year');
    genre.setAttribute('class', 'genre');
    type.setAttribute('class', 'type');
    rating.setAttribute('class', 'rating');

    deleteBtn.setAttribute ('class', 'delete-btn');
    deleteBtn.addEventListener('click', deleteCard);
    /*
    const editBtn = document.createElement("button");
    editBtn.setAttribute ('class', 'edit-btn');
    editBtn.addEventListener('click', editCard);
    editBtn.textContent = "Edit";
    albumCard.appendChild(editBtn)
    */

    albumCard.dataset.index = document.getElementsByClassName("album-card").length;

    name.textContent = album.name;
    artist.textContent = album.artist;
    year.textContent = "Year: " + album.year;
    genre.textContent = "Genre: " + album.genre;
    type.textContent = "Type: " + album.type;
    rating.textContent = "Rating: " + album.rating;

    deleteBtn.textContent = "Delete";


    albumCard.appendChild(name)
    albumCard.appendChild(artist)
    albumCard.appendChild(year)
    albumCard.appendChild(genre)
    albumCard.appendChild(type)
    albumCard.appendChild(rating)
    albumCard.appendChild(deleteBtn)


    container.appendChild(albumCard);

    popUp.style.display = "none";
}

// GENERATE FORM

createBtn.addEventListener("click", showForm)

function showForm() {
    popUp.style.display = "block";
}

const exitButton = document.querySelector(".exit");

exitButton.addEventListener('click', function(){
    popUp.style.display = "none";
  });

function showEditForm() {
    popUp.style.display = "block";
}

const submitBtn = document.querySelector('#submit')
popUp.addEventListener("submit", addAlbumToLibrary)


// DELETE ALBUM

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {
    button.addEventListener('click', deleteCard)
});

function deleteCard(){
    var j = this.parentElement.dataset.index;
    this.parentElement.remove();
    console.log(this.parentElement);
    myLibrary.splice(j, 1);
    console.table(j);
    updateLocLibrary();
}

/*

function editCard() {
    showEditForm()
    var currentCard = this.parentElement;
    editForm.reset();
}

*/

// DARK MODE

toggleContainer.addEventListener("click", changeColor);

function changeColor() {
    if (toggleBtn.classList.contains("dark-mode") === true) {
        rootColor.style.setProperty('--main-bg-color', "white");
        rootColor.style.setProperty('--main-text-color', "black")
    }
    else {
        rootColor.style.setProperty('--main-bg-color', "black");
        rootColor.style.setProperty('--main-text-color', "white");
    }
    toggleBtn.classList.toggle("dark-mode");
    populateStorage();
}






