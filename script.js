const API_KEY = 'b2ec054cb58f7a01dc9d1c33c3fd49d8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById("movie-list");
const serieContainer = document.getElementById("series-list");
const topRatedMovieContainer = document.getElementById("top-rated-movies-list");
const topRatedSeriesContainer = document.getElementById("top-rated-series-list");

//movie
async function getMovies(){
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

    const data = await response.json();
    console.log(data);
    showMovies(data.results.slice(0, 7));
}

function showMovies(movies){
    movieContainer.innerHTML = "";    

    movies.forEach(function(movie) {
        movieContainer.innerHTML += `
        <div class = "movie-card">
            <img src='${IMG_URL}${movie.poster_path}' alt='${movie.title} poster'>
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        </div>
        `;
    });

}

//Serie
async function getSeries(){
    const response = await fetch (`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    showSeries(data.results.slice(0, 7));
}

function showSeries(series){
    serieContainer.innerHTML = "";

    series.forEach(function(show) {
        serieContainer.innerHTML += `
        <div class = "serie-card">
            <img src='${IMG_URL}${show.poster_path}' alt='${show.name} poster'>
            <h3>${show.name}</h3>
            <p>First Air Date: ${show.first_air_date}</p>
            <p>Rating: ${show.vote_average}</p>
        </div>
        `;
    });
}

//topRatedMovies
async function getTopRatedMovies(){
    const response = await fetch (`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    showTopRatedMovies (data.results.slice(0, 7));

}

function showTopRatedMovies(top_rated) {
    topRatedMovieContainer.innerHTML = "";
    
    top_rated.forEach(function(top) {
        topRatedMovieContainer.innerHTML += `
        <div class = "topRatedMovie-card">
            <img src='${IMG_URL}${top.poster_path}' alt='${top.title} poster'>
            <h3>${top.title}</h3>
            <p>Release Date: ${top.release_date}</p>
            <p>Rating: ${top.vote_average}</p>
        </div>
        `;
    });
}

//topRatedSeries
async function getTopRatedSeries(){
    const response = await fetch (`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    showTopRatedSeries (data.results.slice(0, 7));

}

function showTopRatedSeries(top_rated) {
    topRatedSeriesContainer.innerHTML = "";
    
    top_rated.forEach(function(top) {
        topRatedSeriesContainer.innerHTML += `
        <div class = "topRatedSeries-card">
            <img src='${IMG_URL}${top.poster_path}' alt='${top.name} poster'>
            <h3>${top.name}</h3>
            <p>First Air Date: ${top.first_air_date}</p>
            <p>Rating: ${top.vote_average}</p>  
        </div>
        `;
    });
}




getMovies();
getSeries();
getTopRatedMovies();
getTopRatedSeries();
