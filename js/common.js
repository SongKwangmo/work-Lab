$(document).ready(function(){
	fnMainGoSet();

	fnGnbSet();

	fnBreadcrumbSet();

	fnMobNavSet();
	fnMobNavControl();
	fnMobGNBArcodian();

	
	fnFooterLinkGo();

	fnTabBasic();
	fnThumbnailSet();

	datePickSet();
	timePickSet();

	fnQuickTalkControl();

	fnSetOptionType(".option-list[data-toggle=buttons]");
	fnSetOptionType(".tag-list[data-toggle=buttons]");

	/* footer family site selector custom */
	$("#family-site-link").selectbox();

	/* */
	$("[data-toggle=tooltip]").tooltip();
	
	/* Browser scroll control */
	$(document).on("click","[data-role=gototop]",function(ev){
		$(document).trigger("page-scrolling",0);
	});
	$(document).on("page-scrolling",function(ev,method){
		fnPageTopScroll(method);
	});


	/* bootstrap dropdown hover action customize */
	$(document).on("mouseover",".dropdown[data-action=hover]",function(){
		$(this).addClass("open");
	});
	$(document).on("mouseout",".dropdown[data-action=hover]",function(){
		$(this).removeClass("open");
	});	


	$(document).on("keyup","[data-format=comma]",function(){
		$(this).number(true);

		if (this.createTextRange) {
			var range = this.createTextRange();
			range.move('character', this.value.length);
			range.select();
		}	else if (this.selectionStart || this.selectionStart== '0'){
			this.selectionStart = this.value.length;
		}
	});

	$(document).on("click","[data-role=nav-toggle]",function(ev){
		var mobNavObj = $(".mob-nav-wrap");

		console.log("trigger-call:mob-nav.toggle");
		mobNavObj.trigger("mob-nav","toggle");
	});

	$(document).on("mob-nav.toggle",function(){		
	});

	$('.modal').on('show.bs.modal', function (e) {
		modalPosSet(this);
	});

	$(document).on("click","[data-role=postcode]",function(ev){ // 우편번호 주소 찾기
			if($(this).parents("[data-role=address-group]").length <= 0){
				var groupArea = $(document);
			}else{
				var groupArea = $(this).parents("[data-role=address-group]");
			}

			var postcodeObj = groupArea.find("[data-tag=postcode]");
			var roadAddressObj = groupArea.find("[data-tag=roadAddress]");
			var jibunAddressObj = groupArea.find("[data-tag=jibunAddress]");

			var sidoObj = groupArea.find("[data-tag=sido]");
			var sigunguObj = groupArea.find("[data-tag=sigungu]");
			var bnameObj = groupArea.find("[data-tag=bname]");

			var guideObj = groupArea.find("[data-tag=guide]");

		//fnDaumPostcode(this);
		fnPostcode();

		function fnPostcode() { // 참고 : https://spi.maps.daum.net/postcode/guidessl#attributes

				new daum.Postcode({
						oncomplete: function(data) {
								// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

								// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
								// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
								var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
								var extraRoadAddr = ''; // 도로명 조합형 주소 변수

								// 법정동명이 있을 경우 추가한다. (법정리는 제외)
								// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
								if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
										extraRoadAddr += data.bname;
								}
								// 건물명이 있고, 공동주택일 경우 추가한다.
								if(data.buildingName !== '' && data.apartment === 'Y'){
									 extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
								}
								// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
								if(extraRoadAddr !== ''){
										extraRoadAddr = ' (' + extraRoadAddr + ')';
								}
								// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
								if(fullRoadAddr !== ''){
										fullRoadAddr += extraRoadAddr;
								}

								// 우편번호와 주소 정보를 해당 필드에 넣는다.
								postcodeObj.val(data.zonecode);
								roadAddressObj.val(fullRoadAddr);
								jibunAddressObj.val(data.jibunAddress);
								sidoObj.val(data.sido);
								sigunguObj.val(data.sigungu);
								bnameObj.val(data.bname);


								// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
								if(data.autoRoadAddress) {
										//예상되는 도로명 주소에 조합형 주소를 추가한다.
										var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
										guideObj.text('(예상 도로명 주소 : ' + expRoadAddr + ')');

								} else if(data.autoJibunAddress) {
										var expJibunAddr = data.autoJibunAddress;
										guideObj.text('(예상 지번 주소 : ' + expJibunAddr + ')');

								} else {
										guideObj.text('');
								}
						}
				}).open();
		}

	});

});

