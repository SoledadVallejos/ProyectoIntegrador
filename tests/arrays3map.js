// conjunto de indices (grupo de numeros o llaves) indica que es un array
// grupos de claves:valores entre llaves son objetos literales
// estos objetos literales pueden contener  mas arrays
// pueden haber muchas combinaciones

let products =
    [
        {
            "id": 1,
            "name": "Polera Roja",
            "description": "Polera de mujer Roma",
            "image": "img-producto-polera-rojo1.jpg",
            "category": "Oferta",
            "size": 38,
            "color": "Rojo",
            "price": "3950",
            "discount": 30,
            "image": [
                {
                    id: 1,
                    "file": "banner_1.jpg",
                    show: true
                },
                {
                    id: 1,
                    "file": "banner_2.jpg",
                    show: true
                },
                {
                    id: 1,
                    "file": "banner_3.jpg",
                    show: true
                },
                {
                    id: 1,
                    "file": "banner_4.jpg",
                    show: true
                }
            ],
        }
        // {
        //     "id": 2,
        //     "name": "Polera Blanca",
        //     "description": " Aprovechala YA! Es la última en stock!",
        //     "category": "sugest",
        //     "size": 40,
        //     "color": "Blanco",
        //     "price": 1900,
        //     "discount": 10,
        //     "image": [
        //         {
        //         },
        //         {
        //         },
        //         {
        //         },
        //         {
        //         }
        //     ],
        // }
    ];

let productsMap = products.map(index => {
    let imgs = index.image
    // let images = imgs[0]
    // MAPEO ANIDADO
    let files = imgs.map(index => {
        let bimgs = index.file
        return bimgs;
    });
    // MAPEO ANIDADO /
    return files;
});
// console.log(productsMap);
// IMPRIME
// [['banner_1.jpg', 'banner_2.jpg', 'banner_3.jpg', 'banner_4.jpg']]

let data = products.map(index => {
    let names = index.name
    return names;
});
// console.log(data);
// IMPRIME
// ['Polera Roja']


let productsMap1 = products.map(index => {
    let img = index.image
    return img;
});
// let imgBanner = productsMap1[0]
// MAPEO NO ANIDADO
let files = productsMap1[0].map(index => {
    let imgs = index.file
    return imgs;
});
// MAPEO NO ANIDADO /
console.log(files);
// IMPRIME
// ['banner_1.jpg', 'banner_2.jpg', 'banner_3.jpg', 'banner_4.jpg']




