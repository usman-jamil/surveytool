$(document).ready(function(){
	$(".dropdown-menu-ico").click(function(){		
		showDropdownMenu();
	});

	//TABS ON HOME PAGE 
	$(function() {
	    $('#homepage-big-tabs .tabs li').click(function(){
	    	$('#homepage-big-tabs .tabs li').removeClass('selected');
	        $(this).addClass('selected');
	        var currentTab = $(this).children("a").attr('href');
	        $('#homepage-big-tabs .tab-content').hide();
	        $(currentTab).show();
	        return false;
	    });

	    $('.news-panel .tabs li').click(function(){
	    	$('.news-panel .tabs li').removeClass('selected');
	        $(this).addClass('selected');
	        var currentTab = $(this).children("a").attr('href');
	        $('.news-panel .tab-content').hide();
	        $(currentTab).show();
	        return false;
	    });

	    $('.media-gallery-panel .tabs li').click(function(){
	    	$('.media-gallery-panel .tabs li').removeClass('selected');
	        $(this).addClass('selected');
	        var currentTab = $(this).children("a").attr('href');
	        $('.media-gallery-panel .tab-content').hide();
	        $(currentTab).show();
	        return false;
	    });

	    $('.emiratis-in-org-tabs .tabs li').click(function(){
	    	$('.emiratis-in-org-tabs .tabs li').removeClass('selected');
	        $(this).addClass('selected');
	        var currentTab = $(this).children("a").attr('href');
	        $('.emiratis-in-org-tabs .tab-content').hide();
	        $(currentTab).show();
	        return false;
	    });	    

		$('#photo-gallery-popup ul li .ico-btn-zoom').click(function(){
		    showPhotoGalleryPopup();
		    return false;   
		});

		$('#photo-gallery-popup .btn-close-popup').click(function(){
		    hidePhotoGalleryPopup();
		    return false;   
		});

	    //$(function() {
		//    $( "#faqs-accordion" ).accordion();
		//});
	});

});


function showPhotoMediaGalleryPopup(ID) {

    // alert(ID)
    var img_src = $('#img' + ID).attr('src');
    // alert(img_src);
    // alert($('#span' + ID).text());
    // var currentTab = $(this).children("a").attr('href');
    // var imgprev = $('#imgprev').children("img").attr('src');
    $('#preimgtitle').text($('#span' + ID).text());
    //$('#preimgid').text(ID);
    $('#imgprev').attr('src', img_src);
    // imgprev = imgurl;
    $('.overlay-wrapper').show();
    $('.overlay').show();
    $('#photo-gallery-popup').show();
    //LoadPhotoAlbumsComments(ID);
    //LoadPhotoAlbumsLikes(ID);


}
$(document).click(function(event) {
	if (!$(event.target).closest(".dropdown-menu-ico").length) {
		hideDropdownMenu();
	}
});

function showDropdownMenu(){
	$(".dropdown-menu").show();
}

function hideDropdownMenu(){
	$(".dropdown-menu").hide();	
}

function showPhotoGalleryPopup(){
	$('.overlay-wrapper').show();
	$('.overlay').show();
    $('#photo-gallery-popup').show();
}

function hidePhotoGalleryPopup(){
	$('.overlay-wrapper').hide();		    
    $('.overlay').hide();
    $('#photo-gallery-popup').hide();
}