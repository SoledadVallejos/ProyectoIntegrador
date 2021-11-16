




let p =
    [
        {
            "id": 1,
            "name": "Polera Roja",
            "description": "Polera de mujer Roma",
            "size": "M",
            "color": "Rojo",
            "price": "3950.00",
            "discount": 30,
            "categoryId": null,
            "sectionId": null,
            "createdAt": "2021-11-13T01:52:05.000Z",
            "updatedAt": null,
            "image":
                [
                    {
                        "file": "img-producto-polera-rojo1.jpg"
                    },
                    {
                        "file": "img-producto-polera-rojo2.jpg"
                    },
                    {
                        "file": "img-producto-polera-rojo3.jpg"
                    },
                    {
                        "file": "img-producto-polera-rojo4.jpg"
                    }
                ]
        },
        {
            "id": 2,
            "name": "Polera Blanca",
            "description": " Aprovechala YA! Es la última en stock!",
            "size": "40",
            "color": "Blanco",
            "price": "1900.00",
            "discount": 10,
            "categoryId": null,
            "sectionId": null,
            "createdAt": "2021-11-13T01:52:05.000Z",
            "updatedAt": null,
            "image":
                [
                    {
                        "file": "img-producto-polera-blanco1.jpg"
                    },
                    {
                        "file": "img-producto-polera-blanco2.jpg"
                    },
                    {
                        "file": "img-producto-polera-blanco3.jpg"
                    },
                    {
                        "file": "img-producto-polera-blanco4.jpg"
                    }
                ]
        },
        {
            "id": 3,
            "name": "Polera Negra",
            "description": "Polera de mujer Roma",
            "size": "S",
            "color": "Negro",
            "price": "4444.00",
            "discount": 5,
            "categoryId": null,
            "sectionId": null,
            "createdAt": "2021-11-13T01:52:05.000Z",
            "updatedAt": null,
            "image":
                [
                    {
                        "file": "img-producto-polera-negro1.jpg"
                    },
                    {
                        "file": "img-producto-polera-negro2.jpg"
                    },
                    {
                        "file": "img-producto-polera-negro3.jpg"
                    },
                    {
                        "file": "img-producto-polera-negro4.jpg"
                    }
                ]
        },
        {
            "id": 4,
            "name": "Polera Beige",
            "description": "Polera de mujer Roma",
            "size": "44",
            "color": "Beige",
            "price": "5555.00",
            "discount": 15,
            "categoryId": null,
            "sectionId": null,
            "createdAt": "2021-11-13T01:52:05.000Z",
            "updatedAt": null,
            "image":
                [
                    {
                        "file": "img-producto-polera-beige1.jpg"
                    },
                    {
                        "file": "img-producto-polera-beige2.jpg"
                    },
                    {
                        "file": "img-producto-polera-beige3.jpg"
                    },
                    {
                        "file": "img-producto-polera-beige4.jpg"
                    }
                ]
        }
    ]




    let p1 = p.map(index => {
    return index.image[0].file // RECORRE CADA INDICE 0 Y VA AÑADIENDO CADA VALOR DE file EN INDICE 0
});

console.log(p1);