// var customer = {
//     name: ko.observable('Vasya'),
//     location: ko.observable('Rivne')
// };
// document.querySelector('#setName').addEventListener('click', function () {
//     customer.name(prompt('What is your name?', customer.name()));
// });
// document.querySelector('#setLocation').addEventListener('click', function () {
//     customer.location(prompt('Where are you from?',customer.location));
// });
// ko.applyBindings(customer);
// console.log(customer.name('kolya'));

function Customer() {
    this.name = ko.observable('Vasya');
    this.location = ko.observable('Rivne');
    this.info = ko.computed(function () {
        return 'Hello ' + this.name() + ' from ' + this.location();
    }, this);
    this.setName = function () {
        this.name(prompt('What is your name?', this.name()));
    }
    this.setLocation = function () {
        this.location(prompt('Where are you from?', this.location()))
    }
}

ko.applyBindings(new Customer());
