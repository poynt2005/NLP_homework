'use strict'

$(document).ready(function(){

  $(window).scroll(function(){
    var cententDivHeight = $(".main-content").height();
    var viewPoint = $(window).height();

    var showHeight = (cententDivHeight - viewPoint) + 100;

    if($(window).scrollTop() >= showHeight){
      $(".info-content").css("visibility" , "visible").hide().fadeIn();
      $(this).off("scroll");
    }


    });


  $("#get-pinyin").click(function(){

    var pinyin_text = $("#pinyin-text").val();

    parseRawArray(pinyin_text , (result) => {
      if(result == 0) return;

      const trans = {
                     's0' : {'a' : 's0' , 'b' : 's0' , 'c' : 's0' , 'd' : 's0' , 'e' : 's0' , 'f' : 's0' , 'g' : 's0' , 'h' : 's0' ,
                             'j' : 's0' , 'k' : 's0' , 'l' : 's0' , 'm' : 's0' , 'n' : 's0' , 'o' : 's0' , 'p' : 's0' , 'q' : 's0' ,
                             'r' : 's0' , 's' : 's0' , 't' : 's0' , 'u' : 's0' , 'v' : 's0' , 'w' : 's0' , 'x' : 's0' , 'y' : 's0' , 'z' : 's0',
                             'i' : 's1' , 'an' : 's3'
                           },
                     's1' : {'a' : 's0' , 'b' : 's0' , 'c' : 's0' , 'd' : 's0' , 'e' : 's0' , 'f' : 's0' , 'g' : 's0' , 'h' : 's0' ,
                             'j' : 's0' , 'k' : 's0' , 'l' : 's0' , 'm' : 's0' , 'n' : 's0' , 'o' : 's0' , 'p' : 's0' , 'q' : 's0' ,
                             'r' : 's0' , 's' : 's0' , 't' : 's0' , 'u' : 's0' , 'v' : 's0' , 'w' : 's0' , 'x' : 's0' , 'y' : 's0' , 'z' : 's0',
                             'i' : 's0' , 'an' : 's2'
                            }
  								 };

      var pinyin_parse = new fsa_pinyin(trans , 's0');


      var res = pinyin_parse.parse(result);

      var rythm = res.pop();

      if(rythm == 'an')
        showdialog(res , "韻母 : [an]");
      else if (rythm == 'ian')
        showdialog(res , "韻母 : [i̯ɛn]");
    });
  });

  $("#fst-1-1").click(function(){
     checkPronoun('The girl called you is my friend' , (result) => {
       showdialog(result , "應填入who");
     });
  });

  $("#fst-1-2").click(function(){
     checkPronoun('The girl you called is my friend' , (result) => {
       showdialog(result , "應填入whom");
     });
  });

  function parseRawArray(rawText , callback){
    rawText = rawText.toLowerCase();
    var test_pinyin = new Array(""); //store pinyin array

    var ian_re = new RegExp("ian$");
    if(ian_re.test(rawText)){
      let replacedIan = rawText.replace(ian_re , "");
      if(replacedIan){
        test_pinyin = replacedIan;
        test_pinyin = test_pinyin.split("");
      }
      test_pinyin.push("i");
      test_pinyin.push("an");
    }
    else{
      var an_re = new RegExp("an$");
      if(an_re.test(rawText)){
        let replacedAn = rawText.replace(an_re , "");
        if(replacedAn){
          test_pinyin = replacedAn;
          test_pinyin = test_pinyin.split("");
        }
        test_pinyin.push("an");
      }
      else if(!rawText){
        alert("請輸入拼音");
        return callback(0);
      }
      else{
        alert("無an韻母，請重新輸入");
        return callback(0);
      }
    }

    if(!(test_pinyin[0])){
      let tmpArray = new Array();

      for(let i of test_pinyin)
        if(i)
          tmpArray.push(i);

      test_pinyin = tmpArray;
    }
    return callback(test_pinyin);
  }

  function checkPronoun(input_text , callback){
    var text_array = input_text.split(" ");
    var pronounTransition = {
			's0' : {'article' : 's1'},
			's1' : {'noun' : 's2'},
			's2' : {'verb' : 's3' , 'pronoun' : 's5'},
			's3' : {'pronoun' : 's4'},
			's4' : {'verb' : 's7'},
			's5' : {'verb' : 's6'},
			's6' : {'verb' : 's7'},
			's7' : {'adjective' : 's8'},
			's8' : {'noun' : 's9'}
		};

		var outputTransition = {
			's0' : {'article' : 'NULL'},
			's1' : {'noun' : 'NULL'},
			's2' : {'verb' : 'who' , 'pronoun' : 'NULL'},
			's3' : {'pronoun' : 'NULL'},
			's4' : {'verb' : 'NULL'},
			's5' : {'verb' : 'whom'},
			's6' : {'verb' : 'NULL'},
			's7' : {'adjective' : 'NULL'},
			's8' : {'noun' : 'NULL'}
		};

		var partOfSpeechList = {
			'the' : 'article',
			'The' : 'article',
			'girl' : 'noun',
			'called' : 'verb',
			'you' : 'pronoun',
			'is' : 'verb',
			'my' : 'adjective',
			'friend' : 'noun'
		};

    var fstCheck = new fst(pronounTransition , outputTransition , 's0' , 's9' , partOfSpeechList);
    var result = fstCheck.parse(text_array);

    return callback(result);
  }

  function showdialog(data , titleMessage){
		let result = new String("");
		for(let i of data)
			result = result + i + "\n";
		$("#result_string").html(result);
		$("#rythms_detect").html(titleMessage);
		$(function(){
			$( "#dialog" ).dialog({
				width: 400,
				show:{
					effect: "puff",
					duration: 600
					},
				hide:{
					effect: "explode",
					duration: 600
				}
			});
		});
	};

});
