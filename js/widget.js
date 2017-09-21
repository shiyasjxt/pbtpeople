!(function($){
	$(function(){

		var searchButtonSelector = "#btn-widget-search";
		
		$("#widget-search").keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).mousedown();
				$(searchButtonSelector).click();
				return false;
			}
		});		

	});
})(jQuery);