$(document).ready(function(){
	fnStarSensorSet();
	fnScoreSet();
	fnScore();
});

function fnStarSensorSet(){
	var sensorGroup = $(".score-input .sensor-wrap");
	sensorGroup.each(function(idx){
		$(this).empty();
		if($(this).attr("data-total") != undefined){
			var totalSensorNum = $(this).attr("data-total")*2;
		}else{
			var totalSensorNum = 10;
		}
		for(a=1;a<=totalSensorNum;a++){	
			$(this).append("<li class='sensor'></li>");
			if(a%2 == 0){				
				$(this).append(" ");
			}
		}	
	});	
}

function fnScoreSet(){
	var scoreWraps = $(".scoreblock");
	
	scoreWraps.each(function(idx){
		var cscore = $(this).attr("data-score");
		
		if(cscore > 0){
			$(this).html("");
			for(a=0;a<=Math.ceil(cscore)-1;a++){
				if(cscore - a >= 1){
					$(this).append("<i class='fa fa-star'></i> ")
				}else if(cscore - a == 0.5){
					$(this).append("<i class='fa fa-star-half'></i> ")
				}
			}
			$(this).append("<b>" + cscore + "</b>")
		}
	});
}


function fnScore(){
	$(".score-input .sensor-wrap .sensor").bind("click",function(){
		$(this).parent().parent().find(".scoreblock").attr("data-score",($(this).index() + 1)/2);
		$(this).parent().parent().find(".score-form-input").val("data-score",($(this).index() + 1)/2);
		fnScoreSet();
	});
}

$(document).on("keyup",".et-chatbox textarea",function(){
	var submitButton = $(this).parents(".et-chatbox").find("button[data-toggle=submit]");

	if($(this).val().trim() == ""){
		submitButton.addClass("disabled");
	}else{
		submitButton.removeClass("disabled");
	}
});

$(document).on("keydown",".et-chatbox textarea",function(ev){
	if(ev.keyCode == 13){
		if(window.event.ctrlKey || window.event.shiftKey){
			ev.preventDefault();
			$(this).val($(this).val() + "\r\n");
		}else{
			ev.preventDefault();
			if($(this).val().trim() == ""){
				fnResetSend();
			}else{
				fnSubmitSend();
			}
		}
	}
});

$(document).on("click",".et-chatbox .uibox button[data-toggle=submit]",function(){
	fnSubmitSend();
});

function fnResetSend(){
	var sendbox = $("#et-msg-box");
	var sendbutton = $(".uibox button[data-toggle=submit]");

	sendbox.val("");
	sendbutton.addClass("disabled");

	$(document).trigger("exChat","send");
	console.group("exChat");
	console.log("trigger: exChat.reset");
	console.groupEnd();
}

function fnSubmitSend(){
	$(document).trigger("exChat","send");
	console.group("exChat");
	console.log("trigger: exChat.send");
	fnResetSend();
	console.groupEnd();
}