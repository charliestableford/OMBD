console.log('made it');


const searchInput = document.querySelector('.search');
const title = 'batman';
const key = `406fb5b1`;
const endpoint = `https://www.omdbapi.com/?apikey=${key}&s=${title}`;
const movieList = document.querySelector('.movieBox');


async function ApiHandler(title) {
    const response = await fetch(endpoint);
    const searching = await response.json();
    if (searching.Response === "True") {
        console.log(searching);
        display(searching.Search);

    }
}

// function displayMatches(results) {
//     const matchArray = findMatches(this.value, results);
//     const html = matchArray.map(results => {
//       const regex = new RegExp(this.value, 'gi');
//       const movieTitle = results.movies.replace(regex, `<span class="hl">${this.value}</span>`);
//       return `
//         <li>
//           <span class="name">${movieTitle}</span>
//         </li>
//       `;
//     }).join('');
//     suggestions.innerHTML = html;
//   }

//   function findMatches(wordToMatch, title) {
//     return title.filter(results => {
//       // here we need to figure out if the city or state matches what was searched
//       const regex = new RegExp(wordToMatch, 'gi');
//       return results.city.match(regex) || results.state.match(regex)
//     });
//   }
  

function display(results) {
    movieList.innerHTML = results.map(movie =>
        `<div class="movieInfo">
                <div class="info">
                    <p>${movie.Title} - ${movie.Year}</p>
                </div>
                <button class="nominate" value="${movie.imdbID}">Nominate</button>
        </div>`
    ).join('');
}

function nominate(e) {
    if (e.target.classList.contains('nominate')) {
        // getting the movie ID.
        value = e.target.getAttribute('value');
        console.log('nominate');
        console.log(value)
        // addToLocalstorage(e.target.getAttribute('value'));
        // checkLocalStorage();
    }
}

window.addEventListener('click', nominate);
// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);
// searchInput.addEventListener('submit', ApiHandler());

// ApiHandler();

