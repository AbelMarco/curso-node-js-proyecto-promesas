const opositores = [{
  id: 1,
  name: 'Pepe',
  especialidad: 'Informática'
}, {
  id: 2,
  name: 'Leyre',
  especialidad: 'Sistemas y aplicaciones informáticas'
}]

const notas = [{
  id: 1,
  prueba: 'Práctica',
  nota: 3.5
}, {
  id: 1,
  prueba: 'Teórica',
  nota: 6.5
}, {
  id: 2,
  prueba: 'Práctica',
  nota: 3.5
}, {
  id: 2,
  prueba: 'Teórica',
  nota: 6.5
}
]

// crea promesa para obtener los datos del opositor 1

const getOpositor = (id) => {
  return new Promise((resolve, reject) => {
    const opositor = opositores.find((opositor) => opositor.id === id)
    if (opositor) {
      resolve(opositor)
    } else {
      reject(new Error(`No se ha encontrado al opositor con id: ${id}.`))
    }
  })
}

const getNotas = (id) => {
  return new Promise((resolve, reject) => {
    const nota = notas.filter((nota) => nota.id === id)
    if (nota.length) {
      resolve(nota)
    } else {
      reject(new Error(`No se ha encontrado las notas con Filter id: ${id}.`))
    }
  })
}

getOpositor(1).then((opositor) => console.log(opositor)).catch((err) => console.log(err))
// getOpositor(5).then((opositor) => console.log(opositor)).catch((err) => console.log(err))

// crea promesa para obtener las notas del opositor 1
const valor = []
const getNotas2 = (id) => {
  return new Promise((resolve, reject) => {
    notas.forEach((nota) => {
      if (nota.id === id) valor.push(nota)
    })
    if (valor.length) {
      resolve(valor)
    } else {
      reject(new Error(`No se ha encontrado las notas ForEach con id: ${id}.`))
    }
  })
}

getNotas(1).then((nota) => {
  console.log('=====      FILTER       =======')
  console.log(nota)
}).catch((err) => console.log(err))
getNotas2(2).then((nota) => {
  console.log('=====      FOREACH       =======')
  console.log(nota)
}).catch((err) => console.log(err))

// crea promesa para obtener el nombre y las notas del opositor1
const persona = 1
const promise1 = getOpositor(persona)
const promise2 = getNotas(persona)

Promise.all([promise1, promise2]).then((arrayValues) => {
  const { name, especialidad } = arrayValues[0]
  let media = 0
  arrayValues[1].forEach((nota) => {
    media = media + nota.nota
  })
  media = media / arrayValues[1].length
  console.log(`${name} tiene una media de ${media} en la oposición de ${especialidad}`)
}).catch((err) => console.log(err))

Promise.all([promise1, promise2]).then((arrayValues) => {
  const { name, especialidad } = arrayValues[0]
  const media = arrayValues[1].map(nota => nota.nota).reduce((sum, x) => (sum + x) / arrayValues.length)
  console.log(`${name} tiene una media de ${media} en la oposición de ${especialidad}`)
}).catch((err) => console.log(err))

const getOpositor2 = async id => {
  const opositor = await opositores.find((opositor) => opositor.id === id)
  if (opositor) return opositor
  else throw new Error(`No se ha encontrado al opositor con id: ${id}.`)
}

const getNotas3 = async id => {
  const nota = await notas.filter((nota) => nota.id === id)
  if (nota.length) return nota
  else throw new Error(`No se han encontrado notas con id: ${id}.`)
}

const getResultado = async (id) => {
  let op, not
  getOpositor2(id).then((data) => {
    op = data
  })
  await getNotas3(id).then((data) => {
    not = data
  }).catch((err) => { throw (err) })

  console.log(not)
  console.log(op)
  return 'bien'
}

getResultado(1)
