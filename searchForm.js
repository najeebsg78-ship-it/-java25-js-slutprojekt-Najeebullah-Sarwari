const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-results");
const sortSelect = document.getElementById("sort-select");
let currentResults = [];

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    searchResult.innerHTML = "";
    const searchText = searchInput.value.trim();
    if (searchText) {
        searchMovies(searchText);
        searchSeries (searchText);
        searchPerson(searchText);
        clearButton.style.display = "block"; 
    }   
});

async function searchMovies(searchText){
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchText}`);

    const data = await response.json();

    currentResults = data.results;  
    showSearchMovie(data.results);
}

function showSearchMovie(movies) {

    movies.forEach(function(movie) {
        searchResult.innerHTML += `
            <div class="movie-card">
                <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Release: ${movie.release_date}</p>
                <p>Score: ${movie.vote_average}</p>
            </div>
        `;

    });

}


async function searchSeries(searchText) {
    const response = await fetch (`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${searchText}`);

    const data = await response.json();
    showSearchSeries(data.results);
    
}

function showSearchSeries(series) {

    series.forEach(function(show) {
        searchResult.innerHTML += `
        <div class = "serie-card">
            <img src='${IMG_URL}${show.poster_path}' alt='${show.name} poster'>
            <h3>${show.name}</h3>
            <p>First Air Date: ${show.first_air_date}</p>
            <p>Rating: ${show.vote_average}</p>
        </div>
        `;
    });
}

async function searchPerson(searchText){
    const response = await fetch (`${BASE_URL}/search/person?api_key=${API_KEY}&query=${searchText}`);

    const data = await response.json();
    showSearchPersons(data.results);

}

function showSearchPersons(persons) {

    persons.forEach(function(person) {
        searchResult.innerHTML += `
        <div class="person-card">
            <img src="${IMG_URL}${person.profile_path}" alt="${person.name}">
            <h3>${person.name}</h3>
            <p>Avdelning: ${person.known_for_department}</p>
            <p>Popularitet: ${person.popularity}</p>
        </div>
        `;
    });
}

const clearButton = document.getElementById("clear-search");

clearButton.addEventListener ("click", function() {
    searchResult.innerHTML = "";
    searchInput.value = "";
    clearButton.style.display = "none";
});

sortSelect.addEventListener("change", function() {
    const value = sortSelect.value;

    if (value === "az") {
        currentResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "za") {
        currentResults.sort((a, b) => b.title.localeCompare(a.title));
    } else if (value === "high") {
        currentResults.sort((a, b) => b.vote_average - a.vote_average);
    } else if (value === "low") {
        currentResults.sort((a, b) => a.vote_average - b.vote_average);
    }

    searchResult.innerHTML = "";
    showSearchMovie(currentResults);
});