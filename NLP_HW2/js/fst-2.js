'use strict'
function fstForSpecialParse(input_string , flag , callback){

  var input_array = input_string.split(" ");
  if(flag == 0){
    var transition1 = {
			's0' : {'pronoun' : 's1'},
			's1' : {'verb' : 's2'},
			's2' : {'pronoun' : 's3'},
			's3' : {'pronoun' : 's4'},
			's4' : {'verb' : 's5'},
			's5' : {'adjective' : 's6'}
		};

    var oTrans1 = {
			's0' : {'pronoun' : 'I'},
			's1' : {'verb' : 'know'},
			's2' : {'pronoun' : 'that'},
			's3' : {'pronoun' : 'he'},
			's4' : {'verb' : 'is'},
			's5' : {'adjective' : 'smart'}
		};

    var parseFlag1 = new fst(transition1 , oTrans1 , 's0' , 's6' , 0);
    return callback(parseFlag1.parse(input_array));
  }

  else if(flag == 1){
    var transition2 = {
			's0' : {'pronoun' : 's1'},
			's1' : {'verb' : 's2'},
			's2' : {'pronoun' : 's3'},
			's3' : {'pronoun' : 's4'},
			's4' : {'verb' : 's5'},
			's5' : {'pronoun' : 's6'},
			's6' : {'pronoun' : 's7'},
			's7' : {'verb' : 's8'},
			's8' : {'adjective' : 's9'}
		};

    var oTrans2 = {
			's0' : {'pronoun' : 'He'},
			's1' : {'verb' : 'thinks'},
			's2' : {'pronoun' : 'that'},
			's3' : {'pronoun' : 'I'},
			's4' : {'verb' : 'know'},
			's5' : {'pronoun' : 'that'},
			's6' : {'pronoun' : 'he'},
			's7' : {'verb' : 'is'},
			's8' : {'adjective' : 'smart'}
		};

    var parseFlag2 = new fst(transition2 , oTrans2 , 's0' , 's9' , 0);
    return callback(parseFlag2.parse(input_array));
  }

  else{
    var transition3 = {
			's0' : {'pronoun' : 's1'},
			's1' : {'verb' : 's2'},
			's2' : {'pronoun' : 's3'},
			's3' : {'pronoun' : 's4'},
			's4' : {'verb' : 's5'},
			's5' : {'pronoun' : 's6'},
			's6' : {'pronoun' : 's7'},
			's7' : {'verb' : 's8'},
			's8' : {'pronoun' : 's9'},
			's9' : {'pronoun' : 's10'},
			's10' : {'verb' : 's11'},
			's11' : {'adjective' : 's12'}
		};

    var oTrans3 = {
			's0' : {'pronoun' : 'She'},
			's1' : {'verb' : 'believes'},
			's2' : {'pronoun' : 'that'},
			's3' : {'pronoun' : 'he'},
			's4' : {'verb' : 'thinks'},
			's5' : {'pronoun' : 'that'},
			's6' : {'pronoun' : 'I'},
			's7' : {'verb' : 'know'},
			's8' : {'pronoun' : 'that'},
			's9' : {'pronoun' : 'he'},
			's10' : {'verb' : 'is'},
			's11' : {'adjective' : 'smart'}
		};

    var parseFlag3 = new fst(transition3 , oTrans3 , 's0' , 's12' , 0);
    return callback(parseFlag3.parse(input_array));
  }
}

function fstForSpecialParse2(input_string , flag , callback){

  var input_array = input_string.split(" ");

  //a student in blue jeans
  if(flag == 0){
    var transition1 = {
			's0' : {'article' : 's1'},
			's1' : {'noun' : 's2'},
			's2' : {'preposition' : 's3'},
			's3' : {'adjective' : 's4'},
			's4' : {'noun' : 's5'}
		};

    var oTrans1 = {
      's0' : {'article' : 'a'},
			's1' : {'noun' : 'student'},
			's2' : {'preposition' : 'in'},
			's3' : {'adjective' : 'blue'},
			's4' : {'noun' : 'jeans'}
		};

    var parseFlag1 = new fst(transition1 , oTrans1 , 's0' , 's5' , 0);
    return callback(parseFlag1.parse(input_array));
  }

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
