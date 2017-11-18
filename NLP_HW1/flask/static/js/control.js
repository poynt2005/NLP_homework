$(document).ready(function(){
	$("span").children("button").click(function(){
		
		let str = $(this).parent("span").children("li").text();
		let class_name = $(this).parent("span").attr("class");
		str = str.replace("." , "");
		if(class_name == "q1"){
		$.ajax({
			type : "POST",
			data : {"input_str" : str},
			url : "/question_1",
			
			success: function(data) {
					result = new String("");
					for(let i of data)
						result = result + i + "<br>";
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
				},
					
		});
		};
		
		if(class_name == "q2"){
		$.ajax({
			type : "POST",
			data : {"input_str" : str},
			url : "/question_2",
			
			success: function(data) {
					result = new String("");
					for(let i of data)
						result = result + i + "<br>";
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
				},
		});
		};
		
		if(class_name == "q3"){
		$.ajax({
			type : "POST",
			data : {"input_str" : str},
			url : "/question_3",
			
			success: function(data) {
					result = new String("");
					for(let i of data)
						result = result + i + "<br>";
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
				},
		});
		};	
	});
})