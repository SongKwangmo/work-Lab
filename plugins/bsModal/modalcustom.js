
function modalPosSet(modalObj){
	areaObj = $(modalObj).find(".modal-backdrop");
	conObj = $(modalObj).find(".modal-dialog");

	if(conObj.hasClass("modal-lg")){
		sizeSet = "modal-lg";
	}else if(conObj.hasClass("modal-sm")){
		sizeSet = "modal-sm";
	}else{
		sizeSet = "";
	}

	gaps = parseInt(conObj.css("margin-top").replace("px",""));
	modalFullHeight = conObj.height() + gaps*2;	

	if($(modalObj).find(".vhelp").length < 1){
		conHtml = conObj.html();
		conObj.remove();

		$(modalObj).append("<div class='vhelp'></div>");
		$(modalObj).find(".vhelp").html("<div class='modal-dialog " + sizeSet + "'>" + conHtml + "</div>");
	}
}