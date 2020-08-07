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

// let box = document.getElementById('block');
// let moveBy = 10;
//
// window.addEventListener('load', () => {
//     box.style.position = 'relative';
//     box.style.left = 0;
//     box.style.top = 0;
// });
//
//
// window.addEventListener('keydown', (e) => {
//     switch (e.key) {
//         case 'ArrowLeft' :
//             box.style.left = parseInt(box.style.left) - moveBy + 'px';
//             break;
//         case 'ArrowRight' :
//             box.style.left = parseInt(box.style.left) + moveBy + 'px';
//             break;
//         case 'ArrowUp' :
//             box.style.top = parseInt(box.style.top) - moveBy + 'px';
//             break;
//         case 'ArrowDown' :
//             box.style.top = parseInt(box.style.top) + moveBy + 'px';
//             break;
//
//
//     }
// });
// let a = box.touchPageX;     // Get the horizontal coordinate
// let b = box.pageY;     // Get the vertical coordinate
// let coor = "A coords: " + a + ", B coords: " + b;

// console.log(a);
// console.log(b);
// console.log(coor);

let pane = $('#game'),
    box = $('#block'),
    w = pane.width() - box.width(),
    d = {},
    x = 3;

function newv(v,a,b) {
    let n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
    return n < 0 ? 0 : n > w ? w : n;
}

// window.addEventListener('keydown', (e) => {
//     switch (e.key) {
//         case 'ArrowLeft' :
//             box.style.left = parseInt(box.style.left) - moveBy + 'px';
//             console.log(getCoordinates("#block"));
//             break;
//         case 'ArrowRight' :
//             box.style.left = parseInt(box.style.left) + moveBy + 'px';
//             console.log(getCoordinates("#block"));
//             break;
//         case 'ArrowUp' :
//             box.style.top = parseInt(box.style.top) - moveBy + 'px';
//             console.log(getCoordinates("#block"));
//             break;
//         case 'ArrowDown' :
//             box.style.top = parseInt(box.style.top) + moveBy + 'px';
//             console.log(getCoordinates("#block"));
//             break;
//     }
// });

$(window).keydown(function(e) { d[e.which] = true; });
$(window).keyup(function(e) { d[e.which] = false; });

setInterval(function() {
    box.css({
        left: function(i,v) { return newv(v, 37, 39); },
        top: function(i,v) { return newv(v, 38, 40); }
    });
}, 10);

$(document).ready(function () {
    animateDiv('.block_1');
    animateDiv('.block_2');
    animateDiv('.block_3');
    animateDiv('.block_4');

});

function makeNewPosition($game) {

    // Get viewport dimensions (remove the dimension of the div)
    $game = ($game || $(window));
    let h = $game.height() - 205;
    let w = $game.width() - 205;

    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function getCoordinates(element) {
    let test = $(element);
    let offsetElement = test.offset();
    let top = offsetElement.top;
    let left = Math.floor(offsetElement.left);
    let bottom = top + 25;
    let right = left + 25;

    let coorElement = {
        top: top,
        right: right,
        bottom: bottom,
        left: left
    };

    return coorElement;
}

function checkHit() {
    // let userBlockElement = document.getElementById(userBlock);
    // let movingBlockElement = document.getElementById(movingBlock);
    let userBlockCoor = getCoordinates("#block");
    let movingBlockCoor1 = getCoordinates("#block_1");
    // let movingBlockCoor2 = getCoordinates("#block_2");
    // let movingBlockCoor3 = getCoordinates("#block_3");
    // let movingBlockCoor4 = getCoordinates("#block_4");
    //console.log(userBlockCoor.bottom, movingBlockCoor1.top);
    //
    // if (userBlockCoor.bottom === movingBlockCoor1.top || userBlockCoor.top === movingBlockCoor1.bottom) {
    //     alert('Hit by BLOCK_1 BLUE');
    // }
    //
    // if(userBlockCoor.bottom === movingBlockCoor2.top || userBlockCoor.top === movingBlockCoor2.bottom) {
    //     alert('Hit by BLOCK_2 PURPLE');
    // }
    //
    // if(userBlockCoor.bottom === movingBlockCoor3.top || userBlockCoor.top === movingBlockCoor3.bottom) {
    //     alert('Hit by BLOCK_3 GREEN');
    // }
    //
    // if(userBlockCoor.bottom === movingBlockCoor4.top || userBlockCoor.top === movingBlockCoor4.bottom) {
    //     alert('Hit by BLOCK_4 YELLOW');
    // }

}

function animateDiv(blockElemenet) {
    let $target = $(blockElemenet);
    let newq = makeNewPosition($target.parent());
    let oldq = $target.offset();
    let speed = 1100;//calcSpeed([oldq.top, oldq.left], newq);


    checkHit();

    $(blockElemenet).animate({
        top: newq[0],
        left: newq[1]
    }, speed, function () {
        animateDiv(blockElemenet);
    });
}

function calcSpeed(prev, next) {

    let x = Math.abs(prev[1] - next[1]);
    let y = Math.abs(prev[0] - next[0]);

    let greatest = x > y ? x : y;

    let speedModifier = 0.2;

    let speed = Math.ceil(greatest / speedModifier);

    return speed;

}

