const fs = require('fs-extra')

const promise1 = fs.readFile('numero1', 'utf-8')
const promise2 = fs.readFile('numero2', 'utf-8')
Promise.all([promise1, promise2]).then((arrayValues) => {
  const sum = arrayValues.reduce((sum, x) => Number(sum) + Number(x))
  console.log(`El resultado mediante promesas y lectura asincrona de los ficheros ${sum}`)
}).catch((err) => console.log(err))
