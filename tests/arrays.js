let p = [
    {
        id: 0,
        name: 'Polera Roja',
        description: 'Polera de mujer Roma',
        imagen: 'img-producto-polera-beige.jpg',
        category: '20% OFF',
        size: 0,
        colors: 'Rojo',
        price: '$3.950',
        discount: 33
    },
    {
        id: 1,
        name: 'Polera beige Oferta',
        description: 'Aprovechala!',
        imagen: [
            'img-producto-polera-rojo1.jpg',
            'img-producto-polera-rojo2.jpg',
            'img-producto-polera-rojo3.jpg'
        ],
        category: '10% OFF',
        size: 1,
        colors: 'Beige',
        price: 1950,
        discount: 33
    }
]
console.log(p[1].imagen[2]);
/* 
$ node arrays
[
  'img-producto-polera-rojo1.jpg',
  'img-producto-polera-rojo2.jpg',
  'img-producto-polera-rojo3.jpg'
]
 */
//ACCEDER A IMAGENES DE imagen CON FOR
for (let i = 0; i < p.length; i++) {
    const element = p[i].imagen; // PROPIEDAD+INDICE+PROPIEDAD+INDICE.... EL NOMBRE DEL ARRAY ES NECESARIO
    // console.log(element);
};
/*
RESULT:
$ node arrays
img-producto-polera-beige.jpg
[
  'img-producto-polera-rojo1.jpg',
  'img-producto-polera-rojo2.jpg',
  'img-producto-polera-rojo3.jpg'
]
 */



/* console.log(p[0].price);
console.log(p[0].id);
console.log(p[0].imagen[0]); */