function fnMainGoSet(){
	$("a[data-role=gohome]").each(function(idx){
		//$(this).attr("href","/index.do");
		$(this).attr("title","메인으로 이동");
	});
}

function chkMobile(){
	var wa = window.navigator.userAgent.toLowerCase();
	if(wa.indexOf('mobile') > -1 || wa.indexOf('android') > -1 || wa.indexOf('iphone') > -1){
		return true;
	}else{
		return false;
	}
}

function fnBrowserChk(){
	var agent = navigator.userAgent.toLowerCase();
	var browserCode;
 
	if ( (navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1) ) {
		browserCode = "IE";
	}else if(navigator.userAgent.search("Whale") != -1){
		browserCode = "Whale";
	}else{
		browserCode = "Chrome";
	}

	console.log("fnBrowserChk() - browserCode: " + browserCode);
	return browserCode;	
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
    cookieName = cookieName + '=';

    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';

    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }

    return unescape(cookieValue);
}

function timePickSet(){
	if(chkMobile() == false){
		$("input[type=time]").each(function(idx){
			if($(this).attr("data-picker") == "clock"){
				$("input[type=time]").attr("readOnly",true);
			}
		});		

		// https://www.jqueryscript.net/demo/jQuery-Clock-Style-Time-Picker-Plugin-For-Bootstrap-3-clockpicker/
		$("input[type=time][data-picker=clock]").clockpicker({
			donetext: "Done",
			autoclose: true,
			min: "01:20pm"
		});

		$("input[type=time]:not([data-picker=clock])").timepicker({
			"minTime": "9:00am",
			"maxTime": "5:00pm",
			"step":"60",
			"timeFormat": "G:i",
		});
	}
}

function datePickSet(){
	if(chkMobile() == false){
		$('[type=date]').attr("readOnly",true);
		$('[type=date]').each(function(idx){
			if($(this).attr("min") != undefined){
				var mindateValue = $(this).attr("min");
			}else{
				var mindateValue = "";
			}
			if($(this).attr("max") != undefined){
				var maxdateValue = $(this).attr("max");
			}else{
				var maxdateValue = "";
			}

			//if($(this).attr("data-unit") != undefined){
				switch ($(this).attr("data-unit"))
				{
				case "year": 
				var startUnitValue = 2;
				break;

				case "month": 
				var startUnitValue = 1;
				break;

				default: 
				var startUnitValue = 0;
				break;
				
				}
			//}else{
				//var startUnitValue = 0;
			//}
			
			$(this).datepicker({
				format: 'yyyy-mm-dd',
				autoHide: true,
				//autoclose: true,
				//language: 'kr'
				//clearBtn: true,
				//todayBtn: true,
				//beforeShowDay: function(){console.log('test');},
				startDate:mindateValue,
				endDate:maxdateValue,
				startView: startUnitValue,
				filter: function(date) {					

					/* 주말 비활성화
					if (date.getDay() === 0 || date.getDay() === 6) {
						return false; 
					}
					*/

					/* 특정일자 비활성화 기본형
					var disabledDate = new Date("2018-01-25T00:00:00");
					if (date == String(disabledDate)) {	
						console.log("datepicker// disabled date : " + disabledDate);
						return false; 
					}
					*/
				}
			}).on('changeDate',function(e){
				//alert(this.value);
			});

			$(this).on("click",function(){
				$(this).datepicker("update");
			});
		});
	}else{
		//$('[type=date]').attr("readOnly",false);
	}
}


