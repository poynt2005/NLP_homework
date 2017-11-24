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
/*
<div class = "question-content q3-content">
  <div class = "info-content">
    <div class = "q">
        <h2>第三題</h2>
        <p>問題1 : 英文中的關係代名詞(包含關係代名詞為主詞及受詞兩種情形)</p>
        <p>問題2 : 受詞子句重覆包孕,如:I know that he is smart. He thinks that I know that he is smart. She believes that he thinks that I know that he is smart....</p>
        <p>問題3 : Recursive nominal modification, e.g. a student in blue jeans, a student in blue jeanswith long hair, a student in blue jeans with long hair on campus...</p>
    </div>
    <div id = "answer3">
      <span>abc</span>
    </div>
  </div>
</div>
*/
