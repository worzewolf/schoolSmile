var list = [
    {
        "title": "JavaScript-2",
        "price": 9400,
        "reqs": ["HTML and CSS", "JavaScript-1"],
        "discount": 30
    },
    {
        "title": "AJAX",
        "price": 16150,
        "reqs": ["JavaScript-2", "XML and XSLT"],
        "discount": 30
    },
    {
        "title": "Node.js",
        "price": 17050,
        "reqs": ["JavaScript-1"],
        "discount": 50
    },
    {
        "title": "jQuery",
        "price": 9850
    },
    {
        "title": "XML and XSLT",
        "price": 18850
    },
    {
        "title": "PHP-1",
        "price": 12490
    },
    {
        "title": "PHP-2",
        "price": 17990
    },
    {
        "title": "PHP-3",
        "price": 19900
    },
    {
        "title": "PHP-4",
        "price": 20490
    }
];

function getCourse() {
    if (list.length > 0) {
        return list.splice(array_rand(list, 1), 1)[0];
    } else {
        alert('Курсов больше нет');
        return {};
    }
}

function array_rand(input, num_req) {
    var indexes = [];
    var ticks = num_req || 1;
    var checkDuplicate = function (input, value) {
        var exist = false,
            index = 0,
            il = input.length;
        while (index < il) {
            if (input[index] === value) {
                exist = true;
                break;
            }
            index++;
        }
        return exist;
    };

    if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
        while (true) {
            var rand = Math.floor((Math.random() * input.length));
            if (indexes.length === ticks) {
                break;
            }
            if (!checkDuplicate(indexes, rand)) {
                indexes.push(rand);
            }
        }
    } else {
        indexes = null;
    }

    return ((ticks == 1) ? indexes.join() : indexes);
}

var work = [
    'Школьник',
    'Студент',
    'Рабочий',
    'Олихгарх',
    'Креакл'
];
var coursesList = [
    {title: 'HTML', value: "html"},
    {title: 'JavaScript-1', value: "js-1"},
    {title: 'JavaScript-2', value: "js-2"},
    {title: 'jQuery', value: "jq"},
    {title: 'PHP-1', value: "php-1"},
    {title: 'PHP-2', value: "php-2"}
];