function fnGnbSet(){
	$(".menu-group > li").each(function(idx){
		if($(this).find(".menu-sub").length > 0){
			$(this).addClass("has-sub");
		}
	});
}

function fnMobNavSet(){
	var mobNavStr = ".mob-nav-wrap .mob-nav";
	var mobMainNavStr = ".mob-main-nav";
	var mobMemNavStr = ".mob-mem-nav";

	var samplingGnb = $(".gnb .menu-group");
	var samplingMemNav = $("#hTop .mem-funcs > ul"); 

	$(mobNavStr).find(mobMainNavStr).html(samplingGnb.html());
	$(mobNavStr).find(mobMemNavStr).html(samplingMemNav.html());
	$(mobNavStr).find(".dropdown[data-action=hover]").find(".dropdown-toggle").attr("data-toggle","dropdown");
	$(mobNavStr).find(".dropdown[data-action=hover]").attr("data-action","click");
}

function fnMobNavControl(){
	$(document).on("mob-nav.toggle",function(ev){
		$(ev.target).toggleClass("is-active");
		$(ev.target).attr("data-motion","true");

		if($(ev.target).attr("data-open") == "true"){
			$(ev.target).trigger("mob-nav-motion","close-start");
			$(ev.target).attr("data-open","false");
		}else{
			$(ev.target).trigger("mob-nav-motion","open-start");
			$(ev.target).attr("data-open","true");
		}
	});

	$(".mob-nav").on("transitionend",function(ev){
		
		if($(ev.target).parents().attr("data-motion") == "true"){
			if($(ev.target).parents().attr("data-open") == "true"){
				$(ev.target).trigger("mob-nav-motion","open-end");
			}else{
				$(ev.target).trigger("mob-nav-motion","close-end");
			}
		}

		$(ev.target).parents().attr("data-motion","false");
	});

	$(document).on("mob-nav-motion",function(ev,method){
		console.log(method);
		if(method == "open-end"){
			//$("body").css("overflow","hidden");	
			$("body").attr("data-mobmenu","true");			
		}
		if(method == "close-end"){
			//$("body").css("overflow","auto");
			$("body").attr("data-mobmenu","false");		
		}
	});
}

function fnMobGNBArcodian(){
	$(document).on("click",".mob-nav .mob-main-nav li.has-sub > a",function(ev){
		ev.preventDefault();		

		var targetMenu = $(ev.target).parents(".has-sub");
		var siblingsMenu = targetMenu.siblings();
		
		var targetMenuSub = targetMenu.find(".menu-sub");
		var siblingsMenuSub = siblingsMenu.find(".menu-sub");

		if(targetMenu.hasClass("is-active")){
			changeActiveTag(targetMenu);
		}

		siblingsMenu.each(function(idx){
			if($(this).hasClass("is-active")){
				changeActiveTag(this);
			}			
		});

		mobMenuArcodian();

		function changeActiveTag(obj){
			$(obj).removeClass("is-active");
			$(obj).attr("data-active","true");
		}

		function mobMenuArcodian(){
			if(targetMenu.hasClass("opened")){				
				mobMenuReset();
			}else{
				targetMenu.addClass("opened");				
				siblingsMenu.removeClass("opened");

				siblingsMenuSub.slideUp(300);
				targetMenuSub.slideDown(300);
			}
		}

		function mobMenuReset(){
			if(targetMenu[0] != $(ev.target).parents(".mob-main-nav").find("[data-active=true]")[0]){
				targetMenu.removeClass("opened");
				targetMenuSub.slideUp(300);
				
				$(ev.target).parents(".mob-main-nav").find("[data-active=true]").addClass("opened");
				$(ev.target).parents(".mob-main-nav").find("[data-active=true]").find(".menu-sub").slideDown(300);
				console.log($(ev.target).parent().find("[data-active=true]"));
			}else{
				$(ev.target).parents(".mob-main-nav").find("[data-active=true]").addClass("opened");
				$(ev.target).parents(".mob-main-nav").find("[data-active=true]").find(".menu-sub").slideDown(300);
			}
		}
	});
}

