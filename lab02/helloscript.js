function sayHello() {
    "use strict";
    var name;
    var target;
alert("test");
    name = document.getElementById("name").value;
    if (name.length === 0) {
        name = "World";
    }
    target = document.getElementById("result");
    target.innerHTML = "Hello, " + name + "!";
    return false;
}

//setup even handlers for buttons
function setup() {
    "use strict";
    var button;
    var form;

    //event handler for a normal button
    button = document.getElementById("hello");
    button.onclick = sayHello;

    //event handler for submit button of a form
    form = document.getElementById("helloform");
    form.onsubmit = sayHello;

}

//when DOM is render, call setup
if(document.getElementById) {
    window.onload = setup;
}