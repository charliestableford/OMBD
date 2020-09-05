console.log('made it');


const searchUpdate = document.querySelector('.searchUpdate');
const searchBtn = document.querySelector('.searchBtn');
const nominationsUL = document.querySelector('.nominations');
const movieList = document.querySelector('.movieInfo');

const nomArray = [];
// const title = 'batman';
const key = `406fb5b1`;
// const endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${title}`;

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
        // console.log(search);
        display(searching.Search);
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

// RENDER NOMINATIONS LIST
    async function renderNom(idMovie){ 
        console.log(idMovie);

        const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${idMovie}`);
        const nomSearch = await response.json();
        if (nomSearch.Response === "True") {
        console.log(nomSearch);     
        nomArray.push(nomSearch);
        console.log(nomArray);
        nominationsUL.innerHTML = nomArray.map(nomSearch =>
            `<ul class="NomUL">
                        <li>${nomSearch.Title} - ${nomSearch.Year} <button class="no" value="${nomSearch.imdbID}">Remove</button></li>
                    </ul>`
        );
    }
 }

function nominate(e) {
    if (e.target.classList.contains('nominate')) {
        // getting the movie ID
        let idMovie = e.target.getAttribute('value');
        //push values of movies into a new array

        renderNom(idMovie);
        // console.log(nomArray);
        // addToLocalstorage(e.target.getAttribute('value'));
        // checkLocalStorage();
    }
}

window.addEventListener('click', nominate);
searchUpdate.addEventListener('keyup', searchInputHandler);
searchBtn.addEventListener('click', searchInputHandler);

// ApiHandler();