function fnBreadcrumbSet(){
	var topAreaCateGroup = $("#top *[data-cateinfo]");
	var cateNaviObj = $(".breadcrumb > li:nth-last-of-type(2)");
	var pageNaviObj = $(".breadcrumb > li:last-of-type");
	var nPageChkObj = $(".visual_area");

	//console.log(location.pathname);

	topAreaCateGroup.each(function(idx){
		if($(this).attr("data-cateinfo") == nPageChkObj.attr("data-cate") && $(this).attr("data-attr") != "main"){
			$(this).addClass("is-active");
			
			/* 카테고리 네임 추적 */
			if($(this).find("> a").text() != ""){
				var categoryName = $(this).find("> a").text();
				var categoryUrl = $(this).find("> a").attr("href");
			}else{
				var categoryName = "MEMBER";
				var categoryUrl = "#";
			}			

			cateNaviObj.find("> a").text(categoryName);
			cateNaviObj.find("> a").attr("href",categoryUrl);
			cateNaviObj.find("> a").attr("data-toggle","");

			var pageName = "";
			$(this).find("li > a").each(function(iidx){
				if($(this).attr("href").indexOf(location.pathname) >= 0){
					//console.log($(this).text());
					pageName = $(this).text();
					return false;
				}else{
					//console.log($(this).attr("href").indexOf(location.pathname));
				}
			});

			if($(this).find("[data-role=cate-sublist]").length > 0){
				if(pageName != ""){
					pageNaviObj.find("> a").text(pageName);
				}
				pageNaviObj.find(".dropdown-menu").remove();
				pageNaviObj.append("<ul class='dropdown-menu' role='menu'></ul>");
				pageNaviObj.find(".dropdown-menu").html($(this).find("[data-role=cate-sublist]").html());
				pageNaviObj.find("[data-toggle=dropdown]").addClass("has-sub");
			}else{
				//pageNaviObj.find(".dropdown-menu").remove();
				//pageNaviObj.find("[data-toggle=dropdown]").removeClass("has-sub");
				pageNaviObj.remove();	
			}			
			
		}

	});

	$("html").attr("data-page-depth",nPageChkObj.attr("data-attr"));
}

function fnFooterLinkGo(){
 var footLinkAreaStr = "#footer .linked_site_group";

 $(document).on("click",".linked_site_group button",function(ev){
	 var eventArea = $(this).parents(footLinkAreaStr);
	 var selObj = eventArea.find("select");
	
	if(selObj.val() != ""){
		window.open(selObj.val());
	}else{
		alert("선택된 사이트가 없습니다.");
	}
 });
}

function fnPageTopScroll(num){
	if(fnBrowserChk() == "Whale"){
		var scrollObj = $("html");
	}else{		
		var scrollObj = $("html");
	}

	if(num == undefined){
		var num = 0;
	}

	scrollObj.animate({scrollTop:num}, "300");
}


function fnThumbnailSet(){
	$(".thumbs img").each(function(idx){
		thumbObjCreate(this);
		thumbInfoTrans(this);
	});
	
	$(document).ajaxComplete(function(){
		$(".thumbs img").load(function(){
			thumbObjCreate(this);
			thumbInfoTrans(this);
		});
	});

	function thumbObjCreate(obj){
		var thumbArea = $(obj).parents(".thumbs");

		if(thumbArea.find(".thumb-obj").length < 1){
			thumbArea.prepend("<div class='thumb-obj'></div>");
		}
	}

	function thumbInfoTrans(obj){
		var thumbArea = $(obj).parents(".thumbs");
		var thumbObj = thumbArea.find(".thumb-obj");

		thumbObj.css("background-image","url(" + $(obj).attr("src") + ")");
		thumbObj.attr("title",$(obj).attr("alt"));
	}
}

