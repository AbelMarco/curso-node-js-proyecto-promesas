const axios = require('axios')
const exchangeRate = (from, to) => {
  return axios.get(`http://data.fixer.io/api/latest?access_key=9a851e4e00e97d8118d7fd1e23949191&base=EUR&symbols=${from},${to}`)
    .then((response) => {
      const { rates } = response.data
      return rates[to] / rates[from]
    })
}
/*
exchangeRate('USD', 'EUR')
  .then((cambioDivisa) => console.log(cambioDivisa))
  .catch((err) => console.log(err))
*/
const exchangeRate2 = async (from, to) => {
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=9a851e4e00e97d8118d7fd1e23949191&base=EUR&symbols=${from},${to}`)
  const { rates } = response.data
  return rates[to] / rates[from]
}
/*
exchangeRate2('JPY', 'AOA')
  .then((cambioDivisa) => console.log(cambioDivisa))
  .catch((err) => console.log(err))
*/
const getCountries = async (currency) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
  /* const countries = []
  response.data.forEach((country) => {
    countries.push(country.name)
  }) */

  return response.data.map(country => country.name)
}

getCountries('JPY')
  .then((countries) => console.log(countries))
  .catch((err) => console.log(err))

const convertCurrency = async (from, to, amount) => {
  const rate = await exchangeRate(from, to)
  return rate * amount
}

const getResult = async (from, to, amount) => {
  const [ total, countries ] = await Promise.all([convertCurrency(from, to, amount), getCountries(to)])
  console.log(`Con ${amount} ${from} tienes ${total} ${to} y los puedes gastar en: ${countries.join(', ')}`)
  return 5
}

getResult('EUR', 'JPY', 100)
