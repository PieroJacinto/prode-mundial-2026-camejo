const API_URL = 'http://localhost:3000/api'

const renderAuth = (auth, usuario) => {
  if (usuario) {
    auth.innerHTML = `
      <span class="navbar__user">Hola, <span>${usuario.nombre}</span></span>
      <button class="navbar__auth-btn navbar__auth-btn--secondary" id="btn-logout">Salir</button>
    `
    document.getElementById('btn-logout').addEventListener('click', async () => {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      window.location.href = '/pages/login.html'
    })
  } else {
    auth.innerHTML = `
      <a href="/pages/login.html" class="navbar__auth-btn navbar__auth-btn--secondary">Ingresar</a>
      <a href="/pages/register.html" class="navbar__auth-btn navbar__auth-btn--primary">Registrarse</a>
    `
  }
}

const initNavbar = async () => {
  const auth = document.getElementById('navbar-auth')

  // marcar link activo
  document.querySelectorAll('.navbar__link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('navbar__link--active')
    }
  })

  // verificar sesion
  try {
    const respuesta = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include'
    })
    if (respuesta.ok) {
      const usuario = await respuesta.json()
      renderAuth(auth, usuario)
    } else {
      renderAuth(auth, null)
    }
  } catch {
    renderAuth(auth, null)
  }
}

document.addEventListener('DOMContentLoaded', initNavbar)