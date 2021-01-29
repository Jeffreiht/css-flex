document.getElementById('form-music').addEventListener('submit', saveMusic);

function saveMusic(e) {
    let puesto = document.getElementById('puesto').value;
    let cancion = document.getElementById('cancion').value;
    let linkMusica = document.getElementById('link').value;
    let artista = document.getElementById('artista').value;

    const masPegadas = {
        puesto,
        cancion,
        linkMusica,
        artista
    };

    if (localStorage.getItem('musicas') === null) {
        let musicas = [];
        musicas.push(masPegadas);
        localStorage.setItem('musicas', JSON.stringify(musicas));
    } else {
        let musicas = JSON.parse(localStorage.getItem('musicas'));
        musicas.push(masPegadas);
        localStorage.setItem('musicas', JSON.stringify(musicas));
    }

    getMusics();
    e.preventDefault();
}

function getMusics() {
    let musicas = JSON.parse(localStorage.getItem('musicas'));
    let numerosView = document.getElementById('numeros');
    let cancionesView = document.getElementById('canciones');
    let artistasView = document.getElementById('artistas');

    numerosView.innerHTML = "";
    cancionesView.innerHTML = "";
    artistasView.innerHTML = "";
    
    for (let i = 0; i<musicas.length; i++) {
        let puesto = musicas[i].puesto;
        let cancion = musicas[i].cancion;
        let artista = musicas[i].artista;
        let linkMusic = musicas[i].linkMusica;

        numerosView.innerHTML += `
            <li>${puesto}</li>
        `;
        cancionesView.innerHTML += `
            <li><a href="${linkMusic}" target="_blank">${cancion}</a></li>
        `;
        artistasView.innerHTML += `
            <li>${artista} <a class="btn btn-danger" onclick="deleteMusic('${cancion}')">Borrar</a></li>
        `;
    }
}

function deleteMusic(cancion) {
    let musicas = JSON.parse(localStorage.getItem('musicas'));

    for (let i = 0; i< musicas.length; i++) {
        if (musicas[i].cancion == cancion) {
            musicas.splice(i,1);
        }
    }
    localStorage.setItem('musicas',JSON.stringify(musicas));
    getMusics();
}

getMusics();


