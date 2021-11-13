'use strict';

// PRODUCTS IMAGES
let products = [
   {
      "id": 1,
      "name": "Polera Roja",
      "description": "Polera de mujer Roma",
      "image": "img-producto-polera-rojo1.jpg",
      "splideImages": [
         "img-producto-polera-rojo1.jpg",
         "img-producto-polera-rojo2.jpg",
         "img-producto-polera-rojo3.jpg",
         "img-producto-polera-rojo4.jpg"
      ],
      "category": "Oferta",
      "size": "M",
      "color": "Rojo",
      "price": 3950,
      "discount": 30
   },
   {
      "id": 2,
      "name": "Polera Blanca",
      "description": " Aprovechala YA! Es la última en stock!",
      "image": "img-producto-polera-blanco1.jpg",
      "splideImages": [
         "img-producto-polera-blanco1.jpg",
         "img-producto-polera-blanco2.jpg",
         "img-producto-polera-blanco3.jpg",
         "img-producto-polera-blanco4.jpg"
      ],
      "category": "sugest",
      "size": "40",
      "color": "Blanco",
      "price": 1900,
      "discount": 10
   },
   {
      "id": 3,
      "name": "Polera Negra",
      "description": "Polera de mujer Roma",
      "image": "img-producto-polera-negro.jpg",
      "splideImages": [
         "img-producto-polera-negro1.jpg",
         "img-producto-polera-negro2.jpg",
         "img-producto-polera-negro3.jpg",
         "img-producto-polera-negro4.jpg"
      ],
      "category": "Oferta",
      "size": "S",
      "color": "Negro",
      "price": "4444",
      "discount": 5
   },
   {
      "id": 4,
      "name": "Polera Beige",
      "description": "Polera de mujer Roma",
      "image": "img-producto-polera-beige.jpg",
      "splideImages": [
         "img-producto-polera-beige1.jpg",
         "img-producto-polera-beige2.jpg",
         "img-producto-polera-beige3.jpg",
         "img-producto-polera-beige4.jpg"
      ],
      "category": "Oferta",
      "size": "44",
      "color": "Beige",
      "price": "5555",
      "discount": 15
   }
]

let images = products.map(product => {
   let image = {
      // id: product.id, // NO NECESARIO
      file: product.splideImages[3], // CAMBIAR INDICE HASTA COMPLETAR TODAS LAS IMAGENES ( se usa sequelize db:seed:all) ITERANDO
      productId: product.id,
      categoryId: 2,
      createdAt: new Date
   }
   return image
})
// console.log(images); //COMPROBAR

module.exports = {
   up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('images', images, {}); 

   },

   down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Images', null, {});

   }
};
