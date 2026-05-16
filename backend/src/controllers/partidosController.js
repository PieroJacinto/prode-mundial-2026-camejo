const partidos = {
    all: (req, res) => {
        try {
            const partidos = [ 
                {
                    id: 1, 
                    equipo_local: 'Argentina', 
                    equipo_visitante: 'Francia',
                    fase: "final"
                },
                {
                    id: 1, 
                    equipo_local: 'Brasil', 
                    equipo_visitante: 'Uruguay',
                    fase: "Semi-final"
                }
            ]

            res.json(partidos)
        } catch (error) {
            
        }
    }
}