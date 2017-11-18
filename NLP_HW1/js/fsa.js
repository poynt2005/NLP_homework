function fsa(transition , start_state , fin_state , speech_list){
  this.transition = transition;
  this.start_state = start_state;
  this.fin_state  = fin_state;
  this.speech_list = speech_list;
};

fsa.prototype.parse =  function(){
  let _state_info = [];
  let _trans = this.transition;
  let state = this.start_state;
  let _fin = this.fin_state;
  let _speech = this.speech_list;

  let input_str = arguments[0].toString().split(" ");


  for(let i = 0 ; i < input_str.length ;i++){
    let info = new String("");
    info = info + ("Current state : " + state);
    state = _trans[state][_speech[input_str[i]]];
    info = info + (" Next state : " + state);

    _state_info.push(info);
  }

  if(Array.isArray(_fin)){
    for(let i of _fin)
      if(state == i){
        _state_info.push("Done!");
        return _state_info;
      }
  }
  else{
    if(state == _fin){
      _state_info.push("Done!");
      return _state_info;
    }
  }
  _state_info.push("Failed!");
  return _state_info;
};
