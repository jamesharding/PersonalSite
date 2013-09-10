$(document).ready(function(){
	$('#menu a[href="'+window.location.pathname+'"]').addClass('active');
	
	$('#loader').hide(0);
	$('body').on('click', 'a.internal, #menu a', function() {
		history.pushState({ path: this.path }, '', this.href);
		var th = this;

		$('a.active').removeClass('active');
		$('#menu a[href="'+window.location.pathname+'"]').addClass('active');

		$('#content').addClass('left');
		$('#loader').fadeIn(500);

		$.get(th.href, function(data) {
			var $data = $(data);

			// Replace title and description
			document.title = $data.filter('title').text();
			$('meta[name=description]').attr('content', $data.filter('meta[name=description]').attr('content'));
			
			// Track on Piwik
			_paq.push(['setCustomUrl', window.location]);
			_paq.push(['setDocumentTitle', document.title]);
			_paq.push(['trackPageView']);
			_gaq.push(['_trackPageview']);

			setTimeout(function(){
				// Replace content
				$('#content').html( $data.filter('#content')[0].children );
				$('#content').addClass('notransition');
				$('#content').addClass('right');
				$('#content').removeClass('left');

				setTimeout(function(){
					$('#loader').fadeOut(500);
					$('#content').removeClass('notransition');
					$('#content').removeClass('right');
				}, 500);
			}, 550);

				
			
		});
		return false;
	});
	
	window.addEventListener('load', function() {
		// Hacky workaround for webkit initial popstate call.
		setTimeout(function() {
			$(window).bind('popstate', function() {
				$.get(location.pathname, function(data) {
					$('#content').html( $(data).filter('#content')[0].children );
					document.title = $(data).filter('title').text();
				});
				return false;
			});
		}, 100);
	});
});
