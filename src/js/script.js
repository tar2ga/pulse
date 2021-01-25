$(document).ready(function(){
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