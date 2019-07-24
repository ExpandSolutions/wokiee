$(document).ready(function() {
	/* $('.box-heading').each(function(){
		var me = $(this);
		me.html( me.text().replace(/(^\w+|\s+\w+)/,'<span class="tcolor">$1</span>') );
	}); */	
	$("ul li:first-child").addClass('first');
	$("ul li:last-child").addClass('last');
});

 
