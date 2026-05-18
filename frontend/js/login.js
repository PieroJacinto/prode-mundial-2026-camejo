const API_URL = 'http://localhost:3000/api'

const isEmpty = (input) => input.value.trim() !== ''
const isEmail = (input) => /\S+@\S+\.\S+/.test(input.value.trim())

const validations = [
  {
    inputName: 'email',
    validations: [
      { validator: isEmpty, errorMsg: 'El email es obligatorio' },
      { validator: isEmail, errorMsg: 'El email no tiene un formato valido' }
    ]
  },
  {
    inputName: 'password',
    validations: [
      { validator: isEmpty, errorMsg: 'La password es obligatoria' }
    ]
  }
]

window.onload = () => {
  const formulario  = document.getElementById('formulario')
  const errorServer = document.getElementById('error-server')

  formulario.addEventListener('submit', async (evt) => {
    evt.preventDefault()

    errorServer.textContent = ''
    errorServer.classList.remove('auth__error--visible')

    const errores = []

    validations.forEach((inputToValidate) => {
      const input   = formulario[inputToValidate.inputName]
      const errorEl = document.getElementById(`error-${inputToValidate.inputName}`)

      errorEl.textContent = ''
      errorEl.classList.remove('auth__error--visible')

      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input)
        if (!isValid) {
          errores.push(validation.errorMsg)
          errorEl.textContent = validation.errorMsg
          errorEl.classList.add('auth__error--visible')
          return
        }
      }
    })

    if (errores.length > 0) return

    try {
      const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // lo necesioamos  para enviar y recibir cookies de sesion
        body: JSON.stringify({
          email:    formulario.email.value.trim(),
          password: formulario.password.value.trim()
        })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        errorServer.textContent = datos.error || 'Email o password incorrectos'
        errorServer.classList.add('auth__error--visible')
        return
      }

      // si todo salio bien, redirigimos a la vistra de todos los usuarios
      window.location.href = './usuarios.html'

    } catch (error) {
      errorServer.textContent = 'Error de conexion con el servidor'
      errorServer.classList.add('auth__error--visible')
    }
  })
}