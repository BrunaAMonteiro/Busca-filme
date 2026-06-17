
const midiaId = localStorage.getItem("midiaId"); // id é salvo
const midiaTipo = localStorage.getItem("midiaTipo"); // filme ou tv

    function fetchDetails() {
        const url = `https://api.themoviedb.org/3/${midiaTipo}/${midiaId}?api_key=92ef8d0e552aa54022ede7c7b1244305&language=pt-BR`;

        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    fetchDetails();