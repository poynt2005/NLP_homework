'use strict'
/*for(i in currentOutputTransition)
  for(j in currentOutputTransition[i])
    alert(i + " : {" + j + " : " + currentOutputTransition[i][j] + "}");
    */
function testFstParse(input_string , fsaTrans , otrans , globalOtrans ,start_state, fin_state , recursive_determine_arc , recursive_times){
  var recursiveSentenseCount = otrans.length;
  var _state_info = new Array();
  var input_array = input_string.split(" ");
  var  _state = start_state;
  var re = new RegExp("_r");

  let currentOutputTransition = otrans.shift();
  for(let i = 0 ; i < input_array.length ; i++){

    let info = new String("");
    info = info + ("Current state : " + _state);

    let current_put = input_array[i].replace(re , "");
    info = info + (" ,Current input : " + current_put);
    let currentState = _state;
    let output;
    if(input_array[i] == recursive_determine_arc){
      currentOutputTransition = otrans.shift();
    //alert(currentState);
      recursive_times--;
      output = currentOutputTransition[_state][input_array[i]];
    }
    else{
      if(!recursive_times)
        Object.assign(currentOutputTransition , globalOtrans);


      output = currentOutputTransition[_state][input_array[i]];

    }

    _state = fsaTrans[_state][input_array[i]];
    info = info + (" ,Current output : " + output);
    info = info + (" ,Next state : " + _state);

    _state_info.push(info);
  }

  if(Array.isArray(fin_state)){
    for(let i of fin_state)
      if(_state == i){
        _state_info.push("Done!");
        return _state_info;
      }
  }
  else{
    if(_state == fin_state){
      _state_info.push("Done!");
      return _state_info;
    }}

  _state_info.push("Failed!");
  return _state_info;
}


function fstForSpecialParse(input_string , flag , callback){
  //output transition
  var oTrans1 = {
    's0' : {'pronoun' : 'I'},
    's1' : {'verb' : 'know'},
    's2' : {'pronoun' : 'that'}
  };
  var rOTrans1  = {
    's3' : {'pronoun_r' : 'I'},
    's1' : {'verb' : 'know'},
    's2' : {'pronoun' : 'that'}
  };

  var oTrans2 = {
    's0' : {'pronoun' : 'He'},
    's1' : {'verb' : 'thinks'},
    's2' : {'pronoun' : 'that'}
  };
  var rOTrans2 = {
    's3' : {'pronoun_r' : 'He'},
    's1' : {'verb' : 'thinks'},
    's2' : {'pronoun' : 'that'}
  };

  var oTrans3 = {
    's0' : {'pronoun' : 'She'},
    's1' : {'verb' : 'believes'},
    's2' : {'pronoun' : 'that'}
  };

  var gTrans = {
    's3' : {'pronoun' : 'he'},
    's4' : {'verb' : 'is'},
    's5' : {'adjective' : 'smart'}
  };

  //fsa transition
  var transition = {
    's0' : {'pronoun' : 's1'},
    's1' : {'verb' : 's2'},
    's2' : {'pronoun' : 's3'},
    's3' : {'pronoun_r' : 's1' , 'pronoun' : 's4'},
    's4' : {'verb' : 's5'},
    's5' : {'adjective' : 's6'}
  };

  var oTransArray = new Array();

  let recursive_times;

  if(flag == 0){
    recursive_times = 0;
    oTransArray.push(oTrans1);
  }
  else if(flag == 1){
    recursive_times = 1;
    oTransArray.push(oTrans2);
    oTransArray.push(rOTrans1);
  }
  else if(flag == 2){
    recursive_times = 2;
    oTransArray.push(oTrans3);
    oTransArray.push(rOTrans2);
    oTransArray.push(rOTrans1);
  }


  var result = testFstParse(input_string , transition , oTransArray , gTrans , 's0' , 's6' , 'pronoun_r' , recursive_times);
  return callback(result);
}

