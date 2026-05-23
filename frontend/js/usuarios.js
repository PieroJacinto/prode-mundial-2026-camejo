const API_URL = 'http://localhost:3000/api'

const cargarUsuarios = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/usuarios`)
    const usuarios  = await respuesta.json()
    const tabla     = document.getElementById('cuerpo-tabla')

    usuarios.forEach(usuario => {
      tabla.innerHTML += `
        <tr class="tabla-usuarios__fila">
          <td class="tabla-usuarios__celda" data-label="Nombre">${usuario.nombre}</td>
          <td class="tabla-usuarios__celda" data-label="Email">${usuario.email}</td>
          <td class="tabla-usuarios__celda" data-label="Matecitos">${usuario.matecitos}</td>
        </tr>
      `
    })

  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

cargarUsuarios()