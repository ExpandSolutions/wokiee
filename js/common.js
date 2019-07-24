$(document).ready(function() {

	$('.currency-language > currency-box >  a ').click(function(event) {
		event.preventDefault();
		 return false;
	});

	$(document).on('click', ".form-qty .btn-number", function() {
		$(".qty-up").html('<i class="fa fa-caret-up" aria-hidden="true"></i>');
		$(".qty-down").html('<i class="fa fa-caret-down" aria-hidden="true"></i>');
		if ($(this).hasClass('qtyplus')) {
			$("[name=quantity]", '.form-qty').val(parseInt($("[name=quantity]", '.form-qty').val()) + 1);
			
		} else {
			if (parseInt($("[name=quantity]", '.form-qty').val()) > 1) {
				$("[name=quantity]", '.form-qty').val(parseInt($("[name=quantity]", '.form-qty').val()) - 1);
				
			}
		}
	});

	/* Search */
	$('.button-search').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search';
				 
		var search = $('input[name="search"]:visible').val();
		
		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}
		
		location = url;
	});
	
	$('#search input[name=\'search\']').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			e.stopPropagation();
			url = $('base').attr('href') + 'index.php?route=product/search';
			 
			var search = $(this).val();
			
			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}
			
			location = url;
		}
	});

	$(document).on('click', '.list-mini-cart-item .delete', function() {
		var del_id = $(this).attr('id');

		if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
            location = 'index.php?route=checkout/cart&remove=' + del_id;
		} else {
            $.get('index.php?route=common/cart&remove=' + del_id, function(html) {
                $.ajax({
                    url: 'index.php?route=checkout/cart/count',
                    dataType: 'json',
                    success: function(json) {
                        $('#counterLabel').html(json['product_count']);
                        $('#cartDropList').html(html);
                    }
                });
            });
		}

        return false;
	});

    var sectionId = getURLVar('draftsectionid');
    if(sectionId != '') {
        setTimeout(function() {
            //debugger;
            if($('div#section-' + sectionId).length > 0)
                $(document).scrollTop($('div#section-' + sectionId).offset().top);
        }, 100);
    }
});

function getURLVar(key) {
	var value = [];
	
	var query = String(document.location).split('?');
	
	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');
			
			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}
		
		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

function contact_us(id) {
    $('#contact-form input[name="enquiry"]').val($('#enquiry-'+id).html()+'\n');
    $('#contact-form').submit();
}

function addToCart(product_id, quantity, is_negativeprice) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;
    is_negativeprice = typeof(is_negativeprice) != 'undefined' ? is_negativeprice : false;

    if(is_negativeprice) {
        $('#contact-form input[name="enquiry"]').val($('#enquiry-'+product_id).html()+'\n');
        $('#contact-form').submit();
        return;
	}

	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
            if(json['success'] == 'affiliate_link') {
                document.location = json['affiliate_link'];
                return;
            }

            $('.alert-success, .alert-warning, .alert-attention, .alert-information, .alert-error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['success']) {
				$('#notification').html('<br><div class="alert alert-success alert-dismissible" style="display: none;" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + json['success'] + '</div>');
				
				$('.alert-success').fadeIn('slow');
				
				$('#counterLabel').html(json['product_count']);

                $.get('index.php?route=common/cart', function(html) {
                    $('#cartDropList').html(html);
                });

                if (json['enable_order_popup'] != '1')
				    $('html, body').animate({ scrollTop: 0 }, 'slow');

                if (json['enable_order_popup'] == '1') {
                    $('head').append("<style type='text/css'>.customAddtoCart .ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix {display: none;} .customAddtoCart div#add-to-cart-dialog {min-height: 1px !important;} [dir=rtl] .ui-widget {font-family: 'Droid Arabic Kufi', 'droid_serifregular' !important;}</style>");

                    $('body').append('<div id="add-to-cart-dialog" style="display:none;"><div style="margin: 13px 0;">' + json['text_cart_dialog'] + '</div></div>');

                    $("#add-to-cart-dialog").dialog({
                        modal: true,
                        draggable: false,
                        resizable: false,
                        position: ['center', 'center'],
                        show: 'blind',
                        hide: 'blind',
                        width: 500,
                        dialogClass: 'ui-dialog-osx customAddtoCart',
                        buttons: [{
                            text: json['text_cart_dialog_continue'],
                            click: function() {
                                $(this).dialog("close");
                            }
                        },
                            {
                                text: json['text_cart_dialog_cart'],
                                click: function() {
                                    window.location.href = json['cart_link'];
                                }
                            }
                        ]
                    });
                }
			}	
		}
	});
}
function addToWishList(product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.alert-success, .alert-warning, .alert-attention, .alert-information').remove();
						
			if (json['success']) {
				let alertClass  = ''
                if(json['status'] == '1')
                    alertClass  = 'alert-success'
                else
                    alertClass  = 'alert-warning'
                
				$('#notification').html('<br><div class="alert '+alertClass+' alert-dismissible" style="display: none;" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + json['success'] + '</div>');
				
				if(json['status'] == '1')
                    $('.alert-success').fadeIn('slow');
                else
                    $('.alert-warning').fadeIn('slow');
				
				$('#wishlist-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}	
		}
	});
}

function addToCompare(product_id) { 
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.alert-success, .alert-warning, .alert-attention, .alert-information').remove();
						
			if (json['success']) {
				$('#notification').html('<br><div class="alert alert-success alert-dismissible" style="display: none;" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + json['success'] + '</div>');
				
				$('.alert-success').fadeIn('slow');
				
				$('#compare-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}