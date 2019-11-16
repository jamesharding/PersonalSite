window.onload = function () {
  new fullpage('#fullpage', {
    //options here
    autoScrolling:false,
    scrollHorizontally: true,
    licenseKey: 'asd',
    navigation: true,
    navigationPosition: 'right',
    anchors: ['intro', 'pilot', 'engineer', 'posts'],
    menu: '#fp-menu',
    verticalCentered: false,
  });
  


  // grab an element
  var myElement = document.querySelector("header#header");
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement);
  // initialise
  headroom.init();
}