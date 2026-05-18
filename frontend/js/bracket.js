async function init() {
    const respuesta = await fetch('http://localhost:3000/api/bracket')
    const data = await respuesta.json()

    await window.bracketsViewer.render(
    {
        stages:       data.stages,
        matches:      data.matches,
        matchGames:   data.matchGames,
        participants: data.participants,
    }, {
        selector: '#bracket'
    })

    document.querySelectorAll('.brackets-viewer h3').forEach((el, i) => {
        const nombres = ['Octavos de final', 'Cuartos de final', 'Semifinales', 'Final']
        if (nombres[i]) el.textContent = nombres[i]
    })
}

init()