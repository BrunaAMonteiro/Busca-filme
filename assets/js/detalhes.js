
const midiaId = localStorage.getItem("midiaId"); // id é salvo
const midiaTipo = localStorage.getItem("midiaTipo"); // filme ou tv

function fetchDetails() {
    const url = `https://api.themoviedb.org/3/${midiaTipo}/${midiaId}?api_key=92ef8d0e552aa54022ede7c7b1244305&language=pt-BR`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const details = document.getElementById("details");

            const nome = data.title || data.name;
            const generos = data.genres.map(g => g.name).join(", ");
            const descricao = data.overview || "Sem descrição disponível.";
            const nota = data.vote_average ? data.vote_average.toFixed(1) : "Nota indisponível";
            const poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

            details.innerHTML = `
    <div class="details-container">
        <div class="left">
            <img src="${poster}" alt="${nome}">
        </div>
        <div class="info">
            <div>
                <p class="info-title">${nome}</p>
                <p class="info-genre">${generos}</p>
            </div>
            <div class="badges">
                ${data.genres.map(g => `<span class="badge">${g.name}</span>`).join("")}
            </div>
            <div class="nota-row">
                <div class="nota-circle">${nota}</div>
                <p class="nota-text">Avaliação dos usuários</p>
            </div>
            <div class="descricao-box">
                <span class="label">Descrição</span>
                <p class="descricao">${descricao}</p>
            </div>
        </div>
    </div>
`;
        })
}

fetchDetails();