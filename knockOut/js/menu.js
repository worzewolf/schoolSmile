var list = [
    {
        "title": "Salad",
        "price": 9.40,
    },
    {
        "title": "Beef",
        "price": 16.15,
    },
    {
        "title": "Roasted meet",
        "price": 17.05,
    },
    {
        "title": "Sandwich",
        "price": 9.85
    },
    {
        "title": "Soup",
        "price": 8.85
    },
    {
        "title": "Pizza",
        "price": 12.49
    },
    {
        "title": "Fried potato",
        "price": 1.99
    },
    {
        "title": "Ice cream",
        "price": 1.00
    },
    {
        "title": "Cake",
        "price": 2.00
    }
];

function getCourse() {
    if (list.length > 0) {
        return list.splice(array_rand(list, 1), 1)[0];
    } else {
        alert('You have reached the end of menu list...\nPlease, reload page.');
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