function fnTabBasic(){
	var tabWrapAreaStr = "[data-role=tab-wrap]";
	var tabObjStr = "[data-role=tab]";
	var tabItemStr = "[data-role=tab-item]";

	tabSelectControl();

	$(tabObjStr).each(function(idx){
		if($(this).hasClass("is-active")){
			$(this).click();
		}
	});

	function tabSelectControl(){
		$(document).on("click","[data-role=tab]",function(ev){
			console.group("function: fnTabBasic");

			var cEvent = ev;
			var tabType = $(this).attr("data-type");			
			if(typeof tabType == "string"){
				tabType = tabType.toLowerCase();
			}

			switch (tabType){
				case "link":
					console.log("tabtype : link");
					tabLinkSelect(cEvent);
					break;

				case "ajax":
					console.log("tabtype : ajax");
					tabAjaxSelect(cEvent);
					break;

				default:
					console.log("tabtype : default");
					tabBasicSelect(cEvent);
			}

			console.groupEnd();
		});

		$(document).on("ajax-tab",function(ev,dataObj){
			tabAjaxCall(ev,dataObj);
		});
	}

	function tabBasicSelect(ev){
		var selObj = ev.target;
		if($(selObj).attr("data-role") == "tab"){
			selObj = selObj;
		}else{
			selObj = $(selObj).parents(tabObjStr);
		}
		
		var tabWrapArea = $(selObj).parents(tabWrapAreaStr);
		var tabItem = tabWrapArea.find(tabItemStr);

		tabItem.removeClass("is-active");
		tabItem.eq($(selObj).index()).addClass("is-active");

		$(selObj).siblings().removeClass("is-active");
		$(selObj).addClass("is-active");
		/*
		console.log(selObj);
		console.log(tabItem);
		*/

		console.log("tabBasicSelect : complete");
	}	// tabBasicSelect() end

	function tabLinkSelect(ev){
		var selObj = ev.target;
		if($(selObj).attr("data-role") == "tab"){
			selObj = selObj;
		}else{
			selObj = $(selObj).parents(tabObjStr);
		}

		var UrlData = $(selObj).attr("data-link");
		var LinkTarget = $(selObj).attr("data-target");
		if(typeof LinkTarget == "string"){
			LinkTarget = LinkTarget.toLowerCase();
		}

		if(UrlData == "" || UrlData == undefined){
			console.group("tabLinkSelect : Error");
			console.log("Not found link Data, check object data attribute - 'data-link' ");
			console.groupEnd();
		}else{
			if(LinkTarget == "" || LinkTarget == undefined){				
				console.log("target : own / link : " + UrlData);
				if(UrlData.indexOf("http") >= 0 && UrlData.indexOf(document.domain) < 0){
					if(confirm("외부 도메인으로 링크된 탭입니다. 이동하시겠습니까?")){
						location.href = UrlData;
						console.log("tabLinkSelect : complete");
					}else{
						console.log("tabLinkSelect : canceled");
					}
				}else{
					location.href = UrlData;
					console.log("tabLinkSelect : complete");
				}
				//location.href = UrlData;
			}else if(LinkTarget == "win" || LinkTarget == "window" || LinkTarget == "blank" || LinkTarget == "_blank"){
				console.log("target : window / link : " + UrlData);
				window.open(UrlData,"tabExtended");
			}else{
				console.group("tabLinkSelect : Error");
				console.log("Invalid target, check object data attribute - 'data-target' ");
				console.log("The correct target value is 'win' or 'window' or 'blank' or '_blank' or Nothing ");
				console.groupEnd();
				console.log("target : own / link : " + UrlData);
				if(UrlData.indexOf("http") >= 0 && UrlData.indexOf(document.domain) < 0){
					if(confirm("외부 도메인으로 링크된 탭입니다. 이동하시겠습니까?")){
						location.href = UrlData;
						console.log("tabLinkSelect : complete");
					}else{
						console.log("tabLinkSelect : canceled");
					}
				}else{
					location.href = UrlData;
					console.log("tabLinkSelect : complete");
				}
			}
		}
	}	// tabLinkSelect() end

	function tabAjaxSelect(ev){
		var selObj = ev.target;
		if($(selObj).attr("data-role") == "tab"){
			selObj = selObj;
		}else{
			selObj = $(selObj).parents(tabObjStr);
		}

		var UrlData = $(selObj).attr("data-link");

		var tabWrapArea = $(selObj).parents(tabWrapAreaStr);
		var tabItem = tabWrapArea.find(tabItemStr);

		if(UrlData == "" || UrlData == undefined){
			console.group("tabAjaxSelect : Error");
			console.log("Not found link Data, check object data attribute - 'data-link' ");
			console.groupEnd();
		}else{
			console.log("tabAjaxSelect : complete");
			$("[data-role=tab-item]").eq(0).trigger("ajax-tab",{
				ajaxUrl : UrlData,
				ajaxArea : tabItem,
				tabNumber : $(selObj).index(),
			});
		}
	}	// tabAjaxSelect() end

	function tabAjaxCall(ev,dataObj){		
		console.group("Ajax Call Activate!");
		console.log(dataObj);
		console.groupEnd();
		//dataObj.ajaxArea.eq(0).addClass("is-active");
	} // tabAjaxCall() end
}

