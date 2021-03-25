const axios = require('axios')

test('Obtener peliculas de la ciudad de mexico', () => {
  return axios.get('http://localhost:8080/movies?city=MEXICO').then(response => {
    expect(response?.data?.movies?.length).toBeGreaterThan(0)
  }).catch(error => {
    expect(error).toBeUndefined()
  })
})

test('detalle de la pelicula 1', () => {
  return axios.get('http://localhost:8080/movies/1').then(response => {
    expect(response?.data?.movie?.title).toEqual(expect.any(String))
  }).catch(error => {
    expect(error?.response?.status).toEqual(500)
  })
})
