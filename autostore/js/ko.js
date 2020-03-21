$(function() {
    var priceFilter =  $( "#slider_price" ).slider({
        range: true,
        min: 0,
        max: 0,
        values: [ 0, 290],
        slide: function( event, ui ) {
            $( "#price" ).val(ui.values[0]);
            $("#price2").val(ui.values[1]); }
    });
    $('#price').val(priceFilter.slider('values', 0)).on('change', function () {
        var val = +this.value;
        if(val >= priceFilter.slider('option','min') && val < priceFilter.slider('option','max')) {
            priceFilter.slider('values', 0, val);
        }
    });
    $('#price2').val(priceFilter.slider('values',1)).on('change', function () {
        priceFilter.slider('values', 1, +this.value);
    });

    function setFilterPrice(maxPrise) {
        if(+maxPrise > +priceFilter.slider('option', 'max')){
            priceFilter.slider('option', 'max', maxPrise);
            priceFilter.slider('values', 1 , maxPrise);
            $('#price2').val(maxPrise);
        }
    }

    function Cart() {
        this.cartList = ko.observableArray([]);
    }

    function Compare() {
        this.compareList = ko.observableArray([]);
        this.removeCompare = function (product) {
            product.compaired(false);
            this.compareList.remove(product);
        }.bind(this);
        this.removeAll = function () {
            if(this.compareList().length){
                this.setCompairedStatus();
                this.compareList.removeAll();
            }
        };
        this.setCompairedStatus = function () {
            for(var i = 0; i < this.compareList().length; i++) {
                this.compareList()[i].compaired(false);
            }
        };
    }

    function Attributes() {
        this.color = ko.observableArray([]);
        this.brand = ko.observableArray([]);
        this.model = ko.observableArray([]);
        this.year = ko.observableArray([]);
    }

    function Product(title, img, price, salePrice, newAction, sale, rating, color, brand, model, year) {
        this.title = ko.observable(title || '');
        this.img = ko.observable(img || '');
        this.price = ko.observable(price || '');
        this.salePrice = ko.observable(salePrice || '');
        this.newAction = ko.observable(newAction || false);
        this.sale = ko.observable(sale || false);
        this.rating = ko.observable(rating || '');
        this.color = ko.observable(color || '');
        this.brand = ko.observable(brand || '');
        this.model = ko.observable(model || '');
        this.year= ko.observable(year || '');
        this.qty = ko.observable(1);
        this.prices = ko.computed(function () {
            var html =  '';
            if (!this.sale()){
                html += '<span class="full-price">$'+ this.salePrice() +'</span>';
                html += '<span class="old-price">$' + this.price() + '</span>';
            } else {
                html += '<span class="full-price"$' + this.price() + '</span>';
            }
            return html;
        }, this);
        this.compaired = ko.observable(false);
    }

    function productList() {
        this.productList = ko.observableArray([]);
        this.addProduct = function (product) {
            for (var key in product){
                if (key == 'price'){
                        setFilterPrice(product[key]());
                }

                if (key === 'color' || key === 'brand' || key === 'model' || key === 'year'){
                    if (attributes[key]().indexOf(product[key]()) === -1) attributes[key].push(product[key]());
                }
            }
            if(product) this.productList.push(product);
        };
        this.addCompare = function (product) {
            if(!product.compaired()){
                compare.compareList.push(product);
                product.compaired(true);
            }
        };
        this.addCart = function (product) {
            var status = false;
            for(var i = 0; i < cart.cartList().length; i++){
                if(cart.cartList()[i] === product) {
                    status = true;
                    break;
                }
            }
            if(!status){
                cart.cartList.push(product);
            } else {
                cart.cartList()[i].qty(cart.cartList()[i].qty() + 1);
            }
            console.log(cart.cartList());
        }
    }

    function AddProduct() {
        this.title = product.title;
        this.img = product.img;
        this.price = product.price;
        this.salePrice = product.salePrice;
        this.newAction = product.newAction;
        this.sale = product.sale;
        this.rating = product.rating;
        this.colorOptions = attributes.color;
        this.brandOptions = attributes.brand;
        this.modelOptions = attributes.model;
        this.yearOptions = attributes.year;
        this.color = ko.observable();
        this.brand = ko.observable();
        this.model = ko.observable();
        this.year = ko.observable();
        this.addAttribute = function (nameAttribute) {
            var value =  prompt('Enter ' + nameAttribute);
            if (value){
                this[nameAttribute + 'Options'].push(value)

            }
        };
        this.required = ko.observable(false);
        this.addProduct = function () {
            if (this.title() && this.img() && this.price() && this.color() && this.brand() && this.model() && this.year()){

                    setFilterPrice(this.sale() ? this.salePrice() : this.price());


                productList.productList.push(
                    new Product(this.title(), this.img(), this.price(),
                                this.salePrice(), this.color(), this.brand(),
                                this.model(), this.year())
                );
                this.required(false);
                this.cleanForm();
            } else {
                this.required(true);
            }
        };
        this.cleanForm = function () {
            this.title('');
            this.img('');
            this.price('');
            this.salePrice('');
            this.color('');
            this.brand('');
            this.model('');
            this.year('');

        };
    }

    var attributes = new Attributes(),
        compare = new Compare(),
        product = new Product(),
        addProduct = new AddProduct(),
        productList = new productList();

    ko.applyBindings(addProduct, document.querySelector('#form'));
    ko.applyBindings(attributes, document.querySelector('#filters'));
    ko.applyBindings(productList, document.querySelector('#productList'));
    ko.applyBindings(compare, document.querySelector('#compare'));
    ko.applyBindings(compare, document.querySelector('#mini-cart'));

    productList.addProduct(new Product('title', 'ima/related/1.png', 40 ,30, false, false, 4,'red', 'bmw', 'x5', 2015));
    productList.addProduct(new Product('Audi', 'ima/related/2.png', 400 ,98, false, false, 5,'black', 'huiaudi', 's8', 2019));
    productList.addProduct(new Product('Audi', 'ima/related/3.png', 200 ,100, false, true, 5,'green', 'audi', 's8', 2020));
});
