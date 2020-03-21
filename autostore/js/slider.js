(function () {
    $.widget('smile.smilecarousel', {
        options: {
            sliderWidth: 0,
            toShow: 4,
            itemWidth: 0,
            sliderItems: 0,
            countSlide: 0,
            itemWrapperWidth: 0,
            sliderItemWrap: $('<div class="scarousel_item_wrapper"></div>'),
            arrowNext: $('<a class="arrow next" href="#"></a>'),
            arrowPrev: $('<a class="arrow prev" href="#"></a>'),
            toSlide: 3,
            delay: 500,
            currentSlide: 0,
            overlay: '',
            afterSlide: null,
            beforeSlide: null,
            handlerItem: null,
        },
        _create: function () {
            var items = this.element.children();
            this.options.sliderWidth = this.element.outerWidth();
            this.options.itemWidth = this.options.sliderWidth / this.options.toShow;
            this.options.countSlide = items.length;
            items.addClass('item-scarousel').width(this.options.itemWidth);

            $.each(items, $.proxy(function (index, item) {
                $(item).attr('data-item', index).data('item', index);
                if (this.options.handlerItem) {
                    this._on($(item), {
                        click: this.options.handlerItem,
                    })
                }
            }, this));

            this.options.itemWrapperWidth = this.options.itemWidth * this.options.countSlide;
            items.wrapAll(this.options.sliderItemWrap);
            this.itemWrap = this.element.children();
            this.itemWrap.width(this.options.itemWrapperWidth);
            this.itemWrap.wrap('<div class="scarousel_wrapper" style="width: ' + this.options.sliderWidth + '"></div>');
            this.itemWrap.append(this.options.arrowNext, this.options.arrowPrev);

            if (this.options.overlay) this.itemWrap.append(this.options.overlay);

            $.each(this.element.find('.arrow'), $.proxy(function (i, item) {
                var prop = item.classList.contains('next') ? 'next' : 'prev';
                item.dataset.goTo = prop;
                this[prop] = $(item);
                this._on(this[prop], {
                    click: '_goTo'
                });
            }, this));
            this.element.addClass('smile-carousel-init');
            this._setArrow();

            this.itemWrap.css({ 'marginLeft': -(this.options.currentSlide * this.options.itemWidth) + 'px' })
        },
        _goTo: function (e) {
            this._getCurrentSlide(e.target.dataset.goTo === 'next');
            this._go();
        },
        _getCurrentSlide: function (direction) {
            if (direction) {
                this.options.currentSlide = (this.options.currentSlide != this.options.countSlide - this.options.toShow) ?
                    ((this.options.currentSlide + this.options.toSlide) < (this.options.countSlide - this.options.toShow)) ?
                        this.options.currentSlide + this.options.toSlide :
                        this.options.countSlide - this.options.toShow :
                    this.options.countSlide - this.options.toShow;
            } else {
                this.options.currentSlide = (this.options.currentSlide != 0) ?
                    ((this.options.currentSlide - this.options.toSlide) > 0) ?
                        this.options.currentSlide - this.options.toSlide :
                        0 :
                    0;
            }
        },
        _go: function () {
            this.options.beforeSlide && this.options.beforeSlide();
            this.itemWrap.animate({ 'marginLeft': -(this.options.currentSlide * this.options.itemWidth) + 'px' }, this.options.delay, $.proxy(function () {
                this.options.afterSlide && this.options.afterSlide();
            }, this));

        },
        _setArrow: function () {
            if (this.options.currentSlide == this.options.countSlide - this.options.toShow) {
                this.next.addClass('disable');
            } else if (this.options.currentSlide == 0) {
                this.prev.addClass('disable');
            } else {
                this.next.removeClass('disable');
                this.prev.removeClass('disable');
            }
        },
        toNext: function () {
            this._getCurrentSlide(true);
            this._setArrow();
            this._go();
        },
        toPrev: function () {
            this._getCurrentSlide(false);
            this._setArrow();
            this._go();
        }
    });
})();
