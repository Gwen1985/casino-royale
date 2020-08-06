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
    block.style.position = 'absolute';
    block.style.left = 0;
    block.style.top = 0;
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
