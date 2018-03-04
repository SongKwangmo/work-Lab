$(document).ready(function(){
	ajaxModalSet();
});

function ajaxModalSet(tempURL){
	var tempURL = tempURL;
	var tempData;
	var tempDataResult;
	var baseModalData = "<div class='modal fade' id='ajaxModal' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button><h4 class='modal-title' id='myModalLabel'>basic Templete data</h4></div><div class='modal-body'>...</div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>Save changes</button></div></div></div></div>";

	if(tempURL == undefined){
		if($("#ajaxModal").length < 1){
			tempURL = "../plugins/bsModal/temp_ajaxModalBase.htm";
			ajaxTempCall();
		}
	}else{
		$("#ajaxModal").remove();
		ajaxTempCall();
	}

	function ajaxTempCall(){		
		$.ajax({
				url : tempURL,
				dataType : "html",
				type : "get",
				cache: false,
				beforeSend: function(){
					//console.log(tempURL);
				},	
				success : function(result){
					tempData = result;
				},
				error : function(jqXHR, textStatus, errorThrown){
					console.log(textStatus + ":" + errorThrown + ":" + tempURL);
					makeTempModal(baseModalData);
					modalPosSet("#ajaxModal");
				},
				complete : function(result){
					makeTempModal(tempData);
					modalPosSet("#ajaxModal");
				}
		});
	}

	function makeTempModal(data){
		$("body").prepend(data);
	}
}

function ajaxModal(obj,mObj){
	if(mObj == undefined || mObj == ""){
		mObj = "#ajaxModal";
	}
	
	headline = $(mObj).find(".modal-title");

	callTitle = $(obj).attr("data-title");
	if(callTitle == undefined){
		callTitle = "&nbsp;";
	}

	callURL = $(obj).attr("data-link");
	if(callURL == undefined || callURL == ""){
		callURL = "modal_404.htm";
	}

	callSize = $(obj).attr("data-size");
	if(callSize == undefined || callSize == ""){
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
	}else{
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
		$(mObj).find(".modal-dialog").addClass("modal-" + callSize);
	}

	$.ajax({
			url : callURL,
			dataType : "html",
			type : "get",
			cache: false,
			beforeSend: function(){
				$(mObj).find(".modal-header").siblings().remove();
			},			
			success : function(result){
				mContent = result;
			},
			error : function(jqXHR, textStatus, errorThrown){
				alert(textStatus + ":" + errorThrown);
				fn404Modal(mObj);
			},
			complete : function(){				
				$(mObj).find(".modal-content").append(mContent);

				if($(mObj).find(".modal-content").find(".ajax-title").length > 0){
					callTitle = $(mObj).find(".modal-content").find(".ajax-title").html();
				}
				headline.html(callTitle);

				$(mObj).modal('show');
			}
	});	
}

function ajaxModalO(obj,theVal1,theVal2){
	mObj = "#ajaxModal";
	headline = $(mObj).find(".modal-title");

	callTitle = $(obj).attr("data-title");
	if(callTitle == undefined){
		callTitle = "&nbsp;";
	}

	callURL = $(obj).attr("data-link");
	if(callURL == undefined || callURL == ""){
		callURL = "modal_404.asp";
	}

	callSize = $(obj).attr("data-size");
	if(callSize == undefined || callSize == ""){
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
	}else{
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
		$(mObj).find(".modal-dialog").addClass("modal-" + callSize);
	}

	$.ajax({
			url : callURL,
			dataType : "html",
			type : "get",
			data : {para1 : theVal1 , para2 : theVal2 },
			beforeSend: function(){
				$(mObj).find(".modal-header").siblings().remove();
			},			
			success : function(result){
				mContent0 = result;
			},
			error : function(jqXHR, textStatus, errorThrown){
				alert(textStatus + ":" + errorThrown);
			},
			complete : function(){				
				$(mObj).find(".modal-content").append(mContent0);

				if($(mObj).find(".modal-content").find(".ajax-title").length > 0){
					callTitle = $(mObj).find(".modal-content").find(".ajax-title").html();
				}
				headline.html(callTitle);

				$(mObj).modal('show');
			}
	});	
}


function linkModal(linkStr,sizeStr){
	var mObj = "#ajaxModal";
	var callTitle = "&nbsp;";

	var callURL = linkStr;
	if(callURL == undefined || callURL == ""){
		callURL = "modal_404.htm";
	}

	callSize = sizeStr;
	if(callSize == undefined || callSize == ""){
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
	}else{
		$(mObj).find(".modal-dialog").removeClass("modal-lg");
		$(mObj).find(".modal-dialog").removeClass("modal-sm");
		$(mObj).find(".modal-dialog").addClass("modal-" + callSize);
	}

	$.ajax({
			url : callURL,
			dataType : "html",
			type : "get",
			beforeSend: function(){
				$(mObj).find(".modal-header").siblings().remove();
			},			
			success : function(result){
				mContent = result;
			},
			error : function(jqXHR, textStatus, errorThrown){
				alert(textStatus + ":" + errorThrown);
			},
			complete : function(){				
				$(mObj).find(".modal-content").append(mContent);

				if($(mObj).find(".modal-content").find(".ajax-title").length > 0){
					callTitle = $(mObj).find(".modal-content").find(".ajax-title").html();
				}
				headline.html(callTitle);

				$(mObj).modal('show');
			}
	});	
}

function fn404Modal(mObj){
	if(mObj == undefined || mObj == ""){
		mObj = "#ajaxModal";
	}
	
	headline = $(mObj).find(".modal-title");

	callURL = "modal_404.htm";

	$(mObj).find(".modal-dialog").removeClass("modal-lg");
	$(mObj).find(".modal-dialog").removeClass("modal-sm");

	$.ajax({
			url : callURL,
			dataType : "html",
			type : "get",
			cache: false,
			beforeSend: function(){
				$(mObj).find(".modal-header").siblings().remove();
			},			
			success : function(result){
				mContent = result;
			},
			error : function(jqXHR, textStatus, errorThrown){
				alert(textStatus + ":" + errorThrown);
			},
			complete : function(){				
				$(mObj).find(".modal-content").append(mContent);

				if($(mObj).find(".modal-content").find(".ajax-title").length > 0){
					callTitle = $(mObj).find(".modal-content").find(".ajax-title").html();
				}
				headline.html(callTitle);

				$(mObj).modal('show');
			}
	});	
}
