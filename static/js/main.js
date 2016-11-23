$(document).ready(function(){
	$('body').addClass('a');

	rebind();
	
	$('#loader').hide(0);

});

function rebind(){
	$('body.engineering h1').click(function(){
		$('body').removeClass('engineering');
		$('body').addClass('a');
		rebind();
	});

	$('body.a h1').click(function(){
		$('body').removeClass('a');
		$('body').addClass('aviation');
		rebind();
	});

	$('body.aviation h1').click(function(){
		$('body').removeClass('aviation');
		$('body').addClass('b');
		rebind();
	});

	$('body.b h1').click(function(){
		$('body').removeClass('b');
		$('body').addClass('engineering');
		rebind();
	});
}
