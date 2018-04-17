if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){ 
  var convnetjs = require('convnetjs');

}
var sortBySize = (a,b)=>a > b;

//0 is the label for losing and 1 is the label for winning
const losingValue = 0;
const winningValue = 1;

  
//this is the values [0,5,6], [0,7,8] which makes the 
// opponent give back 0,5,5
var losingMoves5 = ()=>{
  var arr = [];
  for(var i = 1; i < 10;i++){
    for(var j =i;j< 10;j++){


      arr.push([0,i,j]); 
    }
  }


  var newArr = arr.filter(arr=>{
    return arr[1] !== arr[2];

  });


  var returnArr = newArr.map(arr=>{
    return {arr:arr, value:losingValue}

  });


  return returnArr;

}

var losingMoves6 = ()=>{
  var arr = [];

  for(var i = 1; i < 10; i++){
    for(var j = 1; j < 10; j++){
      arr.push([i,i,j]);
    }
  }

  return arr.map(arr=>{

    return {arr:arr, value:losingValue};
  });

}

var losingMoves7 = ()=>{
  var arr = [];

  for(var i = 7; i < 10; i++){
      arr.push([2,4,i]);

  }
  for(var i = 5; i < 10; i++){
      arr.push([2,i,6]);

  }


  return arr.map(arr=>{

    return {arr:arr, value:losingValue};
  });

}

var losingMoves8 = ()=>{

  var arr = [];

  for(var i = 4; i < 10; i++){
    arr.push([1,2,i]);


  return arr.map(arr=>{

    return {arr:arr, value:losingValue};
  });
  }

}

var losingMoves9 = ()=>{

  var arr = [];

  for(var i = 2; i < 10; i++){
    arr.push([1,1,i]);


  return arr.map(arr=>{

    return {arr:arr, value:losingValue};
  });
  }

}


var losingMoves4 = ()=>{


  var losingMoves4 = [];

  for(var i = 6; i < 10;i++){
    var obj = {
      arr: [1,4,i], value: losingValue
    }
    losingMoves4.push(obj); 
  }

  return losingMoves4;

}

var losingMoves3 = ()=>{
  var losingMoves = [];
  for(var i = 1; i < 10; i++){
    for(var j = 2; j < 10; j++){
      
      var obj = {
        arr: [i,j,j],
        value: losingValue
      }
      losingMoves.push(obj);

    }
  }

  return losingMoves;

}

var losingMoves2 = ()=>{
  var losingMoves = [];
  for(var i = 5; i < 10;i = i + 2){
    var obj = {
      arr: [1,i,i+1],
      value: losingValue
    }
    losingMoves.push(obj); 
  }

  return losingMoves;

}
var losingMoves1 = ()=>{
  var losingMoves = [];
  for(var i = 2; i < 10;i++){
    var arr = [0,0,i];
    var obj = {
      arr: [0,0,i],
      value: losingValue
    }
    losingMoves.push(arr); 
  }

  return losingMoves;

}

var generateLosingData = ()=>{
  /*
  var losingSet = [ ].
    concat(losingMoves1()).
    concat(losingMoves2()).
    concat(losingMoves3()).
    concat(losingMoves4()).
    concat(losingMoves5()).
    concat(losingMoves6()).
    concat(losingMoves7()).
    concat(losingMoves8()).
    concat(losingMoves9());*/

  var losingValues = [
    [1,2,2],
    [0,1,1],
    [0,1,2],
    [0,2,3],
    [2,3,3],
    [3,5,5],
    [1,3,3]
  ];

  var losingSet = losingValues.concat(losingMoves1()).map(arr=>{
    return {arr:arr, value:losingValue}
  });

  return losingSet;
}

var generateData = ()=>{
  var allData = generateWinningData().concat(generateLosingData());
  var allData = allData.map(obj=>{
    return {value: obj.value,
      arr: obj.arr.sort(sortBySize)
    }

  });
  return allData;


}



var generateWinningData = ()=>{

  var winningMoves1 = [];
  var winningMoves2 = [];
  for(var i = 2; i< 10; i++){

    var obj = {
      arr:[0,i,i],
      value: winningValue
    }
    winningMoves1.push([0,i,i]);
  }
  for(var i = 2; i< 10; i = i + 2){
    var obj = {
      arr:[1,i,i+1],
      value: winningValue
    }
    winningMoves2.push(obj);
  }
  var twoFourSizeObj = {

    arr: [2,4,6],
    value:winningValue

  }
  var zeroZeroOneObj = {

    arr: [0,0,1],
    value:winningValue

  }

  var winningMovesFromJonathan = [
    [0,0,1],
    [1,1,1],
    [1,2,3],
    [1,4,5],
    [1,6,7],
    [1,8,9],
    [1,10,11],
    [2,4,6],
    [2,5,7],
    [2,8,10],
    [3,4,7],
    [3,5,6],
    [3,8,11],
    [4,8,12]
  ];

  var winningSet = winningMovesFromJonathan.concat(winningMoves1).map(arr=>{
    return {arr:arr, value:winningValue}
  });
  //var winningSet = [ twoFourSizeObj, zeroZeroOneObj ].concat(winningMoves1).concat(winningMoves2);

  return winningSet;

}


var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



var allData = shuffleArray(generateData());
var sliceValue = -Math.round(allData.length*0.1);

var getTrainingData = () =>{
  var trainingData = allData.slice(0,sliceValue);
  return trainingData;
}

var getTestData = () =>{
  var testData  = allData.slice(sliceValue);
  return testData;

}

var getWinningData = ()=>{
  var trainingData = getTrainingData(); 
  var winningSet = trainingData.filter(obj=>obj.value === winningValue);
  return winningSet;

}

var getLosingData = (data)=>{

  if(data === undefined){
    
    var trainingData = getTrainingData();
    data = trainingData;
  }
  var losingSet = data.filter(obj=>obj.value === losingValue);
  return losingSet;
}


var exportObject = {
  getWinningData: getWinningData,
  getTrainingData: getTrainingData,
  getTestData: getTestData,
  getLosingData: getLosingData,
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.myData = exportObject;

}
