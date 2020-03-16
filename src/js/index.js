$(document).ready(function(){
  const $productNav = $('.c-tab__nav');
  const $subSlider = $('.main-sub-slider');
  const menuItem = $('.c-sidebar__item:not(.js-cat-menu)');
  const timeoutArray = [];

  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 3000,
    initialSlide: 1,
    asNavFor: '.main-sub-slider'
  });

  $subSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 3000,
    initialSlide: 1,
    asNavFor: '.main-slider',
  });

  $subSlider
    .find('.main-sub-slider__slide')
    .click(function(e) {
      e.stopPropagation();

      $subSlider
        .slick('slickGoTo', $(this).data('slick-index'));
  });

  if ( $('.l-product__img').length ) {

    $('.l-product__img').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      fade: false,
      asNavFor: '.l-product__list'
    });

    $('.l-product__list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.l-product__img',
      dots: false,
      infinite: true,
      centerMode: false,
      // centerPadding: '50px',
      focusOnSelect: true
    });

    $('.l-product__img .slick-slide').zoom();
  }

  const menuItemHandler = item => {
    const itemInfo = item.find('.c-sidebar__item-info');

    item.hover(
      () => itemInfo.addClass('is-active'),
      () => itemInfo.removeClass('is-active')
    )
  }

  $('.js-cat-menu .c-sidebar__item-main').mouseenter(function() {

		menuItem.each(function(index) {
      const item = $(this);

      menuItemHandler(item);

      timeoutArray.push(
        setTimeout(() => item.addClass('is-active'), 200 + (index * 200))
      );
		});
	});

	$('.js-cat-menu').mouseleave(function() {

    for (let i = 0; i < timeoutArray.length; i++) {
      clearTimeout(timeoutArray.pop());
    }

		$(menuItem.get().reverse()).each(function(index) {
			setTimeout(() => $(this).removeClass('is-active'), 200 + (index * 200));
		});
  });

  function productFilterHandler(el = $(this)) {
    const filterValue = el.attr('data-filter');
    $grid.isotope({ filter: '.' + filterValue });
  }

  function productLinkHandler() {

    $('.product-link')
      .find('.u-subtitle')
      .text(
        $(this)
          .find('span')
          .text()
      );
  }

  const $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    layoutMode: 'fitRows',
    resize: true,
    stagger: 80,
    transitionDuration: '0.8s'
  });

  $productNav.on( 'click', '.c-tab__item', function() {
    const item = $(this);

    $productNav.find('.c-tab__item').removeClass('is-active');
    item.addClass('is-active');

    productLinkHandler.call(this);
    productFilterHandler.call(this);
  });

  productFilterHandler( $('.c-tab__item.is-active') );
});