function fnSetOptionType(objSelectorStr) {	
	$(objSelectorStr).find(".btn").each(function(idx){
		if($(this).find("input").length > 0){
			if($(this).find("input").attr("type") == "radio"){
				$(this).attr("data-type","radio");
			}else if($(this).find("input").attr("type") == "checkbox"){
				$(this).attr("data-type","checkbox");
			}
		};
	});
}


function fnMyPicUpload(){
	var areaSelectStr = ".mypic-wrap";
	var thumbnailSelectStr = "fiqure";
	var uploaderSelectStr = ".mypic-uploader";

	$(document).on("click", uploaderSelectStr + " > button",function(ev){
		var uploaderObj = $(this).parents(uploaderSelectStr);

		uploaderObj.find("input[type=file]").click();
	});

	$(document).on("change", uploaderSelectStr + " > input[type=file]",function(ev){
		var uploaderObj = $(this).parents(uploaderSelectStr);
		$(this).trigger("mypic","upload");

		console.log("trigger : mypic.upload");
	});

	$(document).on("mypic.upload",function(ev){
		var uploaderObj = $(this).parents(uploaderSelectStr);

		var areaObj = $(this).parents(areaSelectStr);
		var thumbObj = areaObj.find(thumbnailSelectStr);

		console.group("mypic upload objects");
			console.log(ev.target);
			console.log(areaObj);
			console.log(thumbObj);
		console.groupEnd();		
	});
}


function fnQuickTalkControl(){
	var quickTalkObjStr = ".quick_talk_wrap";
	var openRoleStr = "[data-role=open-quick]";
	var disableRoleStr = "[data-role=disable-quick]";
	var closeRoleStr = "[data-role=close-quick]";	

	$(document).on("click",disableRoleStr,function(ev){
		var chkObj  = $(this).parent().find("input[type=checkbox]");

		if(chkObj.is(":Checked")){
			setCookie("anysaquick",false,1);
		}

		$(ev.target).parents(quickTalkObjStr).removeClass("is-active");
	});

	$(document).on("quick-talk.load",function(ev){
		if(getCookie("anysaquick") != "false"){
			$(quickTalkObjStr).addClass("is-active");
		}
	});

	$(document).trigger("quick-talk","load");
}