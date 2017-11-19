function fsa_pinyin(transition , start_state){
  this.transition = transition;
  this.start_state = start_state;
};

fsa_pinyin.prototype.parse =  function(){
  let _state_info = [];
  let _trans = this.transition;
  let state = this.start_state;

  let input_str = arguments[0];


  for(let i = 0 ; i < input_str.length ;i++){
    let info = new String("");
    info = info + ("Current state : " + state);
    state = _trans[state][input_str[i]];
    info = info + (" Next state : " + state);

    _state_info.push(info);
  }


  if(state == 's2')
    _state_info.push("ian");
  else if(state == 's3')
    _state_info.push("an");
  return _state_info;
};
