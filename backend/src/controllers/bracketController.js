const { BracketsManager } = require('brackets-manager')
const { InMemoryDatabase } = require('brackets-memory-db')

const bracketController = {

  getBracket: async (req, res) => {
    try {
      const storage = new InMemoryDatabase()
      const manager = new BracketsManager(storage)

      await manager.create.stage({
        tournamentId: 0,
        name: 'Eliminatorias Mundial 2026',
        type: 'single_elimination',
        seeding: [
          '1° Grupo A', '2° Grupo B',
          '1° Grupo C', '2° Grupo D',
          '1° Grupo E', '2° Grupo F',
          '1° Grupo G', '2° Grupo H',
          '1° Grupo B', '2° Grupo A',
          '1° Grupo D', '2° Grupo C',
          '1° Grupo F', '2° Grupo E',
          '1° Grupo H', '2° Grupo G',
        ]
      })

      const data = await manager.get.stageData(0)

      res.json({
        stages:      data.stage,
        matches:     data.match,
        matchGames:  data.match_game,
        participants: data.participant,
      })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

}

module.exports = bracketController