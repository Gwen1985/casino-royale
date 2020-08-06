  // window.addEventListener("keydown", checkKeyPress,true);
  //
  // function checkKeyPress() {
  //     if (event.keyCode == 37) {
  //         console.log('You pressed arrowLeft');
  //     }
  //     if (event.keyCode == 38) {
  //         console.log('You pressed arrowUp');
  //     }
  //     if (event.keyCode == 39) {
  //         console.log('You pressed arrowRight');
  //     }
  //     if (event.keyCode == 40) {
  //         console.log('You pressed ArrowDown');
  //     }
  // }

let box = document.querySelector('.block');
let moveBy = 10;

window.addEventListener('load', () => {
    box.style.position = 'relative';
    box.style.left = 0;
    box.style.top = 0;
});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft' :
            box.style.left = parseInt(box.style.left) - moveBy + 'px';
            break;
        case 'ArrowRight' :
            box.style.left = parseInt(box.style.left) + moveBy + 'px';
            break;
        case 'ArrowUp' :
            box.style.top = parseInt(box.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown' :
            box.style.top = parseInt(box.style.top) + moveBy + 'px';
            break;
    }
});


  $(document).ready(function() {
      animateDiv();

  });

  function makeNewPosition($container) {

      // Get viewport dimensions (remove the dimension of the div)
      $container = ($container || $(window))
      var h = $container.height() - 30;
      var w = $container.width()   - 30;

      var nh = Math.floor(Math.random() * h);
      var nw = Math.floor(Math.random() * w);

      return [nh, nw];

  }

  function animateDiv() {
      var $target = $('.block_1');
      var newq = makeNewPosition($target.parent());
      var oldq = $target.offset();
      var speed = calcSpeed([oldq.top, oldq.left], newq);

      $('.block_1').animate({
          top: newq[0],
          left: newq[1]
      }, speed, function() {
          animateDiv();
      });

  };

  function calcSpeed(prev, next) {

      var x = Math.abs(prev[1] - next[1]);
      var y = Math.abs(prev[0] - next[0]);

      var greatest = x > y ? x : y;

      var speedModifier = 0.1;

      var speed = Math.ceil(greatest / speedModifier);

      return speed;

  }
 // let x = event.pageX;     // Get the horizontal coordinate
 // let y = event.pageY;     // Get the vertical coordinate
 // let coor = "X coords: " + x + ", Y coords: " + y;
 //
 // console.log(coor);