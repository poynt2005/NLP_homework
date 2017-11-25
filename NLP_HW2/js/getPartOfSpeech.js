'use strict'
function getPartOfSpeech(input_word , callback){
let wordUrl = "https://api.pearson.com/v2/dictionaries/entries?headword=" + input_word;
  $.ajax({
  dataType : "json",
  url : wordUrl,
  data : "",
  success : (res) => {
    let result = new Set();
    let response_array = res["results"];

    for(let i = 0 ; i < response_array.length ; i++)
      if(response_array[i]["part_of_speech"])
        result.add(response_array[i]["part_of_speech"]);
    callback(result);
  }
});
return callback;
}
