
// GLOBAL VARIABLES
const searchUpdate = document.querySelector('.searchUpdate');
const searchBtn = document.querySelector('.searchBtn');
const nominationsUL = document.querySelector('.nominations');
const movieList = document.querySelector('.movieInfo');
const finished = document.querySelector('.banner');
const count = document.querySelector('.count');
const bottomModal = document.querySelector('.bottomModal');

let nomArray = [];
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
            <li><img src="${movie.Poster}" alt="${movie.Title} ${movie.Type} poster" class="poster"></li>
            <li class="details">${movie.Title} - ${movie.Year} <br><button class="nominate hov" value="${movie.imdbID}">Nominate</button></li>
         </ul>`
    ).join('');
}

// RENDER NOMINATIONS LIST
    async function renderNom(idMovie){ 
        console.log(idMovie);
        // make another call based on the movie id stored
        const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${idMovie}`);
        const nomSearch = await response.json();
        if (nomSearch.Response === "True") {
        console.log(nomSearch);   
        // add the search result to the nomArray  
        nomArray.push(nomSearch);

        //check each click, if there are more then 5 nominations then show banner
        if(nomArray.length >= 5){
            finished.classList.add("show");
        }

        //start counter when the nomArray is larger than one
        if(nomArray.length >= 0 ){
            console.log(counter++);
            count.innerHTML = `<span class="icon" role="img" aria-label="trophy">🏆 ${counter}</span>`;
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
        // getting the movie ID
        let idMovie = e.target.getAttribute('value' );
        e.target.disabled = true;
        e.target.classList.add('opacity');
        renderNom(idMovie);
    }
}

function removal(e){
    if(e.target.classList.contains('remove')){
        // removeLocal(e.target.getAttribute('value'));
         console.log(counter--);
        count.innerHTML = `${counter}`;
        //disable button + opacity.
        e.target.disabled = true;
        e.target.classList.add('opacity');

        let clicked = e.target.getAttribute('value');

        // update nomArray - to not include the movie you removed.
        const index = nomArray.findIndex(nomArray => nomArray.imdbID === `${clicked}`);
        console.log(`this is ${index}`);

        nomArray.splice(index, 1);
    }
}

window.addEventListener('click', removal);
window.addEventListener('click', nominate);
searchUpdate.addEventListener('keyup', searchInputHandler);
searchBtn.addEventListener('click', searchInputHandler);


ApiHandler(title);
