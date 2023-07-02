// Function to fetch films from the JSON file
function fetchFilms() {
    return fetch('./db.json')
        .then(response => response.json())
        .then(data => data.films)
        .catch(error => console.log('Error:', error));
}

// Function to display available films
function displayFilms() {
    const filmsList = document.getElementById('films');
    filmsList.innerHTML = '';

    fetchFilms()
        .then(films => {
            films.forEach(film => {
                const filmItem = document.createElement('li');
                filmItem.textContent = film.title;
                filmItem.addEventListener('click', () => showFilmDetails(film.id));
                filmsList.appendChild(filmItem);
            });
        });
}

// Function to display film details
function showFilmDetails(filmId) {
    fetchFilms()
        .then(films => {
            const film = films.find(film => film.id === filmId);
            if (film) {
                document.getElementById('movietitle').textContent = film.title;
                document.getElementById('runtime').textContent = film.runtime;
                document.getElementById('showtime').textContent = film.showtime;
                document.getElementById('availabletickets').textContent = film.capacity - film.tickets_sold;
                document.getElementById('poster').src = film.poster;
                document.getElementById('ticketbtn').addEventListener('click', () => buyTicket(film));
                document.getElementById('deletebtn').addEventListener('click', () => deleteFilm(film.id));
            }
        });
}

// Function to buy a ticket
function buyTicket(film) {
    const availableTickets = film.capacity - film.tickets_sold;
    if (availableTickets > 0) {
        film.tickets_sold++;
        document.getElementById('availabletickets').textContent = availableTickets - 1;
        console.log(`Ticket bought for "${film.title}". Total tickets sold: ${film.tickets_sold}`);
    } else {
        console.log(`Sorry, no more tickets available for "${film.title}".`);
    }
}

// Function to delete a film
function deleteFilm(filmId) {
    fetch('./db.json')
        .then(response => response.json())
        .then(data => {
            const films = data.films;
            const filmIndex = films.findIndex(film => film.id === filmId);
            if (filmIndex !== -1) {
                films.splice(filmIndex, 1);
                console.log(`Film with ID ${filmId} has been deleted.`);
            }
        })
        .catch(error => console.log('Error:', error));
}

// Function to initialize the application
function init() {
    displayFilms();
}

// Initialize the application
init();
