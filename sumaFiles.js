const fs = require('fs')
const numero1 = fs.readFileSync('./numero1', 'utf-8')
const numero2 = fs.readFileSync('./numero2', 'utf-8')
console.log(`El resultado de la suma es  ${parseInt(numero1) + parseInt(numero2)}`)

fs.readFile('./numero1', 'utf-8', (err, numero1) => {
  if (err) console.log(err)
  else {
    fs.readFile('./numero2', 'utf-8', (err2, numero2) => {
      if (err2) console.log(err2)
      else console.log(`Resultado asíncrono es: ${parseInt(numero1) + parseInt(numero2)}`)
    })
  }
})

let numero

const getData = (fileName, type) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(parseInt(data))
    })
  })

getData('numero1', 'utf-8')
  .then(fileContent => {
    numero = fileContent
    return getData('numero2')
  })
  .then(numeros => console.log(`El resultado con promesas es  ${numero + numeros}`))
  .catch(err => console.log(err))

const promise1 = getData('numero1', 'utf-8')
const promise2 = getData('numero2', 'utf-8')
Promise.all([promise1, promise2]).then((arrayValues) => {
  const sum = arrayValues.reduce((sum, x) => sum + x)
  console.log(`El resultado mediante promesas y lectura asincrona de los ficheros ${sum}`)
}).catch((err) => console.log(err))
