console.log('profile.js success');
const $ = id => document.getElementById(id);

const selectProvincias = $('state');
const selectLocalidades = $('city');

const cargarProvincias = async () => {
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
        let result = await response.json();
        let provincias = result.provincias
        //console.log(provincias)
        provincias.sort( (prev,next) => prev.nombre > next.nombre ? 1 : prev.nombre < next.nombre ? -1 : 0);
        provincias.forEach(provincia => {
            selectProvincias.innerHTML += `<option value="${provincia.nombre}">${provincia.nombre}</option>`
        })
    } catch (error) {
        console.log(error)
    }
}

cargarProvincias();

selectProvincias.addEventListener('change', async function() {
    let response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=${this.value}`);
    let result = await response.json();
    let localidades = result.localidades;
    localidades.sort( (prev,next) => prev.nombre > next.nombre ? 1 : prev.nombre < next.nombre ? -1 : 0);
    selectLocalidades.innerHTML = null;
    localidades.forEach(localidad => {
        selectLocalidades.innerHTML += `<option value="${localidad.nombre}">${localidad.nombre}</option>`
    })
    console.log(result)
})
