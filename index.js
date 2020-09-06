const searchUpdate = document.querySelector('.searchUpdate');
const searchBtn = document.querySelector('.searchBtn');
const nominationsUL = document.querySelector('.nominations');
const movieList = document.querySelector('.movieInfo');
const finished = document.querySelector('.banner');
const count = document.querySelector('.count');
const bottomModal = document.querySelector('.bottomModal');
const clickable = document.querySelector('.clickable');
const deactivate = document.querySelector('button');


let nomArray = [];
let newArr = [];
let counter = 0;
const key = `406fb5b1`;
const title = `duck`;
  

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
            <li><a href="#" class="clickable"><img src="${movie.Poster}" alt="${movie.Title} ${movie.Type} poster" class="poster"></a></li>
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

        if(nomArray.length >=0 ){
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


 function showDetails(e){
    console.log(e);
     console.log('in');
 }

function nominate(e) {
    if (e.target.classList.contains('nominate')) {
        // getting the movie ID
        let idMovie = e.target.getAttribute('value' );
        e.target.disabled = true;
        e.target.classList.add('opacity');
        renderNom(idMovie);

        // addLocal(e.target.getAttribute('value'));
        // checkLocalStorage();
    }
}
function removal(e){

    if(e.target.classList.contains('remove')){
        removeLocal(e.target.getAttribute('value'));
         console.log(counter--);
        count.innerHTML = `${counter}`;

        let clicked = e.target.getAttribute('value');

        function isClicked(nomSearch) { 
            return nomSearch.imdbID === `${clicked}`;
          }
          let match = nomArray.find(isClicked);
          console.log(match);

          if(match){
              console.log('true');
              e.target.classList.add('hide');
          }
         
        // const newArr = nomArray.filter((item) => item!==clicked)
        // console.log(newArr) 
    }
}

document.addEventListener('click',function(e){
    console.log(e.target);
    // if(e.target.)
 });

// clickable.addEventListener('click', showDetails);
window.addEventListener('click', removal);
window.addEventListener('click', nominate);
searchUpdate.addEventListener('keyup', searchInputHandler);
searchBtn.addEventListener('click', searchInputHandler);


ApiHandler(title);
