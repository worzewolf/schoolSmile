(function () {
    var wrap = document.querySelector('.community-feedbacks');
    var myForm = document.querySelector('#formaPop');

    function validation() {
        myForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = new FormData(this);
            valid(data);
        });

        function valid(data) {
            var rating = 0,
                qualities = '',
                defects = '',
                description = '',
                videoUrl = '',
                fullName = '',
                email = '',
                date = new Date();

            data.forEach(function (item,key){
                if (key === 'qualities') qualities = item;
                else if (key === 'defects') defects = item;
                else if (key === 'description') description = item;
                else if (key === 'videoUrl') videoUrl = item.split('v=')[1];
                else if (key === 'fullName') fullName = item;
                else if (key === 'email') email = item;
                else if (key === 'rating') rating = item;
            });

            function createContent(data) {
                var el = document.createElement('div');
                el.classList.add('client-feedback');
                wrap.prepend(el);
                var newBlock = document.createElement('div');
                newBlock.classList.add('header-client-feedback-new');
                el.appendChild(newBlock);
                var name = document.createElement('h4');
                name.classList.add('person');
                newBlock.appendChild(name);
                name.innerHTML = '<b>'+fullName+'</b>';
                var dateofcoment = document.createElement('span');
                dateofcoment.classList.add('date-of-comment');
                name.appendChild(dateofcoment);
                dateofcoment.innerHTML = date.toLocaleDateString();
                var rating = document.createElement('div')
                rating.classList.add('rating');
                rating.innerHTML = '';
                dateofcoment.appendChild(rating);
                var comment = document.createElement('p');
                newBlock.appendChild(comment);
                comment.innerHTML = description;
                var quality = document.createElement('p');
                quality.classList.add('quality');
                newBlock.appendChild(quality);
                quality.innerHTML = '<b>Достоинства:&nbsp;</b>'+ qualities;
                var defect = document.createElement('p');
                newBlock.appendChild(defect);
                defect.classList.add('defect');
                defect.innerHTML = '<b>Недостатки:&nbsp;</b>'+ defects;
                var likeDislike = document.createElement('div');
                likeDislike.classList.add('like-dislike');
                newBlock.appendChild(likeDislike);
                likeDislike.innerHTML =  '<div class="positive-negative">\n' +
                    '                                        <label for="likee" class="positive counter">&nbsp</label>\n' +
                    '                                        <input type="button" class="react" id="likee" value="like">\n' +
                    '                                        <p id="likeee">&nbsp;</p>\n' +
                    '                                        <label for="dislikee" class="negative">&nbsp</label>\n' +
                    '                                        <input type="button" class="react" id="dislikee" value="dislike">\n' +
                    '                                        <a href="#" class="complaint">&nbsp</a>\n' +
                    '                                    </div>'
                var answer = document.createElement('a');
                answer.classList.add('answer');
                likeDislike.prepend(answer);
                answer.innerHTML = 'Ответить';
            }
            createContent();
        }

        function _clear() {
            document.querySelector('#myForm').reset();
        }
        _clear();

    }
    validation();
})();
