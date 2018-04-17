const testTurn = function (returnA, givenB) {
  console.log(Game.prototype.isValidTurn(returnA, givenB))
}

const runTests = function () {
  console.warn('ALL TRUE')
  testTurn([0, 0, 0], [0, 0, 1])
  testTurn([0, 0, 0], [0, 1, 0])
  testTurn([0, 0, 0], [1, 0, 0])
  testTurn([0, 0, 1], [1, 1, 0])
  testTurn([0, 1, 0], [1, 1, 0])
  testTurn([1, 0, 0], [1, 1, 0])
  testTurn([1, 0, 0], [1, 10, 0])

  console.warn('ALL FALSE')
  testTurn([], [0, 0, 2])
  testTurn('not', [0, 0, 2])
  testTurn('123', [0, 0, 2])
  testTurn('001', [0, 0, 2])
  testTurn(['0', '0', '1'], [0, 0, 2])
  testTurn([0, 1], [0, 0, 2])
  testTurn([0, 0], [0, 0, 2])
  testTurn([0], [0, 0, 2])
  testTurn([1], [0, 0, 2])

  testTurn([0, 0, 0], [0, 0, 2])
  testTurn([0, 0, 0], [0, 0, 100])
  testTurn([0, 0, '1'], [0, 0, 2])
  testTurn([0, 0, 1.1], [0, 0, 2])
  testTurn([0, 0, -1], [0, 0, 2])
  testTurn([2, 2, -1], [2, 2, 0])

  testTurn([1, 1, 1], [2, 2, 1])
  testTurn([2, 2, 2], [2, 2, 1])
  testTurn([1, 1, 1], [1, 1, 1])
}
