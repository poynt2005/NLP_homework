'use strict'
var fst = function(transition , outTransition , start_state , fin_state , speech_list){
  this.getTransition = () => {return transition;}
  this.getOutTransition = () => {return outTransition;}
  this.getStartState = () => {return start_state;}
  this.getAcceptState = () => {return fin_state;}
  this.getSpeechList = () => {return speech_list;}
};

fst.prototype.parse = function(){
  let _state_info = new Array();
  let _trans = this.getTransition();
  let _out_trans = this.getOutTransition();
  let _state = this.getStartState();
  let _fin_state = this.getAcceptState();
  let _speech_list = this.getSpeechList();

  let input_array = arguments[0];

  for(let i = 0 ; i < input_array.length ;i++){
    let info = new String("");
    info = info + ("Current state : " + _state);
    info = info + (" ,Current input : " + input_array[i]);

    let currentState = _state;
    if(!(_speech_list==0))
      _state = _trans[_state][_speech_list[input_array[i]]];
    else
      _state = _trans[_state][input_array[i]];
    let output;
    if(!(_speech_list==0))
      output = _out_trans[currentState][_speech_list[input_array[i]]];
    else
      output = _out_trans[currentState][input_array[i]];


    info = info + (" ,Current output : " + output);
    info = info + (" ,Next state : " + _state + "\n;");

    _state_info.push(info);
  }

  if(Array.isArray(_fin_state)){
    for(let i of _fin_state)
      if(_state == i){
        _state_info.push("Done!");
        return _state_info;
      }
  }
  else{
    if(_state == _fin_state){
      _state_info.push("Done!");
      return _state_info;
    }
  }
  _state_info.push("Failed!");
  return _state_info;
};
