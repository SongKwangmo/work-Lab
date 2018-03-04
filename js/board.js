$(document).ready(function(){
	fnBBSdownload();
	fnToggleFaq();
	fnBBSfileupload();

	$(".extended-item").on("click",function(ev){
		ev.preventDefault();
	});
});

function fnBBSdownload(){
	$(document).on("click","[data-role=bbs-download]",function(ev){
		var filePath = $(this).attr("data-link");

		if(filePath != undefined && filePath.trim() != ""){
			alert(filePath + " 경로의 파일을 다운로드합니다. \n파일 다운로드 common function을 설정해야합니다.");
		}else{
			alert("다운로드 파일의 경로가 유실되거나 손상되었습니다.");
		}

		console.log("BBS file download mode");
	});
}

function fnToggleFaq(){
	$("[data-role=accordion-inner]").bind("click",function(){	
		var contentsObj = $(this).find(".faq-body");
		var tailObj = $(this).find(".accordion-tail");

		if($(this).hasClass("active")){
			$(this).removeClass("active");
			tailObj.removeClass("fa-rotate-180");
			contentsObj.slideUp(200);			
		}else{
			$(this).addClass("active");
			tailObj.addClass("fa-rotate-180");
			contentsObj.slideDown(200);
		}
	});
}

function fnBBSfileupload(){
	var fileUnit = {};
	var fileListObjStr = ".bbs-file-list";
	var fileUnitObjStr = ".bbs-file-unit";

	$(fileListObjStr).each(function(idx){
		$(this).attr("data-idx",idx);
		fileUnit[idx] = $(this).find("li").eq(0);
		//console.log(fileUnit);
	});

	$(document).on("click",".bbs-file-unit .file-btn",function(ev){
		$(this).parents(fileUnitObjStr).find(".file-container").click();
	});

	$(document).on("click",".bbs-file-unit .unit-delete",function(ev){
		var listObj = $(this).parents(fileListObjStr);
		var unitObj = $(this).parents(fileUnitObjStr);
		//unitObj.remove();
		if(listObj.find(fileUnitObjStr).length > 1){
			unitObj.remove();
		}else{
			unitObj.find("input").val(null);
		}
	});

	$(document).on("click",".bbs-file-unit .unit-add",function(ev){
		var listObj = $(this).parents(fileListObjStr);
		var unitObj = $(this).parents(fileUnitObjStr);

		var fListNum = listObj.attr("data-idx");

		listObj.append("<li class='bbs-file-unit'>" + fileUnit[fListNum].html() + "</li>");

		//console.log(fListNum);
		console.log(fileUnit[fListNum][0]);
	});

	$(document).on("change",".bbs-file-unit .file-container",function(ev){
		$(this).parents(fileUnitObjStr).find(".file-info").val(
			this.files && this.files.length ? 
			this.files[0].name : this.value.replace(/^C:\\fakepath\\/i,'')
		);
	});	
}