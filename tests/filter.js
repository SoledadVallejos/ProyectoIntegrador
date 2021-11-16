

let products =
    [
        [
            {
                "id": 4,
                "file": "img-producto-polera-rojo1.jpg",
                "productId": 1,
                "categoryId": null,
                "createdAt": "2021-11-13T01:52:05.000Z",
                "updatedAt": null
            },
            {
                "id": 8,
                "file": "img-producto-polera-rojo2.jpg",
                "productId": 1,
                "categoryId": null,
                "createdAt": "2021-11-13T04:35:57.000Z",
                "updatedAt": null
            },
            {
                "id": 12,
                "file": "img-producto-polera-rojo3.jpg",
                "productId": 1,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:29.000Z",
                "updatedAt": null
            },
            {
                "id": 16,
                "file": "img-producto-polera-rojo4.jpg",
                "productId": 1,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:43.000Z",
                "updatedAt": null
            }
        ],
        [
            {
                "id": 5,
                "file": "img-producto-polera-blanco1.jpg",
                "productId": 2,
                "categoryId": null,
                "createdAt": "2021-11-13T01:52:05.000Z",
                "updatedAt": null
            },
            {
                "id": 9,
                "file": "img-producto-polera-blanco2.jpg",
                "productId": 2,
                "categoryId": null,
                "createdAt": "2021-11-13T04:35:57.000Z",
                "updatedAt": null
            },
            {
                "id": 13,
                "file": "img-producto-polera-blanco3.jpg",
                "productId": 2,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:29.000Z",
                "updatedAt": null
            },
            {
                "id": 17,
                "file": "img-producto-polera-blanco4.jpg",
                "productId": 2,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:43.000Z",
                "updatedAt": null
            }
        ],
        [
            {
                "id": 6,
                "file": "img-producto-polera-negro1.jpg",
                "productId": 3,
                "categoryId": null,
                "createdAt": "2021-11-13T01:52:05.000Z",
                "updatedAt": null
            },
            {
                "id": 10,
                "file": "img-producto-polera-negro2.jpg",
                "productId": 3,
                "categoryId": null,
                "createdAt": "2021-11-13T04:35:57.000Z",
                "updatedAt": null
            },
            {
                "id": 14,
                "file": "img-producto-polera-negro3.jpg",
                "productId": 3,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:29.000Z",
                "updatedAt": null
            },
            {
                "id": 18,
                "file": "img-producto-polera-negro4.jpg",
                "productId": 3,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:43.000Z",
                "updatedAt": null
            }
        ],
        [
            {
                "id": 7,
                "file": "img-producto-polera-beige1.jpg",
                "productId": 4, "categoryId": null,
                "createdAt": "2021-11-13T01:52:05.000Z",
                "updatedAt": null
            },
            {
                "id": 11,
                "file": "img-producto-polera-beige2.jpg",
                "productId": 4,
                "categoryId": null,
                "createdAt": "2021-11-13T04:35:57.000Z",
                "updatedAt": null
            },
            {
                "id": 15,
                "file": "img-producto-polera-beige3.jpg",
                "productId": 4,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:29.000Z",
                "updatedAt": null
            },
            {
                "id": 19,
                "file": "img-producto-polera-beige4.jpg",
                "productId": 4,
                "categoryId": null,
                "createdAt": "2021-11-13T04:36:43.000Z",
                "updatedAt": null
            }
        ]
    ]

let productsOff = products.map(index => {
    let imgs = index
    return imgs;
});
// console.log(productsOff);


let array = ["uno", "dos", "tres"]
let filtered = array.filter(index => {
    return index !== "uno" // SI NO ES IGUAL A UNO NO SE QUEDA
    return index === "uno" // SI ES IGUAL A UNO SE QUEDA
});
console.log(filtered);







