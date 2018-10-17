const axios = require('axios')
const exchangeRate = (from, to) => {
  return axios.get(`http://data.fixer.io/api/latest?access_key=9a851e4e00e97d8118d7fd1e23949191&base=EUR&symbols=${from},${to}`)
    .then((response) => {
      const { rates } = response.data
      return rates[to] / rates[from]
    })
}

exchangeRate('USD', 'EUR')
  .then((cambioDivisa) => console.log(cambioDivisa))
  .catch((err) => console.log(err))
