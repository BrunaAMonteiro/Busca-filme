
const bttn = document.getElementById("searchButton");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");


function buscar(){
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=92ef8d0e552aa54022ede7c7b1244305&query=${input.value}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            results.innerHTML = ""; // Limpa os resultados anteriores
            data.results.forEach(result => {
                if (!result.poster_path) return; // se não tiver imagem, ignora
                
                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement("img"); 
                img.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;

                const titulo = document.createElement("p");
                titulo.textContent = result.title || result.name;
                
                card.appendChild(titulo);
                card.appendChild(img);
                card.addEventListener("click", function () {
                    localStorage.setItem("midiaId", result.id);
                    localStorage.setItem("midiaTipo",result.media_type);
                    window.location.href = "detalhes.html";
                });
                results.appendChild(card);


            });

        })
}

bttn.addEventListener("click", buscar); 

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscar();
    }
});