(function () {
    $.widget('smile.smilecarousel', {
        options:{
            sliderWidth : 0,
            toShow : 4,
            itemWidth : 0,
            sliderItems : 0,
            countSlide : 0,
            itemWrapperWidth : 0,
            sliderItemWrap : $('<div class="scarousel_item_wrapper"></div>'),
            arrowNext : $('<a class="arrow next" href="#"></a>'),
            arrowPrev : $('<a class="arrow prev" href="#"></a>'),
            toSlide : 1,
            delay : 500,
            currentSlide : 0,
            afterSlide: null,
            beforeSlide: null,
        },
        _create:function () {
            var items = this.element.children();
            this.options.sliderWidth = this.element.outerWidth();
            this.options.itemWidth = this.options.sliderWidth / this.options.toShow;
            this.options.countSlide = items.length;
            items.addClass('item-scarousel').width(this.options.itemWidth);

            $.each(items, function (index, item) {
                $(item).attr('data-item', index);
            });

            this.options.itemWrapperWidth = this.options.itemWidth * this.options.countSlide;
            items.wrapAll(this.options.sliderItemWrap);
            this.itemWrap = this.element.children();
            this.itemWrap.width(this.options.itemWrapperWidth);
            // console.log(items, this.itemWrap);
            this.itemWrap.wrap('<div class="scarousel_wrapper" style="width: ' + this.options.sliderWidth + 'px"></div>');
            this.itemWrap.append(this.options.arrowNext, this.options.arrowPrev);

            $.each(this.element.find('.arrow'), $.proxy(function (i, item) {
                // console.log(this);
                var prop = item.classList.contains('next') ? 'next' : 'prev';
                item.dataset.goTo = prop;
                this[prop] = $(item);
                this._on(this[prop],{
                    click: '_goTo'
                });
            },this));
            this.element.addClass('smile-carousel-init');
            // console.log(this);
            this._setArrow();
            this.itemWrap.css({'marginLeft': - (this.options.currentSlide * this.options.itemWidth)  + 'px'})
        },

        _goTo: function(e){
            // console.log(this);
            this._getCurrentSlide(e.target.dataset.goTo === 'next');
            this._go();
        },

        _getCurrentSlide:function (direction) {
            if (direction){
                this.options.currentSlide = (this.options.currentSlide != this.options.countSlide - this.options.toShow) ?
                    ((this.options.currentSlide + this.options.toSlide) < (this.options.countSlide -this.options.toShow))?
                        this.options.currentSlide + this.options.toSlide:
                        this.options.countSlide - this.options.toShow:
                    this.options.countSlide - this.options.toShow;
            } else {
                this.options.currentSlide = (this.options.currentSlide != 0) ? ((this.options.currentSlide - this.options.toSlide) > 0) ? this.options.currentSlide - this.options.toSlide : 0 : 0;
            }
        },
        
        _go:function () {
            this.options.beforeSlide && this.options.beforeSlide();
            this.itemWrap.animate({'marginLeft': - (this.options.currentSlide * this.options.itemWidth)  + 'px'}, this.options.delay, $.proxy(function () {
                if (this.options.afterSlide) this.options.afterSlide();
            },this));
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
            this._getCurrentSlide(true);
            this._setArrow();
            this._go();
        },

    });
})();
