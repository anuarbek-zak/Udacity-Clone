var player,
menuItems = {
	" Философия инвестирования - магия цифр":{
		link:'https://www.youtube.com/watch?v=z1fRCefIKjY',
		quiz:[
		{
			question:"Что такое инвестиций?",
			answer:"Это вложение денежных средств в различные финансовые инструменты с целью получения прибыли",
			options:[
			"Билет государственного займа-это ресурсы, контролируемые компанией в результате ",
			"Ценная бумага, удостоверяющая участие ее владельца на управление акционерным обществом",
			"Это ресурсы, контролируемые компанией в результате прошлых событий, от которых компания ожидает экономической выгоды в будущем"]
		},
		{
			question:"Что такое пассивный доход?",
			answer:"Доход не зависящий от ежедневной деятельности. К таковым относят проценты на вклады, дивиденды",
			options:[
			"Та прибыль, которую с определенной периодичностью получают акционеры по своим акциям от компании, которая выпустила данные акции",
			"Доходы компании. Поступления могут быть как в виде финансов, так и в виде имущественных доходов.",
			"Доходы от торговой деятельности. Здесь объяснять не нужно. Средства от продажи чего-либо. Получает продаве"]
		},
		{
			question:"Что такое сложный процент?",
			answer:"Когда проценты прибыли прибавляются к основной сумме и в дальнейшем сами участвуют в создании новой прибыли.",
			options:[
			"Процентная ставка может изменяться в зависимости от колебаний различных факторов",
			"Это процент  за кредит и процент за депозит.",
			"Процентная ставка представляет собой такую систему начисления процентов, при которой процент за пользование ссудой остается неизменным на протяжении всего срока кредитования"]
		}]
	},
	"Как кратно увеличить свои инвестиции - главные принципы":{
		link:'https://www.youtube.com/watch?v=jwnKNx4ZqtU',
		quiz:[
		{
			question:"Что такое пик экономики?",
			answer:"вершина цикла деловой активности, является «высшей точкой» экономического подъема.",
			options:[
			"это «низшая точка» производства и занятости. Считается, что данная фаза цикла обычно не бывает продолжительной",
			"длительное, устойчивое снижение объемов производства основных видов товаров и услуг, понижение деловой активности"]
		},
		{
			question:"В какой момент экономической активности  нужно инвестировать?",
			answer:"в момент кризиса",
			options:[
			"во время пика экономики",
			"в устойчивое время"
			]
		},
		{
			question:"Самый известный инвестор во всем мире?",
			answer:"Уоррен Баффет",
			options:["Стив Джобс","Стивен Кови"]
		},		{
			question:"Что такое рецессия?",
			answer:"В экономике  термин обозначает относительно умеренный, некритический спад производства или замедление темпов экономического роста",
			options:[
			"Стагнация сопровождается увеличением численности безработных, снижением заработной платы и уровня жизни населения",
			"Чрезмерное увеличение количества обращающихся в стране бумажных денег, вызывающее их обесценение"]
		}]
	},
	"Что именно нужно делать, чтобы стать богатым?":{
		link:'https://www.youtube.com/watch?v=ajavC3YfQEM',
		quiz:[]
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
		if(currentIndex==menuItemsNames.length-1){
			$modal.fadeIn(500)
			$modal.find('h3').text('Поздравляем, Курс Пройден!')
			$modal.find('.answer').html('Дорогой будущий инвестор! Спасибо за прохождение нашего онлайн курса по основам инвестирования, надеемся наши уроки помогли вам сделать первый шаг в этом направлении. Желаем успехов! <br><br> <b>Скачайте одно из наших приложений</b>')
			$modal.find('.again-next').hide()
			$modal.find('.apps').show()
			return;
		}            
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
		// if(index==menuItemsNames.length){
		// 	$modal.find('h3').text('Поздравляем, Курс Пройден!')
		// 	$modal.find('.answer').html('Дорогой будущий инвестор! Спасибо за прохождение нашего онлайн курса по основам инвестирования, надеемся наши уроки помогли вам сделать первый шаг в этом направлении. Желаем удачи! <br><br> <b>Скачайте одно из наших приложений</b>')
		// 	$modal.find('.again-next').hide()
		// 	$modal.find('.apps').show()
		// 	return
		// }

		$quiz.hide()
		$modal.hide()
		$modal.find('.again-next').show()
		$modal.find('.apps').hide()
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
		var correctAnswrs = 0,
		questionsCount = menuItems[menuItemsNames[currentIndex]].quiz.length;
		$('.question').each(function(i){
			if(menuItems[menuItemsNames[currentIndex]].quiz[i].answer == $(this).find('input[type="radio"]:checked').val()) correctAnswrs++
		})
		$modal.show()
		$modal.find('.answer').html(`Ваш результат : <b> ${correctAnswrs} </b> правильных из <b> ${ questionsCount } </b>`)
	})

	$modal.find('.close').click(function(){
		$modal.hide()
	})

	$modal.find('.again').click(function(){
		loadLesson(currentIndex,true)
	})

	$modal.find('.next').click(function(){
		loadLesson(++currentIndex,true)
	})

	$lessons.find('li').click(function(){
		loadLesson($(this).index(),true)		
	})

	$('.arrow').click(function(){
		$('.sidebar').width(0)
	})
	// listeners end

})


