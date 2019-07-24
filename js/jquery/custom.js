// Adapt 960 grid sys
//--------------------------------------------- 
var ADAPT_CONFIG = {
  path: 'expandish/view/theme/gazal/stylesheet/grid/',
  dynamic: true,
  range: [
	'0px    to 760px  = mobile.css',
	'760px  to 980px  = 720.css',
	'980px  to 1280px = 960.css',
	'1280px to        = 1200.css'
  ]
};



// Tabs
//---------------------------------------------
/* <![CDATA[ */
$(document).ready(function(){
	$(".tab_content").hide();
$("ul.tabs").each(function() {
    $(this).find('li:first').addClass("active");
    $(this).next('.tab_container').find('.tab_content:first').show();
});

$("ul.tabs li a").click(function() {
    var cTab = $(this).closest('li');
    cTab.siblings('li').removeClass("active");
    cTab.addClass("active");
    cTab.closest('ul.tabs').nextAll('.tab_container:first').find('.tab_content').hide(); 

    var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content
    $(activeTab).fadeIn(); //Fade in the active ID content
    return false;
});
});
/* ]]> */


//simple swap
//----------------------------------------------
function SimpleSwap(el,which){
  el.src=el.getAttribute(which || "data-original");
}
function SimpleSwapSetup(){
  var x = document.getElementsByTagName("img");
  for (var i=0;i<x.length;i++){
	var oversrc = x[i].getAttribute("oversrc");
	if (!oversrc) continue;
	//x[i].oversrc_img = new Image();
	//x[i].oversrc_img.src=oversrc;
	x[i].onmouseover = new Function("SimpleSwap(this,'oversrc');");
	x[i].onmouseout = new Function("SimpleSwap(this);");
	//x[i].setAttribute("origsrc",x[i].src);
  }
}
var PreSimpleSwapOnload =(window.onload)? window.onload : function(){};
window.onload = function(){PreSimpleSwapOnload(); SimpleSwapSetup();};


// Fred Slider
//--------------------------------------------- 
$(window).load(function() {
	$('.foo3').carouFredSel({
		auto: true,
		//pagination: ".pager2",
		prev: '#prev2',
		next: '#next2',
		width: '100%',
		height: 'auto',
		mousewheel: false,
		transition: true,
		auto: {
			pauseOnHover: 'resume',
		},
		scroll : {
	        duration : 1000
	    },
		items: {
			height: 'auto',
			visible: {
				min: 1,
				max: 4,
			}
		}
	});
	});


//Go ttop
//----------------------------------------------
$(document).ready(function() {
	$().UItoTop({ easingType: 'easeOutQuart' });
});
