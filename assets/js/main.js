
const bttn = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");


function carregarPopulares() {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=92ef8d0e552aa54022ede7c7b1244305&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(result => {
                if (!result.poster_path) return;

                const card = document.createElement("div");
                card.classList.add("card");

                const tipo = result.media_type === "movie" ? "Filme" : "Série";

                card.innerHTML = 
                `
                    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" 6alt="${result.title || result.name}">
                    <div class="card-body">
                        <p class="card-title">${result.title || result.name}</p>
                        <p class="card-type">${tipo}</p>
                    </div>
                `;

                card.addEventListener("click", function () {
                    localStorage.setItem("midiaId", result.id);
                    localStorage.setItem("midiaTipo", result.media_type);
                    window.location.href = "detalhes.html";
                });

                results.appendChild(card);
            });
        });
}

carregarPopulares();

function buscar() {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=92ef8d0e552aa54022ede7c7b1244305&query=${input.value}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            results.innerHTML = "";
            data.results.forEach(result => {
                if (!result.poster_path) return;

                const card = document.createElement("div");
                card.classList.add("card");

                const tipo = result.media_type === "movie" ? "Filme" : "Série";

                card.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title || result.name}">
                    <div class="card-body">
                        <p class="card-title">${result.title || result.name}</p>
                        <p class="card-type">${tipo}</p>
                    </div>
                `;

                card.addEventListener("click", function () {
                    localStorage.setItem("midiaId", result.id);
                    localStorage.setItem("midiaTipo", result.media_type);
                    window.location.href = "detalhes.html";
                });

                results.appendChild(card);
            });
        })
}

bttn.addEventListener("click", buscar);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        buscar();
    }
});
