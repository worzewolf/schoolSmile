(function () {
    $('.home').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '1000');
    });
    var el = document.querySelector('.burger-nav'),
        trigger = document.querySelector('#burger');
    trigger.addEventListener('click', function () {
        el.classList.toggle('visibility');
        trigger.classList.toggle('active');
    }, false);
})();
