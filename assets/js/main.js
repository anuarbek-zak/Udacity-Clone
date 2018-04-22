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
	"Введение в JS":{
		link:'https://www.youtube.com/watch?v=61mqENQgbV8',
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
doneLessons = localStorage.getItem('doneLessons')?JSON.parse(localStorage.getItem('doneLessons')):[],
currentIndex = localStorage.getItem('currentIndex')?localStorage.getItem('currentIndex'):0,
menuItemsNames = Object.keys(menuItems),
$lessons = $('.lessons'),
$quiz = $('.quiz'),
$modal = $('#myModal')

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
		doneLessons.push(+currentIndex)
		changeLessonToChecked()
		localStorage.setItem('doneLessons',JSON.stringify(doneLessons))
		$('html, body').animate({
			scrollTop: $(".quiz").offset().top
		}, 1000)
	}
}

function changeLessonToChecked(){
	doneLessons.forEach(function(y,j){
		$lessons.find('li').each(function(x,i){
			if(x==+y)	$(this).find('.fa').removeClass('fa-circle').addClass('fa-check')
		})
	})
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
			$lessons.append(`<li>
				<i class="fa fa-circle"></i>
				<span class="digit">${++index}.</span>
				<span class="title">${item}</span>
				</li>`)
		}
		changeLessonToChecked()
		loadLesson(currentIndex,false)
	}


	function generateTest(){
		$questions = $('.questions').empty()
		menuItems[menuItemsNames[currentIndex]].quiz.forEach(function(x,i){
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

	function loadLesson(index,loadVideo){
		$quiz.hide()
		currentIndex = index
		localStorage.setItem('currentIndex',currentIndex)
		if(loadVideo) player.loadVideoById(menuItems[menuItemsNames[currentIndex]].link.split('?v=')[1])
			$('.main h2').text(menuItemsNames[currentIndex])
		generateTest()
		$lessons.find('li').removeClass('active')
		$lessons.find('li').eq(currentIndex).addClass('active')
	}
	generateMenu()

	// listeners
	$('.finish').click(function(e){
		e.preventDefault()
		var correctAnswrs = 0;
		$('.question').each(function(i){
			if(menuItems[menuItemsNames[currentIndex]].quiz[i].answer == $(this).find('input[type="radio"]:checked').val()) correctAnswrs++
		})
		$modal.show()
		loadLesson(currentIndex,true)
	})

	$modal.find('.close').click(function(){
		$modal.hide()
	})

	$lessons.find('li').click(function(){
		loadLesson($(this).index(),true)		
	})
	// listeners end

})


