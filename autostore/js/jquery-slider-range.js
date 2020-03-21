(function() {
    var priceFilter = $("#slider_price").slider({
        range: true,
        min: 66,
        max: 290,
        values: [66, 290],
        slide: function (event, ui) {
            $("#price").val(ui.values[0]);
            $("#price2").val(ui.values[1]);
        }
    });
    $('#price').val(priceFilter.slider('values', 0)).on('change', function () {
        var val = +this.value;
        if (val >= priceFilter.slider('option', 'min') && val < priceFilter.slider('option', 'max')) {
            priceFilter.slider('values', 0, val);
        }
    });
    $('#price2').val(priceFilter.slider('values', 1)).on('change', function () {
        priceFilter.slider('values', 1, +this.value);
    });
    var el = document.querySelector('.aside-navigation'),
        trigger = document.querySelector('#filter-btn');
        trigger.addEventListener('click', function () {
        el.classList.toggle('visibility');
        trigger.classList.toggle('active');
    },false);
    closer = document.querySelector('#filter-btn2');
    $('#filter-btn2').css({'color': 'white', 'float': 'right'});
    closer.addEventListener('click', function () {
        el.classList.toggle('visibility');
        trigger.classList.toggle('active');
    }, false);
})();
