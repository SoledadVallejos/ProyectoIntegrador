let sectionBanner =
    [
        {
            "id": 1,
            "name": "banner",
            "createdAt": "2021-11-13T01:52:05.000Z",
            "updatedAt": null,
            "image":
                [
                    {
                        "id": 1,
                        "file": "banner-1.jpg",
                        "productId": null,
                        "categoryId": null,
                        "createdAt": "2021-11-13T01:52:05.000Z",
                        "updatedAt": null,
                        "section_image": {
                            "sectionId": 1,
                            "imageId": 1,
                            "createdAt": "2021-10-10T00:00:00.000Z",
                            "updatedAt": null
                        }
                    },
                    {
                        "id": 2,
                        "file": "banner-2.jpg",
                        "productId": null,
                        "categoryId": null,
                        "createdAt": "2021-11-13T01:52:05.000Z",
                        "updatedAt": null,
                        "section_image": {
                            "sectionId": 1,
                            "imageId": 2,
                            "createdAt": "2021-02-02T00:00:00.000Z",
                            "updatedAt": null
                        }
                    },
                    {
                        "id": 3,
                        "file": "banner-3.jpg",
                        "productId": null,
                        "categoryId": null,
                        "createdAt": "2021-11-13T01:52:05.000Z",
                        "updatedAt": null,
                        "section_image": {
                            "sectionId": 1,
                            "imageId": 3,
                            "createdAt": "2021-02-02T00:00:00.000Z",
                            "updatedAt": null
                        }
                    }
                ]
        }
    ]

let p1 = sectionBanner.map(index => {
    return index.image
});
let bannerImages = p1[0].map(index => { // p1[0]  CUANDO OBJ. LIITERALES ESTAN MUY ANIDADOS [[[{hola:"boludo"}]]]
    return index.file
});
console.log(p1);


