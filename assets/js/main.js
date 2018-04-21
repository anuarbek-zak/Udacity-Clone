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
currentIndex = 0

// function onYouTubeIframeAPIReady() {
// 	player = new YT.Player('player', {
// 		height: '600',
// 		width:'100%',
// 		videoId: menuItems[Object.keys(menuItems)[currentIndex]].link.split('?v=')[1],
// 		events: {
// 			'onReady': onPlayerReady,
// 			'onStateChange': onPlayerStateChange
// 		}
// 	});
// }

// function onPlayerReady(event) {
// 	event.target.playVideo();
// }

// function onPlayerStateChange(event) {        
// 	if(event.data === 0) {            
// 		$('.quiz').fadeIn(1500)
// 	}
// }

$(document).ready(function() {	
	$lessons = $('.lessons')
	$quiz = $('.quiz')

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
			if(index==currentIndex) {
				currentItem = item
				$('.main h2').text(currentItem)
			}
			$lessons.append(`<li>
				<i class="fa fa-circle"></i>
				<span class="digit">${++index}.</span>
				<span class="title">${item}</span>
				</li>`)
		}
	}

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

	function loadLesson(val){
		// $quiz.hide()
		currentItem = val
		// player.loadVideoById(menuItems[currentItem].link.split('?v=')[1])
		$('.main h2').text(currentItem)
		generateTest()
	}


	function generateDom(){
		generateMenu()
		loadLesson(currentItem)
	}

	generateDom()
// $('#h').click(function(){
	// })
	// listeners
	$('.finish').click(function(e){
		e.preventDefault()
		var correctAnswrs = 0;
		$('.question').each(function(i){
			if(menuItems[currentItem].quiz[i].answer == $(this).find('input[type="radio"]:checked').val()) correctAnswrs++
		})
		doneLessons.push(currentItem)
		$lessons.find('li').eq(currentIndex).find('.fa').removeClass('fa-circle').addClass('fa-check')
		currentIndex++
	})

	$lessons.find('li').click(function(){
		loadLesson($(this).find('.title').text())		
	})
	// listeners end

})


