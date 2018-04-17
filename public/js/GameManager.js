
/**
 * Constructs a Game Manager
 *
 * @param {Game} game
 * @param {Array <Player>} players
 * @param {Object} args
 */
const GameManager = function (game, players, args) {
  this.Game = game

  this.players = players

  this.players.forEach(function (player, i) {
    document.getElementById('player-' + (i + 1)).innerHTML = player.name
    player.index = i
  })

  document.getElementById('heapSize').innerHTML = SETUP.MAX_NUM
  document.getElementById('nGames').innerHTML = SETUP.ROUNDS
  document.getElementById('winTolerance').innerHTML = SETUP.WIN_TOLERANCE * 100 + '%'
}

/**
 * Plays one round of the game
 *
 * @param {Object} args
 * @returns {undefined}
 */
GameManager.prototype.playRound = function (args) {
  let scope = this
  args = args || {}

  let game = new scope.Game(...scope.players)

  if (args.playerToStart !== undefined) game.setPlayerToStart(args.playerToStart)

  game.play()
  scope.updateScore()
}

/**
 * Plays multiple rounds of the game
 *
 * @param {Number} nRounds
 * @returns {undefined}
 */
GameManager.prototype.playMultipleRounds = function (nRounds) {
  let scope = this

  scope.nRounds = nRounds
  scope.nRoundsPlayed = 0

  function playNextRound () {
    scope.nRoundsPlayed += 1
    scope.playRound({ playerToStart: scope.nRoundsPlayed % 2 + 1 })

    if (scope.nRoundsPlayed < nRounds) setTimeout(playNextRound, 0)
  }

  playNextRound()
}

/**
 * Updates the game score board
 *
 * @returns {undefined}
 */
GameManager.prototype.updateScore = function () {
  let scope = this

  let results = []

  scope.players.forEach(function (player) {
    document.getElementById('p' + (player.index + 1) + '-score').children[0].style.height = player.wins / scope.nRounds * 100 + '%'

    let losses = scope.nRoundsPlayed - player.wins
    let wlRatio = Math.round(player.wins / scope.nRounds * 100) + '%'
    let winsPerTime = Math.round(player.wins / player.time * 1000) / 1000

    results[player.index] = {
      name: player.name,
      wins: player.wins,
      losses: losses,
      wlRatio: wlRatio,
      cheated: player.cheated,
      time: player.time,
      winsPerTime: winsPerTime
    }
  })

  if (scope.nRoundsPlayed >= scope.nRounds) {
    let winnerIndex = scope.getIndexOfWinnerFromResults(results)
    results = results.map((x, i) => {
      let rowClass = (i === winnerIndex) ? 'bg-success' : 'bg-danger'
      return '<tr class="' + rowClass + '"><td>' + Object.values(x).join('</td><td>') + '</td></tr>'
    })
    startButton.classList.remove('hidden')
  } else {
    results = results.map(x => '<tr><td>' + Object.values(x).join('</td><td>') + '</td></tr>')
  }

  document.getElementById('resultsTable').innerHTML = results.join('')
}

/**
 * Determines the winning player based on the results
 * Returns the index of the winner
 *
 * @param {Array<Object>} results
 * @returns {Number}
 */
GameManager.prototype.getIndexOfWinnerFromResults = function (results) {
  // Disqualify cheaters
  if (results[0].cheated > 0 && results[1].cheated > 0) return -1
  if (results[0].cheated > 0) return 1
  if (results[1].cheated > 0) return 0

  // Winner by margin
  if (results[0].wins > results[1].wins + SETUP.ROUNDS * SETUP.WIN_TOLERANCE) return 0
  if (results[1].wins > results[0].wins + SETUP.ROUNDS * SETUP.WIN_TOLERANCE) return 1

  // Winner by winsPerTime ratio
  if (results[0].winsPerTime > results[1].winsPerTime) return 0
  if (results[1].winsPerTime > results[0].winsPerTime) return 1

  // If everything fails, player 1 always wins. ofc.
  return 0
}
