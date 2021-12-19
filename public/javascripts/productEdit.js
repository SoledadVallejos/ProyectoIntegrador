// NECESARIOEDIT

console.log('productEdit.js success');

const preview = document.getElementById('preview');





const addImage = async (id,files) => {
    let data = new FormData()
    for (const file of files) {
        data.append('images',file,file.name)
    }
    console.log(data)

    try {
        let response = await fetch('/api/add-images/' + id, {
            method: 'POST',
            body : data,
        })
        let result = await response.json()
        showPreview(result.images)
    } catch (error) {
        
    }
}