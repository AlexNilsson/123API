const stratMax = function (state) {
  let largest = Math.max.apply(null, state)
  let largestPos = state.indexOf(largest)

  let turn = state.slice()
  turn[largestPos] = largest - 1

  return turn
}

const stratRand = function (state) {
  let largestPos = Math.floor(Math.random() * 3)

  let turn = state.slice()
  turn[largestPos] -= 1

  return turn
}

const stratNIM = function (state) {
  var stacks_xor = state.reduce((r, e) => r ^ e, 0)
  var is_endgame = state.reduce((r, e) => r + (e > 1), 0) < 2
  var move = state.reduce((move, stack, i) => {
    var take = stack - (is_endgame ^ stack ^ stacks_xor)
    return take > move[1] ? [i, take] : move
  }, [0, 0])

  let turn = state.slice()

  if (move[1] > 0) {
    turn[move[0]] -= move[1]
  } else {
    turn = stratMax(state)
  }

  return turn
}

const trefemsju = function (inputArray) {
     //* Ta fram siffrorna i rätt ordning där a ≤ b ≤ c
  inputArray.sort(function (a, b) { return a - b })
  var a = inputArray[0]
  var b = inputArray[1]
  var c = inputArray[2]

     // console.log("Sorted",a,b,c)

     //* x y z ska returneras och antas från början var a b c
  var x = a
  var y = b
  var z = c

     //* Det finns endast två relevanta fall då b = 0. c = 1 och c > 1
  if (b === 0) {
    z = (c === 1) ? 0 : 1

     //* Det finns endast två relevanta fall då b = 1. a = 0 och a = 1
  } else if (b === 1) {
    z = (a === 0) ? 0 : 1
  } else if ((a ^ b ^ c) !== 0) {
    if (c > (a ^ b)) {
      z = a ^ b
    } else if (b > (a ^ c)) {
      y = a ^ c
    } else if (a > (b ^ c)) {
          x = b ^ c
        }
  } else {
    z--
  }

  var answerArray = [x, y, z].sort(function (a, b) { return a - b })
      // console.log("Answer", answerArray);

  return answerArray
}

const Olof = (values) => [NaN, NaN, NaN]
