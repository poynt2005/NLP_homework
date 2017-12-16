'use strict'

/*
  use ajax get method to pearson dictionary
  and recieve the json data
*/
function getPartOfSpeech(input_word , callback){
let wordUrl = "https://api.pearson.com/v2/dictionaries/entries?headword=" + input_word;
  $.ajax({
  dataType : "json",
  url : wordUrl,
  data : "",
  success : (res) => {
    let result = new Set();
    let response_array = res["results"];

    /*
      get pos data from the response
    */
    for(let i = 0 ; i < response_array.length ; i++)
      if(response_array[i]["part_of_speech"])
        result.add(response_array[i]["part_of_speech"]);
    callback(result);
  }

});
return callback;
}
