window.onload = function () {
  // grab an element
  var myElement = document.querySelector("header#header");
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement);
  // initialise
  headroom.init();
}