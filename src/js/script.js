$(document).ready(function(){//когда документ загружен
	// $('.carousel__inner').slick({
	// 	speed: 1200,
	// 	//adaptiveHeight: true,
	// 	// autoplay: true,
	// 	// autoplaySpeed: 2000,
	// 	//пути надо прописывать с учётом того что мы как бы находимся в index.html (без ../)
	// 	prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
	// 	nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
	// 	responsive: [
	// 		{
	// 			breakpoint: 992,
	// 			settings: {
	// 			  dots: true,
	// 			  arrows: false
	// 			}
	// 		}
	// 	]
	// });
	$('ul.catalog__tabs')//на элементе ul.catalog__tabs
		.on('click', 'li:not(.catalog__tab_active)', //при клике по li, у которого нет класса catalog__tab_active
		function() {//выполняем функцию
			$(this) //для текущего элемента
				.addClass('catalog__tab_active')//добавляем класс catalog__tab_active
				.siblings()//для всех элементов списка, кроме текущего ("соседей")
				.removeClass('catalog__tab_active')//удаляем класс catalog__tab_active
				.closest('div.container')//в элементе выше по дереву типа div и названием класса "container"
				.find('div.catalog__content')//найти элемент типа div и название класса "catalog__content"
				.removeClass('catalog__content_active')//у всех найденных элементов удаляем класс catalog__content_active
				.eq(
					$(this).index()//индекс элемента
					)//для элемента, по которому произошёл click
				.addClass('catalog__content_active');//добавить класс catalog__content_active
  		});

	function toggleSlide(item) {
		$(item).each(function(i) { //для каждого catalog-item__link (в i попадает только индекс)
			$(this).on('click', function(e) {
				e.preventDefault();//отменяем стандартное действие браузера при переходе на ссылку

				$('.catalog-item__content')//для catalog-item__content
					.eq(i)
					.toggleClass('catalog-item__content_active'); //добавлеям класс

				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	//Modal
	$('[data-modal=consultation]')//получаем элементы по data атрибуту
		.on('click', function() {
			$('.overlay, #consultation')//находим элемент c классом overlay и элемент с id #consultation
				.fadeIn();//анимированное появление
		});
	$('.modal__close').on('click', function() {
		console.log($(this));
		$('.overlay, #consultation, #order, #thanks')
			.fadeOut();//анимированное исчезновение
	});

	$('.button_mini').each(function(i) {
		 $(this).on('click', function(){
			$('#order .modal__desc')//для элемента с id order и классом modal__desc
			.text(//устанавливаем текст
				$('.catalog-item__subtitle')
					.eq(i).text()
			)

			$('.overlay, #order').fadeIn();
		 });
	})

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите своё имя",
				phone: "Пожалуйста, введите свой телефон",
				email: {
				  required: "Пожалуйста, введите свой почтовый адрес",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	}

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	$('input[name=phone]')//для элемента input, у которого атрибут name равен 'phone'
		.mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST", //отдаём данные серверу
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {//при завершении операции
			$(this).find("input").val("")//очищаем все импуты
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn();

			$('form').trigger('reset');//очищаем все формы
		});

		return false;
	})

	//показываем и скрываем кнопку pageup
	$(window)//страница браузера
		.scroll(function() {//при скроле
			if($(this).scrollTop() > 1600){
				$('.pageup').fadeIn();
			} else {
				$('.pageup').fadeOut();
			}
		});

	//плавный скрол вверх
	// $("a[href^='#']")//находим все ссылки у которых атрибут href начинается с решётки
	$("a[href='#up']")
	.click(function(){
		const _href = $(this).attr("href");//получаем значение атрибута href
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	//wow.min.js
	new WOW().init();
});

//tiny-slider
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: false,
  });

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});