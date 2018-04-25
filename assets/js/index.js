$(document).ready(function(){
	$('#watch').on('click', function(ev) {
		$("#video")[0].src += "&autoplay=1";
		ev.preventDefault();

	});

	$('.btn').click(function(){
		$('body').append('<div class="my-modal"><div class="my-modal-content"><div class="close flex jc-fe"><span>&times;</span></div><iframe id="modalVideo" width="700" height="450" src="https://www.youtube.com/embed/z1fRCefIKjY?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>')
		$('.close span').click(function(){
			$('.my-modal').remove()
		})
	})


})