var gallery = $('.product-cart-item'),
    imageProduct = gallery.find('.img > img'),
    overlay = $('<div class="overlay"></div>'),
    arrowNext = gallery.find('a.next'),
    arrowPre = gallery.find('a.prev');

var sliderPrev = $('.image-gallery > .img').smilecarousel({
    delay: 300,
    toShow: 4,
    toSlide: 1,
    
    handlerItem: function (e) {
        var src = e.target.getAttribute('src'),
            index = e.currentTarget.getAttribute('data-item');
        if (src) {
            imageProduct.attr({ 'src': src, 'data-img': index });
            imageProduct.data('img', index);
            overlay.css('left', e.target.parentElement.offsetLeft)
        }
    },
    overlay: overlay,
});
var sliderPrevOption = sliderPrev.smilecarousel('option'),
    sliderWidth = sliderPrevOption.sliderWidth,
    sliderItem = sliderPrevOption.itemWidth,
    sliderCount = sliderPrevOption.countSlide;
function galleryGo() {
    var slide = '';
    if ($(this).hasClass('next')) {
        slide = sliderPrev.find('[data-item=' + (+imageProduct.data('img') + 1) + ']');
        if (+imageProduct.data('img') < sliderCount - 1) {
            go();
        }
        if ((sliderItem * imageProduct.data('img') - Math.abs(parseInt(sliderPrev.find('.scarousel_item_wrapper').css('marginLeft')))) >= sliderWidth) {
            sliderPrev.smilecarousel('toNext')
        }
    } else {
        slide = sliderPrev.find('[data-item=' + (+imageProduct.data('img') - 1) + ']');
        if (imageProduct.data('img') > 0) {
            go();
        }
        Math.abs(sliderPrev.find('.scarousel_item_wrapper').css('marginLeft'));
        if (sliderItem * imageProduct.data('img') < Math.abs(parseInt(sliderPrev.find('.scarousel_item_wrapper').css('marginLeft')))) {
            sliderPrev.smilecarousel('toPrev');
        }
    }
    function go() {
        imageProduct.attr({ 'src': slide.find('img').attr('src'), 'data-img': slide.data('item') });
        imageProduct.data('img', slide.data('item'));
        overlay.css('left', slide[0].offsetLeft);
    }
    return false;
}

arrowNext.on('click', galleryGo);
arrowPre.on('click', galleryGo);
$('.right-prev').on('click', function () {
    sliderPrev.smilecarousel('toNext')
});
$('.left-prev').on('click', function () {
    sliderPrev.smilecarousel('toPrev')
});
