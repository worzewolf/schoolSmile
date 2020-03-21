(function () {
    var wrap = document.querySelector('#myIp'),
        myForm = document.querySelector('#myForm');

    function getMyIp(url, callback) {
        if (!url && !callback) return;
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', function () {
            console.log(xhr);
            if (xhr.status == 200 && xhr.readyState == 4){
                callback(xhr.responseText);
            }
        });

        xhr.open('GET', url);
        xhr.send();
    }
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        data.forEach(function (item, key) {
            console.log(key, item)
        });
        sendForm('myForm.php', data, function (data) {
            wrap.innerHTML = data;
            var el = document.createElement('div');
            el.classList.add('anim');
            wrap.appendChild(el);
            setTimeout(function () {
                el.classList.add('active');
            },50);
        })
    });
    function sendForm(url, data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', function () {
            if (xhr.status == 200 && xhr.readyState == 4){
                callback(xhr.responseText);
            }
        });
        xhr.open('POST', url);
        xhr.send(data);
    }
})();
