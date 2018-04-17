if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  var convnetjs = require('convnetjs');
  var myData = require('./data.js');
}
var sortBySize = (a,b)=>a > b;

var generateNet = ()=>{

  var layer_defs = [];

  // input layer of size 1x1x2 (all volumes are 3D)
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:30});
  layer_defs.push({type:'fc', num_neurons:10, activation:'relu'});


  // a softmax classifier predicting probabilities for two classes: 0,1
  layer_defs.push({type:'softmax', num_classes:2});

  var net = new convnetjs.Net();
  net.makeLayers(layer_defs);
  return net;

}

var trainDataSet = (trainer, dataSet )=>{

  dataSet.map(obj=>{
    var arr = obj.arr;
    var vol = createConvNetVol(arr.sort(sortBySize));
    var value = obj.value;
    return {vol:vol, value:value};
  }).
  forEach(obj=>{
    var stats = trainer.train(obj.vol,obj.value);
  });

};

var createConvNetVol = (arr)=>{
    var binaryArr = decToBin(arr.sort(sortBySize));
    var flatArr = binaryArr.reduce( (arr1, arr2)=>arr1.concat(arr2));
    return new convnetjs.Vol(flatArr);

}


var generateTrainer = (net)=>{

  var trainer = new convnetjs.Trainer(net, {
    method: 'adadelta',
    l2_decay:0.001
  });
  return trainer;

}

var predictDataSet = (arr,net)=>{
  return arr.map(obj=>{

    var valueArr = obj.arr;
    return createConvNetVol(valueArr.sort(sortBySize));
  }).map(x=>{
    var res = net.forward(x);
    return net.forward(x);
  });
}

var predictSet = (arr, net) =>{
  var x = createConvNetVol(arr);

  return net.forward(x);

}

var decToBin = (val)=>{
  var binaries = val.map(val=>{

    var binaryArrStrings =  val.toString(2).split("");
    var binaryArr = binaryArrStrings.map(valString=>parseInt(valString));
    var fillUpArrLength = 10 - binaryArr.length;
    var fillUpArr = new Array(fillUpArrLength).fill(0);
    return  fillUpArr.concat(binaryArr);
  });
  return binaries;
}


// var trainingData = myData.getTrainingData();
// var testData  = myData.getTestData();
// var winningSet = myData.getWinningData();
// var losingSet = myData.getLosingData();


// var network = generateNet();
// var trainer = generateTrainer(network);




var exportObject = {
  predictDataSet: predictDataSet,
  generateTrainer: generateTrainer,
  trainDataSet: trainDataSet,
  predictSet: predictSet,
  // winningData: winningSet,
  // losingData: losingSet,
  // testData, testData,
  // trainingData, trainingData,
  generateNet: generateNet,
  decToBin: decToBin,
  // network: network

};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = exportObject;
else{

  window.nim = exportObject;

}
