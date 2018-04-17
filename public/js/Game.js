/**
 * Constructs a new Game
 *
 * @param {Player} p1
 * @param {Player} p2
 * @returns {Game}
 */
const Game = function (player1, player2) {
  this.player1 = player1
  this.player2 = player2

  this.state = [
    Math.trunc(Math.random() * SETUP.MAX_NUM),
    Math.trunc(Math.random() * SETUP.MAX_NUM),
    Math.trunc(Math.random() * SETUP.MAX_NUM)
  ]

  this.turnTaker = 1

  this.hasWinner = false
}

/**
 * Sets the player to take the first move
 *
 * @param {Number} playerIndex
 * @returns {undefined}
 */
Game.prototype.setPlayerToStart = function (playerIndex) {
  this.turnTaker = playerIndex
}

/**
 * Plays one round of the game
 *
 * @returns {Promise <undefined>}
 */
Game.prototype.play = function () {
  var scope = this

  let state, turn

  // players[0] plays, players[1] waits for next round.
  let players = [scope.player1, scope.player2]

  if (scope.turnTaker !== 1) players.reverse()

  let turnTakerLost = () => Math.max.apply(null, turn) <= 0
  let turnTakerCheated = () => scope.isValidTurn(turn, state) === false

  while (scope.hasWinner === false) {
    state = scope.state.slice()

    let startTime = new Date()

    turn = players[0].play(state)

    players[0].time += new Date() - startTime

    let cheated = turnTakerCheated()

    if (turnTakerLost() || cheated) {
      if (cheated) {
        players[0].cheated += 1
        console.warn(players[0].name, 'cheated! Played:', state, '=>', turn)
      }

      // turnTaker lost -> otherPlayer won
      players[1].wins += 1
      scope.hasWinner = true
    }

    scope.state = turn.slice()

    players.reverse()
  }

}

/**
 * Validates the turntakers move
 * Cheaters will be burned
 *
 * @param {Array} turn
 * @param {Array} state
 * @returns {Boolean}
 */
Game.prototype.isValidTurn = function (turn, state) {
    // § <turn> must be of type Array
    // § <turn> must have a length of 3
    // § the sum of <turn> must be less than the sum of <state>
    // § all entries in <turn> must be integers
    // § all entries in <turn> must be positive or zero

    /**
     * determines the number of changed entries between <turn> & <state>
     *
     * @param {Array} turn
     * @param {Array} state
     * @returns {Number}
     */
  const nChangedEntries = function (turn, state) {
    let nChanged = 0

    let _state = state.slice()
    let _turn = turn.slice()

    state.forEach(function (n) {
      let _turnIndex = _turn.indexOf(n)

      if (_turnIndex >= 0) {
        let _stateIndex = _state.indexOf(n)

        _state.splice(_stateIndex, 1)
        _turn.splice(_turnIndex, 1)
      } else {
        nChanged += 1
      }
    })

    return nChanged
  }

  let isValid = false

  let isArray = Array.isArray(turn)

  // Check global Type & Length
  if (isArray && turn.length === 3) {
    let nChanged = nChangedEntries(turn, state)

    // Check nChanged & sum
    if (nChanged === 1) {
      let sum = (a, b) => a + b

      if (turn.reduce(sum) <= state.reduce(sum)) isValid = true
    }

    // Check data type of entries
    if (turn.some(x => Number.isInteger(x) === false)) isValid = false

    // Check for negative entries
    if (turn.some(x => x < 0)) isValid = false
  }

  return isValid
}
