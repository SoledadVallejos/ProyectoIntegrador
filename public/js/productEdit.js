// NECESARIOEDIT
// SIMODIFICADO
// PONIENDO AQUI window.onload = () => {} PARA ESPERAR CARGUE HTML PRIMERO... (como en productValidator) NO FUNCIONA ESTE script

console.log('productEdit.js success');

const preview = document.getElementById('preview');

// MUESTRA prevista DE IMÁGEN AL SUBIR UNA IMÁGEN
const showPreview = array => {
    preview.innerHTML = null;
    array.forEach(image => {
        // ESTA RUTA DEBE SER LA DE NUESTRO ALMACEN DE IMÁGENES DE PRODUCTOS NO OTRO 
        // ORIGINALMENTE TENÍA SU RUTA DE ALMACÉN DE IMÁGENES POR DEFECTO, NO OTRO ESPECIAL
        //                      ORIGINAL /images/products
        preview.innerHTML += `
        <div class="col-4 text-center" >
            <img width="400" style="min-width: 3rem;"  src="/img/productDetail-splide/${image.file}" alt="">
            <div >
                <a onclick="deleteImage('${image.id}')" class="btn btn-danger ">Eliminar</a>
            </div>
        </div>
        `
    })
    return false
}
// MUESTRA prevista DE IMÁGEN AL SUBIR UNA IMÁGEN

// ELIMINA IMAGEN AL EDITAR
const deleteImage = async id => {
    try {
        let response = await fetch('/api/delete-image/' + id, {
            method: 'POST',
        })
        let result = await response.json()
        console.log(result)
        showPreview(result.images)
    } catch (error) {
        console.log(error)
    }
}
// ELIMINA IMAGEN AL EDITAR /

// MUESTRA IMÁGEN AL CARGAR UNA, EN EDICIÓN
const addImage = async (id, files) => {
    let data = new FormData()
    for (const file of files) {
        data.append('images', file, file.name)
    }
    console.log(data)

    try {
        let response = await fetch('/api/add-images/' + id, {
            method: 'POST',
            body: data,
        })
        let result = await response.json()
        showPreview(result.images)
    } catch (error) {
    }
}
// MUESTRA IMÁGEN AL CARGAR UNA, EN EDICIÓN /

