// navbar.js — verifica sesion y renderiza botones de auth

const initNavbar = async () => {
  const auth = document.getElementById('navbar-auth')

  // marcar link activo segun la pagina actual
  document.querySelectorAll('.navbar__link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('navbar__link--active')
    }
  })

  // verificar si hay sesion activa
  try {
    const respuesta = await fetch('http://localhost:3000/api/auth/me', {
      credentials: 'include'
    })

    if (respuesta.ok) {
      const usuario = await respuesta.json()
      auth.innerHTML = `
        <span class="navbar__user">Hola, <strong>${usuario.nombre}</strong></span>
        <button class="navbar__auth-btn navbar__auth-btn--secondary" id="btn-logout">Salir</button>
      `
      document.getElementById('btn-logout').addEventListener('click', async () => {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
        window.location.href = '/pages/login.html'
      })
    } else {
      renderSinSesion(auth)
    }
  } catch {
    renderSinSesion(auth)
  }
}

const renderSinSesion = (auth) => {
  auth.innerHTML = `
    <a href="/pages/login.html"    class="navbar__auth-btn navbar__auth-btn--secondary">Ingresar</a>
    <a href="/pages/register.html" class="navbar__auth-btn navbar__auth-btn--primary">Registrarse</a>
  `
}

document.addEventListener('DOMContentLoaded', initNavbar)