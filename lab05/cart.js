/*global Cookies*/
var Cart = (function () {
    "use strict";
    var pub = {};

    function getSectionRoot(thisEvent) {
        return thisEvent.parentNode.parentNode;
    }

    function getPrice(parentNode) {
        return parentNode.getElementsByClassName("price")[0].innerHTML;
    }

    function getTitle(parentNode) {
        return parentNode.getElementsByTagName("h3")[0].innerHTML;
    }

    function createItem(thisEvent) {
        var sectionHTML;
        var price;
        var title;
        sectionHTML = getSectionRoot(thisEvent);
        price = getPrice(sectionHTML);
        title = getTitle(sectionHTML);
        return {"title": title, "price": price};
    }

    function bakeCookie(item) {
        var cartCookie;
        var isCookie;
        var cart;
        cart = [];
        isCookie = eatCookies();
        if (isCookie) {
            isCookie.push(item);
            cartCookie = JSON.stringify(isCookie);
        } else {
            cart.push(item);
            cartCookie = JSON.stringify(cart);
        }
        Cookies.set("cart", cartCookie, 1000);
    }
    function eatCookies() {
        var cartCookie;
        var cartArray;
        cartCookie = Cookies.get("cart");
        cartArray = JSON.parse(cartCookie);
        return cartArray;
    }
    function addToCart() {
        /*jshint -W040*/
        var item = createItem(this);
        /*jshint +W040*/
        bakeCookie(item);
    }
    pub.showCart = function () {
        var cartTable;
        var cartItems;
        var total = 0;
        var i;
        var number;
        cartTable = document.getElementById("cartContents");
        cartItems = eatCookies();
        if (cartTable !== null) {
            if (document.cookie === "") {
                cartTable.innerHTML += "Your cart is empty";
            } else {
                var s = "<table style='width:100%'><tr><th>Title</th><th>Price</th></tr>";
                for (i = 0; i < cartItems.length; i += 1) {
                    s += "<tr><td>" + cartItems[i].title + "</td><td>$" + cartItems[i].price + "</td></tr>";
                    number = parseFloat(cartItems[i].price);
                    total += number;
                }
                cartTable.innerHTML = s;
                var result = Math.round(total * 100) / 100;
                s += "<tr><td><b>Total Price:</b></td><td><b>$" + result + "</b></td><tr></table>";
                cartTable.innerHTML = s;
            }
        }
    };

    pub.setup = function () {
        var sections;
        var buttons;
        var i;
        buttons = [];
        sections = document.getElementsByClassName("film");
        for (i = 0; i < sections.length; i += 1) {
            buttons.push(sections[i].getElementsByClassName("buy")[0]);
            sections[i].getElementsByClassName("buy")[0].onclick = addToCart;
        }
    };

    return pub;
}());

if (window.addEventListener) {
    window.addEventListener("load", Cart.setup);
    window.addEventListener("load", Cart.showCart);
} else if (window.attachEvent) {
    window.attachEvent("onload", Cart.setup);
} else {
    window.alert("Could not attach ’cart2.setup’ to the ’window.onload’ event");
}
