
// < !--REPASANDO ARRAYS... -->
// < !--index.splideImages[0] USANDO foreach-->


// PARA ACCEDER A VALORES DE ARRAY,ESTE DEBE TENER NOMBRE (SIN USAR foreach)
products =
    [
        {
            "id": 0,
            "name": "Polera Roja",
            "description": "Polera de mujer Roma",
            "image": "img-producto-polera-rojo1.jpg",
            "splideImages": [
                "img-producto-polera-rojo1.jpg",
                "img-producto-polera-rojo2.jpg",
                "img-producto-polera-rojo3.jpg",
                "img-producto-polera-rojo4.jpg",
                ["a", "be", "ce"],
                {
                    "nums": [
                        {
                            "uno": 1,
                            "dos": 2,
                            "tres": 3
                        }
                    ]
                }
            ],
            "category": "Oferta",
            "size": 38,
            "colors": "Rojo",
            "price": "3950",
            "discount": 30
        },
        {
            "id": 1,
            "name": "Polera Blanca",
            "description": " Aprovechala YA! Es la última en stock!",
            "image": "img-producto-polera-blanco1.jpg",
            "splideImages": [
                "img-producto-polera-blanco1.jpg",
                "img-producto-polera-blanco2.jpg",
                ["de", "e", "efe"],
                {
                    "nums": [
                        {
                            "cuatro": 4,
                            "cinco": 5,
                            "seis": 6,
                            "siete": 7
                        }
                    ]
                }
            ],
            "category": "sugest",
            "size": 40,
            "colors": "Blanco",
            "price": 1900,
            "discount": 10
        }
    ]
//                   index.     .splideImages[0] // USANDO foreach, index REPRESENTA CADA ÍNDICE DE ARRAY ITERADO
// console.log(products[0].splideImages[0]); // ACCEDIENDO A VALOR DE ARRAY SIN ITERAR
//               products[0]                                DEBE NOMBRARSE PRIMERO NOMBRE ARRAY + ÍNDICE QUE SE QUIERE ACCEDER...
//                                 .splideImages           ES NOMBRE DEL ÚLTIMO SUBGRUPO DE ÍNDICES
//                                                     [0]        ES EL ÍNDICE ESPECÍFICO AL CUAL QUIERO ACCEDER PARA MOSTRAR SU VALOR FINALMENTE
// IMPRIME: img-producto-polera-rojo1.jpg

let productsMap = products.map(index => {
    let img = [
        index.splideImages
    ]
    return img;
});
// IMPRIME
// [
//     [
//       [
//         'img-producto-polera-rojo1.jpg',
//         'img-producto-polera-rojo2.jpg',
//         'img-producto-polera-rojo3.jpg',
//         'img-producto-polera-rojo4.jpg'
//       ]
//     ],
//     [
//       [
//         'img-producto-polera-blanco1.jpg',
//         'img-producto-polera-blanco2.jpg'
//       ]
//     ]
//   ]

let productsMap2 = products.map(index => {
    let img = [
        index.splideImages[1]
    ]
    return img;
});
// IMPRIME
// [
//     ['img-producto-polera-rojo2.jpg'],
//     ['img-producto-polera-blanco2.jpg']
// ]

let productsMap3 = products.map(index => {
    let img = [
        index.splideImages[2].cuatro
    ]
    return img;
});
// IMPRIME
// [ [ undefined ], [ 4 ] ]

let productsMap4 = products.map(index => {
    let img = index.splideImages

    return img;
});
// IMPRIME



console.log(productsMap4);
