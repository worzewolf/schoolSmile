var gallery = $('.gallery'),
    imageProduct = gallery.find('.img > img'),
    overlay = $('<div class="overlay"></div>');
    arrowNext = gallery.find('a.next'),
    arrowPrev = gallery.find('a.prev');

var sliderPrev = $('.preview > .img').smilecarousel({
    delay: 300,
    toShow: 4,
    toSlide: 1,
    overlay: $('.overlay'),
    fullSizeImg: $('.gallery > .img > img'),
    fullSizeGal: $('.gallery > .img'),
    handlerItem: function (e) {
        var src = e.target.getAttribute('src');
            index = e.target.getAttribute('data-item');
        if (src){
            imageProduct.attr({'src': src, 'data-img': index}).data('img', index);
            overlay.css('left', e.target.parentElement.offsetLeft);
        }
    },
    overlay:overlay,
});

arrowNext.on('click', galleryGo);
arrowPrev.on('click', galleryGo);

var sliderPrevOptions = sliderPrev.smilecarousel('options'),
    sliderWidth = sliderPrevOptions.sliderWidth,
    sliderItem = sliderPrevOptions.itemWidth,
    sliderCount = sliderPrevOptions.countSlide;

function galleryGo(){
    var slide = '',
        currentSlideCoords = sliderItem * imageProduct.data(img),
        carouselOffset = Math.abs(parseInt(sliderPrev.find('.scarousel_item_wrapper').css('marginLeft')));
    if($(this).hasClass('next')){
        slide = sliderPrev.find('[data-item=' + (+imageProduct.data('img') + 1) +']');
        if(+imageProduct.data('img') < sliderCount - 1){
            go();
        }
        if((currentSlideCoords - carouselOffset) >= sliderWidth) {
            sliderPrev.smilecarousel('toNext');
        }
    } else {
        slide = sliderPrev.find('[data-item=' + (+imageProduct.data('img') - 1) +']');
        if(+imageProduct.data('img') > 0){
            go();
        }
            Math.abs(sliderPrev.find('.scarousel_item_wrapper').css('marginLeft'));
        if(currentSlideCoords < carouselOffset){
            sliderPrev.smilecarousel('toPrev');
        }
    }
    function go() {
        imageProduct.attr({'src': slide.find('img').attr('src'), 'data-img': slide.data('item')});
        imageProduct.data('img', slide.data('item'));
        overlay.css('left', slide[0].offsetLeft);
    }
    return false;
}

$('.right-prev').on('click', function () {
    sliderPrev.smilecarousel('toNext')
});
$('.left-prev').on('click', function () {
    sliderPrev.smilecarousel('toPrev')
});
