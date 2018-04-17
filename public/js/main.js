const SETUP = {
  MAX_NUM: 10,
  ROUNDS: 1000,
  MAX_ROUND_TIME: 1000,
  WIN_TOLERANCE: 0.1 // 0.1 === 10%
}

let startButton = document.getElementById('startButton')

startButton.addEventListener('click', function () {
  this.classList.add('hidden')



  let p1 = new Player('BosseGurka', trefemsju)
  //let p2 = new Player('Molnfnatt', nimGame.move)
  let p2 = new Player('Molnfnatt', trefemsju)
  //let p2 = new Player('NIM', stratNIM)
  //let p2 = new Player('Olof', Olof)

  let manager = new GameManager(Game, [p1, p2])

  manager.playMultipleRounds(SETUP.ROUNDS)
})
