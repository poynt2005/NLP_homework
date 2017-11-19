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
    pinyin_text = pinyin_text.toLowerCase();
    var test_pinyin = new Array("");

    var ian_re = new RegExp("ian$");
    if(ian_re.test(pinyin_text)){
      if(pinyin_text.replace(ian_re , "")){
        test_pinyin = pinyin_text.replace(ian_re , "");
        test_pinyin = test_pinyin.split("");
      }
      test_pinyin.push("i");
      test_pinyin.push("an");
    }
    else{
      var an_re = new RegExp("an$");
      if(an_re.test(pinyin_text)){
        if(pinyin_text.replace(an_re , "")){
          test_pinyin = pinyin_text.replace(an_re , "");
          test_pinyin = test_pinyin.split("");
        }
        test_pinyin.push("an");
      }
      else if(!pinyin_text){
        alert("請輸入拼音");
      }
      else{
        alert("無an韻母，請重新輸入");
      }
    }

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
    var res = pinyin_parse.parse(test_pinyin);

    var rythm = res.pop();

    if(rythm == 'an')
      showdialog(res , "韻母 : [an]");
    else if (rythm == 'ian')
      showdialog(res , "韻母 : [i̯ɛn]");
  });

  function showdialog(data , rythm_ipa){
		let result = new String("");
		for(let i of data)
			result = result + i + "\n";
		$("#result_string").html(result);
    $("#rythms_detect").html(rythm_ipa);
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