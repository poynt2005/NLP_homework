'use strict'

$(document).ready(function(){

  //listen scroll event
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

  $("#fst-image-container").hide();

  $("#fst-image-togger").click(function(){
    $("#fst-image-container").slideToggle("slow");

    $(this).html(() => {
      return ($(this).html() == "<i>展開圖片</i>" ? "<i>收起圖片</i>" : "<i>展開圖片</i>");
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

  //I know that he is smart
  $("#fst-2-a").click(function(){
    fstForSpecialParse('pronoun verb pronoun pronoun verb adjective' , 0 , (result) => {
      showdialog(result , "I know that he is smart");
    });
  });

  //He thinks that I know that he is smart
  $("#fst-2-b").click(function(){
    fstForSpecialParse('pronoun verb pronoun pronoun_r verb pronoun pronoun verb adjective' , 1 , (result) => {
      showdialog(result , "He thinks that I know that he is smart");
    });
  });

  //She believes that he thinks that I know that he is smart
  $("#fst-2-c").click(function(){
    fstForSpecialParse('pronoun verb pronoun pronoun_r verb pronoun pronoun_r verb pronoun pronoun verb adjective' , 2 , (result) => {
      showdialog(result , "She believes that he thinks that I know that he is smart");
    });
  });

  //a student in blue jeans
  $("#fst-3-a").click(function(){
    fstForSpecialParse2('article noun preposition adjective noun' , 0 , (result) => {
      showdialog(result , "a student in blue jeans");
    });
  });

  //a student in blue jeans with long hair
  $("#fst-3-b").click(function(){
    fstForSpecialParse2('article noun preposition adjective noun preposition_r adjective noun' , 1 , (result) => {
        showdialog(result , "a student in blue jeans with long hair");
    });
  });


  //a student in blue jeans with long hair on campus
  $("#fst-3-c").click(function(){
    fstForSpecialParse2('article noun preposition adjective noun preposition_r adjective noun preposition_r noun' , 2 , (result) => {
      showdialog(result , "a student in blue jeans with long hair on campus");
    });
  });


  $("#posQueryClick").click(function(){
    getPartOfSpeech($("#posQueryText").val() , (resp) => {
      let convertArray = new Array(Array.from(resp));
      alert("Part of speech : " + convertArray);
    });
  });

  function parseRawArray(rawText , callback){
    rawText = rawText.toLowerCase();
    var test_pinyin = new Array(); //store pinyin array

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


  //jquery ui dialog
  function showdialog(data , titleMessage){
		let result = new String("");
    let markString = new RegExp("output");

		for(let i of data){
			result = result + i + "<br>";
    }

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
