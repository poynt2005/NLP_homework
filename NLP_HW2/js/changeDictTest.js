var changeDictionary = function(beforeKey , afterKey){
  this.getChangeKey = () => {
    return beforeKey;
  }

  this.getTargetKey = () => {
    return afterKey;
  }
}

changeDictionary.prototype.changer = function(){
  var _this = this;
  var tmp = {};

  var input_dict = arguments[0];

  var tmp = {};

  for(let key in input_dict){
    if(key ==_this.getChangeKey()){
      tmp[_this.getTargetKey()] = input_dict[key];
      continue;
    }
    tmp[key] = input_dict[key];
  }
  return tmp;
}



var oTrans1 = {
  's0' : {'article' : 'a'},
  's1' : {'noun' : 'student'},

  's2' : {'preposition' : 'in'},
  's3' : {'adjective' : 'blue'},
  's4' : {'noun' : 'jeans'}
};

var test = new changeDictionary('s2' , 's5');
var rOTrans1 = test.changer(oTrans1);
