var player,
menuItems = {
	"Введение в CSS":{
		link:'https://www.youtube.com/watch?v=IO36s0FytI8',
		quiz:[
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		]
	},
	"Основы в HTML":{
		link:'https://www.youtube.com/watch?v=DKEyMu3lHqE',
		quiz:[
		{
			question:"Что такое СSS2?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		{
			question:"Что такое СSS?",
			answer:"Каскадные таблицы стилей",
			options:["alfjakfds;","kdlfjals;kdjflajdfl;akjd","kdfjal;sdjfl;asdjl;"]
		},
		]
	},
},
currentItem,
doneLessons = [],
currentIndex = 0,
menuItemsNames = Object.keys(menuItems),
$lessons = $('.lessons'),
$quiz = $('.quiz')


function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '600',
		width:'100%',
		videoId: menuItems[menuItemsNames[currentIndex]].link.split('?v=')[1],
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {        
	if(event.data === 0) {            
		$quiz.fadeIn(1500)
		$lessons.find('li').eq(currentIndex).find('.fa').removeClass('fa-circle').addClass('fa-check')
		$('html, body').animate({
			scrollTop: $(".quiz").offset().top
		}, 1000)
	}
}


$(document).ready(function() {	
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	function generateMenu(){
		var index = 0
		for(item in menuItems){
			if(index==currentIndex) currentItem = item
				$lessons.append(`<li>
					<i class="fa fa-circle"></i>
					<span class="digit">${++index}.</span>
					<span class="title">${item}</span>
					</li>`)
		}
		loadLesson(currentItem,0,false)
	}

	generateMenu()

	function generateTest(){
		$questions = $('.questions').empty()
		menuItems[currentItem].quiz.forEach(function(x,i){
			$question = $(`<div class="question">
				<h4>${x.question}</h4>
				</div>`).appendTo($questions)

			x.options.push(x.answer)
			shuffleArray(x.options)

			x.options.forEach(function(y,j){
				$question.append(`<li>
					<input value="${y}"  name="${i}" id="${j+''+i}" type="radio">
					<label for="${j+''+i}">${y}</label>
					</li>`)
			})
		})
	}

	function loadLesson(name,index,loadVideo){
		$quiz.hide()
		currentItem = name
		currentIndex = index
		localStorage.setItem('currentItem',currentItem)
		localStorage.setItem('currentIndex',currentIndex)
		if(loadVideo) player.loadVideoById(menuItems[currentItem].link.split('?v=')[1])
		$('.main h2').text(currentItem)
		generateTest()
		$lessons.find('li').removeClass('active')
		$lessons.find('li').eq(currentIndex).addClass('active')
	}

	// listeners
	$('.finish').click(function(e){
		e.preventDefault()
		var correctAnswrs = 0;
		$('.question').each(function(i){
			if(menuItems[currentItem].quiz[i].answer == $(this).find('input[type="radio"]:checked').val()) correctAnswrs++
		})
		doneLessons.push(currentItem)
		$('#myModal').show()
		loadLesson(menuItemsNames[++currentIndex],currentIndex,true)
	})

	$lessons.find('li').click(function(){
		loadLesson($(this).find('.title').text(),$(this).index(),true)		
	})
	// listeners end

})


