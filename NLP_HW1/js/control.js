$(document).ready(function(){

function showdialog(data){
		let result = new String("");
		for(let i of data)
			result = result + i + "\n";
		$("#result_string").html(result);
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


	$("span").children("button").click(function(){

		let str = $(this).parent("span").children("li").text();
		let class_name = $(this).parent("span").attr("class");
		str = str.replace("." , "");
		if(class_name == "q1"){
			const speech = {'John' : 'n' , 'put' : 'v' , 'a' : 'article' , 'book' : 'n' ,
							     'on' : 'adv' , 'table' : 'n' , 'in' : 'adv' , 'classroom' : 'n' ,
							     'the' : 'article' , 'science' : 'adj' , 'building' : 'n' , 'campus' : 'n'};

			const trans = {'s0' : {'n' : 's1'},
							     's1' : {'v' : 's2'},
							     's2' : {'article' : 's3'},
							     's3' : {'n' : 's4'},
							     's4' : {'adv' : 's5'},
							     's5' : {'article' : 's6' , 'n' : 's8'},
							     's6' : {'adj' : 's7' , 'n' : 's8'},
							     's7' : {'n' : 's8'},
							     's8' : {'adv' : 's5'}
								 };

			let a1 = new fsa(trans , 's0' , 's8' , speech);
			let res = a1.parse(str);
			showdialog(res);
		};

		if(class_name == "q2"){
			const speech = {'John' : 'n' , 'read' : 'v' , 'a' : 'article' , 'book' : 'n' ,
									     'that' : 'pron' , 'the' : 'article' , 'famous' : 'adj' , 'writer' : 'n' ,
									     'many' : 'adj' , 'students' : 'n' , 'liked' : 'v' , 'wrote' : 'v' , 'respected' : 'v',
									     'my' : 'pron' , 'superviser' : 'n' , 'taught' : 'v' , 'colleagues' : 'n' ,
										 };

			const trans = {
									    's0' : {'n' : 's1'},
									    's1' : {'v' : 's2'},
									    's2' : {'article' : 's3'},
									    's3' : {'n' : 's4'},
									    's4' : {'pron' : 's5'},
									    's5' : {'pron' : 's5' , 'article' : 's6' ,  'adj' : 's7' , 'n' : 's8'},
									    's6' : {'adj' : 's7'},
									    's7' : {'n' : 's8'},
									    's8' : { 'v' : 's9' , 'pron' : 's5'},
									    's9' : {'v' : 's9'}
										};

			const _final = new Array('s4' , 's9');

			let a2 = new fsa(trans , 's0' , _final , speech);
			let res = a2.parse(str);
			showdialog(res);
		};

		if(class_name == "q3"){
			const speech = {
							        'John' : 'n', 'knows' : 'v' , 'that' : 'pron' , 'he' : 'pron',
							        'is' : 'v' , 'very' : 'adv' , 'smart' : 'adj' ,
							        'Mary' : 'n' , 'thinks' : 'v' ,
							        'Sue' : 'n' , 'believes' : 'v' ,
							        'Sam' : 'n' , 'realizes' : 'v'
										};

			const trans = {
											's0' : {'n' : 's1'},
							        's1' : {'v' : 's2'},
							        's2' : {'pron' : 's3'},
							        's3' : {'n' : 's1' , 'pron' : 's3' , 'v' : 's4'},
							        's4' : {'adj' : 's6' , 'adv' : 's5'},
							        's5' : {'adj' : 's6'},
							        's6' : ''
										};

		 let a3 = new fsa(trans , 's0' , 's6' , speech);
		 let res = a3.parse(str);
		 showdialog(res);
		};
	});

})
