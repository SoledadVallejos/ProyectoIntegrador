let result = [{ hola: "boludo", holis: "boludis" }]

result.forEach(obj => {
    Object.keys(obj.toJSON()).forEach(k => {
        if (typeof obj[k] === 'object') {
            Object.keys(obj[k]).forEach(j => obj[j] = obj[k][j]);
        }
    });
});

console.log(result);