/*function fstForSpecialParse2(input_string , flag , callback){

  var transition = {
    's0' : {'article' : 's1'},
    's1' : {'noun' : 's2'},
    's2' : {'preposition' : 's3'},
    's3' : {'adjective' : 's4' , 'noun' : 's5'},
    's4' : {'noun_r' : 's2'},
  };

  var oTrans1 = {
    's0' : {'article' : 'a'},
    's1' : {'noun' : 'student'},
    's2' : {'preposition' : 'in'},
    's3' : {'adjective' : 'blue'}
  };
  var rOTrans1 = {
    's0' : {'article' : 'a'},
    's4' : {'noun_r' : 'student'},
    's2' : {'preposition' : 'in'},
    's3' : {'adjective' : 'blue'}
  };

  var oTrans2 = {
    's0' : {'article' : 'a'},
    's1' : {'noun' : 'jeans'},
    's2' : {'preposition' : 'with'},
    's3' : {'adjective' : 'long'}
  };
  var rOTrans2 = {
    's0' : {'article' : 'a'},
    's4' : {'noun' : 'jeans'},
    's2' : {'preposition' : 'with'},
    's3' : {'adjective' : 'long'}
  };

  var rOTrans3 = {
    's0' : {'article' : 'a'},
    's2' : {'preposition' : 'on'},
    's3' : {'noun' : 'campus'}
  };

  var gTrans = {

  };

  const fin_state = ['s4' , 's5'];
  var oTransArray = new Array();
  let recursive_times;

  if(flag == 0){
    recursive_times = 0;
    oTransArray.push(oTrans1);
  }
  else if(flag == 1){
    recursive_times = 1;
    oTransArray.push(oTrans1);
    oTransArray.push(rOTrans2);
  }
  else if(flag == 2){
    recursive_times = 2;
    oTransArray.push(oTrans1);
    oTransArray.push(rOTrans2);
    oTransArray.push(rOTrans3);
  }

  var result = testFstParse(input_string , transition , oTransArray , gTrans , 's0' , fin_state , 'noun_r' , recursive_times);
  return callback(result);
} */

function fstForSpecialParse2(input_string , flag , callback){

  var input_array = input_string.split(" ");

  //a student in blue jeans with long hair
  else if(flag == 1){
    var transition2 = {
      's0' : {'article' : 's1'},

			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},

			's4' : {'noun' : 's5'},
      's5' : {'preposition' : 's6'},
      's6' : {'adjective' : 's7'},

      's7' : {'noun' : 's8'}
		};

    var oTrans2 = {
      's0' : {'article' : 'a'},

			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},

			's4' : {'noun' : 'jeans'},
      's5' : {'preposition' : 'with'},
      's6' : {'adjective' : 'long'},

      's7' : {'noun' : 'hair'}
		};

    var parseFlag2 = new fst(transition2 , oTrans2 , 's0' , 's8' , 0);
    return callback(parseFlag2.parse(input_array));
  }
  //a student in blue jeans with long hair on campus
  else{
    var transition3 = {
      's0' : {'article' : 's1'},

			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},

			's4' : {'noun' : 's5'},
      's5' : {'preposition' : 's6'},
      's6' : {'adjective' : 's7'},

      's7' : {'noun' : 's8'},
      's8' : {'preposition' : 's9'},
      's9' : {'noun' : 's10'}
		};

    var oTrans3 = {
      's0' : {'article' : 'a'},
			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},
			's4' : {'noun' : 'jeans'},
      's5' : {'preposition' : 'with'},
      's6' : {'adjective' : 'long'},
      's7' : {'noun' : 'hair'},
      's8' : {'preposition' : 'on'},
      's9' : {'noun' : 'campus'}
		};

    var parseFlag3 = new fst(transition3 , oTrans3 , 's0' , 's10' , 0);
    return callback(parseFlag3.parse(input_array));
  }
}
