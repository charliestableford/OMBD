async function consultApiModal(idMovie) {
    const response = await fetch(`//www.omdbapi.com/?i=${idMovie}&apikey=1e13fde`);
    const resultInfo = await response.json();
    renderResultModal(resultInfo);
}

function openModal(e) {
    const btnViewMore = e.target.parentElement;
    if (btnViewMore.classList.contains('view-more')) {
        consultApiModal(btnViewMore.getAttribute("id"));
    }
}

function renderResultModal(movie) {
    modal.innerHTML = `
            <div class="modal-content">
                <div class="close">
                    <p class="title">${movie.Title}</p>
                    <button class="close-info"><i class="fas fa-times close-button"></i></button>
                </div>
                <div class="info-movie">
                    <img src="${movie.Poster}" alt="">
                    <p class="genre">${movie.Genre}</p>
                    <div class="icons-bar">
                        <p><i class="fas fa-clock"></i> ${movie.Runtime}</p>
                        <p><i class="fas fa-comments"></i> ${movie.Language}</p>
                        <p class="imdbRating"><i class="fab fa-imdb"></i> ${movie.imdbRating}</p>
                    </div>
                    <div class="info-create-movie">
                        <p><span>Director: </span>${movie.Director}</p>
                        <p><span>Actors: </span>${movie.Actors}</p>
                        <p><span>Writers: </span>${movie.Writer}</p>
                        <p><span>About: </span> ${movie.Plot}</p>
                    </div>
                    <button class="delete favourite" value="${movie.imdbID}">Remove to favourites <i class="fas fa-heart"></i></button>
                </div>
            </div>
    `;

    modal.classList.add("show");
}

function closeModal(e) {
    if (e.target.classList.contains('close-button') || e.target.classList.contains('close-info')) {
        modal.classList.remove("show");
    }
}