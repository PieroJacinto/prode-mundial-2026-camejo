const API_URL = 'http://localhost:3000/api'

const isEmpty  = (input) => input.value.trim() !== ''
const isEmail  = (input) => /\S+@\S+\.\S+/.test(input.value.trim())
const isMinLen = (min) => (input) => input.value.trim().length >= min

const validations = [
  {
    inputName: 'nombre',
    validations: [
      { validator: isEmpty, errorMsg: 'El nombre es obligatorio' }
    ]
  },
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
      { validator: isEmpty,     errorMsg: 'La password es obligatoria' },
      { validator: isMinLen(4), errorMsg: 'La password debe tener al menos 4 caracteres' }
    ]
  }
]

document.addEventListener('DOMContentLoaded', () => {
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
      const respuesta = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:   formulario.nombre.value.trim(),
          email:    formulario.email.value.trim(),
          password: formulario.password.value.trim()
        })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        errorServer.textContent = datos.error || 'Error al registrarse'
        errorServer.classList.add('auth__error--visible')
        return
      }

      // registro exitoso, ir al login
      window.location.href = '/pages/login.html'

    } catch (error) {
      errorServer.textContent = 'Error de conexion con el servidor'
      errorServer.classList.add('auth__error--visible')
    }
  })
})