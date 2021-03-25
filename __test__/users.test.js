const axios = require('axios')

test('Obtener el token al hacer login', () => {
  const data = {
    username: 'test',
    password: 'testPass'
  }
  return axios.post('http://localhost:8080/users/getToken', data).then(response => {
    expect(response?.data?.user?.id).toEqual(1)
    expect(response?.data?.user?.username).toEqual('test')
    expect(response?.data?.token).toEqual(expect.any(String))
  }).catch(error => {
    expect(error).toBeUndefined()
  })
})

test('Obtener el token con usuario incorrecto para no accesar', () => {
  const data = {
    username: 'tessdfsdt',
    password: 'testPsdfsdfsass'
  }
  return axios.post('http://localhost:8080/users/getToken', data).then(response => {
    expect(response).toBeUndefined()
  }).catch(error => {
    expect(error?.response?.status).toEqual(500)
  })
})


test('Rechazar si no hay sesion al solicitar mis peliculas reservadas', () => {
  return axios.get('http://localhost:8080/users/1/movies').then(response => {
    expect(response).toBeUndefined()
  }).catch(error => {
    expect(error?.response?.status).toEqual(401)
  })
})
