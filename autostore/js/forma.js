(function () {
$(document).ready(function () {
    $("#theElement").click(function(){
        $("#radio3").attr('checked','checked');
        $("html, body").animate({ scrollTop: $("header").height() + 650 }, "normal");
        return false;
    });
});
function createContent() {
    var dateofcoment = document.querySelector('.new-date'),
        comment = document.querySelector('.new-feedback'),
        date = new Date();
    comment.appendChild(dateofcoment);
    dateofcoment.innerHTML = date.toLocaleDateString();
}
createContent();
function Message(fullName, message, advantages, disAdvantages) {
    this.fullName = ko.observable(fullName);
    this.message = ko.observable(message);
    this.advantages = ko.observable(advantages);
    this.disAdvantages = ko.observable(disAdvantages);
    this.votefor = ko.observable(0);
    this.voteagainst = ko.observable(0);
    this.plusRate = function () {
        this.votefor(this.votefor() + 1);
    };
    this.minusRate = function () {
        this.voteagainst(this.voteagainst() + 1);
    };
}
function Messages() {
    this.fullName = ko.observable('');
    this.message = ko.observable('');
    this.advantages = ko.observable('');
    this.disAdvantages = ko.observable('');
    this.messagesList = ko.observableArray([]);
    this.required = ko.observable(true);
    this.submitForm = function () {

    };
    this.clearForm = function () {
        this.fullName('');
        this.message('');
        this.advantages('');
        this.disAdvantages('');
        this.required(false);
    };
    this.addMessage = function () {
        if (this.fullName() && this.message() && this.advantages() && this.disAdvantages()) {
            this.messagesList.push(new Message(this.fullName(), this.message(), this.advantages(), this.disAdvantages()));
            this.clearForm();
        } else {
            this.required(true);
        }
    };
}
ko.applyBindings(new Messages());
})();
