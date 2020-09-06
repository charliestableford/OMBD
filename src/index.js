
// GLOBAL VARIABLES
const searchUpdate = document.querySelector('.searchUpdate');
const searchBtn = document.querySelector('.searchBtn');
const nominationsUL = document.querySelector('.nominations');
const movieList = document.querySelector('.movieInfo');
const finished = document.querySelector('.banner');
const count = document.querySelector('.count');
const bottomModal = document.querySelector('.bottomModal');
const clear = document.querySelector('.clear');
const clearnNom = document.querySelector('.clearNom');

let nomArray = [];
// defining for local storage
let nomItem;
let counter = 0;

const key = `406fb5b1`;
const title = `duck`;
    
// INPUT SEARCH HANDLER
function searchInputHandler(e) {
    e.preventDefault();
    const textSearch = searchUpdate.value;
    ApiHandler(textSearch);
}

// API CALL
async function ApiHandler(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${title}`);
    const searching = await response.json();
    if (searching.Response === "True") {
        // let search = [];
        // search.push(searching);
        console.log(searching.Search);
        display(searching.Search);
    } else {
        movieList.innerHTML = `
        <div class="noTitle">
        sorry we have nothing by that name!
        </div>`;
    }
}

// RENDER MOVIE RESULTS
function display(results) {
    movieList.innerHTML = results.map(movie =>
        `<ul class="info">
            <li><img src="${movie.Poster}" alt="${movie.Title} ${movie.Type} poster" onerror="this.src='https://via.placeholder.com/200x250/0e1920.png?text=Sorry+no+image';" class="poster"></li>
            <li class="details">${movie.Title} - ${movie.Year} <br><button class="nominate hov" value="${movie.imdbID}">Nominate</button></li>
         </ul>`
    ).join('');
}

// RENDER NOMINATIONS LIST
    async function renderNom(movieID){ 
        // make another call based on the movie id stored
        const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${movieID}`);
        const nomSearch = await response.json();
        if (nomSearch.Response === "True") {
        // add the search result to the nomArray  
        nomArray.push(nomSearch);
        res = init();
        //check each click, if there are more then 5 nominations then show banner
        if(nomArray.length >= 5 ){
            finished.classList.add("show");
        }
        //start counter when the nomArray is larger than one
        if(nomArray.length >= 0 ){
           total = res.length;
            console.log(counter++);
            count.innerHTML = `<span class="icon" role="img" aria-label="trophy">🏆 ${total}</span>`;
        }

        nominationsUL.innerHTML = nomArray.map(nomSearch =>
            `<ul class="NomUL">
                <li class="nomLi"><span class="icon" role="img" aria-label="trophy">🏆 </span>${nomSearch.Title} - ${nomSearch.Year} / ${nomSearch.imdbRating} <button class="remove hov" value="${nomSearch.imdbID}">Remove</button></li>
            </ul>`
        ).join('');
    }
 }

function nominate(e) {
    if (e.target.classList.contains('nominate')) {
       let movieID = e.target.getAttribute('value'); 
       addToLocalstorage(movieID)
        // getting the movie ID - which is the imbd id
        e.target.disabled = true;
        e.target.classList.add('opacity');
        renderNom(movieID);
    }
}

function removal(e){
    if(e.target.classList.contains('remove')){
        let movieID = e.target.getAttribute('value'); 
        removeLocal(movieID);
         console.log(counter--);
        //  res = init();
        count.innerHTML = `${res.length}`;
        //disable button + opacity.
        e.target.disabled = true;
        e.target.classList.add('opacity');

        const index = nomArray.findIndex(nomArray => nomArray.imdbID === `${movieID}`);
        console.log(`this is ${index}`);
        nomArray.splice(index, 1);
    }
}

//LOCALSTORAGE
function checkLocalStorage() {
    let res;
    res = init();
    if (res.length === 0) {
        console.log('nothing stored');
    } else {
        
        if(res.length>= 5){
            finished.classList.add("show");
            clear.innerHTML = `You're back! Want to change your nominations?`
        }
        console.log(counter++);
        total = res.length;
        count.innerHTML =  `<span class="icon" role="img" aria-label="trophy">🏆 ${total}</span>`;
    }
}

function clearLocalStorage(){
    localStorage.clear('nomination');
    location.reload();
}

function init() {
    // if there is nothing in the storage, start new array
   if(localStorage.getItem('nominated') === null) {
    nomItem = [];
   } else {
    // use parse for json.parse to make it back into an array
    nomItem = JSON.parse(localStorage.getItem('nominated'));
       
}
return nomItem;
}

function removeLocal(movieID) {
    // nomItem = init();
    nomItem.forEach((movie, index) => {
        if (movie === movieID) {
            nomItem.splice(index, 1);
        }
    });
    localStorage.setItem('nominated', JSON.stringify(nomItem));
}

function addToLocalstorage(movieID) {
    nomItem = init();
    nomItem.push(movieID);
    // use json.stringify to save into local storage
    localStorage.setItem('nominated', JSON.stringify(nomItem));
}

document.addEventListener('DOMContentLoaded', checkLocalStorage);
document.addEventListener('DOMContentLoaded', ApiHandler(title));
window.addEventListener('click', removal);
window.addEventListener('click', nominate);
searchUpdate.addEventListener('keyup', searchInputHandler);
searchBtn.addEventListener('click', searchInputHandler);
clearnNom.addEventListener('click', clearLocalStorage);

