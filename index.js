const searchUpdate = document.querySelector('.searchUpdate');
const searchBtn = document.querySelector('.searchBtn');
const nominationsUL = document.querySelector('.nominations');
const movieList = document.querySelector('.movieInfo');
const finished = document.querySelector('.banner');

let nomArray = [];
let counter = 0;
const key = `406fb5b1`;

function searchInputHandler(e) {
    e.preventDefault();
    const textSearch = searchUpdate.value;
    ApiHandler(textSearch);
}

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
                    <li>${movie.Title} - ${movie.Year} <button class="nominate" value="${movie.imdbID}">Nominate</button></li>
                </ul>`
    ).join('');
}

// <li><img src="${movie.Poster}" alt="${movie.Title} ${movie.Type} poster"></li>

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

        nominationsUL.innerHTML = nomArray.map(nomSearch =>
            `<div class="num"></div>
            <ul class="NomUL">
                <li>${nomSearch.Title} - ${nomSearch.Year} / ${nomSearch.imdbRating} <button class="remove" value="${nomSearch.imdbID}">Remove</button></li>
            </ul>`
        ).join('');
    }
 }

function nominate(e) {
    if (e.target.classList.contains('nominate')) {
        // getting the movie ID
        let idMovie = e.target.getAttribute('value');
        e.target.disabled = true;
        renderNom(idMovie);

        // addToLocalstorage(e.target.getAttribute('value'));
        // checkLocalStorage();
    }
}

function removeNom(e){
    if(e.target.classList.contains('remove')){
        // console.log(e.target.getAttribute('value'));
        let clicked = e.target.getAttribute('value');
        delete nomArray.clicked;
        // console.log('remove');
        // console.log(nomArray);
        console.log(nomArray);
        // removeToLocalstorage(e.target.getAttribute('value'));
    }
}



window.addEventListener('click', nominate);
window.addEventListener('click', removeNom);
searchUpdate.addEventListener('keyup', searchInputHandler);
searchBtn.addEventListener('click', searchInputHandler);


