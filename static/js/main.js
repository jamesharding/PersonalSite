$(document).ready(function(){
	$('#loader').hide(0);
	$('body').on('click', '#menu a', function() {
		history.pushState({ path: this.path }, '', this.href);
		var th = this;

		$('#content').addClass('left');
		$('#loader').fadeIn(100);

		$.get(th.href, function(data) {
			var $data = $(data);

			// Replace content
			document.title = $data.filter('title').text();
			
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
					$('#loader').fadeOut(100);
					$('#content').removeClass('notransition');
					$('#content').removeClass('right');
				}, 250);
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
