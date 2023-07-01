// Let the DOM to wait until the content is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    //Get the elements from HTML 
    const filmList = document.getElementById("films");
    const movieTitle = document.getElementById("movietitle");
    const runTime = document.getElementById("runTime");
    const showTime = document.getElementById("showtime");
    const availableTickets = document.getElementById("availabletickets");
    const moviePoster = document.getElementById("movieposter");
    const buyTicketBtn = document.getElementById("buyticket");
    const deleteTicketBtn = document.getElementById("deletefilm");

    //Define the API endpoints
    const filmEndPoint ="http://localhost:3000/films";
    const filmDetailsEndpoint = "http://localhost:3000/films/1";

    //Set the Variable to display the film details
    let film = null;

    //Function to display the movie details
    const displayMovieDetails = (film) => {
        movieTitle.textContent = film.title;
        runTime.textContent = film.runtime;
        showTime.textContent = film.showtime;
        availableTickets.textContent = film.capacity - film.tickets_sold;
        moviePoster.src = film.poster;

    //Update the film variable 
        film = film;

    };

    //Funtion to fetch the film data and display the first details.
    const fetchFilmData = () => {
        fetch(filmDetailsEndpoint)
        .then(response => response.json())
        .then(film => displayMovieDetails(film))
        .catch(error => console.error('Error:'), error);

    };
})