/**
 * Constructs a new Player
 *
 * @returns {Player}
 */
const Player = function (name, func) {
  this.name = name
  this.play = func
  this.wins = 0
  this.cheated = 0
  this.time = 0
}
