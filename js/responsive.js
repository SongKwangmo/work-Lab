var pcSize = 768;
var phoneSize = 500;

$(document).ready(function(){
	fnHeightEqualize(".req-blocks > li","",768);
	fnButtonGroupToggle();
});

$(window).resize(function(ev){
	fnButtonGroupToggle();
});

$(document).on("dom-element.add",function(){
	fnHeightEqualize(".req-blocks > li","",768);
	fnHeightEqualize(".tab-group [data-role=tab]", "[data-role=tab-wrap]");
	fnButtonGroupToggle();
});


function fnDomElementADD(){
	$(document).trigger("dom-element","add");
}


function fnButtonGroupToggle(){
	var targetObj = $(".btn-group-pc");	

	if($(window).width() < pcSize){
		targetObj.removeClass("btn-group");
		targetObj.addClass("btn-group-vertical");
		if(targetObj.hasClass("btn-group-justified") == true){
			targetObj.removeClass("btn-group-justified");
			targetObj.attr("data-justified","true");
		}
	}else{
		targetObj.addClass("btn-group");
		targetObj.removeClass("btn-group-vertical");
		if(targetObj.attr("data-justified") == "true"){
			targetObj.addClass("btn-group-justified");
		}
	}
}


function fnHeightEqualize(selectorStr,areaStr,BreakpointMin,BreakpointMax) { // DOM object 높이 맞추기
	if(selectorStr != undefined){
		if(areaStr == undefined || areaStr == ""){
			var equalizeUnit = $(selectorStr).parent();
		}else{
			var equalizeUnit = $(selectorStr).parents(areaStr);
		}
		
		var equalizeObj = $(selectorStr);
	}
	
	$(document).ready(function(){
		if(equalizeBoundaryChk(BreakpointMin,BreakpointMax) == true){
			equalizeWorkFunc();
		}
	});

	$(window).resize(function(){		
		if(equalizeUnit.length > 0){
			equalizeCancelFunc();
			//equalizeWorkFunc();
			if(equalizeBoundaryChk(BreakpointMin,BreakpointMax) == true){
				equalizeWorkFunc();
			}
		}
	});

	function equalizeBoundaryChk(bpMin,bpMax){
		var deviceWidth = $(window).innerWidth();
		//console.log(bpMin);
		if(bpMin == undefined){
			var bpMin = 0;			
		}
		if(bpMax == undefined){
			var bpMax = Infinity;
		}
		
		if(deviceWidth >= bpMin && deviceWidth <= bpMax){
			//console.log("true!" + bpMin + "/" + bpMax);
			return true;
		}else{
			//console.log("false!" + bpMin + "/" + bpMax);
			return false;
		}
	}

	function equalizeCancelFunc(){
		equalizeObj.css("height","");
		console.log("fnHeightEqualize : equalizing cancel!");
	}

	function equalizeWorkFunc(){
		equalizeUnit.each(function(idx){
			var itemHeightValue = 0;

			$(this).find(equalizeObj).each(function(iidx){
				if($(this).css("box-sizing") == "border-box"){
					var insHeightValue = $(this).outerHeight();
				}else{
					var insHeightValue = $(this).height();
				}	

				if(insHeightValue > itemHeightValue){
					itemHeightValue = insHeightValue;
				}			
			});

			$(this).find(equalizeObj).css("height",itemHeightValue);
			console.group("fnHeightEqualize : equalizing complete!");
			console.log("selector : " + selectorStr);
			console.groupEnd();
		});
	}
}
